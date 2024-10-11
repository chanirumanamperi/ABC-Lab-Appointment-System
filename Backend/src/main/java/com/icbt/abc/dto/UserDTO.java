package com.icbt.abc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private Long id;
    private String username;
    private String fullname;
    private String email;
    private String addressLine1;
    private String city;
    private String phoneNumber;
    private String password;
    private UserroleDTO userroleDTO;
    private String status;
    private Date lastupdatedtime;
    private Date createdtime;
    private boolean flag;
    private String activationCode;
    private String specialty;
    private Long systemid;
}
