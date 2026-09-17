package com.careerforge.backend.dto;

import java.util.List;

public class RecommendationResponse {

    private Long studentId;
    private String primaryCareer;
    private List<String> recommendedCareers;
    private List<String> skillGaps;
    private List<String> recommendedSkills;
    private String reason;

    public RecommendationResponse() {
    }

    public RecommendationResponse(
            Long studentId,
            String primaryCareer,
            List<String> recommendedCareers,
            List<String> skillGaps,
            List<String> recommendedSkills,
            String reason) {

        this.studentId = studentId;
        this.primaryCareer = primaryCareer;
        this.recommendedCareers = recommendedCareers;
        this.skillGaps = skillGaps;
        this.recommendedSkills = recommendedSkills;
        this.reason = reason;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getPrimaryCareer() {
        return primaryCareer;
    }

    public void setPrimaryCareer(String primaryCareer) {
        this.primaryCareer = primaryCareer;
    }

    public List<String> getRecommendedCareers() {
        return recommendedCareers;
    }

    public void setRecommendedCareers(List<String> recommendedCareers) {
        this.recommendedCareers = recommendedCareers;
    }

    public List<String> getSkillGaps() {
        return skillGaps;
    }

    public void setSkillGaps(List<String> skillGaps) {
        this.skillGaps = skillGaps;
    }

    public List<String> getRecommendedSkills() {
        return recommendedSkills;
    }

    public void setRecommendedSkills(List<String> recommendedSkills) {
        this.recommendedSkills = recommendedSkills;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}