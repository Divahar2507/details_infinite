package com.example.employee.controller;

import com.example.employee.exception.ResourceNotFoundException;
import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employee.setFullName(employeeDetails.getFullName());
        employee.setCompanyName(employeeDetails.getCompanyName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhone(employeeDetails.getPhone());
        employee.setParentPhone(employeeDetails.getParentPhone());
        employee.setDob(employeeDetails.getDob());
        employee.setAddress(employeeDetails.getAddress());
        employee.setDistrict(employeeDetails.getDistrict());
        employee.setCountry(employeeDetails.getCountry());
        employee.setPincode(employeeDetails.getPincode());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setJobTitle(employeeDetails.getJobTitle());
        employee.setJoiningDate(employeeDetails.getJoiningDate());
        employee.setSkills(employeeDetails.getSkills());
        employee.setBio(employeeDetails.getBio());
        employee.setSchool(employeeDetails.getSchool());
        employee.setCollege(employeeDetails.getCollege());
        employee.setDegree(employeeDetails.getDegree());
        employee.setMajor(employeeDetails.getMajor());
        employee.setGraduationYear(employeeDetails.getGraduationYear());
        employee.setLinkedIn(employeeDetails.getLinkedIn());
        employee.setLeetCode(employeeDetails.getLeetCode());
        employee.setHackerRank(employeeDetails.getHackerRank());
        employee.setResumeName(employeeDetails.getResumeName());

        // submittedAt usually shouldn't change on update, but optional

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable String id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/export")
    public void exportToCSV(jakarta.servlet.http.HttpServletResponse response) throws java.io.IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=employees_registry.csv");

        List<Employee> employees = employeeRepository.findAll();

        java.io.PrintWriter writer = response.getWriter();
        writer.println("FullName,Email,Phone,Department,JobTitle,College,Degree,GraduationYear,LinkedIn,SubmittedAt");

        for (Employee emp : employees) {
            writer.println(String.format("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s",
                    emp.getFullName(),
                    emp.getEmail(),
                    emp.getPhone(),
                    emp.getDepartment(),
                    emp.getJobTitle(),
                    emp.getCollege(),
                    emp.getDegree(),
                    emp.getGraduationYear(),
                    emp.getLinkedIn(),
                    emp.getSubmittedAt()));
        }
        writer.close();
    }
}
