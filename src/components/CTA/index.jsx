import React, { useState } from "react";
import Button from "../Button";
import * as C from './styles'

const CTA = ({ innerRef }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault();

    // If the input field is empty, show an error message.
    if (!input) {
      setMessage("Please enter your email.");
    } else {
      // If the input field is not empty, show a success message.
      setMessage("Thank you for subscribing to our newsletter!");
    }

    // After 2500 milliseconds (2.5 seconds), remove the message.
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <C.CTAStyled>
      <C.CTAContainer ref={innerRef}>
        <C.CTAContent>
          <C.TextContainer>
            <C.Heading>Our Soon To Be Newsletter!</C.Heading>
            <C.Subtitle>
              Join our newsletter and receive the best job openings!
            </C.Subtitle>
          </C.TextContainer>

          <C.FormContainer>
            <C.SearchForm onSubmit={(e) => handleFormSubmit(e)}>
              {message && <C.Message>{message}</C.Message>}
              <C.SearchInput
                type="email"
                placeholder="Enter your email"
                maxlength="256"
                required={true}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                type1="secondary"
                type2="large"
                width="100%"
                value="Subscribe"
                heroButton={true}
              />
            </C.SearchForm>

            <C.FormSubtitle>
              News letter is still in the works join now and get it as soon as it's ready!
            </C.FormSubtitle>
          </C.FormContainer>
        </C.CTAContent>
      </C.CTAContainer>
    </C.CTAStyled>
  );
};

export default CTA;
