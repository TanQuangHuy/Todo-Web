package com.example.Backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ChatMessageReadId implements Serializable {

    @Column(name = "message_id")
    private Long messageId;

    @Column(name = "user_id")
    private Long userId;
}

