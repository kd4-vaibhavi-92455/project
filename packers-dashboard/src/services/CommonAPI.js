import { useState, useEffect } from "react";
import { getData, postData } from "./ServerServices";

export const useFetchData = (url, rowKey = "id") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await getData(url);
      const dataset = response?.data?.data?.map((item, index) => ({
        ...item,
        [rowKey]: item[rowKey] || index + 1, 
      }));
      setData(dataset);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

// categories---------------------------
// fetch all categories
export const fetchAllCategories = async() =>{
    try{
        const response = await getData("category/fetch-categories");
        // console.log("the response is..",response.data.data);
        return response.data.data;
    }catch(error){
        console.log("error is the..",error)
    }
}

// grouped-categories
export const fetchGroupedCategories = async() =>{
  try{
      const response = await getData("category/grouped-categories");
      // console.log("50...the fetchGroupedCategories response :   ",response.data.data);
     
      return response.data.data;
  }catch(error){
      console.log("error is the..",error)
  }
}

// products-----------------------------
// fetch all categories
export const fetchAllProducts = async() =>{
  try{
      const response = await getData("products/fetch-products");
      // console.log("the response is..",response.data.data);
      return response.data.data;
  }catch(error){
      console.log("error is the..",error)
  }
}

// fetch-product-by-id
export const fetchProductsByID = async(id) =>{
  const payload = {
    productsid: id,
  };
  try{
      const response = await postData(
        "products/fetch-product-by-id",
        payload
        );
      return response.data.data;
  }catch(error){
      console.log("error is the..",error)
  }
}

// product list items-------------------
export const fetchProductItemDetails = async(id) =>{
  console.log("##item")
  const payload = {
    productlistid: 10,
  };
  try{
      const response = await postData("product-list/fetch-item-by-id",payload);
      console.log("##item details @: ",response.data?.data[0])
      return response.data?.data[0];
  }catch(error){
      console.log("error is the..",error)
  }
}


