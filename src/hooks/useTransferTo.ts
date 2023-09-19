/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@dynamic-framework/ui-react';
import { LoanRepository, ApiError } from '@modyo-dynamic/modyo-service-retail';
import type { Product } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getLoanOfferId, getReceiveAccount } from '../store/selectors';
import { setStep } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useTransferTo() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const loanDisplayId = useAppSelector(getLoanOfferId);
  const receiveAccount = useAppSelector(getReceiveAccount) as Product;
  const dispatch = useAppDispatch();
  const transfer = useCallback(async () => {
    const {
      perform,
    } = LoanRepository.accept(loanDisplayId, receiveAccount?.id);
    try {
      setLoading(true);
      await perform();
      dispatch(setStep('loan'));
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      if (error instanceof ApiError) {
        if (error.includeDetail('NEGATIVE_TARGET_ACCOUNT_BALANCE')) {
          toast(t('toast.negativeBalance'));
        }

        if (error.includeDetail('PENDING_APPROVAL')) {
          toast(t('toast.pendingApproval'));
        }
      }
      errorHandler(error);
    }
  }, [t, toast, dispatch, loanDisplayId, receiveAccount?.id]);

  return {
    loading,
    transfer,
  };
}
