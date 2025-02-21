export type DepositAccount = {
  id: string;
  number: string;
  maskedNumber: string;
  accountName: string;
};

export type LoanReview = {
  loanId: string;
  loanDisplayId: string;
  details: {
    accountId: string;
    amount: number;
    total: number;
    installments: {
      count: number;
      amount: number;
      period: string;
    },
    interestRate: {
      annually: number;
      monthly: number;
    }
  }
};

export type LoanAccepted = {
  depositId: string;
  confirmationId: string;
};
