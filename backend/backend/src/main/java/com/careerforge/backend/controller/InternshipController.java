package com.careerforge.backend.controller;

import com.careerforge.backend.entity.Internship;
import com.careerforge.backend.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @PostMapping("/students/{studentId}/internships")
    public ResponseEntity<Internship> createInternship(
            @PathVariable Long studentId,
            @RequestBody Internship internship
    ) {
        return ResponseEntity.ok(
                internshipService.createInternship(studentId, internship)
        );
    }

    @GetMapping("/internships")
    public ResponseEntity<List<Internship>> getAllInternships() {
        return ResponseEntity.ok(internshipService.getAllInternships());
    }

    @GetMapping("/internships/{id}")
    public ResponseEntity<Internship> getInternshipById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                internshipService.getInternshipById(id)
        );
    }

    @GetMapping("/students/{studentId}/internships")
    public ResponseEntity<List<Internship>> getInternshipsByStudentId(
            @PathVariable Long studentId
    ) {
        return ResponseEntity.ok(
                internshipService.getInternshipsByStudentId(studentId)
        );
    }

    @PutMapping("/internships/{id}")
    public ResponseEntity<Internship> updateInternship(
            @PathVariable Long id,
            @RequestBody Internship internship
    ) {
        return ResponseEntity.ok(
                internshipService.updateInternship(id, internship)
        );
    }

    @DeleteMapping("/internships/{id}")
    public ResponseEntity<Void> deleteInternship(
            @PathVariable Long id
    ) {
        internshipService.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}