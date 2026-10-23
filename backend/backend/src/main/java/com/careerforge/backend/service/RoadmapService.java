
package com.careerforge.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoadmapService {

    public Map<String, Object> generateRoadmap(String careerGoal) {

        if (careerGoal == null || careerGoal.isBlank()) {
            careerGoal = "Software Developer";
        }

        List<Map<String, Object>> stages = List.of(

            Map.<String, Object>of(
                "stage", 1,
                "title", "Programming Fundamentals",
                "duration", "2-3 weeks",
                "skills", List.of(
                    "Java Basics",
                    "OOP Concepts",
                    "Exception Handling",
                    "Collections Framework"
                ),
                "tasks", List.of(
                    "Revise Java fundamentals",
                    "Practice OOP programs",
                    "Build two console applications"
                ),
                "status", "NOT_STARTED"
            ),

            Map.<String, Object>of(
                "stage", 2,
                "title", "Data Structures and Algorithms",
                "duration", "4-6 weeks",
                "skills", List.of(
                    "Arrays and Strings",
                    "Linked Lists",
                    "Stacks and Queues",
                    "HashMap and HashSet",
                    "Sorting and Searching"
                ),
                "tasks", List.of(
                    "Solve coding problems daily",
                    "Practice common DSA patterns",
                    "Revise previously solved problems"
                ),
                "status", "NOT_STARTED"
            ),

            Map.<String, Object>of(
                "stage", 3,
                "title", "SQL and Database",
                "duration", "2 weeks",
                "skills", List.of(
                    "SQL Queries",
                    "Joins",
                    "Subqueries",
                    "Database Design",
                    "Normalization"
                ),
                "tasks", List.of(
                    "Practice SQL interview questions",
                    "Write queries using joins",
                    "Design a small relational database"
                ),
                "status", "NOT_STARTED"
            ),

            Map.<String, Object>of(
                "stage", 4,
                "title", "Spring Boot Backend Development",
                "duration", "3-4 weeks",
                "skills", List.of(
                    "Spring Core",
                    "Dependency Injection",
                    "Spring Boot",
                    "REST APIs",
                    "Spring Data JPA",
                    "Hibernate"
                ),
                "tasks", List.of(
                    "Build REST APIs",
                    "Connect an application to MySQL",
                    "Implement CRUD operations",
                    "Practice API testing"
                ),
                "status", "NOT_STARTED"
            ),

            Map.<String, Object>of(
                "stage", 5,
                "title", "Projects and Job Preparation",
                "duration", "2-3 weeks",
                "skills", List.of(
                    "Git and GitHub",
                    "Project Documentation",
                    "Debugging",
                    "Interview Preparation"
                ),
                "tasks", List.of(
                    "Improve your CareerForge project",
                    "Update your resume and GitHub",
                    "Revise Java and SQL interview questions",
                    "Practice mock interviews"
                ),
                "status", "NOT_STARTED"
            )
        );

        return Map.of(
            "careerGoal", careerGoal,
            "title", "Career Roadmap",
            "description",
                "A step-by-step learning path to prepare for "
                + careerGoal + ".",
            "totalStages", stages.size(),
            "completedStages", 0,
            "progressPercentage", 0,
            "stages", stages
        );
    }
}
