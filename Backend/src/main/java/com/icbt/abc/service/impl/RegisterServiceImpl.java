package com.icbt.abc.service.impl;

import com.icbt.abc.dto.UserDTO;
import com.icbt.abc.exception.ValidateException;
import com.icbt.abc.model.*;
import com.icbt.abc.repository.DoctorRepository;
import com.icbt.abc.repository.PatientRepository;
import com.icbt.abc.repository.TechnicianRepository;
import com.icbt.abc.repository.UserRepository;
import com.icbt.abc.service.RegisterService;
import com.icbt.abc.service.UserService;
import com.icbt.abc.utility.util.IdGenerator;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;


    public void sendActivationEmail(UserDTO userDTO,String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(userDTO.getEmail());
        helper.setSubject("Welcome to ABC Laboratories - Activate Your Account Now!");

        String htmlContent = "<html><body>" +
                "<p>Dear " + userDTO.getUsername()  + ",</p>" +
                "<p>Thank you for registering with ABC Laboratories! We're thrilled to have you on board.</p>" +
                "<p>To activate your account and access our services, please click the button below:</p>" +
                "<a href='http://localhost:8080/ABC/api/v1/register/activate/" + code + "' style='padding: 10px 20px; background-color: #0066cc; color: #fff; text-decoration: none; border-radius: 5px;'>Activate My Account</a>" +
                "<p>If the button above doesn't work, you can manually activate your account by copying and pasting the following link into your browser:</p>" +
                "<p>http://localhost:8080/ABC/api/v1/register/activate/" + code + "</p>" +
                "<p>If you have any questions or need assistance, please feel free to contact us at <a href='mailto:support@abclabs.com'>support@abclabs.com</a>.</p>" +
                "<p>Thank you for choosing ABC Laboratories!</p>" +
                "<p>Best regards,</p>" +
                "<p>The ABC Laboratories Team</p>" +
                "</body></html>";
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }


    @Override
    public void createPatient(UserDTO userDTO) throws MessagingException {
        if (userRepository.existsByUserName(userDTO.getUsername()) == 1){
            throw new ValidateException("User Name Already Taken");
        }

        if (userRepository.existsByEmail(userDTO.getEmail()) == 1){
            throw new ValidateException("User Already Registered");
        }

        String activationCode = UUID.randomUUID().toString();

        Long id = IdGenerator.generateRandomId();

        User user = new User();

        user.setUsername(userDTO.getUsername());
        user.setFullname(userDTO.getFullname());
        user.setEmail(userDTO.getEmail());
        user.setAddressLine1(userDTO.getAddressLine1());
        user.setCity(userDTO.getCity());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setStatus("ACTIVE");
        user.setUserRole(UserRole.PATIENT);
        user.setActivationCode(activationCode);
        user.setSystemid(id);
        user.setFlag(false);

        Patient patient = new Patient();
        patient.setId(id);
        patient.setAddress(userDTO.getAddressLine1());
        patient.setName(userDTO.getFullname());
        patient.setPhone(userDTO.getPhoneNumber());
        patient.setEmail(userDTO.getEmail());

        userRepository.save(user);

        patientRepository.save(patient);

        sendActivationEmail(userDTO,activationCode);


    }

    @Override
    public void createDoctor(UserDTO userDTO) throws MessagingException {

        if (userRepository.existsByUserName(userDTO.getUsername()) == 1){
            throw new ValidateException("User Name Already Taken");
        }

        if (userRepository.existsByEmail(userDTO.getEmail()) == 1){
            throw new ValidateException("User Already Registered");
        }

        String activationCode = UUID.randomUUID().toString();

        User user = new User();

        user.setUsername(userDTO.getUsername());
        user.setFullname(userDTO.getFullname());
        user.setEmail(userDTO.getEmail());
        user.setAddressLine1(userDTO.getAddressLine1());
        user.setCity(userDTO.getCity());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setStatus("ACTIVE");
        user.setUserRole(UserRole.DOCTOR);
        user.setActivationCode(activationCode);
        user.setFlag(true);

        Doctor doctor = new Doctor();

        doctor.setName(userDTO.getUsername());
        doctor.setSpecialty(userDTO.getSpecialty());
        doctor.setStatus("ACTIVE");

        userRepository.save(user);

        doctorRepository.save(doctor);

    }

    @Override
    public void createTechnician(UserDTO userDTO) throws MessagingException {

        if (userRepository.existsByUserName(userDTO.getUsername()) == 1){
            throw new ValidateException("User Name Already Taken");
        }

        if (userRepository.existsByEmail(userDTO.getEmail()) == 1){
            throw new ValidateException("User Already Registered");
        }

        String activationCode = UUID.randomUUID().toString();

        User user = new User();

        user.setUsername(userDTO.getUsername());
        user.setFullname(userDTO.getFullname());
        user.setEmail(userDTO.getEmail());
        user.setAddressLine1(userDTO.getAddressLine1());
        user.setCity(userDTO.getCity());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setStatus("ACTIVE");
        user.setUserRole(UserRole.TECHNICIAN);
        user.setActivationCode(activationCode);
        user.setFlag(true);

        Technician technician = new Technician();

        technician.setName(userDTO.getFullname());
        technician.setContact(userDTO.getPhoneNumber());

        userRepository.save(user);

        technicianRepository.save(technician);

    }

    public void activate(String activationCode) {
        User user = userRepository.findByActivationCode(activationCode);
        if (user != null) {
            user.setFlag(true);
            user.setActivationCode(null);
            userRepository.save(user);
        }
    }

    @Override
    public List<User> getUser(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Long getCount(UserRole Userrole) {
        return userRepository.countbyuserrole(Userrole);
    }

    @Override
    public List<User> getUserByUserRole(UserRole userRole) {
        return userRepository.findByUserRole(userRole);
    }

    @Override
    public boolean updatePatientStatus(UserDTO userDTO) {
        System.out.println(userDTO.getId());
        System.out.println(userDTO.getStatus());
        Optional<User> optionalPatient = userRepository.findById(userDTO.getId().toString());
        if (optionalPatient.isPresent()) {
            User user = optionalPatient.get();
            user.setStatus(userDTO.getStatus());
            userRepository.save(user);
            return true;
        }
        return false;
    }


}
