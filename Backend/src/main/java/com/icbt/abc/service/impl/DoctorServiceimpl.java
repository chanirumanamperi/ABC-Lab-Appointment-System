package com.icbt.abc.service.impl;

import com.icbt.abc.model.Doctor;
import com.icbt.abc.repository.DoctorRepository;
import com.icbt.abc.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceimpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }


}
