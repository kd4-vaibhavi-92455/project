package com.backend.security;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.entities.User;
import com.backend.repository.UserRepository;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	    log.info("********* in load user ");
	    
	    // 1. Fetch User (Abstract class context)
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

	    // 2. Extract Role (Calling your abstract method)
	    String roleName = user.getUserRole().name(); 

	    // 3. Return UserPrincipal
	    return new UserPrincipal(
	            user.getId(),
	            user.getEmail(),
	            user.getPassword(), // Abstract getPassword() will be called
	            List.of(new SimpleGrantedAuthority("ROLE_" + roleName)), 
	            roleName
	    );
	}

}
