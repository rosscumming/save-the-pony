import axios from 'axios';
import type { createNewMazePayload } from './index.types';

const BASE_URL = 'https://ponychallenge.trustpilot.com/pony-challenge';

export const createNewMaze = async (
  payload: createNewMazePayload
): Promise<string> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/maze`, payload);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('There was an error creating the maze');
  }
};
