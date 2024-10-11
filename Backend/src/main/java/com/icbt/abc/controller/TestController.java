package com.icbt.abc.controller;

import com.icbt.abc.dto.TestDTO;
import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.Test;
import com.icbt.abc.model.User;
import com.icbt.abc.service.TestService;
import com.icbt.abc.utility.util.StandardResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    public ResponseEntity<List<Test>> getAllTest(@RequestParam("systemid") Long systemid) {
        List<Test> tests = testService.getAllTest();
        return new ResponseEntity(new StandardResponse("200", "Test retrieved successfully", tests), HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<User> createTest(@Valid @RequestBody TestDTO testDTO) throws MessagingException {
        testService.createTest(testDTO);
        return new ResponseEntity(new StandardResponse("200", "Test Added successfully", testDTO), HttpStatus.CREATED);
    }
}
