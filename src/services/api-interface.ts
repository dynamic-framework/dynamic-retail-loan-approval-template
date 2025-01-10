export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  messageCode: string;
  detail: string;
};

export type ApiResponseWrapped<T> = {
  content: T;
};

export type ApiAccount = {
  id: string;
  number: string;
  masked_number: string;
  account_holder_name: string;
};

export type ApiDepositDetails = {
  balances: {
    total: number;
    available: number;
    unavailable: number;
  }
  overdraft?: {
    limit: number;
    total: number;
    available: number;
    expiryDate: string; // ISO8601
  };
  maturityDate?: string; // ISO8601
  interest: {
    accrued: number;
    accruedNegative: number;
    settings?: {
      rateSettings?: {
        rate?: number;
        tiers?: number;
        terms?: string;
        source?: string;
      };
      paymentPoint: string;
      paymentDates: Array<Record<string, unknown>>;
    }
  }
};

export type ApiLoanDetails = {
  amount: number;
  balances: {
    owed: number;
    remaining: number;
  }
  due: number;
  daysInArrears: number;
  daysLate: number;
  dueSinceDate: string;
  installments: number;
  interest: {
    accrued: number;
    accruedInBillingCycle: number;
    accruedFromArrears: number;
    settings: {
      rate: number;
      rates: null;
      type: string;
      source: string;
    };
  };
};

export type ApiLoanReview = {
  application_id: string;
  application_date: string;
  loan_details: {
    simulation_id: string;
    offer_id: string;
    loan_amount: number;
    loan_total: number;
    rate_settings: {
      monthly_rate: number;
      yearly_rate: number;
      calculation_method: string;
    };
    installments: {
      amount: number;
      term: {
        count: number;
        description: string;
        period: {
          id: string;
          name: string;
          code: string;
        };
      };
    };
    transaction_fee: number;
  };
  status: string;
  status_date: string;
};

export type ApiLoanAccepted = {
  depositId: string;
  confirmationId: string;
};
