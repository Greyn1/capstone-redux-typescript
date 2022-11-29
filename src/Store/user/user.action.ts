import { USER_ACTION_TYPE } from "./user.types";
import {ActionWithPayload, createAction, withMatcher} from "../../Utils/reducer.utils";
import { UserData } from "../../Utils/Firebase";

export type SetCurUser = ActionWithPayload<USER_ACTION_TYPE.SET_CURRENT_USER, UserData>;

export const setCurUser = withMatcher((user) : SetCurUser => createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
