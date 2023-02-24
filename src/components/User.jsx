import React from "react";
import styled from "styled-components";

//user 안에 key들 낱개로 가져오기
function User({ user: { photoURL, displayName } }) {
  return (
    <U.Container>
      <U.Img src={photoURL} alt={displayName} />
      <U.DisplayName>{displayName}</U.DisplayName>
    </U.Container>
  );
}

//U = user
const U = {
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0; -> 사진 줄어들게 하고 싶지 않을때.
  `,

  Img: styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    margin: 0.5rem;
  `,

  DisplayName: styled.span`
    display: blcok;

    @media (max-width: 768px) {
      display: none;
    }
  `,
};
export default User;
