/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DQuickActionButton,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AccountTypeConfig } from '../services/config';
import useDepositAccounts from '../services/hooks/useDepositAccounts';
import useTransferTo from '../services/hooks/useTransferTo';
import { useAppSelector } from '../store/hooks';
import { getReceiveAccount } from '../store/selectors';

import AccountLoader from './loaders/AccountLoader';

export default function ReceiveFundsTo() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
  const { loading: loadingAccounts } = useDepositAccounts();
  const { loading: loadingTransfer, transfer } = useTransferTo();
  const receiveAccount = useAppSelector(getReceiveAccount);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className={classNames(
          'd-flex flex-column',
          'bg-white rounded shadow-sm',
          'gap-6 p-4 pb-8',
        )}
        >
          <h2 className="fs-4 fw-bold">
            {t('receiveFunds')}
          </h2>
          {loadingAccounts && (
            <AccountLoader />
          )}
          {!loadingAccounts && receiveAccount && (
            <DQuickActionButton
              line1={receiveAccount.name}
              key="1"
              line2={`••• ${receiveAccount.accountNumber.slice(-3)}`}
              representativeIcon={AccountTypeConfig[receiveAccount.type].icon}
              representativeIconTheme={AccountTypeConfig[receiveAccount.type].theme}
              representativeIconHasCircle
              actionLinkText={t('button.change')}
              onClick={() => openPortal('modalAccountSelector', undefined)}
            />
          )}
          <div className="d-flex justify-content-center">
            <DButton
              text={t('button.continue')}
              loading={loadingTransfer}
              onClick={transfer}
              {...!receiveAccount && {
                state: 'disabled',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
