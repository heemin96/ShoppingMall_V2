import React from "react";
import styled from "styled-components";
import useCart from "../hooks/useCart";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { CALCULATE_ICON } from "./ui/IconStyle";

function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeItem.mutate(id);
  };
  return (
    <Li>
      <Img src={image} alt={title}></Img>
      {/* 디테일전체 컨테이너 */}
      <CartItemDetailContainer>
        {/*  */}

        {/* 디테일 정보 */}
        <CartItemDetail>
          <Title>{title}</Title>
          <Option>{option}</Option>
          <Price>{price}</Price>
        </CartItemDetail>
        {/*  */}

        {/* 계산 */}
        <CartItemCalCulate>
          <Minus onClick={handleMinus} />
          <span>{quantity}</span>
          <Plus onClick={handlePlus} />
          <Delete onClick={handleDelete} />
        </CartItemCalCulate>
      </CartItemDetailContainer>
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  align-items: center;
`;

const Img = styled.img`
  width: 12rem;
  border-radius: 0.5rem;
  @media (max-width: 768px) {
    width: 6rem;
  }
`;

const CartItemDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 0%;
  margin-left: 1rem;
`;

const CartItemDetail = styled.div`
  flex-basis: 60%;
`;

const Title = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Option = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: black; ;
`;

const Price = styled.p``;

const CartItemCalCulate = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Minus = styled(AiOutlineMinusSquare)`
  ${CALCULATE_ICON}
`;

const Plus = styled(AiOutlinePlusSquare)`
  ${CALCULATE_ICON}
`;

const Delete = styled(RiDeleteBin5Fill)`
  ${CALCULATE_ICON}
`;

export default CartItem;
