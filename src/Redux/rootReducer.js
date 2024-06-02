import { combineReducers } from '@reduxjs/toolkit';
import auth from './Reducers/authSlice';
import cart from "./Reducers/cartSlice";
const appReducer = combineReducers({
    auth,
    cart,

})


const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action)
}


export default rootReducer