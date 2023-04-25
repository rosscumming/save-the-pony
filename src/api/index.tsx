import axios from 'axios';
import type { CreateNewMazePayload, MazeDataInfo } from '../../utils/types/api.type';

const BASE_URL = 'https://ponychallenge.trustpilot.com/pony-challenge';

export const createNewMaze = async (payload: CreateNewMazePayload): Promise<string> => {
  try {
    const {
      data: { maze_id },
    } = await axios.post(`${BASE_URL}/maze`, payload);
    return maze_id;
  } catch (error) {
    throw new Error('There was an error creating the maze');
  }
};

export const getMaze = async ({ maze_id }: { maze_id: string }): Promise<MazeDataInfo> => {
  try {
    const { data }: { data: MazeDataInfo } = await axios.get(`${BASE_URL}/maze/${maze_id}`);
    return data;
  } catch (error) {
    throw new Error('There was an error getting the current maze state');
  }
};
