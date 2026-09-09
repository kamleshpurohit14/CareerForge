package com.careerforge.backend.service;

import com.careerforge.backend.entity.CareerAssessment;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.exception.StudentNotFoundException;
import com.careerforge.backend.repository.CareerAssessmentRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CareerAssessmentService {

    @Autowired
    private CareerAssessmentRepository careerAssessmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public CareerAssessment createAssessment(
            Long studentId,
            CareerAssessment assessment) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + studentId
                ));

        assessment.setStudent(student);

        return careerAssessmentRepository.save(assessment);
    }

    public Optional<CareerAssessment> getAssessmentByStudentId(
            Long studentId) {

        return careerAssessmentRepository.findByStudentId(studentId);
    }

    public CareerAssessment updateAssessment(
            Long studentId,
            CareerAssessment assessmentDetails) {

        CareerAssessment assessment =
                careerAssessmentRepository.findByStudentId(studentId)
                        .orElse(null);

        if (assessment == null) {
            return null;
        }

        assessment.setInterests(assessmentDetails.getInterests());
        assessment.setPreferredDomain(
                assessmentDetails.getPreferredDomain());
        assessment.setExperienceLevel(
                assessmentDetails.getExperienceLevel());
        assessment.setPreferredRole(
                assessmentDetails.getPreferredRole());
        assessment.setAssessmentScore(
                assessmentDetails.getAssessmentScore());

        return careerAssessmentRepository.save(assessment);
    }

    public void deleteAssessment(Long studentId) {

        CareerAssessment assessment =
                careerAssessmentRepository.findByStudentId(studentId)
                        .orElse(null);

        if (assessment != null) {
            careerAssessmentRepository.delete(assessment);
        }
    }
}