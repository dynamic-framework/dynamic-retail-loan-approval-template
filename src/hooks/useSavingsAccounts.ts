import { useEffect, useState } from 'react';
import { ProductRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSavingAccounts } from '../store/selectors';
import { setSavingAccounts, setReceiveAccount } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useSavingsAccounts() {
  const [loading, setLoading] = useState(false);
  const savingAccounts = useAppSelector(getSavingAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ProductRepository.list(['saving', 'checking']);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setSavingAccounts(data));
        if (data.length) {
          dispatch(setReceiveAccount(data[0]));
        }
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();

    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
    savingAccounts,
  };
}
