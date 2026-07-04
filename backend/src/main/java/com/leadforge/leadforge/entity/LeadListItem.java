package com.leadforge.leadforge.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lead_list_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadListItem {

    @EmbeddedId
    private LeadListItemId id;
}
