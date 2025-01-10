import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DepositAccount, LoanReview } from '../services/interface';

export type Step = 'approval' | 'receiveTo' | 'loan';

export type WidgetState = {
  step: Step;
  loanOffer?: LoanReview;
  depositAccounts: DepositAccount[];
  receiveAccount?: DepositAccount;
};

const initialState = {
  step: 'approval',
  depositAccounts: [],
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setDepositAccounts(state, action: PayloadAction<DepositAccount[]>) {
      state.depositAccounts = action.payload;
    },
    setReceiveAccount(state, action: PayloadAction<DepositAccount | undefined>) {
      state.receiveAccount = action.payload;
    },
    setLoanOffer(state, action: PayloadAction<LoanReview>) {
      state.loanOffer = action.payload;
    },
  },
});

export const {
  setStep,
  setDepositAccounts,
  setReceiveAccount,
  setLoanOffer,
} = slice.actions;
export default slice.reducer;
