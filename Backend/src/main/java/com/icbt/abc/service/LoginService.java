package com.icbt.abc.service;


import com.icbt.abc.dto.LoginDTO;
import com.icbt.abc.utility.Util2.StandardResponse;

public interface LoginService {
    StandardResponse authenticateUser(LoginDTO loginDTO) throws Exception;
}
