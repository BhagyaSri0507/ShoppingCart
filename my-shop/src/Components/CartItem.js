import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../actions/cart";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.product.quantity);
  const { id, imageURL, quantity: qnt, price,name ,totalCost} = props.product;
  const dispatch = useDispatch();
  const decrementQuantity = () => {
    const newQuantity = (parseInt(props.product.quantity) - 1).toString();
    setQuantity(newQuantity);
    dispatch(updateQuantity(props.product.id, newQuantity));
  };
  const incrementQuantity = () => {
    const newQuantity = (parseInt(props.product.quantity) + 1).toString();
    setQuantity(newQuantity);
    dispatch(updateQuantity(props.product.id, newQuantity));
  };

  const changeQuantity = (id, e) => {
    const quantity = e.target.value;
    quantity > 1
      ? dispatch(updateQuantity(id, quantity))
      : dispatch(updateQuantity(id, "1"));
    if (!quantity || quantity.match(/^[1-9]\d*$/)) {
      setQuantity(quantity);
    }
  };
  const handleRemove = () => {
    dispatch(removeItem(props.product.id));
  };
  return (
    <>
      <div className="item-details">
        <img
          src={imageURL}
          alt={name}
          className="item-image"
          width={100}
          height={100}
        />
        <div className="quantity-box">
        <div className="item-name"><b>{name}</b></div>
        <div className="wrap-box row">
        <div className="text-center col-md-4">
          <button
            disabled={qnt > 1 ? false : true}
            onClick={decrementQuantity}
            className="btn-decrement"
          >
            -
          </button>
          <input
            className="txtQuantity"
            type="text"
            value={quantity}
            onChange={(e) => changeQuantity(id, e)}
          />
          <button onClick={incrementQuantity} className="btn-increment">
            +
          </button>
        </div>
        <button className="btnRemove col-md-4" onClick={handleRemove}>
          Remove
        </button>
        <span className="col-md-4"><b>{totalCost} INR</b></span>
        </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
