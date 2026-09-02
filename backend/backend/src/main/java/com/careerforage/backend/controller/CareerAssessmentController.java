package com.careerforge.backend.controller;

import com.careerforge.backend.entity.CareerAssessment;
import com.careerforge.backend.service.CareerAssessmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class CareerAssessmentController {

    @Autowired
    private CareerAssessmentService careerAssessmentService;

    @PostMapping("/{studentId}/assessment")
    public ResponseEntity<CareerAssessment> createAssessment(
            @PathVariable Long studentId,
            @Valid @RequestBody CareerAssessment assessment) {

        return ResponseEntity.ok(
                careerAssessmentService.createAssessment(
                        studentId,
                        assessment
                )
        );
    }

    @GetMapping("/{studentId}/assessment")
    public ResponseEntity<CareerAssessment> getAssessment(
            @PathVariable Long studentId) {

        return careerAssessmentService
                .getAssessmentByStudentId(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{studentId}/assessment")
    public ResponseEntity<CareerAssessment> updateAssessment(
            @PathVariable Long studentId,
            @Valid @RequestBody CareerAssessment assessment) {

        CareerAssessment updated =
                careerAssessmentService.updateAssessment(
                        studentId,
                        assessment
                );

        if (updated != null) {
            return ResponseEntity.ok(updated);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{studentId}/assessment")
    public ResponseEntity<Void> deleteAssessment(
            @PathVariable Long studentId) {

        careerAssessmentService.deleteAssessment(studentId);

        return ResponseEntity.noContent().build();
    }
}