package com.careerforage.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String branch;
     
   

    public void setName(String name) {
        this.name = name;
      
    }

    public String getName() {

        return name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setBranch(String branch) {
        this.branch = branch;
    }
    public String getBranch() {
        return branch;
    }


}
