/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import {
  MButton,
  MQuickActionButton,
  useModalContext,
} from '@dynamic-framework/ui-react';

import { useTranslation } from 'react-i18next';
import { ProductTypeConfig } from '@modyo-dynamic/modyo-service-retail';
import classNames from 'classnames';
import useSavingsAccounts from '../hooks/useSavingsAccounts';
import useTransferTo from '../hooks/useTransferTo';
import { useAppSelector } from '../store/hooks';
import { getReceiveAccount } from '../store/selectors';
import AccountSkeleton from './AccountSkeleton';

export default function ReceiveFundsTo() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { loading: loadingAccounts } = useSavingsAccounts();
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
            <MQuickActionButton
              line1={receiveAccount.name}
              key="1"
              line2={`••• ${receiveAccount.productNumber.slice(-3)}`}
              representativeIcon={ProductTypeConfig[receiveAccount.type].icon}
              representativeIconTheme={ProductTypeConfig[receiveAccount.type].theme}
              representativeIconHasCircle
              actionLinkText={t('button.change')}
              onMClick={() => openModal('accountSelector')}
            />
          )}
          <div className="d-flex justify-content-center">
            <MButton
              text={t('button.continue')}
              isPill
              isLoading={loadingTransfer}
              onMClick={transfer}
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
