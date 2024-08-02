import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getLoanOffer = createSelector(
  getState,
  (widget) => widget.loanOffer,
);

export const getLoanOfferId = createSelector(
  getLoanOffer,
  (loan) => loan?.loanDisplayId as string,
);

export const getStep = createSelector(
  getState,
  (widget) => widget.step,
);

export const getDepositAccounts = createSelector(
  getState,
  (widget) => widget.depositAccounts,
);

export const getReceiveAccount = createSelector(
  getState,
  (widget) => widget.receiveAccount,
);
