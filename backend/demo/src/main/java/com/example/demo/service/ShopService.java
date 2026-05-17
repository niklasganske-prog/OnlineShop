package com.example.demo.service;

import com.example.demo.dto.ShopDto.CheckoutItemRequest;
import com.example.demo.dto.ShopDto.CheckoutRequest;
import com.example.demo.dto.ShopDto.CheckoutResponse;
import com.example.demo.dto.ShopDto.ProductResponse;
import com.example.demo.dto.ShopDto.RegisterRequest;
import com.example.demo.dto.ShopDto.RegisterResponse;
import com.example.demo.entity.ProductEntity;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {

    private final ProductRepository productRepository;

    public ShopService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getProducts() {
        return productRepository.findAll().stream()
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toProductResponse(ProductEntity entity) {
        return new ProductResponse(
                entity.getId(),
                entity.getName(),
                entity.getPrice(),
                entity.getDescription()
        );
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
