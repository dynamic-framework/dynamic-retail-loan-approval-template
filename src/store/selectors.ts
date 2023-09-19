import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getLoanOffer = createDraftSafeSelector(
  getState,
  (widget) => widget.loanOffer,
);

export const getLoanOfferId = createDraftSafeSelector(
  getLoanOffer,
  (loan) => loan?.loanDisplayId as string,
);

export const getStep = createDraftSafeSelector(
  getState,
  (widget) => widget.step,
);

export const getSavingAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.savingAccounts,
);

export const getReceiveAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.receiveAccount,
);
