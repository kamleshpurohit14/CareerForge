package com.careerforge.backend.controller;

import com.careerforge.backend.entity.Certification;
import com.careerforge.backend.service.CertificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @PostMapping("/students/{studentId}/certifications")
    public ResponseEntity<Certification> createCertification(
            @PathVariable Long studentId,
            @RequestBody Certification certification) {

        return ResponseEntity.ok(
                certificationService.createCertification(studentId, certification)
        );
    }

    @GetMapping("/certifications")
    public ResponseEntity<List<Certification>> getAllCertifications() {
        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    @GetMapping("/certifications/{id}")
    public ResponseEntity<Certification> getCertificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }

    @GetMapping("/students/{studentId}/certifications")
    public ResponseEntity<List<Certification>> getCertificationsByStudentId(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                certificationService.getCertificationsByStudentId(studentId)
        );
    }

    @PutMapping("/certifications/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @RequestBody Certification certification) {

        return ResponseEntity.ok(
                certificationService.updateCertification(id, certification)
        );
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<Void> deleteCertification(
            @PathVariable Long id) {

        certificationService.deleteCertification(id);

        return ResponseEntity.noContent().build();
    }
}