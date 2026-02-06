package com.example.employee.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "parent_phone")
    private String parentPhone;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "address", length = 1000)
    private String address;

    @Column(name = "district")
    private String district;

    @Column(name = "country")
    private String country;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "department")
    private String department;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @ElementCollection
    @CollectionTable(name = "employee_skills", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "skill")
    private List<String> skills;

    @Column(name = "bio", length = 1000)
    private String bio;

    // Education
    @Column(name = "school")
    private String school;

    @Column(name = "college")
    private String college;

    @Column(name = "degree")
    private String degree;

    @Column(name = "major")
    private String major;

    @Column(name = "graduation_year")
    private String graduationYear;

    // Links
    @Column(name = "linkedin")
    private String linkedIn;

    @Column(name = "leetcode")
    private String leetCode;

    @Column(name = "hackerrank")
    private String hackerRank;

    @Column(name = "resume_name")
    private String resumeName;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}
