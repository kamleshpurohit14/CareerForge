package com.careerforge.backend.repository;

import com.careerforge.backend.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findByStudentId(Long studentId);

}