package com.example.demo.config;

import com.example.demo.entity.ProductEntity;
import com.example.demo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataInitializer(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        productRepository.deleteAll();

        List<ProductEntity> seedProducts = List.of(
                new ProductEntity(null, "Lampe", BigDecimal.valueOf(24.99), "Shreibtischlampe mit Blaulichtfilter"),
                new ProductEntity(null, "Laptop", BigDecimal.valueOf(999.99), "Ein einfacher Office Laptop"),
                new ProductEntity(null, "Tasse", BigDecimal.valueOf(9.95), "Einfach eine Tasse")
        );

        productRepository.saveAll(seedProducts);
    }
}
