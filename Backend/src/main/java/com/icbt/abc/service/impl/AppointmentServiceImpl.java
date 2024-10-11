package com.icbt.abc.service.impl;

import com.icbt.abc.dto.AppointmentDTO;
import com.icbt.abc.model.Appointment;
import com.icbt.abc.model.Patient;
import com.icbt.abc.model.Payment;
import com.icbt.abc.model.Test;
import com.icbt.abc.repository.AppointmentRepository;
import com.icbt.abc.repository.PaymentRepository;
import com.icbt.abc.service.AppointmentService;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Long getAppointmentCountBySystemId(Long systemId) {
        return appointmentRepository.countByPatientDTO_SystemId(systemId);
    }

    @Override
    public Long getAppointmentOnGoingCountBySystemId(Long systemId) {
        return appointmentRepository.onGoingCountByPatientDTO_SystemId(systemId);
    }

    @Override
    public void createAppointment(AppointmentDTO appointmentDTO) throws MessagingException {

        Test test = new Test();
        test.setId(appointmentDTO.getTestDTO().getId());

        Patient patient = new Patient();
        patient.setId(appointmentDTO.getPatientDTO().getId());

        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setTest(test);
        appointment.setDateTime(appointmentDTO.getDateTime());

        appointmentRepository.save(appointment);

        Payment payment = new Payment();
        payment.setAppointment(appointment);
        payment.setStatus("SUCCESS");
        payment.setAmount(appointmentDTO.getTestDTO().getCost());
        paymentRepository.save(payment);

    }

    @Override
    public List<Appointment> getAllAppointment(Long systemid) {
        return appointmentRepository.findAllByPatient_Id(systemid);
    }

@Override
    public Appointment getAppointmentById(Long id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        return appointmentOptional.orElse(null);
    }

    @Override
    public List<Appointment> getAllAppointment() {
        return appointmentRepository.findAll();
    }

    @Override
    public Long getAppointmentCountBySDoctor(String name) {
        return appointmentRepository.countAppointmentsByDoctorName(name);
    }

    @Override
    public Long getTodayAppointmentCountBySDoctor(String name) {
        return appointmentRepository.countTodayAppointmentsByDoctorName(name);

    }

    @Override
    public List<Appointment> getAllAppointmentByDoctor(String name) {
        return appointmentRepository.findbydoctorname(name);
    }

    @Override
    public List<Appointment> getAllTodayAppointmentByDoctor(String name) {
        return appointmentRepository.findbydoctornametoday(name);
    }


    @Override
    public String uploadResouceToFileSystem(MultipartFile file,Long id) {


        String filePath = "C:\\Projects\\MY_PROJECT\\NestNet-main\\public\\" + file.getOriginalFilename();

        Appointment appointment = new Appointment();
        appointment.setId(id);
        appointment.setResult("http://localhost:3000/"+file.getOriginalFilename());


        System.out.println("aaa : "+filePath);
        System.out.println("aaa : "+file.getOriginalFilename());


        appointmentRepository.updateResultById(appointment.getId(),appointment.getResult());

        try {
            file.transferTo(new File(filePath).toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return "resource uploaded successfully : " + filePath;

    }

}
