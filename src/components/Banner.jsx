import React from "react";
import styled from "styled-components";

function Banner(props) {
  return (
    <B.Section>
      <B.Img></B.Img>
      <B.TextArticle>
        <B.Text1>Shop with us</B.Text1>
        <B.Text2>best products, high quality</B.Text2>
      </B.TextArticle>
    </B.Section>
  );
}

//B는 Banner
const B = {
  Section: styled.section`
    background-color: gray;
    height: 24rem;
    position: relative;
  `,

  Img: styled.img.attrs({
    src: `./images/banner.avif`,
  })`
    width: 100%;
    height: 100%;
    background-size: cover;
    opacity: 0.5;
  `,

  TextArticle: styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: -14rem;
    color: rgb(249 250 251);
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  `,

  Text1: styled.h2`
    font-size: 3.75rem;
    line-height: 1;
  `,
  Text2: styled.p`
    font-size: 1.5rem;
    line-height: 2rem;
  `,
};
export default Banner;
