import { RootState } from "../Store";
import { UserState } from "./UserReducer";

export const selectCurUser = (state:RootState)  => state.user.curUser;