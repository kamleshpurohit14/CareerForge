package com.careerforge.backend.service;

import com.careerforge.backend.entity.Student;
import com.careerforge.backend.exception.StudentNotFoundException;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ProfilePhotoService {

    private final StudentRepository studentRepository;

    private final Path uploadDirectory = Paths.get("uploads/profile-photos");

    public ProfilePhotoService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student uploadProfilePhoto(Long studentId, MultipartFile file) throws IOException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + studentId
                ));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a profile photo");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        Files.createDirectories(uploadDirectory);

        String originalFilename = file.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(
                    originalFilename.lastIndexOf(".")
            );
        }

        String filename = UUID.randomUUID() + extension;
        Path targetPath = uploadDirectory.resolve(filename);

        Files.copy(
                file.getInputStream(),
                targetPath,
                StandardCopyOption.REPLACE_EXISTING
        );

        student.setProfilePhotoUrl("/uploads/profile-photos/" + filename);

        return studentRepository.save(student);
    }
}