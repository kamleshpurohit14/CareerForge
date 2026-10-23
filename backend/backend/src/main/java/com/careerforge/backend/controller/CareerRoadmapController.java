
package com.careerforge.backend.controller;

import com.careerforge.backend.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "http://localhost:5173")
public class CareerRoadmapController {

    private final RoadmapService roadmapService;

    public CareerRoadmapController(
            RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getRoadmap(
            @RequestParam(defaultValue = "Software Developer")
            String careerGoal) {

        Map<String, Object> roadmap =
                roadmapService.generateRoadmap(careerGoal);

        return ResponseEntity.ok(roadmap);
    }
}
