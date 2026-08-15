package com.careerforge.backend.service;

import com.careerforge.backend.entity.Student;
import com.careerforge.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
    return studentRepository.findById(id).orElse(null);
}

public Student updateStudent(Long id, Student student) {
    Student existingStudent = studentRepository.findById(id).orElse(null);

    if (existingStudent != null) {
        existingStudent.setFullName(student.getFullName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setCollege(student.getCollege());
        existingStudent.setBranch(student.getBranch());
        existingStudent.setSemester(student.getSemester());

        return studentRepository.save(existingStudent);
    }

    return null;
}
public void deleteStudent(Long id) {
    studentRepository.deleteById(id);
}

}