import React from "react";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../../hooks/useCart";

function CartStatus(props) {
  const {
    cartQuery: { data: products },
  } = useCart();
  return (
    <CartStatusContainer>
      <CartIcon />
      {products && <ProductsLength>{products.length}</ProductsLength>}
    </CartStatusContainer>
  );
}

const CartStatusContainer = styled.div`
  position: relative;
  text-align: -webkit-center;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 2.25rem;
  font-height: 2.5rem;
`;

const ProductsLength = styled.p`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  font-weight: bold;
  background-color: black;
  border-radius: 100%;
  text-align: center;
  position: absolute;
  top: -0.1rem;
  right: -0.2rem;
`;

export default CartStatus;
