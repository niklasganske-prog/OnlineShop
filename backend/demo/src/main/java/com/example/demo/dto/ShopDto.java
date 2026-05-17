package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.List;

public class ShopDto {

    public record ProductResponse(Long id, String name, BigDecimal price, String description) {}

    public record RegisterRequest(String name, String email) {}

    public record RegisterResponse(String message, String name, String email) {}

    public record CheckoutItemRequest(Long id, String name, BigDecimal price, int quantity) {}

    public record CheckoutRequest(RegisterRequest customer, List<CheckoutItemRequest> items) {}

    public record CheckoutResponse(String message, BigDecimal total, int quantity) {}
}
