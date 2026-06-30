package com.securityapp.employee_service.service;

import com.securityapp.employee_service.entity.LeaveRequest;

import java.util.List;

public interface LeaveRequestService {
    LeaveRequest applyLeave(LeaveRequest leaveRequest);
    List<LeaveRequest> getAllLeaves();
    List<LeaveRequest> getLeavesByEmployeeId(Long employeeId);
    LeaveRequest getLeaveById(Long id);
    LeaveRequest updateLeaveStatus(Long id, String status);
}
