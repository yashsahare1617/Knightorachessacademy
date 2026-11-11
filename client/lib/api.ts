import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach access token ────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 + token refresh ────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefresh } = data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefresh);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ── Typed API helpers ────────────────────────────────────────

export const authAPI = {
  register: (data: object) => api.post('/auth/register', data),
  login: (data: object) => api.post('/auth/login', data),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const coursesAPI = {
  getAll: (params?: object) => api.get('/courses', { params }),
  getOne: (slug: string) => api.get(`/courses/${slug}`),
  create: (data: object) => api.post('/courses', data),
  update: (id: string, data: object) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
  getEnrollments: (id: string) => api.get(`/courses/${id}/enrollments`),
};

export const trialsAPI = {
  book: (data: object) => api.post('/trials', data),
  getAll: (params?: object) => api.get('/trials', { params }),
  update: (id: string, data: object) => api.put(`/trials/${id}`, data),
  delete: (id: string) => api.delete(`/trials/${id}`),
};

export const usersAPI = {
  getAll: (params?: object) => api.get('/users', { params }),
  create: (data: object) => api.post('/users', data),
  getMe: () => api.get('/users/me'),
  updateMe: (data: object) => api.put('/users/me', data),
  update: (id: string, data: object) => api.put(`/users/${id}`, data),
  toggleActive: (id: string) => api.patch(`/users/${id}/toggle-active`),
  getEnrollments: (id: string) => api.get(`/users/${id}/enrollments`),
};

export const enrollmentsAPI = {
  enroll: (data: object) => api.post('/enrollments', data),
  getMy: () => api.get('/enrollments/my'),
  getAll: (params?: object) => api.get('/enrollments', { params }),
  update: (id: string, data: object) => api.put(`/enrollments/${id}`, data),
};

export const attendanceAPI = {
  mark: (data: object) => api.post('/attendance', data),
  getCourse: (courseId: string, params?: object) => api.get(`/attendance/course/${courseId}`, { params }),
  getMy: (courseId: string) => api.get(`/attendance/my/${courseId}`),
  update: (id: string, data: object) => api.put(`/attendance/${id}`, data),
};

export const assignmentsAPI = {
  create: (data: FormData) => api.post('/assignments', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getCourse: (courseId: string) => api.get(`/assignments/course/${courseId}`),
  submit: (id: string, data: FormData) => api.post(`/assignments/${id}/submit`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  grade: (id: string, studentId: string, data: object) => api.patch(`/assignments/${id}/grade/${studentId}`, data),
};

export const blogAPI = {
  getAll: (params?: object) => api.get('/blog', { params }),
  getOne: (slug: string) => api.get(`/blog/${slug}`),
  create: (data: object) => api.post('/blog', data),
  update: (id: string, data: object) => api.put(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
  getAllAdmin: () => api.get('/blog/admin/all'),
};

export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  getOne: (slug: string) => api.get(`/gallery/${slug}`),
  create: (data: object) => api.post('/gallery', data),
  uploadImages: (id: string, data: FormData) =>
    api.post(`/gallery/${id}/images`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteImage: (id: string, imageId: string) => api.delete(`/gallery/${id}/images/${imageId}`),
};

export const announcementsAPI = {
  getAll: (params?: object) => api.get('/announcements', { params }),
  create: (data: object) => api.post('/announcements', data),
  update: (id: string, data: object) => api.put(`/announcements/${id}`, data),
  delete: (id: string) => api.delete(`/announcements/${id}`),
};

export const settingsAPI = {
  getAll: (params?: object) => api.get('/settings', { params }),
  update: (key: string, data: object) => api.put(`/settings/${key}`, data),
  bulkUpdate: (settings: object[]) => api.post('/settings/bulk', { settings }),
};

export const reportsAPI = {
  adminSummary: () => api.get('/reports/admin-summary'),
  studentReport: (studentId: string) => api.get(`/reports/student/${studentId}`),
};

export const visitorsAPI = {
  track: (data: { visitorId: string; page: string; title?: string; referrer?: string; screenResolution?: string }) =>
    api.post('/visitors/track', data),
  getStats: () => api.get('/visitors/stats'),
};

export const loginLogsAPI = {
  getAll: (params?: object) => api.get('/auth/login-history', { params }),
};
