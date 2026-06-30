package com.securityapp.employee_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId; // Reference to Employee

    private LocalDate startDate;
    private LocalDate endDate;
    
    private String reason;
    
    // Status can be: PENDING, APPROVED, REJECTED
    private String status = "PENDING";
    
    private LocalDateTime appliedOn = LocalDateTime.now();
}
