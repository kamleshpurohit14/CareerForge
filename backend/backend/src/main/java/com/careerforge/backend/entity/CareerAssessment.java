package com.careerforge.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "career_assessments")
public class CareerAssessment {

    public CareerAssessment() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Interests are required")
    private String interests;

    @NotBlank(message = "Preferred domain is required")
    private String preferredDomain;

    @NotBlank(message = "Experience level is required")
    private String experienceLevel;

    @NotBlank(message = "Preferred role is required")
    private String preferredRole;

    @NotNull(message = "Assessment score is required")
    @Min(value = 0, message = "Assessment score cannot be less than 0")
    @Max(value = 100, message = "Assessment score cannot be greater than 100")
    private Integer assessmentScore;

    /*
     * New assessment data
     * Stored as JSON strings for flexibility and backward compatibility.
     */
    @Column(columnDefinition = "TEXT")
    private String answersJson;

    @Column(columnDefinition = "TEXT")
    private String careerSignalsJson;

    @Column(columnDefinition = "TEXT")
    private String workingStyleJson;

    @Column(columnDefinition = "TEXT")
    private String careerPrioritiesJson;

    @Column(columnDefinition = "TEXT")
    private String scenarioSignalsJson;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    @JsonBackReference("student-assessment")
    private Student student;

    // =========================
    // Getters and Setters
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getPreferredDomain() {
        return preferredDomain;
    }

    public void setPreferredDomain(String preferredDomain) {
        this.preferredDomain = preferredDomain;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public String getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(String preferredRole) {
        this.preferredRole = preferredRole;
    }

    public Integer getAssessmentScore() {
        return assessmentScore;
    }

    public void setAssessmentScore(Integer assessmentScore) {
        this.assessmentScore = assessmentScore;
    }

    public String getAnswersJson() {
        return answersJson;
    }

    public void setAnswersJson(String answersJson) {
        this.answersJson = answersJson;
    }

    public String getCareerSignalsJson() {
        return careerSignalsJson;
    }

    public void setCareerSignalsJson(String careerSignalsJson) {
        this.careerSignalsJson = careerSignalsJson;
    }

    public String getWorkingStyleJson() {
        return workingStyleJson;
    }

    public void setWorkingStyleJson(String workingStyleJson) {
        this.workingStyleJson = workingStyleJson;
    }

    public String getCareerPrioritiesJson() {
        return careerPrioritiesJson;
    }

    public void setCareerPrioritiesJson(String careerPrioritiesJson) {
        this.careerPrioritiesJson = careerPrioritiesJson;
    }

    public String getScenarioSignalsJson() {
        return scenarioSignalsJson;
    }

    public void setScenarioSignalsJson(String scenarioSignalsJson) {
        this.scenarioSignalsJson = scenarioSignalsJson;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}