import { CategoryAction } from "./categories.action";
import { CATEGORIES_ACTION_TYPE, Category } from "./categories.types";

export type CategoriesState = {
    readonly categories : Category[];
    readonly isLoading : boolean;
    readonly error : Error|null;
}

const CATEGORIES_INITIAL_STATE:CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action={} as CategoryAction) => {

    switch (action.type) {
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
            return {...state, isLoading: true}

        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload, isLoading: false}

        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
            return {...state, isLoading: false, error: action.payload}

        default:
            return state;
    }
}