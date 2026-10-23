
package com.careerforge.backend.service;

import com.careerforge.backend.dto.ResumeRequest;
import com.careerforge.backend.dto.ResumeResponse;
import com.careerforge.backend.entity.Resume;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.entity.User;
import com.careerforge.backend.repository.ResumeRepository;
import com.careerforge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    // Save a new resume
    @Transactional
    public ResumeResponse saveResume(
            String email,
            ResumeRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Student student = user.getStudent();

        if (student == null) {
            throw new IllegalStateException(
                    "Student profile not found. Please complete your profile first."
            );
        }

        Resume resume = new Resume();
        resume.setStudent(student);

        copyResumeData(request, resume);

        Resume savedResume = resumeRepository.save(resume);

        return new ResumeResponse(savedResume);
    }

    // Update an existing resume owned by the logged-in student
    @Transactional
    public ResumeResponse updateResume(
            Long resumeId,
            String email,
            ResumeRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Student student = user.getStudent();

        if (student == null) {
            throw new IllegalStateException(
                    "Student profile not found. Please complete your profile first."
            );
        }

        Resume resume = resumeRepository
                .findByIdAndStudentId(resumeId, student.getId())
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        copyResumeData(request, resume);

        Resume updatedResume = resumeRepository.save(resume);

        return new ResumeResponse(updatedResume);
    }

    // Copy request fields into the resume entity
    private void copyResumeData(
            ResumeRequest request,
            Resume resume) {

        resume.setFullName(request.getFullName());
        resume.setEmail(request.getEmail());
        resume.setPhone(request.getPhone());
        resume.setLocation(request.getLocation());
        resume.setLinkedin(request.getLinkedin());
        resume.setGithub(request.getGithub());
        resume.setSummary(request.getSummary());
        resume.setDegree(request.getDegree());
        resume.setCollege(request.getCollege());
        resume.setGraduationYear(request.getGraduationYear());
        resume.setCgpa(request.getCgpa());
        resume.setSkills(request.getSkills());
        resume.setProjects(request.getProjects());
        resume.setExperience(request.getExperience());
        resume.setCertifications(request.getCertifications());
    }

    // Get all resumes belonging to the logged-in student
    @Transactional(readOnly = true)
    public List<ResumeResponse> getStudentResumes(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Student student = user.getStudent();

        if (student == null) {
            throw new IllegalStateException(
                    "Student profile not found. Please complete your profile first."
            );
        }

        return resumeRepository.findByStudentId(student.getId())
                .stream()
                .map(ResumeResponse::new)
                .toList();
    }

    // Get one resume belonging to the logged-in student
    @Transactional(readOnly = true)
    public ResumeResponse getResume(
            Long resumeId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Student student = user.getStudent();

        if (student == null) {
            throw new IllegalStateException(
                    "Student profile not found. Please complete your profile first."
            );
        }

        Resume resume = resumeRepository
                .findByIdAndStudentId(resumeId, student.getId())
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return new ResumeResponse(resume);
    }

    // Delete a resume belonging to the logged-in student
    @Transactional
    public void deleteResume(Long resumeId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Student student = user.getStudent();

        if (student == null) {
            throw new IllegalStateException(
                    "Student profile not found. Please complete your profile first."
            );
        }

        Resume resume = resumeRepository
                .findByIdAndStudentId(resumeId, student.getId())
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        resumeRepository.delete(resume);
    }
}
