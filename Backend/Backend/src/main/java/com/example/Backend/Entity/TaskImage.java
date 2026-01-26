package com.example.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "task")
@EqualsAndHashCode(exclude = "task")
public class TaskImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_image_id")
    private Long taskImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    @JsonIgnore
    private Task task;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "`index`")
    private Integer index;

    @Column(name = "public_id", length = 255)
    private String publicId;
}
