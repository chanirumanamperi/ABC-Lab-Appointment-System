package com.icbt.abc.service.impl;

import com.icbt.abc.dto.TestDTO;
import com.icbt.abc.exception.ValidateException;
import com.icbt.abc.model.*;
import com.icbt.abc.repository.TestRepository;
import com.icbt.abc.service.TestService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;
    @Override
    public List<Test> getAllTest() {
        return testRepository.findAll();
    }

    @Override
    public void createTest(TestDTO testDTO) throws MessagingException {
        if (testRepository.existsByName(testDTO.getName()) == 1){
            throw new ValidateException("Test Already Added");
        }


        Doctor doctor = new Doctor();
        doctor.setId(testDTO.getDoctorDTO().getId());

        Technician technician =  new Technician();
        technician.setId(testDTO.getTechnicianDTO().getId());


        Test test = new Test();

        test.setName(testDTO.getName());
        test.setCost(testDTO.getCost());
        test.setDoctor(doctor);
        test.setTechnician(technician);
        test.setDescription(testDTO.getDescription());
        test.setStatus("ACTIVE");


        testRepository.save(test);

    }
}
