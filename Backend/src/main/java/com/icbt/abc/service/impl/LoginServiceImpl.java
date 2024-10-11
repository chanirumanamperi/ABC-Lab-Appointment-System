package com.icbt.abc.service.impl;

import com.icbt.abc.dto.LoginDTO;
import com.icbt.abc.model.User;
import com.icbt.abc.repository.UserRepository;
import com.icbt.abc.service.LoginService;
import com.icbt.abc.utility.Util2.StandardResponse;
import com.icbt.abc.utility.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;


@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public StandardResponse authenticateUser(LoginDTO loginDTO) throws Exception {
        System.out.println("aaaa");
        StandardResponse responseBean = new StandardResponse();
        HashMap<String, Object> responseData = new HashMap<>();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );

        Optional<User> byUsername = userRepository.findByUsername(loginDTO.getUsername());
        User user;
        String token;
        if (byUsername.isPresent()) {
            user = byUsername.get();
            token = jwtUtil.generateToken(user);
            responseData.put("userData", user);
            responseData.put("token", token);
        }
        responseBean.setMessage("User Successfully login");
        responseBean.setCode(HttpStatus.OK.toString());
        responseBean.setData(responseData);
        return responseBean;
    }
}
