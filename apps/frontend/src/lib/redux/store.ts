import { configureStore } from "@reduxjs/toolkit";
import adsCustomerReducer from "./features/adsCustomer/adsCustomerSlice";

export const store = configureStore({
  reducer: {
    adsCustomer: adsCustomerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
