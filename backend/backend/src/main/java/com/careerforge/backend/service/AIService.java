package com.careerforge.backend.service;

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

    public AIService(Client geminiClient, StudentService studentService) {
        this.geminiClient = geminiClient;
        this.studentService = studentService;
    }

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

        if (student.getSkills() != null && !student.getSkills().isEmpty()) {

            for (Skill skill : student.getSkills()) {

                profile.append("- ")
                        .append(skill.getName());

                if (skill.getLevel() != null && !skill.getLevel().isBlank()) {
                    profile.append(" (Level: ")
                            .append(skill.getLevel())
                            .append(")");
                }

                profile.append("\n");
            }

        } else {
            profile.append("- No skills added yet.\n");
        }

        profile.append("\n");

        profile.append("Projects:\n");

        if (student.getProjects() != null && !student.getProjects().isEmpty()) {

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

        String prompt =
                """
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

                """
                + profile;

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
}