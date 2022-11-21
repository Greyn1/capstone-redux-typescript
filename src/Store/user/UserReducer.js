const INITIAL_STATE = {
    curUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                curUser: payload
            }
    
        default:
            return state;
    }
}