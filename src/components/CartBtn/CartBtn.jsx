import "./CartBtn.css";

// eslint-disable-next-line react/prop-types
function CartBtn({ children, ...props }) {
  // const handelClickBtn = (e) => {
  //   console.log(e.target);
  // };
  return (
    <button {...props} className="cart-btn">
      {children}
    </button>
  );
}

export default CartBtn;
