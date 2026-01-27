package com.backend.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "addresses")
@AttributeOverride(name = "id", column = @Column(name = "address_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Address extends BaseEntity {

    private String label;
    private String addressLine;
    
    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;
    
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    
    private String pincode;
    
    // Deprecated fields - keeping for migration compatibility
    @Deprecated
    @Column(name = "city_name")
    private String cityName;
    
    @Deprecated
    @Column(name = "state_name")
    private String stateName;
}
