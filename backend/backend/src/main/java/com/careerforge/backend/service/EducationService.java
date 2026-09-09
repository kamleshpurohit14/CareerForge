package com.careerforge.backend.service;

import com.careerforge.backend.entity.Education;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.repository.EducationRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Education createEducation(Long studentId, Education education) {

        Optional<Student> studentOptional = studentRepository.findById(studentId);

        if (studentOptional.isPresent()) {
            education.setStudent(studentOptional.get());
            return educationRepository.save(education);
        }

        return null;
    }

    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    public Optional<Education> getEducationById(Long id) {
        return educationRepository.findById(id);
    }

    public Education updateEducation(Long id, Education educationDetails) {

        Optional<Education> optionalEducation =
                educationRepository.findById(id);

        if (optionalEducation.isPresent()) {

            Education education = optionalEducation.get();

            education.setDegree(educationDetails.getDegree());
            education.setInstitution(educationDetails.getInstitution());
            education.setSpecialization(educationDetails.getSpecialization());
            education.setPassingYear(educationDetails.getPassingYear());

            return educationRepository.save(education);
        }

        return null;
    }

    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}