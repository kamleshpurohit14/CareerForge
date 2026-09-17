package com.careerforge.backend.controller;

import com.careerforge.backend.dto.RecommendationResponse;
import com.careerforge.backend.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {

        this.recommendationService = recommendationService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<RecommendationResponse> getRecommendation(
            @PathVariable Long studentId) {

        RecommendationResponse response =
                recommendationService.generateRecommendation(studentId);

        return ResponseEntity.ok(response);
    }
}