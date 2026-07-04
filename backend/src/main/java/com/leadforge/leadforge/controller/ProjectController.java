package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.entity.Project;
import com.leadforge.leadforge.repository.ProjectRepository;
import com.leadforge.leadforge.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<Project> createProject(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody Project project) {
        project.setUserId(userDetails.getId());
        Project saved = projectRepository.save(project);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Project> list = projectRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id) {
        return projectRepository.findById(id)
                .map(p -> {
                    if (!p.getUserId().equals(userDetails.getId())) {
                        return ResponseEntity.status(403).body("Access Denied");
                    }
                    return ResponseEntity.ok(p);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id) {
        return projectRepository.findById(id)
                .map(p -> {
                    if (!p.getUserId().equals(userDetails.getId())) {
                        return ResponseEntity.status(403).body("Access Denied");
                    }
                    projectRepository.delete(p);
                    return ResponseEntity.ok("Project deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
