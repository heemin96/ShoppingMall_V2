import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

function ModifyProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  //   const [title, setTitle] = useState(detailProduct.title);
  //   const [description, setdeScription] = useState(detailProduct.description);
  //   const [category, setCategory] = useState(detailProduct.category);
  //   const [price, setPrice] = useState(detailProduct.price);
  //   const [options, setOptions] = useState(detailProduct.options);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleChange2 = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 수정되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 2000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <N.Section>
      <N.Regist>제품 수정</N.Regist>
      {success && <N.Success>✅ {success}</N.Success>}
      {file && <N.Img src={URL.createObjectURL(file)} alt="local file" />}
      <N.Form onSubmit={handleSubmit}>
        <N.ImgInput //
          value={product.image}
          onChange={handleChange}
        />
        <N.TitleInput
          value={title ?? ""} //
          onChange={handleChange2}
        />
        <N.PriceInput
          value={price ?? ""} //
          onChange={handleChange}
        />
        <N.CategoryInput
          value={category ?? ""} //
          onChange={handleChange}
        />
        <N.DescriptionInput
          value={description ?? ""} //
          onChange={handleChange}
        />
        <N.OptionsInput //
          value={options ?? ""} //
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </N.Form>
    </N.Section>
  );
}

//N은 new
const N = {
  Section: styled.section`
    width: 100%;
    text-align: center;
  `,

  Regist: styled.h2`
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    margin: 1rem;
  `,

  Success: styled.p`
  margin 0.5rem 0 ;
`,

  Img: styled.img`
    width: 24rem;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
  `,

  ImgInput: styled.input.attrs((props) => ({
    type: "file",
    accept: "image/*",
    name: "file",
    required: true,
  }))``,

  TitleInput: styled.input.attrs((props) => ({
    type: "text",
    name: "title",
    placeholder: "제품명",
    required: true,
  }))``,

  PriceInput: styled.input.attrs((props) => ({
    type: "number",
    name: "price",
    placeholder: "가격",
    required: true,
  }))``,

  CategoryInput: styled.input.attrs((props) => ({
    type: "text",
    name: "category",
    placeholder: "카테고리",
    required: true,
  }))``,

  DescriptionInput: styled.input.attrs((props) => ({
    type: "text",
    name: "description",
    placeholder: "제품 설명",
    required: true,
  }))``,

  OptionsInput: styled.input.attrs((props) => ({
    type: "text",
    name: "options",
    placeholder: "옵션들(콤마(,)로 구분)",
    required: true,
  }))``,
};

export default ModifyProduct;
