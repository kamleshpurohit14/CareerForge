package com.careerforge.backend.repository;

import com.careerforge.backend.entity.CareerAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CareerAssessmentRepository
        extends JpaRepository<CareerAssessment, Long> {

    Optional<CareerAssessment> findByStudentId(Long studentId);
}