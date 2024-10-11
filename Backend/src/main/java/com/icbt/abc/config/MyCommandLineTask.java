package com.icbt.abc.config;


import com.icbt.abc.model.User;
import com.icbt.abc.model.UserRole;
import com.icbt.abc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MyCommandLineTask implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {


        System.out.println("Executing a command-line task...");
        // Add your task logic here
        System.out.println("Task completed.");

        User user = new User();
        user.setUsername("Harry");
        user.setFullname("Harry Potter");
        user.setEmail("harry@gmail.com");
        user.setAddressLine1("123 Main St");
        user.setCity("New York");
        user.setPhoneNumber("555-1234");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setUserRole(UserRole.ADMIN);
        user.setStatus("ACTIVE");
        user.setLastupdatedtime(new Date());
        user.setCreatedtime(new Date());
        user.setFlag(true);
        user.setActivationCode("abc123");

        //userRepository.save(user); /// run frist time add after comment this line
    }
}
