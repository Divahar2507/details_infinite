
import axios from 'axios';
import { Employee } from '../types';

const API_URL = 'http://localhost:8080/api/employees';

export const EmployeeService = {
    getAllEmployees: async (): Promise<Employee[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    createEmployee: async (employee: Employee): Promise<Employee> => {
        const response = await axios.post(API_URL, employee);
        return response.data;
    },

    getEmployeeById: async (id: string): Promise<Employee> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    updateEmployee: async (id: string, employee: Employee): Promise<Employee> => {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        return response.data;
    },

    deleteEmployee: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

    exportEmployees: () => {
        window.open(`${API_URL}/export`, '_blank');
    }
};
