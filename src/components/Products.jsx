import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Ul>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Ul>
    </>
  );
}

// function Products(props) {
//   const {
//     productsQuery: { isLoading, error, data: products },
//   } = useProducts();
//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <Ul>
//         {products &&
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//       </Ul>
//     </>
//   );
// }

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
