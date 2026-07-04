import axios from 'axios';

const API_BASE = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const apiClient = {
  // Auth
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },

  async register(fullName, email, password, company) {
    const response = await api.post('/api/auth/register', { fullName, email, password, company });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async getProfile() {
    const response = await api.get('/api/users/me');
    return response.data;
  },

  async updateProfile(fullName, company) {
    const response = await api.put('/api/users/profile', { fullName, company });
    // Update stored user details
    const user = this.getCurrentUser();
    if (user) {
      user.fullName = fullName;
      user.company = company;
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/api/users/change-password', { currentPassword, newPassword });
    return response.data;
  },

  // Projects
  async getProjects() {
    const response = await api.get('/api/projects');
    return response.data;
  },

  async createProject(name) {
    const response = await api.post('/api/projects', { name });
    return response.data;
  },

  async deleteProject(id) {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
  },

  // Lead Lists
  async getLeadLists(projectId) {
    const response = await api.get(`/api/lead-lists?projectId=${projectId}`);
    return response.data;
  },

  async createLeadList(projectId, name) {
    const response = await api.post('/api/lead-lists', { projectId, name });
    return response.data;
  },

  async getLeadListItems(listId) {
    const response = await api.get(`/api/lead-lists/${listId}/items`);
    return response.data;
  },

  async addLeadToList(listId, businessId) {
    const response = await api.post(`/api/lead-lists/${listId}/items?businessId=${businessId}`);
    return response.data;
  },

  async removeLeadFromList(listId, businessId) {
    const response = await api.delete(`/api/lead-lists/${listId}/items/${businessId}`);
    return response.data;
  },

  // Searches
  async triggerSearch(keyword, location, maxResults) {
    const response = await api.post('/api/searches', { keyword, location, maxResults });
    return response.data;
  },

  async getSearchHistory() {
    const response = await api.get('/api/searches/history');
    return response.data;
  },

  async getSearchJobs() {
    const response = await api.get('/api/searches/jobs');
    return response.data;
  },

  // Exports
  async getExports() {
    const response = await api.get('/api/exports');
    return response.data;
  },

  async triggerExport(leadListId) {
    const response = await api.post(`/api/exports?leadListId=${leadListId}`, null, {
      responseType: 'blob', // Important for handling binary/file downloads
    });
    return response.data;
  },
};
