import { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProducts from "./Component/SingleProducts";

const Home = () => {
  let person = {
    name: "Ezekiel",
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cartState, setCartState] = useState([]);

  const addToCart = (id) => {
    const selectedItem = data.find((item) => item.id === id);

    if (selectedItem === undefined) return;

    setCartState((prev) => [...prev, selectedItem]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/photos";
    setIsLoading(true);
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setIsLoading(false);
          setData(result.slice(0, 30));
        })
        .catch((err) => {
          setError(true);
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  const initialState = 0;

  return (
    <>
      <h2>Our Data </h2>

      <div className="gallery">
        {error && <div>Error Fetching Data</div>}
        {isLoading ? (
          <div>...loading </div>
        ) : (
          data.length > 0 &&
          data.map((item) => (
            <div key={item.id} className="item">
              <img src={item?.thumbnailUrl} alt={item.title.slice(0, 15)} />
              <p>{item.title.slice(0, 20)}</p>
              <button onClick={() => addToCart(item.id)}>Add to cart</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<SingleProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
