package com.careerforge.backend.repository;

import com.careerforge.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    List<Internship> findByStudentId(Long studentId);
}