package com.securityapp.employee_service.service.impl;

import com.securityapp.employee_service.entity.Employee;
import com.securityapp.employee_service.repository.EmployeeRepository;
import com.securityapp.employee_service.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee existingEmployee = getEmployeeById(id);
        
        existingEmployee.setEmployeeId(employeeDetails.getEmployeeId());
        existingEmployee.setEmployeeName(employeeDetails.getEmployeeName());
        existingEmployee.setAddress(employeeDetails.getAddress());
        existingEmployee.setAdharCard(employeeDetails.getAdharCard());
        existingEmployee.setSalary(employeeDetails.getSalary());
        existingEmployee.setMobileNumber(employeeDetails.getMobileNumber());
        existingEmployee.setPhoto(employeeDetails.getPhoto());
        existingEmployee.setAge(employeeDetails.getAge());
        existingEmployee.setMail(employeeDetails.getMail());
        
        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee existingEmployee = getEmployeeById(id);
        employeeRepository.delete(existingEmployee);
    }
}
