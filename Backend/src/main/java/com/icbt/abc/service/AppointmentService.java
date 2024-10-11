package com.icbt.abc.service;

import com.icbt.abc.dto.AppointmentDTO;
import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.model.Appointment;
import com.icbt.abc.model.Test;
import com.icbt.abc.service.impl.AppointmentServiceImpl;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AppointmentService {
    Long getAppointmentCountBySystemId(Long systemId);

    Long getAppointmentOnGoingCountBySystemId(Long systemId);

    void createAppointment(AppointmentDTO appointmentDTO) throws MessagingException;

    List<Appointment> getAllAppointment(Long systemid);

     Appointment getAppointmentById(Long id);

    List<Appointment> getAllAppointment();

    Long getAppointmentCountBySDoctor(String name);

    Long getTodayAppointmentCountBySDoctor(String name);

    List<Appointment> getAllAppointmentByDoctor(String name);
    List<Appointment> getAllTodayAppointmentByDoctor(String name);

    String uploadResouceToFileSystem(MultipartFile file,Long id);
}
