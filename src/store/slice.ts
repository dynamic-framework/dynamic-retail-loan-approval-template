import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Loan, Product } from '@modyo-dynamic/modyo-service-retail';

export type Step = 'approval' | 'otp' | 'receiveTo' | 'loan';

export type WidgetState = {
  step: Step;
  loanOffer?: Loan;
  savingAccounts: Array<Product>;
  receiveAccount?: Product;
};

const initialState = {
  step: 'approval',
  savingAccounts: [],
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setSavingAccounts(state, action: PayloadAction<Array<Product>>) {
      state.savingAccounts = action.payload;
    },
    setReceiveAccount(state, action: PayloadAction<Product | undefined>) {
      state.receiveAccount = action.payload;
    },
    setLoanOffer(state, action: PayloadAction<Loan>) {
      state.loanOffer = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  setStep,
  setSavingAccounts,
  setReceiveAccount,
  setLoanOffer,
} = slice.actions;
export default slice.reducer;
