import { USER_ACTION_TYPE } from "./user.types";
import {createAction} from "../../Utils/reducer.utils";

export const setCurUser = (user) => createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
