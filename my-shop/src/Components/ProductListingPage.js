import React, { useEffect, useState } from "react";
import api from "../api/baseUrl";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, updateQuantity } from "../actions/cart";

const ProductsListingPage = (props) => {
  const cart = useSelector((state) => state.cart);
  //const inCart=!!cart.find(product => product.id === props.match.params.id) ? true : false
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [categoryInfo, setCatergoryDetails] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [currentMenu, setCurrentMenu] = useState([]);
  const [currentMenuId, setCurrentMenuId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const categoryInfoFunc = async () => {
      const categoryDetails = await getCatergoryInfo();
      if (categoryDetails) {
        categoryDetails.sort((a, b) => {
          return a.order - b.order;
        });
        setCatergoryDetails(categoryDetails.filter((info) => info.enabled));
      }
    };
    categoryInfoFunc();

    const productsInfo = async () => {
      const productDetails = await getProductsInfo();
      if (productDetails) {
        setProductsList(productDetails);
      }
    };
    productsInfo();
  }, []);
  useEffect(() => {
    if (categoryInfo.length > 0) {
      state ? changeCategory(state) : changeCategory(categoryInfo[0].id);
    }
  }, [productsList]);

  useEffect(()=>{
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 500);
  },[show]);

  const getCatergoryInfo = async () => {
    const response = await api.get("/categories");
    return response.data;
  };
  const getProductsInfo = async () => {
    const response = await api.get("/products");
    return response.data;
  };

  const changeCategory = (id) => {
    const products = productsList.filter((item) => item.category == id);
    setCurrentMenu(products);
    setCurrentMenuId(id);
  };
  const updateExistingItem = (id) => {
    const itemToUpdate = cart.find((product) => product.id == id);
    dispatch(updateQuantity(id, parseInt(itemToUpdate.quantity)+1));
  };
  const addToCart = (id) => {
    const inCart = !!cart.find((product) => product.id == id);
    const item = productsList.find((product) => product.id === id);
    inCart ? updateExistingItem(id) : dispatch(addItemToCart(item));
   setShow(true);
  };

  return (
    <div className="page-wrapper">
      
      <div className="sidebar">
        <ul>
          {categoryInfo.length > 0 &&
            categoryInfo.map((info) => {
              return (
                <li
                  key={info.key}
                  className={`sidebar-item ${
                    info.id == currentMenuId ? "active" : ""
                  } `}
                  onClick={() => changeCategory(info.id)}
                >
                  {info.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="content position-relative">
      {show && <div className="alert-block">Item added to cart Successfully</div>}
        {currentMenu.length > 0 && (
          <div className="items-wrap">
            {currentMenu.map((item) => {
              return (
                <div className="product-item" key={item.id}>
                  <div className="product-name">{item.name}</div>
                  <div className="product-img">
                    <img src={item.imageURL} alt={item.name} />
                  </div>
                  <div className="product-desc">{item.description}</div>
                  <div className="add-item">
                    <span>{`MRP RS.${item.price}`}</span>
                    <span>
                      <button
                        className="product-btn"
                        onClick={() => addToCart(item.id)}
                      >
                        Buy Now
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductsListingPage;
