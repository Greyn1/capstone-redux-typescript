import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { RootReducer } from './RootReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {compose, legacy_createStore as createStore, applyMiddleware} from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

//root-reducer
const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const Store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(Store);