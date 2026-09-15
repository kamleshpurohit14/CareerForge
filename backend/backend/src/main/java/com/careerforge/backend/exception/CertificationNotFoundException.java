package com.careerforge.backend.exception;

public class CertificationNotFoundException extends RuntimeException {

    public CertificationNotFoundException(String message) {
        super(message);
    }
}