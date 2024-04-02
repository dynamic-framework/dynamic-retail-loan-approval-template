/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { DButton, DInputPin } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useValidateOtp from '../services/hooks/useValidateOtp';

export default function VerificationOTP() {
  const { t } = useTranslation();

  const { loading, validateOtp } = useValidateOtp();
  const [inputOTP, setInputOTP] = useState('');

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="d-flex flex-column gap-6 bg-white rounded p-4 pb-8 shadow-sm">
          <div className="d-block">
            <h2 className="fs-5 fw-bold mb-4">
              {t('otp.securityCode')}
            </h2>
            <p className="sp mb-0">
              {t('otp.confirmLabel')}
            </p>
          </div>
          <DInputPin
            label="(+1) *** *** 787"
            id="verification-otp"
            labelIcon=""
            hint={t('otp.enterCode')}
            characters={4}
            onChange={(value) => setInputOTP(value)}
            type="number"
            valid={inputOTP.length === 4}
          />
          <div className="d-block">
            <p className="small mb-2">{t('otp.notReceived')}</p>
            <p className="small mb-0">
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
            <DButton
              text={t('button.continue')}
              onClick={validateOtp}
              {...inputOTP.length < 4 && { state: 'disabled' }}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
