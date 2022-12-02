import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { RootReducer } from './RootReducer';
import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import {compose, legacy_createStore as createStore, applyMiddleware, Middleware} from 'redux';

export type RootState = ReturnType<typeof RootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist : (keyof RootState)[]
}

const persistConfig : ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

//root-reducer
const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter((middleware) : middleware is Middleware => Boolean(middleware));
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const Store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(Store);