import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId?: number;
  categoria?: Categoria;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cliente {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  createdAt?: string;
  updatedAt?: string;
}

export const categoriaService = {
  list: async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias');
    return response.data;
  },

  getById: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  create: async (data: { nombre: string; descripcion?: string }): Promise<Categoria> => {
    const response = await api.post('/categorias', data);
    return response.data;
  },

  update: async (id: number, data: { nombre: string; descripcion?: string }): Promise<Categoria> => {
    const response = await api.put(`/categorias/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
  },
};

export const productoService = {
  list: async (): Promise<Producto[]> => {
    const response = await api.get('/productos');
    return response.data;
  },

  getById: async (id: number): Promise<Producto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  create: async (data: { nombre: string; descripcion?: string; precio: number; stock?: number; categoriaId?: number }): Promise<Producto> => {
    const response = await api.post('/productos', data);
    return response.data;
  },

  update: async (id: number, data: { nombre: string; descripcion?: string; precio: number; stock: number; categoriaId?: number }): Promise<Producto> => {
    const response = await api.put(`/productos/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/productos/${id}`);
  },
};

export const clienteService = {
  list: async (): Promise<Cliente[]> => {
    const response = await api.get('/clientes');
    return response.data;
  },

  getById: async (id: number): Promise<Cliente> => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },

  create: async (data: { identificacion: string; nombres: string; apellidos: string; email: string; telefono: string; direccion: string }): Promise<Cliente> => {
    const response = await api.post('/clientes', data);
    return response.data;
  },

  update: async (id: number, data: { identificacion: string; nombres: string; apellidos: string; email: string; telefono: string; direccion: string }): Promise<Cliente> => {
    const response = await api.put(`/clientes/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};

export default api;