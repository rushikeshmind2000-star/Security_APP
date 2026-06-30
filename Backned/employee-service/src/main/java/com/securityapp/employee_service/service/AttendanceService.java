package com.securityapp.employee_service.service;

import com.securityapp.employee_service.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    Attendance clockIn(Long employeeId);
    Attendance markOnline(Long employeeId);
    Attendance markOffline(Long employeeId);
    Attendance clockOut(Long employeeId);
    
    List<Attendance> getAttendanceByEmployee(Long employeeId);
    Attendance getAttendanceByEmployeeAndDate(Long employeeId, LocalDate date);
    List<Attendance> getAllAttendances();
}
