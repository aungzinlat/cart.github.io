import Swal from "sweetalert2";
import { productRender, removeCartAddedBtn } from "../app/product";
import {
  app,
  cartItems,
  cartUi,
  categoryLists,
  defaultSearch,
  searchBtn,
  totalAmount,
} from "./selectors";
import { products } from "./variables";

export const cartBtnHandler = () => {
  cartUi.classList.toggle("translate-x-full");
  cartUi.classList.add("duration-400");
};

export const categoryListsHandler = (event) => {
  if (event.target.classList.contains("category-badge")) {
    const currentCategoryBtn = event.target;
    const currentCategory = currentCategoryBtn.innerText.toLowerCase();
    const lastActiveCategoryBtn = app.querySelector(".category-badge.active");
    lastActiveCategoryBtn.classList.toggle("active");

    // console.log(currentCategory);

    currentCategoryBtn.classList.add("active");
    productRender(
      products.filter(
        (product) =>
          product.category === currentCategory || currentCategory === "all"
      )
    );
  }
};

export const orderNowHandler = (event) => {
  Swal.fire({
    title: "Are you ready to order?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Confirm",
  }).then((result) => {
    // customer_id, product_id, quantity, total, time
    if (result.isConfirmed) {
      const customer_id = Math.floor(Math.random() * 10000);
      const total = parseFloat(totalAmount.innerText);
      const time = Date.now();
      const order_items = [];
      app.querySelectorAll(".cart-item").forEach((el) => {
        const productId = parseInt(el.getAttribute("product-id"));
        const quantity = parseInt(el.querySelector(".cart-q").innerText);

        order_items.push({
          product_id: productId,
          quantity: quantity,
        });

        el.remove();

        removeCartAddedBtn(productId);
        Swal.fire(
          "Order Confirmed!",
          "Your order has been confirmed.",
          "success"
        );
      });

      const order = { customer_id, time, order_items, total };
      console.log(order);
    }
  });
};

//search Handlers
export const searchBtnHandler = () => {
  defaultSearch.classList.replace("hidden", "block");
  searchBtn.classList.add("hidden");
  defaultSearch.value = null;
  defaultSearch.focus();
};

export const defaultSearchKeyUpHandler = () => {
  const text = defaultSearch.value;
  productRender(
    products.filter(
      (product) => product.title.toLowerCase().search(text.toLowerCase()) >= 0
    )
  );
};

export const defaultSearchBlurHandler = () => {
  defaultSearch.classList.replace("block", "hidden");
  searchBtn.classList.remove("hidden");
};
