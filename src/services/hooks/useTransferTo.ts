import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLoanOfferId, getReceiveAccount } from '../../store/selectors';
import { setStep } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { LoanRepository } from '../repositories';

export default function useTransferTo() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const loanDisplayId = useAppSelector(getLoanOfferId);
  const receiveAccount = useAppSelector(getReceiveAccount);

  const transfer = useCallback(async () => {
    const abortController = new AbortController();
    if (receiveAccount) {
      try {
        setLoading(true);
        await LoanRepository.accept(
          loanDisplayId,
          receiveAccount.id,
          { abortSignal: abortController.signal },
        );
        dispatch(setStep('loan'));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        errorHandler(error);
      }
    }
  }, [dispatch, loanDisplayId, receiveAccount]);

  return {
    loading,
    transfer,
  };
}
