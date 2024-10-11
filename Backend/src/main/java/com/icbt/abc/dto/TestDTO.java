package com.icbt.abc.dto;

import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.Technician;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestDTO {

    private Long id;
    private String name;
    private String description;
    private double cost;
    private TechnicianDTO technicianDTO;
    private DoctorDTO doctorDTO;
    private String status;
}
