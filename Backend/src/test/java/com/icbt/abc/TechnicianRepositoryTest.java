package com.icbt.abc;

import com.icbt.abc.model.Technician;
import com.icbt.abc.repository.TechnicianRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TechnicianRepositoryTest {

    @Autowired
    TechnicianRepository technicianRepository;


    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveTechnicianTest(){

        Technician technician = Technician.builder()
                .name("Sonic")
                .contact("119")
                        .build();


        technicianRepository.save(technician);

        Assertions.assertThat(technician.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getTechnicianTest(){
        Optional<Technician> optionalTechnician = technicianRepository.findById(1L);
        Assertions.assertThat(optionalTechnician).isPresent();
    }


    @Test
    @Order(3)
    public void getListOfTechniciansTest(){
        List<Technician> technicians = technicianRepository.findAll();
        Assertions.assertThat(technicians.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateTechnicianTest(){
        Optional<Technician> optionalTechnician = technicianRepository.findById(1L);
        if(optionalTechnician.isPresent()){
            Technician technician = optionalTechnician.get();
            technician.setName("Updated Test Technician");
            technicianRepository.save(technician);
            Optional<Technician> updatedOptionalTechnician = technicianRepository.findById(1L);
            Assertions.assertThat(updatedOptionalTechnician.get().getName()).isEqualTo("Updated Test Technician");
        }
    }
}

