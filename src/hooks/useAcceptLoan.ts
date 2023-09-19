/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';
import { LoanRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setStep } from '../store/slice';
import errorHandler from '../utils/errorHandler';
import { getLoanOfferId } from '../store/selectors';

export default function useAcceptLoan() {
  const [loading, setLoading] = useState(false);
  const loanDisplayId = useAppSelector(getLoanOfferId);
  const dispatch = useAppDispatch();

  const acceptLoan = useCallback(async () => {
    setLoading(true);
    const { perform } = LoanRepository.requestOtp(loanDisplayId);
    try {
      await perform();
      dispatch(setStep('otp'));
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      errorHandler(error);
      throw error;
    }
  }, [dispatch, loanDisplayId]);

  return {
    loading,
    acceptLoan,
  };
}
