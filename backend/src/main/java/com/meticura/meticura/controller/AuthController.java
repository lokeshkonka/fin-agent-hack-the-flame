package com.meticura.meticura.controller;

import com.meticura.meticura.DTO.SignupRequest;
import com.meticura.meticura.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://g3fc2ktx-8080.inc1.devtunnels.ms"
})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/signup", consumes = {"multipart/form-data"})
    public ResponseEntity<Void> signup(
            @RequestPart("data") SignupRequest req,
            @RequestPart("aadhaarPdf") MultipartFile aadhaarPdf,
            @RequestPart("panPdf") MultipartFile panPdf,
            @RequestPart("addprofPdf") MultipartFile addprofPdf) {

        authService.signup(req, aadhaarPdf, panPdf, addprofPdf);
        return ResponseEntity.accepted().build();
    }
}
