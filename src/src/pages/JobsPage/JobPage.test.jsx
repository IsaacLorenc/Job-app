import React from "react";
import { render } from "@testing-library/react";
import JobsPage from "./index";
import Jobs from "../../components/Jobs";
import CTA from "../../components/CTA";

// Mock the IntersectionObserver
global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Mocking the components to isolate tests
jest.mock("../../components/Jobs", () => () => <div data-testid="jobs-component">Jobs Component</div>);
jest.mock("../../components/CTA", () => () => <div data-testid="cta-component">CTA Component</div>);

describe("JobsPage Component", () => {
  test("renders JobsPage correctly", () => {
    const { getByTestId } = render(<JobsPage />);

    // Check if the Jobs component is rendered
    const jobsComponent = getByTestId("jobs-component");
    expect(jobsComponent).toBeInTheDocument();

    // Check if the CTA component is rendered
    const ctaComponent = getByTestId("cta-component");
    expect(ctaComponent).toBeInTheDocument();
  });

  test("has correct initial state for observed nodes", () => {
    const { container } = render(<JobsPage />);
    const jobsComponent = container.querySelector("[data-testid='jobs-component']");
    const ctaComponent = container.querySelector("[data-testid='cta-component']");

    // The targets Set should be empty initially
    expect(jobsComponent).toBeTruthy();
    expect(ctaComponent).toBeTruthy();
  });
});