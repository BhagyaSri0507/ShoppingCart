import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import CartItem from "./CartItem";

const Header = (props) => {
  const cart = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let totalAmount = 0;
  for (var i = 0; i < cart.length; i++) {
    totalAmount += parseInt(cart[i].totalCost);
  }
  // console.log(cart);
  return (
    <>
      <div className="header-wrapper">
        <img src="/static/images/logo.png" alt="logo" className="logo-img" />
        <div>
          <NavLink to="/" end className="nav-links">
            Home
          </NavLink>
          <NavLink to="/products" className="nav-links">
            Products
          </NavLink>
        </div>
        <div>
          <button onClick={handleShow}>
            <img src="/static/images/cart.svg" alt="cart-logo" width={30} />
            {`${cart.length} items`}
          </button>
          {/* <NavLink to="/login" className="nav-links">
          Sign In
        </NavLink>
        <NavLink to="/register" className="nav-links">
          Register
        </NavLink> */}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{`My Cart (${cart.length} item/s)`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length == 0 && <div>No items in the cart</div>}
          {cart.length > 0 &&
            cart.map((product) => (
              <div key={product.id} className="product-in-cart cart-modal">
                <CartItem product={product} />
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          {cart.length > 0 && (
            <Button variant="secondary" onClick={handleClose}>
              Proceed Checkout
              <span>Rs.{totalAmount}</span>
            </Button>
          )}
          {cart.length == 0 && (
            <Button variant="secondary" onClick={handleClose}>
              Start Shopping
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Header;
