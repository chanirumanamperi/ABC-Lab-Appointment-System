package com.icbt.abc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
public class Patient {

    @Id
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String address;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<Appointment> appointments;

}

