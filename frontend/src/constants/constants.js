export const API_BASE_URL = "https://pasovit-ecommerce.onrender.com";
//"https://pasovit-ecommerce.onrender.com" || "http://localhost:8080"
//Login
export const LOGIN_API = `${API_BASE_URL}/api/user/login`;

// Register
export const REGISTER_API = `${API_BASE_URL}/api/user/register`;

// categoriess
export const ALL_CATEGORIES_API = `${API_BASE_URL}/api/all-categories`;
export const ADD_CATEGORIES_API = `${API_BASE_URL}/api/admin-add-categories`;
export const UPDATE_CATEGORIES_API = `${API_BASE_URL}/api/category`;
export const DELETE_CATEGORIES_API = `${API_BASE_URL}/api/category`;

// products
export const ADD_PRODUCTS_API = `${API_BASE_URL}/api/admin/add-products`;
export const ALL_PRODUCTS_API = `${API_BASE_URL}/api/all-products`;
export const UPDATE_PRODUCT_API = `${API_BASE_URL}/api/product`;
export const DELETE_PRODUCT_API = `${API_BASE_URL}/api/product`;
export const FILTER_CATEGORY_API = `${API_BASE_URL}/api/products/category`;

// cartItems

export const ADD_TO_CART_API = `${API_BASE_URL}/api/add/cart-items`;
export const GET_ALL_TO_CART_API = `${API_BASE_URL}/api/get/cart-items`;
export const UPDATE_ADD_TO_CART_API = `${API_BASE_URL}/api/update/cart-items`;
export const DELETE_ADD_TO_CART_API = `${API_BASE_URL}/api/delete/cartItem`;

// orders

export const ADD_ORDER_ITEM_API = `${API_BASE_URL}/api/add/order-item`;
export const GET_ALL_ORDER_ITEMS_API = `${API_BASE_URL}/api/get/order-items`;
export const DELETE_ORDER_ITEM_API = `${API_BASE_URL}/api/delete/order-item`;
