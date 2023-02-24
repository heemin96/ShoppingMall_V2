import React from "react";
import styled from "styled-components";
import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import PriceCard from "../components/ui/PriceCard";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button.jsx";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";

const SHIPPING = 3000;

function MyCart() {
  const { uid } = useAuthContext();

  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice = products.reduce(
    (prev, current) => prev + parseInt(current.price) * current.quantity,
    0
  );

  return (
    <My.Section>
      <My.Title>내 장바구니</My.Title>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <Ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </Ul>
          <My.CalculateContainer>
            <PriceCard text="상품총액" price={totalPrice} />
            <Plus />
            <PriceCard text="배송액" price={SHIPPING} />
            <Equal />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </My.CalculateContainer>
          <Button text="주문하기" />
        </>
      )}
    </My.Section>
  );
}

//My은 Mycart
const My = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem;
  `,

  Title: styled.p`
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
    border-color: rgb(209 213 219);
  `,

  CalculateContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
  `,
};

const Ul = styled.ul`
  border-bottom: 1px solid black;
  border-color: rgb(209 213 219);
  margin-bottom: 2rem;
  padding: 1rem;
  padding: 0 2rem;
`;

const Plus = styled(BsFillPlusCircleFill)`
  flex-shrink: 0;
  font-size: 1.5rem;
`;

const Equal = styled(FaEquals)`
  flex-shrink: 0;
  font-size: 1.5rem;
`;
export default MyCart;
