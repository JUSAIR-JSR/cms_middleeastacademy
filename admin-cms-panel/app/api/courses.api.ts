import api from './axios';

/* -------------------------------
   COURSES API
-------------------------------- */

export const getCourses = async () => {
  const res = await api.get('/courses');
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await api.get(`/courses/${id}`);
  return res.data;
};

export const createCourse = async (data: any) => {
  const res = await api.post('/courses', data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateCourse = async (id: string, data: any) => {
  const res = await api.put(`/courses/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};


export const deleteCourse = async (id: string) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};
