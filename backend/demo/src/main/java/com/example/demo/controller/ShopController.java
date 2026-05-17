package com.example.demo.controller;

import com.example.demo.dto.ShopDto.CheckoutRequest;
import com.example.demo.dto.ShopDto.CheckoutResponse;
import com.example.demo.dto.ShopDto.ProductResponse;
import com.example.demo.dto.ShopDto.RegisterRequest;
import com.example.demo.dto.ShopDto.RegisterResponse;
import com.example.demo.service.ShopService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping("/products")
    public List<ProductResponse> getProducts() {
        return shopService.getProducts();
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return shopService.register(request);
    }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(@RequestBody CheckoutRequest request) {
        return shopService.checkout(request);
    }
}
