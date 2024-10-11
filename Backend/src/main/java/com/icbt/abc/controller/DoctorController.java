package com.icbt.abc.controller;

import com.icbt.abc.model.Doctor;
import com.icbt.abc.service.DoctorService;
import com.icbt.abc.utility.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctor(@RequestParam("systemid") Long systemid) {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return new ResponseEntity(new StandardResponse("200", "Doctor retrieved successfully", doctors), HttpStatus.OK);
    }
}
