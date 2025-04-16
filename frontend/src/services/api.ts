import api from '../api/axios';

// Artisan API
export const artisanApi = {
    getAll: () => api.get('/api/artisans'),
    getById: (id: number) => api.get(`/api/artisans/${id}`),
    getByLocation: (location: string) => api.get(`/api/artisans/search/location?location=${location}`),
    create: (data: any) => api.post('/api/artisans', data),
    update: (id: number, data: any) => api.put(`/api/artisans/${id}`, data),
    delete: (id: number) => api.delete(`/api/artisans/${id}`)
};

// Product API
export const productApi = {
    getAll: () => api.get('/api/products'),
    getById: (id: number) => api.get(`/api/products/${id}`),
    getByArtisan: (artisanId: number) => api.get(`/api/products/artisan/${artisanId}`),
    getByCategory: (categoryId: number) => api.get(`/api/products/category/${categoryId}`),
    search: (query: string) => api.get(`/api/products/search?name=${query}`),
    create: (data: any) => api.post('/api/products', data),
    update: (id: number, data: any) => api.put(`/api/products/${id}`, data),
    delete: (id: number) => api.delete(`/api/products/${id}`),
    uploadImage: (id: number, image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        return api.post(`/api/products/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getImageUrl: (id: number) => `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/products/${id}/image`
};

// Order API
export const orderApi = {
    create: (data: any) => api.post('/api/orders', data),
    getById: (id: number) => api.get(`/api/orders/${id}`),
    getByUser: (userId: number) => api.get(`/api/orders/user/${userId}`),
    updateStatus: (id: number, status: string) => api.put(`/api/orders/${id}/status?status=${status}`),
    getItems: (orderId: number) => api.get(`/api/orders/${orderId}/items`)
};

// Category API
export const categoryApi = {
    getAll: () => api.get('/api/categories'),
    getById: (id: number) => api.get(`/api/categories/${id}`),
    create: (data: any) => api.post('/api/categories', data),
    update: (id: number, data: any) => api.put(`/api/categories/${id}`, data),
    delete: (id: number) => api.delete(`/api/categories/${id}`)
};

// User API
export const userApi = {
    getCurrentUser: () => api.get('/api/users/me'),
    updateProfile: (data: any) => api.put('/api/users/profile', data),
    login: (credentials: { email: string; password: string }) => 
        api.post('/api/users/login', credentials),
    register: (userData: any) => api.post('/api/users/register', userData),
    logout: () => api.post('/api/users/logout')
}; 