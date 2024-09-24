import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org';

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}.json`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const searchProductsByName = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cgi/search.pl?search_terms=${query}&json=true`
    );
    return response.data.products;
  } catch (error) {
    console.error('Error searching for products:', error);
    throw error;
  }
};

export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v0/product/${barcode}.json`
    );
    return response.data.product;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    throw error;
  }
};

// New function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.json`);
    return response.data.categories; // Assuming the response has a categories property
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
