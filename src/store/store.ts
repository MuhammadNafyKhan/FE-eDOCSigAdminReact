import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [];
middleware.push(sagaMiddleware);
middleware.push(sagaMiddleware);
const config = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(config, rootReducer);
// // const enhancers = [applyMiddleware(...middleware)];
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
