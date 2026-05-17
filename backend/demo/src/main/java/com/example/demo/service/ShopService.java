package com.example.demo.service;

import com.example.demo.dto.ShopDto.CheckoutItemRequest;
import com.example.demo.dto.ShopDto.CheckoutRequest;
import com.example.demo.dto.ShopDto.CheckoutResponse;
import com.example.demo.dto.ShopDto.ProductResponse;
import com.example.demo.dto.ShopDto.RegisterRequest;
import com.example.demo.dto.ShopDto.RegisterResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ShopService {

    private final List<ProductResponse> products = List.of(
            new ProductResponse(1L, "Minimal Lamp", BigDecimal.valueOf(24.99), "A clean desk lamp for every room."),
            new ProductResponse(2L, "Everyday Notebook", BigDecimal.valueOf(12.50), "A simple notebook for notes and lists."),
            new ProductResponse(3L, "Classic Mug", BigDecimal.valueOf(9.95), "Plain ceramic mug for tea, coffee, or water.")
    );

    public List<ProductResponse> getProducts() {
        return products;
    }

    public RegisterResponse register(RegisterRequest request) {
        return new RegisterResponse("Registered successfully.", request.name(), request.email());
    }

    public CheckoutResponse checkout(CheckoutRequest request) {
        var items = request.items();
        var total = items.stream()
                .map(item -> item.price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        var quantity = items.stream().mapToInt(CheckoutItemRequest::quantity).sum();

        return new CheckoutResponse(
                String.format("Thanks, %s! Your order for %d item(s) was received.", request.customer().name(), quantity),
                total,
                quantity
        );
    }
}
