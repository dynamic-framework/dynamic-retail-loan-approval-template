import { GenericAbortSignal } from 'axios';

import { ApiLoanAccepted, ApiLoanReview } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { loanAcceptMapper, loanReviewMapper } from '../mappers/loanReviewMapper';

export async function review(
  loanId: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiLoanReview>({
    url: '/loan/offer/review',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200',
    },
    params: {
      account_id: loanId,
    },
  });

  return loanReviewMapper(data);
}

export async function accept(
  loanDisplayId: string,
  receiveAccountId: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiLoanAccepted>({
    url: '/loan/offer/accept',
    method: 'POST',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200',
    },
    data: {
      loanId: loanDisplayId,
      depositId: receiveAccountId,
    },
  });

  return loanAcceptMapper(data);
}
