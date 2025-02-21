import {
  ApiLoanAccepted,
  ApiLoanReview,
  ApiResponseWrapped,
} from '../api-interface';
import ApiClient from '../clients/apiClient';
import { loanAcceptMapper, loanReviewMapper } from '../mappers/loanReviewMapper';

import { RepositoryParams } from './repository';

export async function review(params: RepositoryParams<{ loanId: string }>) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiLoanReview>>({
    url: 'loan-applications/LOAN/LOAN/application/check-status',
    method: 'GET',
    signal: params.config?.abortSignal,
    params: {
      account_id: params.loanId,
    },
  });

  return loanReviewMapper(data.content);
}

export async function accept(params: RepositoryParams<{ loanId: string; receiveId: string }>) {
  const { data } = await ApiClient.request<ApiLoanAccepted>({
    url: 'generics',
    method: 'POST',
    signal: params.config?.abortSignal,
    data: {
      loanId: params.loanId,
      depositId: params.receiveId,
    },
  });

  return loanAcceptMapper(data);
}
