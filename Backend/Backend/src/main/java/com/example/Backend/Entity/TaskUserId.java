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
public class TaskUserId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "task_id")
    private Long taskId;

    @Column(name = "user_id")
    private Long userId;
}
