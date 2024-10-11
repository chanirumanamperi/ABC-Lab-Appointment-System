package com.icbt.abc.controller;

import com.icbt.abc.dto.LoginDTO;
import com.icbt.abc.service.LoginService;
import com.icbt.abc.utility.Util2.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(value = "/login")
    public StandardResponse login(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
        System.out.println("Username : " + loginDTO.getUsername());
        System.out.println("Password : " + loginDTO.getPassword());
        return loginService.authenticateUser(loginDTO);
    }

}
