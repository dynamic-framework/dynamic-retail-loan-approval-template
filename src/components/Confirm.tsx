import { useTranslation } from 'react-i18next';

import useValidateOtp from '../services/hooks/useValidateOtp';

import OtpModal from './Otp/OtpModal';

export default function Confirm() {
  const { t } = useTranslation();
  const { loading, validateOtp } = useValidateOtp();
  return (
    <OtpModal
      action={validateOtp}
      isLoading={loading}
      title={t('otp.securityCode')}
    />
  );
}
