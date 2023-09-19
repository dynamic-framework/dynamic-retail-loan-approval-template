import { useEffect, useState } from 'react';
import { LoanRepository } from '@modyo-dynamic/modyo-service-retail';
import { liquidParser } from '@dynamic-framework/ui';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoanOffer } from '../store/slice';
import errorHandler from '../utils/errorHandler';
import { getLoanOffer } from '../store/selectors';

export default function useGetLoan() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const loanOffer = useAppSelector(getLoanOffer);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loanId = urlParams.get('loan_id');
    if (!loanId) {
      window.location.href = `${liquidParser.parse('{{site.url}}')}/${liquidParser.parse('{{vars.none-id-path}}')}`;
      return () => {};
    }
    const {
      perform,
      abort,
    } = LoanRepository.review(loanId);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setLoanOffer(data));
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
        setLoading(false);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
    loanOffer,
  };
}
