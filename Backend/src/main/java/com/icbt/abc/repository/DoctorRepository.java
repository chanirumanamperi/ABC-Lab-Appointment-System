package com.icbt.abc.repository;

import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
