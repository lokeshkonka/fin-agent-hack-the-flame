package com.meticura.meticura.config;

public class SupabaseUserInfo {
    private final String id;
    private final String role;
    private final String email;

    public SupabaseUserInfo(String id, String role, String email) {
        this.id = id;
        this.role = role;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "SupabaseUserInfo{" +
                "id='" + id + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
