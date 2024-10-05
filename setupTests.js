import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
import { TextEncoder, TextDecoder } from 'text-encoding';

fetchMock.enableMocks();

global.fetch = fetch;
global.TextEncoder = TextEncoder; // Make TextEncoder available globally
global.TextDecoder = TextDecoder; // Make TextDecoder available globally