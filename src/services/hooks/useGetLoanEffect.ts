import { getQueryString } from '@dynamic-framework/ui-react';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLoanOffer } from '../../store/selectors';
import { setLoanOffer } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import WidgetUtils from '../../utils/widgetUtils';
import { LoanRepository } from '../repositories';

export default function useGetLoanEffect() {
  const [loading, setLoading] = useState(false);
  const loanOffer = useAppSelector(getLoanOffer);
  const dispatch = useAppDispatch();
  const { goToPath } = WidgetUtils();
  useEffect(() => {
    const abortController = new AbortController();

    const loanId = getQueryString('loan_id');
    if (!loanId) {
      goToPath('EMPTY_ID');
      return () => {};
    }
    (async () => {
      setLoading(true);
      try {
        const data = await LoanRepository.review({
          loanId,
          config: { abortSignal: abortController.signal },
        });
        dispatch(setLoanOffer(data));
        setLoading(false);
      } catch (error) {
        errorHandler(error);
        setLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch, goToPath]);

  return {
    loading,
    loanOffer,
  };
}
