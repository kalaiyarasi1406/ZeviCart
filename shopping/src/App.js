import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/HomeSection"; // Import your Home component here
//import Cart from "./component/CartSection"; // Import your Cart component here
import { useEffect, useState } from "react";

const App = () => {
  // State variables declared
  const [productsItems, setProductsItem] = useState([]);
  const [search, setSearch] = useState("");
  const [filterQuery, setFilterQuery] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [countQty, setCountQty] = useState({});
  const [totalAmounts, setTotalAmounts] = useState(0);
  const [filterChecking, setFilterChecking] = useState({
    color: {
      Red: false,
      Blue: false,
      Green: false,
      Purple: false,
      Grey: false,
    },
    gender: {
      Men: false,
      Women: false,
    },
    price: {
      range1: false,
      range2: false,
      range3: false,
    },
    type: {
      Polo: false,
      Hoodie: false,
      Basic: false,
    },
  });

  /**
   * @param {string} category - The category of the filter (e.g., color, gender,type,price).
   * @param {string} filterName - The name of the filter option.
   */
  const handleFilterChange = (category, filterName) => {
    const updatedFilters = { ...filterChecking };
    updatedFilters[category][filterName] =
      !updatedFilters[category][filterName];
    setFilterChecking(updatedFilters);
    filterProductsPage(filterChecking);
  };

  //  the component mounts
  useEffect(() => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProductsItem(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  /**
   * Function to handle the search functionality.
   *
   * @param {string} query
   */
  const searchItems = (query) => {
    setSearch(query);
    const filteredType = productsItems.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredType);
  };

  const filterProductsPage = (filters) => {
    const { color, price, gender, type } = filters;

    const filterRange = [
      { range1: { min: 0, max: 250 } },
      { range2: { min: 250, max: 450 } },
      { range3: { min: 450, max: Infinity } },
    ];

    const filteredByFilters = productsItems.filter((product) => {
      const typeMatch = filterMatch(type, product.type);

      const priceMatch = filterPriceMatch(price, product.price, filterRange);

      return typeMatch && priceMatch;
    });

    setFilteredProducts(filteredByFilters);
  };

  const filterMatch = (filter, value) => {
    const selectedOptions = Object.keys(filter).filter(
      (key) => filter[key] === true
    );
    return selectedOptions.length === 0 || selectedOptions.includes(value);
  };

  const filterPriceMatch = (filter, price, ranges) => {
    const selectedRanges = Object.keys(filter).filter(
      (key) => filter[key] === true
    );
    return (
      selectedRanges.length === 0 ||
      selectedRanges.some((allowedRangeName) => {
        const range = ranges.find((item) => item[allowedRangeName]);
        if (range) {
          const { min, max } = range[allowedRangeName];
          return price > min && price <= max;
        }
        return false;
      })
    );
  };

  /**
   * mobile filter dialog.
   * @param {boolean} filter -
   */
  const filterMobile = (filter) => {
    setFilterQuery(!filter);
  };

  useEffect(() => {
    const saveCartItems = localStorage.getItem("cartItems");
    const saveItemQty = localStorage.getItem("itemQty");
    const saveCartQuantity = localStorage.getItem("cartQuantity");

    if (saveCartItems && saveCartItems.length > 2) {
      const parsedData = JSON.parse(saveCartItems);
      setCartQuantity(saveCartQuantity);
      setCartItems(parsedData);
    }
    if (saveItemQty && saveItemQty.length > 2) {
      const parsedData = JSON.parse(saveItemQty);
      setCountQty(parsedData);
    }
  }, []);

  useEffect(() => {
    const saveCartData = () => {
      getTotal();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("itemQty", JSON.stringify(countQty));
      localStorage.setItem("cartQuantity", Number(cartQuantity));
    };

    saveCartData();
  }, [cartItems, countQty, cartQuantity]);
  /*
   * calculated the total
   */
  const getTotal = () => {
    let totalPrice = 0;
    cartItems.forEach((cart) => {
      let price = cart.price * countQty[cart.id];
      totalPrice += price;
    });
    setTotalAmounts(totalPrice);
  };

  /**
   * Function to add a product to the cart.
   */

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const isDuplicate = prevCartItems.find((item) => item.id === product.id);
      if (!isDuplicate) {
        setCartQuantity((prevCartQuantity) => prevCartQuantity + 1);
        setCountQty((prevItemQty) => ({ ...prevItemQty, [product.id]: 0 }));
        return [...prevCartItems, product];
      }
      return prevCartItems;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              cartQuantity={cartQuantity}
              filterQuery={filterQuery}
              filterMobile={filterMobile}
              filterChecking={filterChecking}
              handleFilterChange={handleFilterChange}
              handleSearch={searchItems}
              filteredProducts={filteredProducts}
              addToCart={addToCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
