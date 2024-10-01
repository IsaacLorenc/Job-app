import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import JobPostPage from './index';
import { jobDetails } from '../../constants/fetchFromApi';

// Mock the API call
jest.mock('../../constants/fetchFromApi');

// Mock the useIntersectionObserver hook
jest.mock('../../hooks/useIntersectionObserver', () => ({
  __esModule: true,
  default: () => [[], jest.fn()],
}));

// Mock the window.scroll method
beforeAll(() => {
  window.scroll = jest.fn();
});

const mockJobData = [
  {
    job_title: 'Software Engineer',
    employer_name: 'Tech Corp',
    job_employment_type: 'Full-time',
    job_city: 'San Francisco',
    job_state: 'CA',
    job_min_salary: '100000',
    job_max_salary: '150000',
    job_description: 'We are looking for a talented software engineer...',
  },
];

describe('JobPostPage', () => {
  beforeEach(() => {
    jobDetails.mockResolvedValue(mockJobData);
  });

  test('renders loading spinner initially', () => {
    render(
      <MemoryRouter initialEntries={['/job/123']}>
        <Routes>
          <Route path="/job/:id" element={<JobPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders job details after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/job/123']}>
        <Routes>
          <Route path="/job/:id" element={<JobPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Tech Corp')).toBeInTheDocument();
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      expect(screen.getByText('$100000 - 150000 USD')).toBeInTheDocument();
      expect(screen.getByText('We are looking for a talented software engineer...')).toBeInTheDocument();
    });
  });

  test('renders application form', async () => {
    render(
      <MemoryRouter initialEntries={['/job/123']}>
        <Routes>
          <Route path="/job/:id" element={<JobPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Ready to apply for this job opening?')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name*')).toBeInTheDocument();
      expect(screen.getByLabelText('Email*')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone Number*')).toBeInTheDocument();
      expect(screen.getByLabelText('Job Category*')).toBeInTheDocument();
      expect(screen.getByLabelText('Specialization*')).toBeInTheDocument();
      expect(screen.getByLabelText('Skills*')).toBeInTheDocument();
      expect(screen.getByLabelText('Resume*')).toBeInTheDocument();
      expect(screen.getByLabelText('Notes')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Apply now' })).toBeInTheDocument();
    });
  });

  test('submits form successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/job/123']}>
        <Routes>
          <Route path="/job/:id" element={<JobPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Full Name*'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email*'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Phone Number*'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByLabelText('Job Category*'), { target: { value: 'Development' } });
      fireEvent.change(screen.getByLabelText('Specialization*'), { target: { value: 'Frontend' } });
      fireEvent.change(screen.getByLabelText('Skills*'), { target: { value: 'React, JavaScript' } });
      fireEvent.change(screen.getByLabelText('Resume*'), { target: { value: 'https://example.com/resume' } });
      fireEvent.click(screen.getByRole('button', { name: 'Apply now' }));
      
    });
  });
});