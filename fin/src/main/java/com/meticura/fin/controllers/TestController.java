package com.meticura.fin.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "App is running";
    }
}

