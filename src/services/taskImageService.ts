import axiosClient from "../api/axiosClient";

export interface TaskImage {
  taskImageId: number;
  taskId: number;
  imageUrl: string;
  index: number;
}

export const taskImageService = {
  getByTaskId(taskId: number): Promise<TaskImage[]> {
    return axiosClient
      .get(`/api/task-images/task/${taskId}`)
      .then(res => res.data);
  },
   upload(taskId: number, file: File, index = 1) {
    const formData = new FormData();
    formData.append("taskId", String(taskId));
    formData.append("file", file);
    formData.append("index", String(index));

    return axiosClient.post("/api/task-images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
