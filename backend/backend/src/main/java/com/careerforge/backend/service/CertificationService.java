package com.careerforge.backend.service;

import com.careerforge.backend.entity.Certification;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.exception.CertificationNotFoundException;
import com.careerforge.backend.repository.CertificationRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final StudentRepository studentRepository;

    public CertificationService(
            CertificationRepository certificationRepository,
            StudentRepository studentRepository) {
        this.certificationRepository = certificationRepository;
        this.studentRepository = studentRepository;
    }

    public Certification createCertification(Long studentId, Certification certification) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        certification.setStudent(student);

        return certificationRepository.save(certification);
    }

    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    public Certification getCertificationById(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new CertificationNotFoundException("Certification not found"));
    }

    public List<Certification> getCertificationsByStudentId(Long studentId) {
        return certificationRepository.findByStudentId(studentId);
    }

    public Certification updateCertification(Long id, Certification updatedCertification) {
        Certification existingCertification = certificationRepository.findById(id)
                .orElseThrow(() -> new CertificationNotFoundException("Certification not found"));

        existingCertification.setName(updatedCertification.getName());
        existingCertification.setIssuingOrganization(updatedCertification.getIssuingOrganization());
        existingCertification.setIssueDate(updatedCertification.getIssueDate());
        existingCertification.setCredentialId(updatedCertification.getCredentialId());
        existingCertification.setCredentialUrl(updatedCertification.getCredentialUrl());

        return certificationRepository.save(existingCertification);
    }

    public void deleteCertification(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new CertificationNotFoundException("Certification not found"));

        certificationRepository.delete(certification);
    }
}