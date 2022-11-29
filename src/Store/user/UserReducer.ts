import { AnyAction } from "redux";
import { UserData } from "../../Utils/Firebase";
import { setCurUser } from "./user.action";

export type UserState = {
    readonly curUser : UserData | null;
}

const INITIAL_STATE : UserState = {
    curUser: null
}

export const userReducer = (state = INITIAL_STATE, action : AnyAction) => {

    if(setCurUser.match(action)){
        return {
            ...state,
            curUser: action.payload
        }
    }

    return state;

    /* switch (type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                curUser: payload
            }
    
        default:
            return state;
    } */
}