import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDepositAccounts } from '../../store/selectors';
import { setDepositAccounts, setReceiveAccount } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';

export default function useDepositAccounts() {
  const [loading, setLoading] = useState(false);
  const accounts = useAppSelector(getDepositAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await AccountRepository.list({ abortSignal: abortController.signal });
        dispatch(setDepositAccounts(data));
        dispatch(setReceiveAccount(data[0]));
        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    accounts,
  };
}
