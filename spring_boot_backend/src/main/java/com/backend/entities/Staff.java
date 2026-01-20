package com.backend.entities;

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
@Table(name = "staff")
@AttributeOverride(name = "id", column = @Column(name = "staff_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Staff extends User {

    @Enumerated(EnumType.STRING)
    private StaffRole role;

    private boolean active = true;
}
