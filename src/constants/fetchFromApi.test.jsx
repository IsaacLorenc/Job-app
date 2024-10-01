import { searchJobs, jobDetails } from "./fetchFromApi"; 

describe("API Functions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("searchJobs fetches and returns job data", async () => {
    const mockData = { data: [{ id: 1, title: "Software Engineer" }] };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const jobs = await searchJobs("developer");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsearch.p.rapidapi.com/search?query=developer&page=1&num_pages=1",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": 'b2d3d50a4dmsh9dba44244065af2p1853e0jsnefaa0428a469',
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );
    expect(jobs).toEqual(mockData.data);
  });

  test("jobDetails fetches and returns job details", async () => {
    const mockDetails = { id: 1, title: "Software Engineer", description: "Job details here." };
    fetch.mockResponseOnce(JSON.stringify({ data: mockDetails }));

    const job = await jobDetails(1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsearch.p.rapidapi.com/job-details?job_id=1&extended_publisher_details=false",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": 'b2d3d50a4dmsh9dba44244065af2p1853e0jsnefaa0428a469',
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );
    expect(job).toEqual(mockDetails);
  });
});