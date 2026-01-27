package com.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.dtos.JwtDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomJwtVerificationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // 1. Skip Public Endpoints
        if (path.equals("/users/signin") || path.startsWith("/users/signup")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // 2. Token Extraction & Role Correction
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // .trim() add kiya gaya hai whitespace error hatane ke liye
            String jwt = authHeader.substring(7).trim(); 
            
            try {
                Claims claims = jwtUtils.validateToken(jwt);

                String email = claims.getSubject();
                Long userId = claims.get("user_id", Long.class);
                String role = claims.get("user_role", String.class); // Role can be "ADMIN" or "ROLE_ADMIN"

                // 🔥 Role handling fix: 
                // Agar role pehle se "ROLE_" se shuru hota hai toh waisa hi rehne do, 
                // warna "ROLE_" prefix add karo.
                String formattedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;

                // Create full UserPrincipal for Spring Security
                UserPrincipal principal = new UserPrincipal(
                        userId,
                        email,
                        null,
                        List.of(new SimpleGrantedAuthority(formattedRole)),
                        role.replace("ROLE_", "")
                );

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(
                                principal,
                                null,
                                principal.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Authenticated user {} with role {}", email, formattedRole);
                
            } catch (Exception e) {
                log.error("JWT Verification failed: {}", e.getMessage());
                // Optional: Yahan error response bhi bhej sakte hain
            }
        }

        filterChain.doFilter(request, response);
    }
}