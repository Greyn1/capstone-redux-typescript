import { UserState } from "./UserReducer";

export const selectCurUser = (state):UserState => state.user.curUser;