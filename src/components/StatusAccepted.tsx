/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  useFormatCurrency,
  DButton,
  DTooltip,
  DIcon,
  DCurrencyText,
  DCard,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';

import { USER_NAME } from '../config/widgetConfig';
import useAcceptLoan from '../services/hooks/useAcceptLoan';
import { useAppSelector } from '../store/hooks';
import { getLoanOffer } from '../store/selectors';

export default function StatusAccepted() {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  const loanOffer = useAppSelector(getLoanOffer);
  const { details, loanDisplayId } = loanOffer!;
  const { loading, acceptLoan } = useAcceptLoan();

  return (
    <div className="row">
      <div className="col-12 col-lg-6 d-flex flex-column gap-2 justify-content-center align-items-center">
        <div className="d-block">
          <img
            src="https://cloud.modyocdn.com/uploads/76af59d5-6b1d-4ba2-8a97-343399de1c71/original/congratulations.png"
            alt="Accepted"
            height={256}
          />
        </div>
        <h2 className="fs-4 fw-bold text-dark text-center">
          {t('status.accepted.text', { name: USER_NAME })}
        </h2>
        <h3 className="fs-6 fw-bold text-dark text-center">
          {t('status.accepted.secondaryText')}
        </h3>
        <p className="py-4 px-8 text-center">
          {t('status.accepted.message')}
        </p>
      </div>
      <div className="col-12 col-lg-6">
        <DCard>
          <DCard.Body className="d-flex flex-column gap-4">
            <h4 className="fw-bold">
              {t('status.accepted.conditions.text')}
            </h4>
            <div className="d-flex align-items-center gap-1 bg-secondary-soft rounded-1 p-4">
              <Trans
                i18nKey="status.accepted.conditions.totalToPay"
                values={{ amount: format(details.total) }}
                components={{
                  1: <span className="fw-bold" />,
                  2: <span className="fw-bold fs-5" />,
                }}
              />
            </div>
            <div className="d-flex flex-column gap-4 bg-secondary-soft rounded-1 p-4">
              <div className="d-flex gap-4">
                <span className="flex-grow-1">{t('status.accepted.conditions.loanId')}</span>
                <span className="fw-bold">{loanDisplayId}</span>
              </div>
              <div className="d-flex gap-4">
                <span className="flex-grow-1">{t('status.accepted.conditions.amountRequested')}</span>
                <DCurrencyText
                  className="fw-bold"
                  value={details.amount}
                />
              </div>
              <div className="d-flex gap-4">
                <span className="flex-grow-1">{t('status.accepted.conditions.term')}</span>
                <span className="fw-bold">{t('status.accepted.conditions.termInstallments', { months: details.installments.count })}</span>
              </div>
              <div className="d-flex gap-4">
                <span className="flex-grow-1">{t('status.accepted.conditions.monthlyInstallments')}</span>
                <DCurrencyText
                  className="fw-bold"
                  value={details.installments.amount}
                />
              </div>
              <div className="d-flex gap-4">
                <span className="d-flex flex-grow-1 align-items-center gap-2">
                  {t('status.accepted.conditions.annualInterestRate')}
                  <DTooltip
                    childrenClassName="bg-transparent border-0 p-0 cursor-help"
                    className="max-width-tooltip"
                    placement="top"
                    padding={16}
                    offSet={5}
                    theme="secondary"
                    Component={(
                      <DIcon
                        icon="question-circle"
                        theme="secondary"
                        size="1rem"
                      />
                    )}
                  >
                    <small>{t('tooltip.annualInterestRate')}</small>
                  </DTooltip>
                </span>
                <span className="fw-bold">
                  {details.interestRate.annually}
                  %
                </span>
              </div>
              <div className="d-flex gap-4">
                <span className="d-flex flex-grow-1 align-items-center gap-2">
                  {t('status.accepted.conditions.monthlyInterestRate')}
                  <DTooltip
                    childrenClassName="bg-transparent border-0 p-0 cursor-help"
                    className="max-width-tooltip"
                    placement="top"
                    padding={16}
                    offSet={5}
                    theme="secondary"
                    Component={(
                      <DIcon
                        icon="question-circle"
                        theme="secondary"
                        size="1rem"
                      />
                    )}
                  >
                    <small>{t('tooltip.lifeInsurance')}</small>
                  </DTooltip>
                </span>
                <span className="fw-bold">
                  {details.interestRate.monthly}
                  %
                </span>
              </div>
            </div>
            <small>
              {t('status.accepted.conditions.message')}
            </small>
            <div className={classNames(
              'd-flex flex-column flex-sm-row',
              'align-items-stretch',
              'gap-2 gap-md-8 p-4',
            )}
            >
              <DButton
                className="flex-1"
                text={t('status.accepted.conditions.buttonReject')}
                variant="outline"
              />
              <DButton
                className="flex-1"
                loading={loading}
                text={t('status.accepted.conditions.buttonAccept')}
                onClick={acceptLoan}
              />
            </div>
          </DCard.Body>
        </DCard>
      </div>
    </div>
  );
}
