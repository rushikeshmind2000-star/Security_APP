package com.securityapp.employee_service.service.impl;

import com.securityapp.employee_service.entity.Attendance;
import com.securityapp.employee_service.repository.AttendanceRepository;
import com.securityapp.employee_service.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    private Attendance getOrCreateAttendanceToday(Long employeeId) {
        LocalDate today = LocalDate.now();
        Optional<Attendance> existing = attendanceRepository.findByEmployeeIdAndDate(employeeId, today);
        if (existing.isPresent()) {
            return existing.get();
        }
        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setDate(today);
        return attendance;
    }

    @Override
    public Attendance clockIn(Long employeeId) {
        Attendance attendance = getOrCreateAttendanceToday(employeeId);
        attendance.setClockInTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance markOnline(Long employeeId) {
        Attendance attendance = getOrCreateAttendanceToday(employeeId);
        attendance.setOnlineTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance markOffline(Long employeeId) {
        Attendance attendance = getOrCreateAttendanceToday(employeeId);
        attendance.setOfflineTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance clockOut(Long employeeId) {
        Attendance attendance = getOrCreateAttendanceToday(employeeId);
        attendance.setClockOutTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    @Override
    public Attendance getAttendanceByEmployeeAndDate(Long employeeId, LocalDate date) {
        return attendanceRepository.findByEmployeeIdAndDate(employeeId, date)
                .orElseThrow(() -> new RuntimeException("Attendance not found for employee on date " + date));
    }

    @Override
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }
}
