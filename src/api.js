import axios from 'axios';

const API_URL = 'http://127.0.0.1:8001'; // URL вашего бэкэнда

export const getTodos = async () => {
    const response = await axios.get(`${API_URL}/todoAll`);
    return response.data.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(`${API_URL}/todo`, todo);
    return response.data;
};

export const updateTodo = async (id, todo) => {
    const response = await axios.put(`${API_URL}/todo/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todo/${id}`);
};

export const getSubTodosByIds = async (ids) => {
    if (!ids || ids.length === 0) {
        return [];
    }

    const response = await axios.get(`${API_URL}/subTodosByIds`, {
        params: { ids: ids.join(',') },
    });
    return response.data.data;
};

export const createSubTodo = async (subTodo) => {
    const response = await axios.post(`${API_URL}/subTodo`, subTodo);
    return response.data;
};

export const updateSubTodo = async (id, subTodo) => {
    const response = await axios.put(`${API_URL}/subTodo/${id}`, subTodo);
    return response.data;
};

export const deleteSubTodo = async (id) => {
    await axios.delete(`${API_URL}/subTodo/${id}`);
};
