/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setStep } from '../../store/slice';

export default function useAcceptLoan() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const acceptLoan = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setStep('otp'));
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  return {
    loading,
    acceptLoan,
  };
}
