import React from "react";
import styled from "styled-components";

function PriceCard({ text, price }) {
  console.log({ price });
  return (
    <PriceCardContainer>
      <Text>{text}</Text>
      <Price>￦{price}</Price>
    </PriceCardContainer>
  );
}

const PriceCardContainer = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: bold;
  background-color: rgb(249 250 251);
  padding: 4rem;
  margin: 0.5rem 0;
  border-radius: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 1rem;
  }
`;

const Text = styled.div``;

const Price = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;
  color: gray;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export default PriceCard;
