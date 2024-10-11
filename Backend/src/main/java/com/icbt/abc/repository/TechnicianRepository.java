package com.icbt.abc.repository;

import com.icbt.abc.model.Patient;
import com.icbt.abc.model.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicianRepository extends JpaRepository<Technician, Long> {


}
