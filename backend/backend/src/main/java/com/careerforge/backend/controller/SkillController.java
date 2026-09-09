package com.careerforge.backend.controller;

import com.careerforge.backend.entity.Skill;
import com.careerforge.backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping("/students/{studentId}/skills")
    public ResponseEntity<Skill> createSkill(
            @PathVariable Long studentId,
            @RequestBody Skill skill) {

        Skill createdSkill =
                skillService.createSkill(studentId, skill);

        if (createdSkill != null) {
            return ResponseEntity.ok(createdSkill);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/skills/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skillDetails) {

        Skill updatedSkill =
                skillService.updateSkill(id, skillDetails);

        if (updatedSkill != null) {
            return ResponseEntity.ok(updatedSkill);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}