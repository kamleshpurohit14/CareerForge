package com.careerforge.backend.service;

import com.careerforge.backend.entity.Student;
import com.careerforge.backend.entity.User;
import com.careerforge.backend.repository.StudentRepository;
import com.careerforge.backend.repository.UserRepository;
import com.careerforge.backend.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    public Student saveStudent(Student student) {
        Student savedStudent = studentRepository.save(student);

        User user = userRepository.findByEmail(student.getEmail())
                .orElseThrow(() -> new RuntimeException(
                        "User not found with email: " + student.getEmail()
                ));

        user.setStudent(savedStudent);
        userRepository.save(user);

        return savedStudent;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + id
                ));
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with email: " + email
                ));
    }
public Student updateStudent(Long id, Student student) {
    Student existingStudent = studentRepository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(
                    "Student not found with id: " + id
            ));

    existingStudent.setFullName(student.getFullName());
    existingStudent.setEmail(student.getEmail());
    existingStudent.setPhone(student.getPhone());
    existingStudent.setCollege(student.getCollege());
    existingStudent.setBranch(student.getBranch());
    existingStudent.setSemester(student.getSemester());
    existingStudent.setCgpa(student.getCgpa());
    existingStudent.setCareerGoal(student.getCareerGoal());

    Student updatedStudent = studentRepository.save(existingStudent);

    User user = userRepository.findByEmail(updatedStudent.getEmail())
            .orElseThrow(() -> new RuntimeException(
                    "User not found with email: " + updatedStudent.getEmail()
            ));

    user.setStudent(updatedStudent);
    userRepository.save(user);

    return updatedStudent;
}
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(
                    "Student not found with id: " + id
            );
        }

        studentRepository.deleteById(id);
    }
}