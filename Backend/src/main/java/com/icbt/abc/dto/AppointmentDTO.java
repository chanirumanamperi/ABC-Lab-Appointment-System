package com.icbt.abc.dto;

import com.icbt.abc.model.Patient;
import com.icbt.abc.model.Test;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Long id;
    private PatientDTO patientDTO;
    private TestDTO testDTO;
    private Date dateTime;
    private String result;
}
