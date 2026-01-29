package com.example.Backend.Scheduler;

import com.example.Backend.Entity.Notification;
import com.example.Backend.Entity.Task;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskReminderScheduler {

    private final TaskRepository taskRepository;
    private final NotificationRepository notificationRepository;

    @Scheduled(fixedRate = 600000) //10p 1 lần
    public void remindUpcomingDeadlines() {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime next24h = now.plusHours(24);

        List<Task> tasks = taskRepository
                .findByDeadlineBetweenAndCompletedAtIsNull(now, next24h);

        for (Task task : tasks) {

            if (task.getDeadline() == null) continue;

            if (Boolean.FALSE.equals(task.getRemindedDeadline())) {

                Notification notification = Notification.builder()
                        .title("⏰ Task sắp đến hạn")
                        .content("Task \"" + task.getTitle() + "\" sẽ hết hạn lúc " + task.getDeadline())
                        .task(task)
                        .user(task.getUser())
                        .build();

                notificationRepository.save(notification);

                task.setRemindedDeadline(true);
                taskRepository.save(task);
            }
        }
    }

    @Scheduled(fixedRate = 900000) //15p 1 lần
    public void remindOverdueTasks() {

        LocalDateTime now = LocalDateTime.now();

        List<Task> tasks = taskRepository
                .findByDeadlineBeforeAndCompletedAtIsNull(now);

        for (Task task : tasks) {

            if (task.getDeadline() == null) continue;

            if (Boolean.FALSE.equals(task.getRemindedOverdue())) {

                Notification notification = Notification.builder()
                        .title("Task đã quá hạn")
                        .content("Task \"" + task.getTitle() + "\" đã quá hạn từ " + task.getDeadline())
                        .task(task)
                        .user(task.getUser())
                        .build();

                notificationRepository.save(notification);

                task.setRemindedOverdue(true);
                taskRepository.save(task);
            }
        }
    }

}
