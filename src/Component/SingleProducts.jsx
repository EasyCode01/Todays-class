import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/FetchFromApi";

const SingleProducts = () => {
  const [product, setProduct] = useState({});
  console.log(product);
  let { id } = useParams();
  useEffect(() => {
    fetchFromApi("1")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <div>
      <h2>{product?.title?.slice(0, 30)}</h2>{" "}
    </div>
  );
};

export default SingleProducts;
