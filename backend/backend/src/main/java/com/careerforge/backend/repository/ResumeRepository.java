
package com.careerforge.backend.repository;

import com.careerforge.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByStudentId(Long studentId);

    Optional<Resume> findByIdAndStudentId(Long id, Long studentId);
}
