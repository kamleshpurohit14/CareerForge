package com.careerforge.backend.service;

import com.careerforge.backend.dto.RecommendationResponse;
import com.careerforge.backend.entity.CareerAssessment;
import com.careerforge.backend.entity.Project;
import com.careerforge.backend.entity.Skill;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.repository.CareerAssessmentRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
public class RecommendationService {

    private final StudentRepository studentRepository;
    private final CareerAssessmentRepository careerAssessmentRepository;

    public RecommendationService(
            StudentRepository studentRepository,
            CareerAssessmentRepository careerAssessmentRepository) {

        this.studentRepository = studentRepository;
        this.careerAssessmentRepository = careerAssessmentRepository;
    }

    public RecommendationResponse generateRecommendation(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new RuntimeException("Student not found with id: " + studentId));

        CareerAssessment assessment =
                careerAssessmentRepository.findByStudentId(studentId).orElse(null);

        String primaryCareer = determinePrimaryCareer(student, assessment);

        List<String> recommendedCareers =
                getRecommendedCareers(primaryCareer);

        List<String> skillGaps =
                determineSkillGaps(student, primaryCareer);

        List<String> recommendedSkills =
                getRecommendedSkills(primaryCareer);

        String reason =
                generateReason(student, assessment, primaryCareer);

        return new RecommendationResponse(
                student.getId(),
                primaryCareer,
                recommendedCareers,
                skillGaps,
                recommendedSkills,
                reason
        );
    }

    private String determinePrimaryCareer(
            Student student,
            CareerAssessment assessment) {

        if (assessment != null &&
                assessment.getPreferredDomain() != null &&
                !assessment.getPreferredDomain().isBlank()) {

            String domain = assessment.getPreferredDomain()
                    .toLowerCase(Locale.ROOT);

            if (domain.contains("software")) {
                return "Software Developer";
            }

            if (domain.contains("ai") ||
                    domain.contains("data")) {
                return "AI / Data Scientist";
            }

            if (domain.contains("web")) {
                return "Full Stack Developer";
            }

            if (domain.contains("cyber")) {
                return "Cybersecurity Analyst";
            }
        }

        if (student.getCareerGoal() != null &&
                !student.getCareerGoal().isBlank()) {

            String goal = student.getCareerGoal()
                    .toLowerCase(Locale.ROOT);

            if (goal.contains("ai") ||
                    goal.contains("machine learning") ||
                    goal.contains("data")) {

                return "AI / Data Scientist";
            }

            if (goal.contains("web") ||
                    goal.contains("full stack")) {

                return "Full Stack Developer";
            }

            if (goal.contains("cyber")) {
                return "Cybersecurity Analyst";
            }

            if (goal.contains("software") ||
                    goal.contains("java") ||
                    goal.contains("developer")) {

                return "Software Developer";
            }
        }

        return "Software Developer";
    }

    private List<String> getRecommendedCareers(String primaryCareer) {

        return switch (primaryCareer) {

            case "AI / Data Scientist" -> Arrays.asList(
                    "AI / Data Scientist",
                    "Machine Learning Engineer",
                    "Data Analyst"
            );

            case "Full Stack Developer" -> Arrays.asList(
                    "Full Stack Developer",
                    "Frontend Developer",
                    "Backend Developer"
            );

            case "Cybersecurity Analyst" -> Arrays.asList(
                    "Cybersecurity Analyst",
                    "Security Engineer",
                    "SOC Analyst"
            );

            default -> Arrays.asList(
                    "Software Developer",
                    "Java Backend Developer",
                    "Full Stack Developer"
            );
        };
    }

    private List<String> getRecommendedSkills(String primaryCareer) {

        return switch (primaryCareer) {

            case "AI / Data Scientist" -> Arrays.asList(
                    "Python",
                    "Machine Learning",
                    "Statistics",
                    "Pandas",
                    "NumPy",
                    "SQL"
            );

            case "Full Stack Developer" -> Arrays.asList(
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Spring Boot",
                    "REST APIs"
            );

            case "Cybersecurity Analyst" -> Arrays.asList(
                    "Networking",
                    "Linux",
                    "Cybersecurity Fundamentals",
                    "Ethical Hacking",
                    "SIEM",
                    "Python"
            );

            default -> Arrays.asList(
                    "Java",
                    "DSA",
                    "OOP",
                    "SQL",
                    "Spring Boot",
                    "REST APIs",
                    "Git & GitHub"
            );
        };
    }

    private List<String> determineSkillGaps(
            Student student,
            String primaryCareer) {

        List<String> requiredSkills =
                getRecommendedSkills(primaryCareer);

        List<String> skillGaps = new ArrayList<>();

        for (String requiredSkill : requiredSkills) {

            boolean found = false;

            for (Skill skill : student.getSkills()) {

                if (skill.getName() == null) {
                    continue;
                }

                String existingSkill =
                        skill.getName().toLowerCase(Locale.ROOT);

                String required =
                        requiredSkill.toLowerCase(Locale.ROOT);

                if (existingSkill.contains(required) ||
                        required.contains(existingSkill)) {

                    found = true;
                    break;
                }
            }

            if (!found) {
                skillGaps.add(requiredSkill);
            }
        }

        return skillGaps;
    }

    private String generateReason(
            Student student,
            CareerAssessment assessment,
            String primaryCareer) {

        StringBuilder reason = new StringBuilder();

        reason.append("Your current profile suggests ")
                .append(primaryCareer)
                .append(" as a suitable career direction");

        if (assessment != null &&
                assessment.getAssessmentScore() != null) {

            reason.append(" based on your career assessment score of ")
                    .append(assessment.getAssessmentScore())
                    .append("/100");
        }

        if (student.getSkills() != null &&
                !student.getSkills().isEmpty()) {

            reason.append(". Your existing skills have also been considered");
        }

        if (student.getProjects() != null &&
                !student.getProjects().isEmpty()) {

            reason.append(" along with your projects");
        }

        reason.append(".");

        return reason.toString();
    }
}