package com.icbt.abc.controller;

import com.icbt.abc.service.PatientService;
import com.icbt.abc.service.RegisterService;
import com.icbt.abc.utility.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;



}
