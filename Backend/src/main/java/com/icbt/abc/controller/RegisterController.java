package com.icbt.abc.controller;

import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.User;
import com.icbt.abc.model.UserRole;
import com.icbt.abc.service.RegisterService;
import com.icbt.abc.service.UserService;
import com.icbt.abc.utility.util.StandardResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/register")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @PostMapping(value = "/patient")
    public ResponseEntity<User> createPatient(@Valid @RequestBody UserDTO userDTO) throws MessagingException {
        registerService.createPatient(userDTO);
        return new ResponseEntity(new StandardResponse("200", "Patient Register successfully", userDTO), HttpStatus.CREATED);
    }

    @PostMapping(value = "/doctor")
    public ResponseEntity<User> createDoctor(@Valid @RequestBody UserDTO userDTO) throws MessagingException {
        System.out.println("doctor");
        registerService.createDoctor(userDTO);
        return new ResponseEntity(new StandardResponse("200", "Doctor Register successfully", userDTO), HttpStatus.CREATED);
    }

    @PostMapping(value = "/technician")
    public ResponseEntity<User> createTechnician(@Valid @RequestBody UserDTO userDTO) throws MessagingException {
        registerService.createTechnician(userDTO);
        return new ResponseEntity(new StandardResponse("200", "Technician Register successfully", userDTO), HttpStatus.CREATED);
    }

    @GetMapping(value = "/activate/{activationCode}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> activate(@PathVariable String activationCode) {
        registerService.activate(activationCode);
        String successMessage = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; text-align: center; }" +
                "h1 { color: #4CAF50; }" +
                "p { font-size: 18px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<h1>Activation Successful!</h1>" +
                "<p>Your account has been activated. You can now login and start using our services.</p>" +
                "</body>" +
                "</html>";

        return new ResponseEntity<>(successMessage, HttpStatus.OK);
    }
    @GetMapping(value = "/profile")
    public ResponseEntity<List<User>> getUser(@RequestParam("email") String email) {
        List<User> users = registerService.getUser(email);
        return new ResponseEntity(new StandardResponse("200", "Profile retrieved successfully", users), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount(@RequestParam("userrole") String userroleString) {
        UserRole userRole = UserRole.valueOf(userroleString.toUpperCase()); // Convert String to UserRole enum
        System.out.println(userRole);
        Number count = registerService.getCount(userRole);
        System.out.println(count);
        return new ResponseEntity(new StandardResponse("200", "" + userroleString + " Count", count), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Long> getUserByRole(@RequestParam("userrole") String userroleString) {
        UserRole userRole = UserRole.valueOf(userroleString.toUpperCase()); // Convert String to UserRole enum
        System.out.println(userRole);
        List<User> users = registerService.getUserByUserRole(userRole);
        return new ResponseEntity(new StandardResponse("200", "" + userroleString + " Data", users), HttpStatus.OK);
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updatePatientStatus(@Valid @RequestBody UserDTO userDTO) {
        // Assuming your service method returns a boolean indicating success
        boolean updated = registerService.updatePatientStatus(userDTO);

        if (updated) {
            return new ResponseEntity(new StandardResponse("200", "Patient status updated successfully", updated), HttpStatus.CREATED);

        } else {
            return new ResponseEntity(new StandardResponse("500", "Failed to update patient status", updated), HttpStatus.CREATED);

        }
    }


}
