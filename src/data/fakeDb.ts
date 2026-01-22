// src/data/fakeDb.ts
import type { Task, TaskStatus } from "../types/task";

export type FakeUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export const fakeUser: FakeUser = {
  id: "u1",
  fullName: "Sundar Gurung",
  email: "sundargurung360@gmail.com",
  avatarUrl: "https://i.pravatar.cc/100?img=11",
};

export const fakeTeam = [
  "https://i.pravatar.cc/32?img=1",
  "https://i.pravatar.cc/32?img=2",
  "https://i.pravatar.cc/32?img=3",
  "https://i.pravatar.cc/32?img=4",
  "https://i.pravatar.cc/32?img=5",
];

export const fakeTasks: Task[] = [
  {
    id: "t1",
    title: "Attend Nischal’s Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
    imageUrl:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    priority: "Moderate",
    status: "Not Started",
    createdAtISO: "2023-06-20",
    dateISO: "2023-06-20",
    deadline: "2023-06-20",
  },
  {
    id: "t2",
    title: "Landing Page Design for TravelDays",
    description:
      "Get the work done by EOD and discuss with client before leaving.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    priority: "Moderate",
    status: "In Progress",
    createdAtISO: "2023-06-20",
    dateISO: "2023-06-20",
    deadline: "2023-06-20",
  },
  {
    id: "t3",
    title: "Presentation on Final Product",
    description:
      "Make sure everything is functioning and all necessities are met.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    priority: "Low",
    status: "In Progress",
    createdAtISO: "2023-06-20",
    dateISO: "2023-06-20",
    deadline: "2023-06-21",
  },
  {
    id: "t4",
    title: "Walk the dog",
    description: "Take the dog to the park and bring treats.",
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
    priority: "Low",
    status: "Completed",
    createdAtISO: "2023-06-18",
    dateISO: "2023-06-18",
    deadline: "2023-06-18",
  },
  {
    id: "t5",
    title: "Conduct meeting",
    description: "Meet client to discuss final requirements and timeline.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    priority: "Moderate",
    status: "Completed",
    createdAtISO: "2023-06-18",
    dateISO: "2023-06-18",
    deadline: "2023-06-18",
  },
];

export const calcStatusPercent = (tasks: Task[]) => {
  const total = tasks.length || 1;
  const count = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;

  return {
    completed: Math.round((count("Completed") / total) * 100),
    inProgress: Math.round((count("In Progress") / total) * 100),
    notStarted: Math.round((count("Not Started") / total) * 100),
  };
};
