import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import JobCard from "./index"; 
import * as J from "./styles"; 

describe("JobCard Component", () => {
  const defaultProps = {
    employer_website: "https://example.com",
    employer_logo: "logo.png",
    employer_name: "Example Corp",
    job_id: "123",
    job_title: "Software Engineer",
    job_employment_type: "Full-Time",
    job_posted_at_datetime_utc: "2023-09-27T12:00:00Z",
    inJobPostPage: false,
  };

  test("renders JobCard correctly with given props", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <JobCard {...defaultProps} />
      </Router>
    );

    // Check if employer name is rendered
    expect(getByText("Example Corp")).toBeInTheDocument();
    
    // Check if job title is rendered
    expect(getByText("Software Engineer")).toBeInTheDocument();
    
    // Check if the employer logo is rendered
    expect(getByAltText("logo")).toBeInTheDocument();
  });

  test("renders job type when not in job post page", () => {
    const { getByText } = render(
      <Router>
        <JobCard {...defaultProps} />
      </Router>
    );

    // Check if job type is rendered
    expect(getByText("Full-Time")).toBeInTheDocument();
  });

  test("does not render job type when in job post page", () => {
    const { queryByText } = render(
      <Router>
        <JobCard {...defaultProps} inJobPostPage={true} />
      </Router>
    );

    // Check that job type is not rendered
    expect(queryByText("Full-Time")).not.toBeInTheDocument();
  });

  test("links to employer website and job details page", () => {
    const { getByRole } = render(
      <Router>
        <JobCard {...defaultProps} />
      </Router>
    );

    // Check if the employer website link is correct
    const employerLink = getByRole("link", { name: "Example Corp" });
    expect(employerLink).toHaveAttribute("href", "https://example.com");

    // Check if the job details link is correct
    const jobDetailsLink = getByRole("link", { name: "Software Engineer" });
    expect(jobDetailsLink).toHaveAttribute("href", "/jobs/123");
  });

  test("renders apply button when in job post page", () => {
    const { getByText } = render(
      <Router>
        <JobCard {...defaultProps} inJobPostPage={true} />
      </Router>
    );

    // Check if the apply button is rendered
    expect(getByText("Apply now")).toBeInTheDocument();
  });
});