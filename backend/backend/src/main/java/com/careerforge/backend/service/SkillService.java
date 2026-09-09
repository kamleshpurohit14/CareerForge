package com.careerforge.backend.service;

import com.careerforge.backend.entity.Skill;
import com.careerforge.backend.entity.Student;
import com.careerforge.backend.repository.SkillRepository;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Skill createSkill(Long studentId, Skill skill) {

        Optional<Student> studentOptional =
                studentRepository.findById(studentId);

        if (studentOptional.isPresent()) {
            skill.setStudent(studentOptional.get());
            return skillRepository.save(skill);
        }

        return null;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public Skill updateSkill(Long id, Skill skillDetails) {

        Optional<Skill> optionalSkill =
                skillRepository.findById(id);

        if (optionalSkill.isPresent()) {

            Skill skill = optionalSkill.get();

            skill.setName(skillDetails.getName());
            skill.setLevel(skillDetails.getLevel());

            return skillRepository.save(skill);
        }

        return null;
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}