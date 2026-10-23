
package com.careerforge.backend.service;

import com.careerforge.backend.dto.ResumeSummaryRequest;
import com.careerforge.backend.dto.ProjectDescriptionRequest;
import com.careerforge.backend.entity.CareerAssessment;
import com.careerforge.backend.entity.Project;
import com.careerforge.backend.entity.Skill;
import com.careerforge.backend.entity.Student;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final Client geminiClient;
    private final StudentService studentService;

    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_RETRY_DELAY_MS = 1000;

    public AIService(
            Client geminiClient,
            StudentService studentService) {
        this.geminiClient = geminiClient;
        this.studentService = studentService;
    }

    // Existing AI Career Guidance
    public String generateCareerInsight(Long studentId) {

        Student student = studentService.getStudentById(studentId);

        StringBuilder profile = new StringBuilder();

        profile.append("Student Career Profile:\n\n");

        profile.append("Name: ")
                .append(student.getFullName())
                .append("\n");

        profile.append("College: ")
                .append(student.getCollege())
                .append("\n");

        profile.append("Branch: ")
                .append(student.getBranch())
                .append("\n");

        profile.append("Semester: ")
                .append(student.getSemester())
                .append("\n");

        profile.append("CGPA: ")
                .append(student.getCgpa())
                .append("\n");

        profile.append("Career Goal: ")
                .append(student.getCareerGoal())
                .append("\n\n");

        profile.append("Skills:\n");

        if (student.getSkills() != null
                && !student.getSkills().isEmpty()) {

            for (Skill skill : student.getSkills()) {

                profile.append("- ")
                        .append(skill.getName());

                if (skill.getLevel() != null
                        && !skill.getLevel().isBlank()) {

                    profile.append(" (Level: ")
                            .append(skill.getLevel())
                            .append(")");
                }

                profile.append("\n");
            }

        } else {
            profile.append("- No skills added yet.\n");
        }

        profile.append("\nProjects:\n");

        if (student.getProjects() != null
                && !student.getProjects().isEmpty()) {

            for (Project project : student.getProjects()) {

                profile.append("- Project: ")
                        .append(project.getTitle())
                        .append("\n");

                if (project.getDescription() != null
                        && !project.getDescription().isBlank()) {

                    profile.append("  Description: ")
                            .append(project.getDescription())
                            .append("\n");
                }

                if (project.getTechnologies() != null
                        && !project.getTechnologies().isBlank()) {

                    profile.append("  Technologies: ")
                            .append(project.getTechnologies())
                            .append("\n");
                }
            }

        } else {
            profile.append("- No projects added yet.\n");
        }

        profile.append("\n");

        CareerAssessment assessment = student.getCareerAssessment();

        profile.append("Career Assessment:\n");

        if (assessment != null) {

            profile.append("Interests: ")
                    .append(assessment.getInterests())
                    .append("\n");

            profile.append("Preferred Domain: ")
                    .append(assessment.getPreferredDomain())
                    .append("\n");

            profile.append("Experience Level: ")
                    .append(assessment.getExperienceLevel())
                    .append("\n");

            profile.append("Preferred Role: ")
                    .append(assessment.getPreferredRole())
                    .append("\n");

            profile.append("Assessment Score: ")
                    .append(assessment.getAssessmentScore())
                    .append("/100\n");

        } else {
            profile.append("- Career assessment not completed yet.\n");
        }

        String prompt = """
                You are a professional career guidance assistant.

                Analyze the student's complete career profile given below.

                Provide a concise but useful career insight covering:

                1. Suitable career direction
                2. Current strengths
                3. Important skill gaps
                4. Recommended next learning steps
                5. One practical project or action the student should consider

                Base your analysis only on the information provided.
                Do not invent qualifications, experience, skills, or achievements.

                Keep the response clear and student-friendly.

                Student Profile:

                """ + profile;

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        "gemini-flash-latest",
                        prompt,
                        null
                );

        String responseText = response.text();

        if (responseText == null || responseText.isBlank()) {
            return "No AI response generated.";
        }

        return responseText;
    }

    // AI Resume Summary Generator with temporary-error retries
    public String generateResumeSummary(ResumeSummaryRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Resume details are required."
            );
        }

        String prompt = """
                You are a professional resume writer.

                Generate a concise, professional resume summary
                for a student or entry-level job candidate.

                Use only the details provided below.
                Do not invent skills, experience, achievements,
                qualifications, or certifications.

                Keep the summary between 50 and 80 words.
                Use clear, ATS-friendly professional English.
                Do not add a heading, bullet points, or quotation marks.

                Education: %s
                College: %s
                Graduation Year: %s
                CGPA: %s
                Skills: %s
                Projects: %s
                Experience: %s
                Certifications: %s
                """.formatted(
                safe(request.getDegree()),
                safe(request.getCollege()),
                safe(request.getGraduationYear()),
                safe(request.getCgpa()),
                safe(request.getSkills()),
                safe(request.getProjects()),
                safe(request.getExperience()),
                safe(request.getCertifications())
        );

        GenerateContentResponse response =
                generateResumeSummaryWithRetry(prompt);

        String summary = response.text();

        if (summary == null || summary.isBlank()) {
            throw new IllegalStateException(
                    "AI could not generate a resume summary. "
                    + "Please try again."
            );
        }

        return summary.trim();
    }

    // Retry only temporary service-unavailable errors
    private GenerateContentResponse generateResumeSummaryWithRetry(
            String prompt) {

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {

            try {
                return geminiClient.models.generateContent(
                        "gemini-flash-latest",
                        prompt,
                        null
                );

            } catch (RuntimeException ex) {

                boolean temporaryError = isTemporaryUnavailable(ex);

                if (!temporaryError || attempt == MAX_RETRIES) {
                    throw new IllegalStateException(
                            temporaryError
                                    ? "Gemini AI is temporarily busy. "
                                      + "Please try again in a little while."
                                    : "Unable to generate the AI resume summary. "
                                      + "Please check your AI configuration "
                                      + "and try again.",
                            ex
                    );
                }

                long delay = INITIAL_RETRY_DELAY_MS
                        * (1L << (attempt - 1));

                try {
                    Thread.sleep(delay);

                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();

                    throw new IllegalStateException(
                            "AI request was interrupted. Please try again.",
                            interruptedException
                    );
                }
            }
        }

        throw new IllegalStateException(
                "Unable to generate the resume summary. Please try again."
        );
    }

    // Identify temporary 503 / UNAVAILABLE errors
    private boolean isTemporaryUnavailable(Throwable error) {

        Throwable current = error;

        while (current != null) {

            String message = current.getMessage();

            if (message != null) {
                String lowerMessage = message.toLowerCase();

                if (lowerMessage.contains("503")
                        || lowerMessage.contains("unavailable")
                        || lowerMessage.contains("high demand")) {
                    return true;
                }
            }

            current = current.getCause();
        }

        return false;
    }

    // Existing AI Project Description Improver
    public String improveProjectDescription(
            ProjectDescriptionRequest request) {

        if (request == null
                || request.getDescription() == null
                || request.getDescription().isBlank()) {

            throw new IllegalArgumentException(
                    "Please provide a project description."
            );
        }

        String prompt = """
                You are a professional resume writer
                specializing in software development projects.

                Rewrite the supplied project description into
                clear, professional, ATS-friendly English.

                Rules:
                - Preserve the original meaning.
                - Use only facts supplied in the request.
                - Do not invent metrics, achievements, features,
                  responsibilities, or technical skills.
                - Mention technologies only when provided.
                - Keep the result concise, around 2 to 4 sentences.
                - Return only the improved description.
                - Do not add a heading or quotation marks.

                Project Title: %s
                Technologies: %s
                Original Description: %s
                """.formatted(
                safe(request.getTitle()),
                safe(request.getTechnologies()),
                request.getDescription().trim()
        );

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        "gemini-flash-latest",
                        prompt,
                        null
                );

        String improvedDescription = response.text();

        if (improvedDescription == null
                || improvedDescription.isBlank()) {

            throw new IllegalStateException(
                    "AI could not improve the project description."
            );
        }

        return improvedDescription.trim();
    }

    // Handle missing or blank values
    private String safe(String value) {
        return value == null || value.isBlank()
                ? "Not provided"
                : value.trim();
    }
}
