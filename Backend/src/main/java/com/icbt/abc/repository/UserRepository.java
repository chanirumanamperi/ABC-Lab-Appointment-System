package com.icbt.abc.repository;


import com.icbt.abc.model.User;
import com.icbt.abc.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT COUNT(username)  FROM User WHERE username = :username", nativeQuery = true)
    Integer existsByUserName(@Param("username") String username);

    Optional<User> findByUsername(String userName);

    User findByActivationCode(String activationCode);

    @Query(value = "SELECT COUNT(email)  FROM User WHERE email = :email", nativeQuery = true)
    Integer existsByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM User WHERE email = :email", nativeQuery = true)
    List<User> findByEmail(@Param("email") String email);

    @Query(value = "SELECT COUNT(a.id) FROM User a WHERE a.userRole = :userrole AND a.status != 'DELETE'")
    Long countbyuserrole(@Param("userrole") UserRole userrole);


    @Query(value = "SELECT u FROM User u WHERE u.userRole = :userrole")
    List<User> findByUserRole(@Param("userrole") UserRole userrole);



}
