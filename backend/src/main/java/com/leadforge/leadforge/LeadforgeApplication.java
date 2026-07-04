package com.leadforge.leadforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class LeadforgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeadforgeApplication.class, args);
	}

}
