package com.securityapp.employee_service.controller;

import com.securityapp.employee_service.entity.Attendance;
import com.securityapp.employee_service.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
@Tag(name = "Attendance Management", description = "APIs for tracking employee time and attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/{employeeId}/clock-in")
    @Operation(summary = "Clock in an employee for the day")
    public ResponseEntity<Attendance> clockIn(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.clockIn(employeeId));
    }

    @PostMapping("/{employeeId}/online")
    @Operation(summary = "Mark an employee as online")
    public ResponseEntity<Attendance> markOnline(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.markOnline(employeeId));
    }

    @PostMapping("/{employeeId}/offline")
    @Operation(summary = "Mark an employee as offline")
    public ResponseEntity<Attendance> markOffline(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.markOffline(employeeId));
    }

    @PostMapping("/{employeeId}/clock-out")
    @Operation(summary = "Clock out an employee for the day")
    public ResponseEntity<Attendance> clockOut(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.clockOut(employeeId));
    }

    @GetMapping("/employee/{employeeId}")
    @Operation(summary = "Get all attendance records for an employee")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping("/employee/{employeeId}/date/{date}")
    @Operation(summary = "Get attendance record for a specific employee and date")
    public ResponseEntity<Attendance> getAttendanceByEmployeeAndDate(
            @PathVariable Long employeeId,
            @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndDate(employeeId, parsedDate));
    }

    @GetMapping
    @Operation(summary = "Get all attendance records for all employees")
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        return ResponseEntity.ok(attendanceService.getAllAttendances());
    }
}
