package com.leadforge.leadforge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadListItemId implements Serializable {

    @Column(name = "lead_list_id")
    private UUID leadListId;

    @Column(name = "business_id")
    private UUID businessId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeadListItemId that = (LeadListItemId) o;
        return Objects.equals(leadListId, that.leadListId) &&
               Objects.equals(businessId, that.businessId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(leadListId, businessId);
    }
}
