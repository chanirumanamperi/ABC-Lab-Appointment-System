package com.icbt.abc.repository;

import com.icbt.abc.model.Patient;
import com.icbt.abc.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
