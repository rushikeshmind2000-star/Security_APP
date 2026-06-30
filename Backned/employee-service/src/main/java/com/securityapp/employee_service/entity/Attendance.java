package com.securityapp.employee_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    
    private LocalDate date;
    
    private LocalDateTime clockInTime;
    private LocalDateTime onlineTime;
    private LocalDateTime offlineTime;
    private LocalDateTime clockOutTime;
}
