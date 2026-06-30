package com.securityapp.employee_service.service.impl;

import com.securityapp.employee_service.entity.LeaveRequest;
import com.securityapp.employee_service.repository.LeaveRequestRepository;
import com.securityapp.employee_service.service.LeaveRequestService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Override
    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        if (leaveRequest.getStatus() == null) {
            leaveRequest.setStatus("PENDING");
        }
        if (leaveRequest.getAppliedOn() == null) {
            leaveRequest.setAppliedOn(LocalDateTime.now());
        }
        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    @Override
    public List<LeaveRequest> getLeavesByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    @Override
    public LeaveRequest getLeaveById(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LeaveRequest not found with id: " + id));
    }

    @Override
    public LeaveRequest updateLeaveStatus(Long id, String status) {
        LeaveRequest existingLeave = getLeaveById(id);
        existingLeave.setStatus(status);
        return leaveRequestRepository.save(existingLeave);
    }
}
