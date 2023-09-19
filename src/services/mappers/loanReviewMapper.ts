import type { ApiLoanAccepted, ApiLoanReview } from '../api-interface';
import { LoanAccepted, LoanReview } from '../interface';

export function loanReviewMapper(apiLoanReview: ApiLoanReview): LoanReview {
  return {
    ...apiLoanReview,
  };
}

export function loanAcceptMapper(apiAccept: ApiLoanAccepted): LoanAccepted {
  return {
    ...apiAccept,
  };
}
