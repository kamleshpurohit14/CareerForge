
package com.careerforge.backend.dto;

import com.careerforge.backend.entity.Resume;
import java.time.LocalDateTime;

public class ResumeResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String location;
    private String linkedin;
    private String github;
    private String summary;
    private String degree;
    private String college;
    private String graduationYear;
    private String cgpa;
    private String skills;
    private String projects;
    private String experience;
    private String certifications;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ResumeResponse(Resume resume) {
        this.id = resume.getId();
        this.fullName = resume.getFullName();
        this.email = resume.getEmail();
        this.phone = resume.getPhone();
        this.location = resume.getLocation();
        this.linkedin = resume.getLinkedin();
        this.github = resume.getGithub();
        this.summary = resume.getSummary();
        this.degree = resume.getDegree();
        this.college = resume.getCollege();
        this.graduationYear = resume.getGraduationYear();
        this.cgpa = resume.getCgpa();
        this.skills = resume.getSkills();
        this.projects = resume.getProjects();
        this.experience = resume.getExperience();
        this.certifications = resume.getCertifications();
        this.createdAt = resume.getCreatedAt();
        this.updatedAt = resume.getUpdatedAt();
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public String getLinkedin() { return linkedin; }
    public String getGithub() { return github; }
    public String getSummary() { return summary; }
    public String getDegree() { return degree; }
    public String getCollege() { return college; }
    public String getGraduationYear() { return graduationYear; }
    public String getCgpa() { return cgpa; }
    public String getSkills() { return skills; }
    public String getProjects() { return projects; }
    public String getExperience() { return experience; }
    public String getCertifications() { return certifications; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
