package com.careerforge.backend.controller;

import com.careerforge.backend.entity.Project;
import com.careerforge.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/students/{studentId}/projects")
    public ResponseEntity<Project> createProject(
            @PathVariable Long studentId,
            @RequestBody Project project) {

        Project createdProject =
                projectService.createProject(studentId, project);

        if (createdProject != null) {
            return ResponseEntity.ok(createdProject);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {

        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/students/{studentId}/projects")
    public ResponseEntity<List<Project>> getProjectsByStudentId(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                projectService.getProjectsByStudentId(studentId)
        );
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody Project projectDetails) {

        Project updatedProject =
                projectService.updateProject(id, projectDetails);

        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }
}