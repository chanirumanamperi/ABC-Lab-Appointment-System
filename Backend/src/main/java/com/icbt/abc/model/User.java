package com.icbt.abc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User implements UserDetails {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(nullable = false)
    private String fullname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String addressLine1;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(length = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole userRole;

    @Column(nullable = false)
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, length = 19)
    @UpdateTimestamp
    private Date lastupdatedtime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, length = 19)
    @CreationTimestamp
    private Date createdtime;

    private boolean flag;

    private String activationCode;

    private Long systemid;

    //    TODO : validate this
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //    TODO : validate this
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //    TODO : validate this
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //    TODO : validate this
    @Override
    public boolean isEnabled() {
        return true;
    }

    //    TODO : validate this
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userRole.name()));
        return authorities;
    }
}



