export const API_BASE_URL = "http://localhost:8080";

export const LOGIN_API = `${API_BASE_URL}/api/user/login`;

export const REGISTER_API = `${API_BASE_URL}/api/register`;

// categories
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
