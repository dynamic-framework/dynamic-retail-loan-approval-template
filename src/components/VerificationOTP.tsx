/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */
import { MButton, MInputPin } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useValidateOtp from '../hooks/useValidateOtp';

export default function VerificationOTP() {
  const { t } = useTranslation();

  const { loading, validateOtp } = useValidateOtp();
  const [inputOTP, setInputOTP] = useState('');

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="d-flex flex-column gap-4 bg-white rounded p-3 pb-5 shadow-sm">
          <div className="d-block">
            <h2 className="fs-5 fw-bold mb-3">
              {t('otp.securityCode')}
            </h2>
            <p className="sp">
              {t('otp.confirmLabel')}
            </p>
          </div>
          <MInputPin
            label="(+1) *** *** 787"
            mId="verification-otp"
            labelIcon=""
            hint={t('otp.enterCode')}
            characters={4}
            onMChange={({ detail }: CustomEvent) => setInputOTP(detail as string)}
            type="number"
            mInputMode="tel"
            isValid={inputOTP.length === 4}
          />
          <div className="d-block">
            <p className="small mb-2">{t('otp.notReceived')}</p>
            <p className="small">
              <Trans
                i18nKey="otp.resend"
                components={{
                  link1: <a href="#" className="text-secondary" />,
                  link2: <a href="#" className="text-secondary" />,
                }}
              />
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <MButton
              text={t('button.continue')}
              isPill
              onMClick={() => validateOtp(inputOTP)}
              {...inputOTP.length < 4 && { state: 'disabled' }}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
