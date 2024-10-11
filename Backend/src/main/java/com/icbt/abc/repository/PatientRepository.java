package com.icbt.abc.repository;

import com.icbt.abc.model.Patient;
import com.icbt.abc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
