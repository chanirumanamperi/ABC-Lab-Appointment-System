package com.icbt.abc.service.impl;

import com.icbt.abc.model.Patient;
import com.icbt.abc.repository.PatientRepository;
import com.icbt.abc.service.PatientService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    private PatientRepository patientRepository;

}
