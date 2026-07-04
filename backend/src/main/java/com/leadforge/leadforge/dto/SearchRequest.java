package com.leadforge.leadforge.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SearchRequest {

    @NotBlank(message = "Keyword is required")
    private String keyword;

    @NotBlank(message = "Location is required")
    private String location;

    @Min(value = 1, message = "maxResults must be at least 1")
    private Integer maxResults = 10;
}
