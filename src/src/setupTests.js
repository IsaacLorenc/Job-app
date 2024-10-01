import '@testing-library/jest-dom';
//import fetch from 'node-fetch';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

global.fetch = fetch;
