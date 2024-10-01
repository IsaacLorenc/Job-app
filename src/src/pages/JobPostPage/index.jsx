import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { jobDetails } from "../../constants/fetchFromApi";
import JobCard from "../../components/JobCard";
import { location, money, time } from "../../assets";
import Button from "../../components/Button";
import CTA from "../../components/CTA";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { LoadingSpinner, Span } from "../../globals";
import { ImSpinner2 } from "react-icons/im";
import * as J from "./styles";

const JobPostPage = () => {
  // Get the id of the job post from the params
  const { id } = useParams();

  // State to hold the job data
  const [jobData, setJobData] = useState(null);

  // State to indicate whether the page is loading
  const [loading, setLoading] = useState(true);

  // State to indicate whether the form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch the job data when the component mounts
  useEffect(() => {
    window.scroll(0, 0);

    // Call the API to fetch the job data
    jobDetails(id).then((data) => {
      // Set the job data in the state
      setJobData(data);

      // Set the loading state to false
      setLoading(false);
    });
  }, [id]);

  // Create a reference to the elements that we want to animate
  const targets = useRef(new Set());

  // Create a state to store the observed nodes
  const [entries, setObservedNodes] = useIntersectionObserver({
    // We want to observe when the user scrolls to the bottom of the page
    // and when the form is submitted
    //threshold: 1,
  });

  // When the component mounts, set the observed nodes to the elements
  // that we want to animate
  useEffect(() => {
    setObservedNodes(() => [...targets.current]);
  }, [setObservedNodes]);

  // When the user scrolls to the bottom of the page or submits the form,
  // animate the elements
  useEffect(() => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Animate the elements
        entry.target.style.transform = "translateY(0%) scale(100%)";
        entry.target.style.opacity = "1";

        // Remove the element from the observed nodes
        setObservedNodes((observedNodes) =>
          observedNodes.filter((node) => node !== entry.target)
        );
      }
    }
  }, [entries, setObservedNodes]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Scroll to the top of the page
    window.scroll(0, 0);
  };

  // Render the job post page
  return (
    <J.JobsPostPageStyled>
      <J.JobPresentation>
        <J.JobPresentationContainer>
          {/* Display job card */}
          <J.JobCardExtended>
            {!loading && jobData?.length > 0 ? (
              <>
                {/* Render the job card */}
                <JobCard {...jobData[0]} inJobPostPage />

                {/* Render the job stats */}
                <J.StatsContainer>
                  <J.Stat>
                    <J.Icon src={time} alt="time" />
                    <J.StatText>
                      {jobData[0]?.job_employment_type || "N/A"}
                    </J.StatText>
                  </J.Stat>
                  <J.Divider />
                  <J.Stat>
                    <J.Icon src={location} alt="time" />
                    <J.StatText>
                      {jobData[0]?.job_city || "N/A"},{" "}
                      {jobData[0]?.job_state || "N/A"}
                    </J.StatText>
                  </J.Stat>
                  <J.Divider />
                  <J.Stat>
                    <J.Icon src={money} alt="time" />
                    <J.StatText>
                      ${jobData[0]?.job_min_salary || "N/A"} -{" "}
                      {jobData[0]?.job_max_salary || "N/A"} USD
                    </J.StatText>
                  </J.Stat>
                </J.StatsContainer>

                {/* Render the job description */}
                <J.JobDescriptionTitle>Job Description</J.JobDescriptionTitle>
                <J.JobDescriptionText>
                  <pre
                    style={{
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      fontWeight: "500",
                    }}
                  >
                    {jobData[0]?.job_description}
                  </pre>
                </J.JobDescriptionText>
              </>
            ) : (
              <LoadingSpinner data-testid="loading-spinner">
                <ImSpinner2 />
              </LoadingSpinner>
            )}
          </J.JobCardExtended>

          {/* Render the form */}
          <J.AsideContainer id="apply">
            {!formSubmitted ? (
              <>
                {/* Render the form title */}
                <J.FormTitle>Ready to apply for this job opening?</J.FormTitle>
                {/* Render the form */}
                <J.ApplyForm
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {/* Render the form inputs */}
                  <J.FormDiv>
                    <label htmlFor="full-name">
                      Full Name<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="full-name" name="full-name" />

                    <J.ApplyFormInput
                      type="text"
                      placeholder="Sophie Moore"
                      name="full-name"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="email">
                      Email<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="email" name="email" />

                    <J.ApplyFormInput
                      type="email"
                      placeholder="sophie@email.com"
                      name="email"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="phone-number">
                      Phone Number<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="phone-number" name="phone-number" />

                    <J.ApplyFormInput
                      type="text"
                      placeholder="(123) 456-7890"
                      name="phone-number"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="job-category">
                      Job Category<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="job-category" name="job-category" />

                    <J.ApplyFormInput
                      type="text"
                      placeholder="Ex.: Development"
                      name="job-category"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="specialization">
                      Specialization<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="specialization" name="specialization" />

                    <J.ApplyFormInput
                      type="text"
                      placeholder="Ex.: Frontend"
                      name="specialization"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="skills">
                      Skills<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="skills" name="skills" />

                    <J.ApplyFormTextArea
                      placeholder="Skill 1, Skill 2, Skill 3..."
                      name="skills"
                      required={true}
                      maxLength="5000"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="resume">
                      Resume<J.Asterisk>*</J.Asterisk>
                    </label>

                    <input type="text" id="resume" name="resume" />

                    <J.ApplyFormInput
                      type="text"
                      placeholder="Resume or Portfolio Link"
                      name="resume"
                      required={true}
                      maxLength="256"
                    />
                  </J.FormDiv>
                  <J.FormDiv>
                    <label htmlFor="notes">Notes</label>

                    <input type="text" id="notes" name="notes" />
                    
                    <J.ApplyFormTextArea
                      placeholder="If you would like to include any extra note or cover letter, please free to do it here."
                      name="notes"
                      maxLength="5000"
                    />
                  </J.FormDiv>
                  {/* Render the submit button */}
                  <Button
                    type1="primary"
                    type2="large"
                    value="Apply now"
                    width="100%"
                    style={{}}
                  />
                </J.ApplyForm>
              </>
            ) : (
              <J.FormTitle>
                Thank you! Your submission has been <Span>received!</Span>
              </J.FormTitle>
            )}
          </J.AsideContainer>
        </J.JobPresentationContainer>
      </J.JobPresentation>

      {/* Render the CTA */}
      <CTA innerRef={(element) => targets.current.add(element)} />
    </J.JobsPostPageStyled>
  );
};

export default JobPostPage;
