import {
  DButton,
  DIcon,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import WidgetUtils from '../services/utils/widgetUtils';

export default function StatusToPay() {
  const { t } = useTranslation();
  const { goToPath } = WidgetUtils();

  const goToHome = () => {
    goToPath('DASHBOARD');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6 d-flex flex-column gap-4 justify-content-center align-items-center">
        <div className="d-block">
          <img
            src="https://cloud.modyocdn.com/uploads/39b0b2f8-a9f2-4934-85b4-82c7faf8e544/original/waitCredit.png"
            alt="ToPay"
            width={256}
          />
        </div>
        <h2 className="fs-5 fw-bold text-gray text-center">
          {t('status.toPay.text')}
        </h2>
        <div className="d-flex align-items-center gap-3 bg-light rounded-2 py-3 px-4 shadow-sm">
          <DIcon icon="chat" size="1.5rem" theme="secondary" />
          <p className="sp text-gray-700">
            {t('status.toPay.message')}
          </p>
        </div>
        <DButton
          text={t('status.toPay.button')}
          isPill
          onEventClick={goToHome}
        />
      </div>
    </div>
  );
}
