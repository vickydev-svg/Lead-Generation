package com.leadforge.leadforge.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Algorithm algorithm;

    @Value("${app.jwt.expiration-ms:86400000}") // Default 1 day
    private long jwtExpirationInMs;

    public JwtTokenProvider(@Value("${app.jwt.secret:leadforge_jwt_secret_key_extremely_secure_2026}") String jwtSecret) {
        this.algorithm = Algorithm.HMAC256(jwtSecret);
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return JWT.create()
                .withSubject(email)
                .withIssuedAt(now)
                .withExpiresAt(expiryDate)
                .sign(algorithm);
    }

    public String getEmailFromToken(String token) {
        DecodedJWT decodedJWT = JWT.require(algorithm)
                .build()
                .verify(token);
        return decodedJWT.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            JWT.require(algorithm).build().verify(token);
            return true;
        } catch (JWTVerificationException ex) {
            return false;
        }
    }
}
