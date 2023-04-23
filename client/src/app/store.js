import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sliceReducers from "../state/reducer";
import productSliceReducers from "../state/productSlice";
import geoSliceReducers from "../state/geoSlice";
import customerSliceReducers from "../state/customerSlice";
import transactionSliceReducers from "../state/transactionSlice";
import monthSliceReducers from "../state/month";
import last7DaysSliceReducers from "../state/last7Days";
import totalDataSliceReducers from "../state/totalData";
import last30DaysSliceReducers from "../state/last30Days";
import orderSliceReduces from "../state/orders";
import cartSliceReducers from "../state/cartSlice";
import contactSliceReducers from "../state/contact";
import userOrderSliceReducers from "../state/userOrders";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: sliceReducers,
  product: productSliceReducers,
  geo: geoSliceReducers,
  customers: customerSliceReducers,
  transactions: transactionSliceReducers,
  month: monthSliceReducers,
  last7Days: last7DaysSliceReducers,
  totalData: totalDataSliceReducers,
  last30Days: last30DaysSliceReducers,
  order: orderSliceReduces,
  cart: cartSliceReducers,
  contact: contactSliceReducers,
  userOrder: userOrderSliceReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
