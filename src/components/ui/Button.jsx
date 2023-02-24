import React from "react";
import styled from "styled-components";

function Button({ text, onClick, width, color }) {
  return (
    <AppButton onClick={onClick} width={width} color={color}>
      {text}
    </AppButton>
  );
}

const AppButton = styled.button`
  background-color: black;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};

  &:hover {
    filter: brightness(1.1);
  }
`;

export default Button;
