package com.icbt.abc.controller;

import com.icbt.abc.dto.AppointmentDTO;
import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Appointment;
import com.icbt.abc.model.Test;
import com.icbt.abc.model.User;
import com.icbt.abc.service.AppointmentService;
import com.icbt.abc.service.LoginService;
import com.icbt.abc.utility.util.StandardResponse;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/count")
    public ResponseEntity<Long> getAppintmentCount(@RequestParam("systemid") Long systemid) {
        Number count = appointmentService.getAppointmentCountBySystemId(systemid);
        System.out.println(count);
        return new ResponseEntity(new StandardResponse("200", "Appointment Count", count), HttpStatus.OK);
    }

    @GetMapping("/ongoingcount")
    public ResponseEntity<Long> getAppintmentOnGoingCount(@RequestParam("systemid") Long systemid) {
        Number count = appointmentService.getAppointmentOnGoingCountBySystemId(systemid);
        System.out.println(count);
        return new ResponseEntity(new StandardResponse("200", "On Going Appointment Count", count), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) throws MessagingException {
        appointmentService.createAppointment(appointmentDTO);
        return new ResponseEntity(new StandardResponse("200", "Appointment Register successfully", appointmentDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointment(@RequestParam("systemid") Long systemid) {
        List<Appointment> appointment = appointmentService.getAllAppointment(systemid);
        return new ResponseEntity(new StandardResponse("200", "Appointment retrieved successfully", appointment), HttpStatus.OK);
    }


    @GetMapping(value = "/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointment = appointmentService.getAllAppointment();
        return new ResponseEntity(new StandardResponse("200", "Appointment retrieved successfully", appointment), HttpStatus.OK);
    }

    @GetMapping("/countdoc")
    public ResponseEntity<Long> getAppintmentCountByDoctor(@RequestParam("username") String username) {
        Number count = appointmentService.getAppointmentCountBySDoctor(username);
        System.out.println(count);
        return new ResponseEntity(new StandardResponse("200", "Appointment Count", count), HttpStatus.OK);
    }

    @GetMapping("/countdoctoday")
    public ResponseEntity<Long> getTodayAppintmentCountByDoctor(@RequestParam("username") String username) {
        Number count = appointmentService.getTodayAppointmentCountBySDoctor(username);
        System.out.println(count);
        return new ResponseEntity(new StandardResponse("200", "Appointment Count", count), HttpStatus.OK);
    }

    @GetMapping("/allappointment")
    public ResponseEntity<List<Appointment>> getAllAppointmentByDoctor(@RequestParam("username") String username) {
        List<Appointment> appointment = appointmentService.getAllAppointmentByDoctor(username);
        return new ResponseEntity(new StandardResponse("200", "Appointment retrieved successfully", appointment), HttpStatus.OK);
    }

    @GetMapping("/allappointmenttoday")
    public ResponseEntity<List<Appointment>> getAllAppointmentByDoctorToday(@RequestParam("username") String username) {
        List<Appointment> appointment = appointmentService.getAllTodayAppointmentByDoctor(username);
        return new ResponseEntity(new StandardResponse("200", "Appointment retrieved successfully", appointment), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResourceToFIleSystem(@RequestParam("resource") MultipartFile file,@RequestParam("appointmentId") Long appointmentId) throws IOException {
        System.out.println("appointmentId :"+appointmentId);
        String uploadImage = appointmentService.uploadResouceToFileSystem(file,appointmentId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

}
