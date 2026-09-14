package com.careerforge.backend.service;

import com.careerforge.backend.entity.Internship;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.repository.InternshipRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final StudentRepository studentRepository;

    public InternshipService(
            InternshipRepository internshipRepository,
            StudentRepository studentRepository
    ) {
        this.internshipRepository = internshipRepository;
        this.studentRepository = studentRepository;
    }

    public Internship createInternship(Long studentId, Internship internship) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        internship.setStudent(student);
        return internshipRepository.save(internship);
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public List<Internship> getInternshipsByStudentId(Long studentId) {
        return internshipRepository.findByStudentId(studentId);
    }

    public Internship updateInternship(Long id, Internship updatedInternship) {
        Internship existingInternship = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        existingInternship.setCompanyName(updatedInternship.getCompanyName());
        existingInternship.setRole(updatedInternship.getRole());
        existingInternship.setLocation(updatedInternship.getLocation());
        existingInternship.setStartDate(updatedInternship.getStartDate());
        existingInternship.setEndDate(updatedInternship.getEndDate());
        existingInternship.setDescription(updatedInternship.getDescription());
        existingInternship.setTechnologies(updatedInternship.getTechnologies());
        existingInternship.setCertificateUrl(updatedInternship.getCertificateUrl());

        return internshipRepository.save(existingInternship);
    }

    public void deleteInternship(Long id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        internshipRepository.delete(internship);
    }
}