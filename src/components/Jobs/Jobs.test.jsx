import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Jobs from "./index"; 
import JobSearchContext from "../../context/JobSearchContext";
import * as api from "../../constants/fetchFromApi"; 
import { searchJobs } from '../../constants/fetchFromApi';

jest.mock('../../constants/fetchFromApi', () => ({
    searchJobs: jest.fn(),
  }));

describe("Jobs Component", () => {
  const mockSetQuery = jest.fn();
  const mockContextValue = { query: "software developer", setQuery: mockSetQuery };
  
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  test("renders jobs after loading", async () => {
    const mockJobs = [
      { job_id: "1", job_title: "Software Engineer", employer_name: "Tech Corp" },
      { job_id: "2", job_title: "Web Developer", employer_name: "Web Inc" },
    ];
    api.searchJobs.mockResolvedValueOnce(mockJobs); // Mock API response

    const { getByText } = render(
      <JobSearchContext.Provider value={mockContextValue}>
        <Router>
          <Jobs />
        </Router>
      </JobSearchContext.Provider>
    );

    // Wait for the loading to finish and check for job titles
    await waitFor(() => expect(getByText("Software Engineer")).toBeInTheDocument());
    expect(getByText("Web Developer")).toBeInTheDocument();
  });
})