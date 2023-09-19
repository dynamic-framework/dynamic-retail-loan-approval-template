/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  useFormatCurrency,
  DButton,
  DTooltip,
  DIcon,
  DCurrencyText,
  liquidParser,
} from '@dynamic-framework/ui-react';
import { Trans, useTranslation } from 'react-i18next';
import classNames from 'classnames';
import useAcceptLoan from '../hooks/useAcceptLoan';
import { useAppSelector } from '../store/hooks';
import { getLoanOffer } from '../store/selectors';

export default function StatusAccepted() {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  const userName = liquidParser.parse('{{user.first_name}}');
  const loanOffer = useAppSelector(getLoanOffer);
  const { details, loanDisplayId } = loanOffer;
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
          {t('status.accepted.text', { name: userName })}
        </h2>
        <h3 className="fs-6 fw-bold text-dark text-center">
          {t('status.accepted.secondaryText')}
        </h3>
        <p className="py-3 px-5 text-center">
          {t('status.accepted.message')}
        </p>
      </div>
      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-3 bg-white p-3 mx-md-5 rounded-2 shadow-sm">
          <h5 className="fw-bold">
            {t('status.accepted.conditions.text')}
          </h5>
          <div className="d-flex align-items-center gap-1 bg-light rounded-1 p-3">
            <Trans
              i18nKey="status.accepted.conditions.totalToPay"
              values={{ amount: format(details.total) }}
              components={{
                1: <span className="fw-bold" />,
                2: <span className="fw-bold fs-5" />,
              }}
            />
          </div>
          <div className="d-flex flex-column gap-3 bg-light rounded-1 p-3">
            <div className="d-flex gap-3">
              <span className="flex-grow-1">{t('status.accepted.conditions.loanId')}</span>
              <span className="fw-bold">{loanDisplayId}</span>
            </div>
            <div className="d-flex gap-3">
              <span className="flex-grow-1">{t('status.accepted.conditions.amountRequested')}</span>
              <DCurrencyText className="fw-bold" value={details.amount} />
            </div>
            <div className="d-flex gap-3">
              <span className="flex-grow-1">{t('status.accepted.conditions.term')}</span>
              <span className="fw-bold">{t('status.accepted.conditions.termInstallments', { months: details.installments.count })}</span>
            </div>
            <div className="d-flex gap-3">
              <span className="flex-grow-1">{t('status.accepted.conditions.monthlyInstallments')}</span>
              <DCurrencyText className="fw-bold" value={details.installments.amount} />
            </div>
            <div className="d-flex gap-3">
              <span className="d-flex flex-grow-1 align-items-center gap-2">
                {t('status.accepted.conditions.annualInterestRate')}
                <DTooltip
                  className="bg-transparent border-0 p-0 cursor-help"
                  classNameContainer="max-width-tooltip"
                  placement="top"
                  padding={16}
                  offSet={5}
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
            <div className="d-flex gap-3">
              <span className="d-flex flex-grow-1 align-items-center gap-2">
                {t('status.accepted.conditions.monthlyInterestRate')}
                <DTooltip
                  className="bg-transparent border-0 p-0 cursor-help"
                  classNameContainer="max-width-tooltip"
                  placement="top"
                  padding={16}
                  offSet={5}
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
            'gap-2 gap-md-5 p-3',
          )}
          >
            <DButton
              className="d-grid flex-1"
              text={t('status.accepted.conditions.buttonReject')}
              variant="outline"
              theme="secondary"
              isPill
            />
            <DButton
              className="d-grid flex-1"
              isLoading={loading}
              text={t('status.accepted.conditions.buttonAccept')}
              isPill
              onEventClick={acceptLoan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
