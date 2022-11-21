import { combineReducers } from "redux";
import { cartReducer } from "./cart/CartReducer";
import { categoriesReducer } from "./categories/CategoriesReducer";
import { userReducer } from "./user/UserReducer";

export const RootReducer = combineReducers({
    user : userReducer,
    categories : categoriesReducer,
    cart : cartReducer
})