import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ProductCard({
  product,
  product: { id, image, title, category, price },
}) {
  const navigate = useNavigate();
  return (
    <Li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
    >
      <P.Img src={image} alt={title} />
      <P.DescriptionArticle>
        <P.Title>{title}</P.Title>
        <P.Price>{`${price}원`}</P.Price>
      </P.DescriptionArticle>
      <P.Category>{category}</P.Category>
    </Li>
  );
}

const Li = styled.li`
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow: hidden;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    transform: scale(1.05);
  }
`;

//P는 product
const P = {
  Img: styled.img`
    width: 100%;
  `,

  DescriptionArticle: styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
  `,

  Title: styled.h3`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  `,

  Price: styled.h3`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  `,

  Category: styled.p`
    margin-bottom: 0.5rem;
    padding: 0 0.5rem;
    font-color: gray;
    text-align: center;
  `,
};

export default ProductCard;
