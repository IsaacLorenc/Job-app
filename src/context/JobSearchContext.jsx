import React, { createContext, useContext, useState } from "react";

// Create toggle context
const JobSearchContext = createContext(null);

export default JobSearchContext;

// Create context provider
export const JobSearchProvider = ({ children }) => {
  // Initialize a state in the context provider that will keep track of the user's search query
  const [query, setQuery] = useState("software developer");

  // Create a context object that will hold the current query and a function to update it
  const contextData = {
    // This is the current value of the query
    query: query,
    // This is a function that can be used to update the query
    setQuery: setQuery
  }

  // Wrap the context provider around the children and pass the contextData as the value
  return (
    <JobSearchContext.Provider value={ contextData }>
      {children}
    </JobSearchContext.Provider>
  );
};
