package com.careerforge.backend.controller;

import com.careerforge.backend.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<String> generateCareerInsight(
            @PathVariable Long studentId) {

        String response =
                aiService.generateCareerInsight(studentId);

        return ResponseEntity.ok(response);
    }
}