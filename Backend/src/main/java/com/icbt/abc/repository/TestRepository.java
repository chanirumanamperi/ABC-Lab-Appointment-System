package com.icbt.abc.repository;

import com.icbt.abc.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TestRepository extends JpaRepository<Test, Long> {

    @Query(value = "SELECT COUNT(id)  FROM tests WHERE name = :name", nativeQuery = true)
    Integer existsByName(@Param("name") String name);

}

