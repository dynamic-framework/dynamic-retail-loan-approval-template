/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setStep } from '../../store/slice';

export default function useValidateOtp() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validateOtp = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setStep('receiveTo'));
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  return {
    loading,
    validateOtp,
  };
}
