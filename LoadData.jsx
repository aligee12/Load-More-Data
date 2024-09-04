import React, { useEffect, useState } from "react";

const LoadData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        console.log(result.products);
        setLoading(false);
      }
    } catch (error) {
      console.log("some error found");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 120) setDisabledButton(true);
  }, [products]);

  if (loading) {
    return (
      <div className="w-screen h-screen text-4xl flex justify-center items-center">
        Loading data! Wait kro
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="product-container grid grid-cols-4 gap-3">
        {products && products.length
          ? products.map((item) => (
              <div
                className="product border-2 border-black flex flex-col justify-center items-center"
                key={item.id}
              >
                <img src={item.thumbnail} alt={item.title} />
                <p>{`${item.id} : ${item.title}`}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container flex flex-col justify-center items-center my-4 ">
        <button
          disabled={disabledButton}
          className="h-10 w-32 bg-orange-600 text-white rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Load More Data
        </button>
        {disabledButton ? (
          <p className="text-lg">You have reached end of 100 products</p>
        ) : null}
      </div>
    </div>
  );
};

export default LoadData;
