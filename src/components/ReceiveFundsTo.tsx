import {
  DButton,
  DCard,
  DSelect,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import useDepositAccounts from '../services/hooks/useDepositAccounts';
import useTransferTo from '../services/hooks/useTransferTo';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getReceiveAccount } from '../store/selectors';
import { setReceiveAccount } from '../store/slice';

import AccountLoader from './loaders/AccountLoader';

export default function ReceiveFundsTo() {
  const { t } = useTranslation();
  const { loading: loadingAccounts } = useDepositAccounts();
  const { loading: loadingTransfer, transfer } = useTransferTo();
  const receiveAccount = useAppSelector(getReceiveAccount);
  const accounts = useAppSelector(getDepositAccounts);
  const dispatch = useAppDispatch();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <DCard>
          <DCard.Body className="d-flex flex-column gap-4">
            <h2 className="fs-4 fw-bold">
              {t('receiveFunds')}
            </h2>
            {loadingAccounts && (
              <AccountLoader />
            )}
            {!loadingAccounts && receiveAccount && (
              <DSelect
                onChange={(account) => {
                  if (!account) return;
                  dispatch(setReceiveAccount(accounts.find((a) => a.id === account.id)));
                }}
                getOptionLabel={(option) => option.accountHolderName}
                getOptionValue={(option) => option.id}
                options={accounts}
              />
            )}
            <div className="d-flex justify-content-center">
              <DButton
                text={t('button.continue')}
                loading={loadingTransfer}
                onClick={transfer}
              />
            </div>
          </DCard.Body>
        </DCard>
      </div>
    </div>
  );
}
