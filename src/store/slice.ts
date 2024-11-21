import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Account, DepositAccount, LoanReview } from '../services/interface';

export type Step = 'approval' | 'receiveTo' | 'loan';

export type WidgetState = {
  step: Step;
  loanOffer?: LoanReview;
  depositAccounts: Array<DepositAccount>;
  receiveAccount?: Account;
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
    setDepositAccounts(state, action: PayloadAction<Array<DepositAccount>>) {
      state.depositAccounts = action.payload;
    },
    setReceiveAccount(state, action: PayloadAction<Account | undefined>) {
      state.receiveAccount = action.payload;
    },
    setLoanOffer(state, action: PayloadAction<LoanReview>) {
      state.loanOffer = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  setStep,
  setDepositAccounts,
  setReceiveAccount,
  setLoanOffer,
} = slice.actions;
export default slice.reducer;
