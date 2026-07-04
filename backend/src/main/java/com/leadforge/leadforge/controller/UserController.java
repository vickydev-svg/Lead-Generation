package com.leadforge.leadforge.controller;

import com.leadforge.leadforge.dto.ChangePasswordRequest;
import com.leadforge.leadforge.dto.UpdateProfileRequest;
import com.leadforge.leadforge.dto.UserDto;
import com.leadforge.leadforge.security.CustomUserDetails;
import com.leadforge.leadforge.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        // Build simple response from token principal or fetch fresh from DB
        UserDto userDto = UserDto.builder()
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .fullName(userDetails.getUsername()) // returns email, or we can fetch details from DB
                .build();
        
        // Fetch fresh details by calling service (or get it directly if principal is sufficient)
        try {
            UserDto freshUser = userService.getUserById(userDetails.getId());
            return ResponseEntity.ok(freshUser);
        } catch (Exception ex) {
            // Fallback to principal
            return ResponseEntity.ok(userDto);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody UpdateProfileRequest request) {
        try {
            UserDto response = userService.updateProfile(userDetails.getId(), request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(userDetails.getId(), request);
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
