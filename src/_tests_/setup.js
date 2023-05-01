import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './utils';
import { afterAll, afterEach, beforeAll } from 'vitest';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
