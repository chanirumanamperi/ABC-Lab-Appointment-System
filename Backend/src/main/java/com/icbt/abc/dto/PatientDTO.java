package com.icbt.abc.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
}
