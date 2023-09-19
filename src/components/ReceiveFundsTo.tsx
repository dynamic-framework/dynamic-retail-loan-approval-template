/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DQuickActionButton,
  useModalContext,
} from '@dynamic-framework/ui-react';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useAppSelector } from '../store/hooks';
import { getReceiveAccount } from '../store/selectors';
import AccountSkeleton from './AccountSkeleton';
import useDepositAccounts from '../services/hooks/useDepositAccounts';
import useTransferTo from '../services/hooks/useTransferTo';
import { AccountTypeConfig } from '../services/config';

export default function ReceiveFundsTo() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { loading: loadingAccounts } = useDepositAccounts();
  const { loading: loadingTransfer, transfer } = useTransferTo();
  const receiveAccount = useAppSelector(getReceiveAccount);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className={classNames(
          'd-flex flex-column',
          'bg-white rounded shadow-sm',
          'gap-4 p-3 pb-5',
        )}
        >
          <h2 className="fs-4 fw-bold">
            {t('receiveFunds')}
          </h2>
          {loadingAccounts && (
            <AccountSkeleton />
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
              onEventClick={() => openModal('accountSelector')}
            />
          )}
          <div className="d-flex justify-content-center">
            <DButton
              text={t('button.continue')}
              isPill
              isLoading={loadingTransfer}
              onEventClick={transfer}
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
