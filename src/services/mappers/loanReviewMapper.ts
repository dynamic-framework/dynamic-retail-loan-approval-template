import type { ApiLoanAccepted, ApiLoanReview } from '../api-interface';
import { LoanAccepted, LoanReview } from '../interface';

export function loanReviewMapper(apiLoanReview: ApiLoanReview): LoanReview {
  return {
    loanId: apiLoanReview.application_id,
    loanDisplayId: apiLoanReview.application_id,
    details: {
      accountId: apiLoanReview.application_id,
      amount: apiLoanReview.loan_details.loan_amount,
      total: apiLoanReview.loan_details.loan_total,
      installments: {
        count: apiLoanReview.loan_details.installments.term.count,
        amount: apiLoanReview.loan_details.installments.amount,
        period: apiLoanReview.loan_details.installments.term.period.name,
      },
      interestRate: {
        annually: apiLoanReview.loan_details.rate_settings.yearly_rate,
        monthly: apiLoanReview.loan_details.rate_settings.monthly_rate,
      },
    },
  };
}

export function loanAcceptMapper(apiAccept: ApiLoanAccepted): LoanAccepted {
  return {
    depositId: apiAccept.depositId,
    confirmationId: apiAccept.confirmationId,
  };
}
