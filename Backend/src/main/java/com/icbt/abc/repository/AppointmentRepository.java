package com.icbt.abc.repository;

import com.icbt.abc.model.Appointment;
import com.icbt.abc.model.Doctor;
import com.icbt.abc.model.User;
import com.icbt.abc.model.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query(value = "SELECT COUNT(a.id) FROM Appointment a WHERE a.patient.id = :systemId")
    Long countByPatientDTO_SystemId(@Param("systemId") Long systemId);

    @Query(value = "SELECT COUNT(a.id) FROM Appointment a WHERE a.patient.id = :systemId AND a.dateTime > CURRENT_DATE")
    Long onGoingCountByPatientDTO_SystemId(@Param("systemId") Long systemId);

    List<Appointment> findAllByPatient_Id(Long patientId);

    @Query(value = "SELECT COUNT(a.id) FROM Appointment a LEFT JOIN a.test AS t LEFT JOIN t.doctor AS d WHERE d.name = :doctorName")
    Long countAppointmentsByDoctorName(@Param("doctorName") String doctorName);

    @Query(value = "SELECT COUNT(a.id) FROM Appointment a LEFT JOIN a.test AS t LEFT JOIN t.doctor AS d WHERE d.name = :doctorName AND DATE(a.dateTime) = CURDATE()")
    Long countTodayAppointmentsByDoctorName(@Param("doctorName") String doctorName);

    @Query(value = "SELECT a FROM Appointment a LEFT JOIN a.test AS t LEFT JOIN t.doctor AS d WHERE d.name = :doctorName")
    List<Appointment> findbydoctorname(@Param("doctorName") String doctorName);

    @Query(value = "SELECT a FROM Appointment a LEFT JOIN a.test AS t LEFT JOIN t.doctor AS d WHERE d.name = :doctorName AND DATE(a.dateTime) = CURDATE()")
    List<Appointment> findbydoctornametoday(@Param("doctorName") String doctorName);

    @Modifying
    @Transactional
    @Query("UPDATE Appointment a SET a.result = :result WHERE a.id = :id")
    void updateResultById(@Param("id") Long id, @Param("result") String result);

}