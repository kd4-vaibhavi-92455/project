package com.backend.entities;

import java.math.BigDecimal;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "services")
@AttributeOverride(name = "id", column = @Column(name = "service_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class ServiceType extends BaseEntity {

    private String name;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

    private BigDecimal basePrice;
    private boolean active = true;
}
