package com.securityapp.employee_service.controller;

import com.securityapp.employee_service.entity.LeaveRequest;
import com.securityapp.employee_service.service.LeaveRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
@Tag(name = "Leave Management", description = "APIs for managing employee leave requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // Apply for a new leave
    @PostMapping
    @Operation(summary = "Apply for a new leave")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return new ResponseEntity<>(leaveRequestService.applyLeave(leaveRequest), HttpStatus.CREATED);
    }

    // Get all leaves (for Admin)
    @GetMapping
    @Operation(summary = "Get all leave requests")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(leaveRequestService.getAllLeaves());
    }

    // Get leaves by employee
    @GetMapping("/employee/{employeeId}")
    @Operation(summary = "Get leave requests by employee ID")
    public ResponseEntity<List<LeaveRequest>> getLeavesByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getLeavesByEmployeeId(employeeId));
    }

    // Get a specific leave by ID
    @GetMapping("/{id}")
    @Operation(summary = "Get a specific leave request by ID")
    public ResponseEntity<LeaveRequest> getLeaveById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveRequestService.getLeaveById(id));
    }

    // Update leave status (Approve/Reject)
    @PutMapping("/{id}/status")
    @Operation(summary = "Update leave status (e.g., APPROVED, REJECTED)")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(leaveRequestService.updateLeaveStatus(id, status));
    }
}
