import { useAppSelector } from "@/hooks/redux.hooks";
import { getItem, setItem } from "@/utils/localstorage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AdsCustomerState {
  customers: string[];
  selectedCustomer?: string | undefined;
}

const localstorageKey = "customers";

const initialState: AdsCustomerState = {
  customers: getItem(localstorageKey) || [],
  selectedCustomer: "",
};

const adsCustomerSlice = createSlice({
  name: "adsCustomer",
  initialState,
  reducers: {
    addAllCustomer: (state, action: PayloadAction<{ customers: string[] }>) => {
      const allCustomers = action.payload.customers.map((customer) =>
        customer.replace("customers/", ""),
      );
      state.customers = allCustomers;
      setItem(localstorageKey, allCustomers);
    },
    addNewCustomer: (state, action: PayloadAction<{ customerId: string }>) => {
      const updatedData = [...state.customers, action.payload.customerId];
      state.customers = updatedData;
      setItem(localstorageKey, updatedData);
    },
    selectCustomer: (state, action: PayloadAction<{ customerId: string }>) => {
      state.selectedCustomer = action.payload.customerId;
    },
  },
});

export const { addAllCustomer, addNewCustomer, selectCustomer } =
  adsCustomerSlice.actions;
export const useAdsCustomer = () =>
  useAppSelector((state) => state.adsCustomer);
export default adsCustomerSlice.reducer;
