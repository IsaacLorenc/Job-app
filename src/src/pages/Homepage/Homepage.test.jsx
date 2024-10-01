import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './index';
import JobSearchContext from '../../context/JobSearchContext';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate(),
}));

// Mock the JobSearchContext
const mockSetQuery = jest.fn();
const mockContextValue = {
  query: '',
  setQuery: mockSetQuery,
};

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock;

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Router>
      <JobSearchContext.Provider value={mockContextValue}>
        {ui}
      </JobSearchContext.Provider>
    </Router>
  );
};

describe('Homepage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders the search form', () => {
    renderWithRouter(<Homepage />);
    const searchInputs = screen.getAllByPlaceholderText('Search for jobs');
    expect(searchInputs.length).toBeGreaterThan(0);
    expect(screen.getByText('Search Job')).toBeInTheDocument();
  });

  test('renders client logos', () => {
    renderWithRouter(<Homepage />);
    const clientLogos = screen.getAllByAltText('client-logo');
    expect(clientLogos.length).toBeGreaterThan(0);
  });
});