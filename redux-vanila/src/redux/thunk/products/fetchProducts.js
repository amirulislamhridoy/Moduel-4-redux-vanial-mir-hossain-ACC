import { loadProduct } from "../../actions/productAction";

const loadProductData = () => {
  return async (dispatch, getState) => {
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();
    
    if (data.length) {
      dispatch(loadProduct(data));
    }
  };
};

export default loadProductData;
