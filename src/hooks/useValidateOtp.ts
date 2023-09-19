/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';
import { LoanRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getLoanOfferId } from '../store/selectors';
import { setStep } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useValidateOtp() {
  const [loading, setLoading] = useState(false);
  const loanDisplayId = useAppSelector(getLoanOfferId);
  const dispatch = useAppDispatch();

  const validateOtp = useCallback(async (otpCode: string) => {
    setLoading(true);
    const { perform } = LoanRepository.validateOtp(loanDisplayId, otpCode);
    try {
      await perform();
      dispatch(setStep('receiveTo'));
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
    validateOtp,
  };
}
