package com.careerforge.backend.controller;

import com.careerforge.backend.entity.Education;
import com.careerforge.backend.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @PostMapping("/students/{studentId}/education")
    public ResponseEntity<Education> createEducation(
            @PathVariable Long studentId,
            @RequestBody Education education) {

        Education createdEducation =
                educationService.createEducation(studentId, education);

        if (createdEducation != null) {
            return ResponseEntity.ok(createdEducation);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/education")
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEducation());
    }

    @GetMapping("/education/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return educationService.getEducationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/education/{id}")
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestBody Education educationDetails) {

        Education updatedEducation =
                educationService.updateEducation(id, educationDetails);

        if (updatedEducation != null) {
            return ResponseEntity.ok(updatedEducation);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}