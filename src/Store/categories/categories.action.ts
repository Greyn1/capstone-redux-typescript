import {Action, ActionWithPayload, createAction, withMatcher} from "../../Utils/reducer.utils";
import { CATEGORIES_ACTION_TYPE, Category } from "./categories.types";
import { getCategoriesAndDocuments } from "../../Utils/Firebase";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../Store";
import { AnyAction } from "redux";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher(():FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray:Category[]):FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export const fetchCategoriesFailed = withMatcher((error:any):FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error));

  
export const fetchCategoriesAsync = ():ThunkAction<void, RootState, unknown, AnyAction> => {
   return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
   }
}