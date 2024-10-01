const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": 'b2d3d50a4dmsh9dba44244065af2p1853e0jsnefaa0428a469',
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};

export const searchJobs = (query, page = 1) => {
  return fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};
export const jobDetails = (jobId) => {
  return fetch(
    `https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}&extended_publisher_details=false`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => console.error(err));
};
