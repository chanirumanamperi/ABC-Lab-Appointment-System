package com.icbt.abc.service;

import com.icbt.abc.dto.TestDTO;
import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.Test;
import jakarta.mail.MessagingException;

import java.util.List;

public interface TestService {

    List<Test> getAllTest();

    void createTest(TestDTO testDTO) throws MessagingException;


}
