import { useTranslation } from 'react-i18next';

import useValidateOtp from '../services/hooks/useValidateOtp';

import OtpModal from './otp/OtpModal';

export default function ModalConfirm() {
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
