import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { addOrUpdateToCart } from "../api/firebase";

import useCart from "../hooks/useCart";

function ProductDetail() {
  const { addOrUpdateItem } = useCart();

  const { uid } = useAuthContext;
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]); //옵션이 있다면 옵션에서 첫번째 아이템을 클릭하도록
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };
  return (
    <>
      <D.Category>{category}</D.Category>
      <D.Section>
        <D.Img src={image} alt={title}></D.Img>
        <D.Article>
          <D.Title>{title}</D.Title>
          <D.Price>{price}</D.Price>
          <D.Description>{description}</D.Description>

          <D.OptionsFlexContainer>
            <D.Options htmlFor="select">옵션:</D.Options>
            <D.Select id="select" onChange={handleSelect} value={selected}>
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </D.Select>
          </D.OptionsFlexContainer>
          {success && <D.Success>{success}</D.Success>}
          <Button
            text="장바구니에 추가하기"
            width="100%"
            onClick={handleClick}
          ></Button>
        </D.Article>
      </D.Section>
    </>
  );
}

//D는 Detail
const D = {
  Section: styled.section`
    display: flex;
    flex-direction: row;
    padding: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
  Category: styled.p`
    margin: 3rem;
    margin-top: 1rem;
  `,
  Img: styled.img`
    width: 100%;
    padding: 0 1rem;
    flex-basis: 58.333333%;
  `,
  Article: styled.div`
    width: 100%;
    flex-basis: 31.66666%;
    flex-direction: column;
    padding: 1rem;
  `,
  Title: styled.h2`
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    padding: 1rem 0;
  `,
  Price: styled.p`
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    padding: 1rem 0;
    border-bottom: 1px solid gray;
  `,
  Description: styled.p`
    padding: 1rem 0;
    font-size: 1.125rem;
    line-height: 1.75rem;
  `,
  OptionsFlexContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  Options: styled.label`
    color: gray;
  `,

  Select: styled.select`
    padding: 0.5rem;
    margin: 1rem;
    flex: 1 1 0%;
    border: 2px dashed black;
    outline: none;
  `,

  Success: styled.p`
    font-weight: 700;
    margin: 0.5rem 0;
    text-align: center;
    color: red;
  `,
};

export default ProductDetail;
