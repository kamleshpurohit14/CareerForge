
package com.careerforge.backend.controller;

import com.careerforge.backend.dto.ResumeRequest;
import com.careerforge.backend.dto.ResumeResponse;
import com.careerforge.backend.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // Save a new resume
    @PostMapping
    public ResponseEntity<ResumeResponse> saveResume(
            @RequestBody ResumeRequest request,
            Authentication authentication) {

        ResumeResponse response = resumeService.saveResume(
                authentication.getName(),
                request
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all resumes belonging to the logged-in user
    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getMyResumes(
            Authentication authentication) {

        List<ResumeResponse> resumes =
                resumeService.getStudentResumes(
                        authentication.getName()
                );

        return ResponseEntity.ok(resumes);
    }

    // Get one resume belonging to the logged-in user
    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeResponse> getMyResume(
            @PathVariable Long resumeId,
            Authentication authentication) {

        ResumeResponse response = resumeService.getResume(
                resumeId,
                authentication.getName()
        );

        return ResponseEntity.ok(response);
    }

    // Delete a resume belonging to the logged-in user
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long resumeId,
            Authentication authentication) {

        resumeService.deleteResume(
                resumeId,
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}
