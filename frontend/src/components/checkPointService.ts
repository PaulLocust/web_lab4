import instance from './axiosInstance';

export const checkPoint = async (data: { x: number; y: number; r: number }) => {
    return await instance.post('/check-point', data);
};

