package com.icbt.abc.service;

import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.User;
import com.icbt.abc.model.UserRole;
import jakarta.mail.MessagingException;

import java.util.List;
import java.util.Optional;

public interface RegisterService {

    void createPatient(UserDTO userDTO) throws MessagingException;
    void createDoctor(UserDTO userDTO) throws MessagingException;
    void createTechnician(UserDTO userDTO) throws MessagingException;
    void sendActivationEmail(UserDTO userDT,String code) throws MessagingException;
    void activate(String activationCode);
    List<User> getUser(String email);

    Long getCount(UserRole Userrole);

    List<User> getUserByUserRole(UserRole userRole);

    boolean updatePatientStatus(UserDTO userDTO);



}
