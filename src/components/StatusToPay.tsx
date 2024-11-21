import {
  DAlert,
  DButton,
  DCard,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import WidgetUtils from '../utils/widgetUtils';

export default function StatusToPay() {
  const { t } = useTranslation();
  const { goToPath } = WidgetUtils();

  const goToHome = () => {
    goToPath('DASHBOARD');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6 text-center">
        <DCard className="mb-4">
          <DCard.Body className="mb-4 d-flex flex-column gap-6 justify-content-center align-items-center">
            <div className="d-block">
              <img
                src="https://cloud.modyocdn.com/uploads/39b0b2f8-a9f2-4934-85b4-82c7faf8e544/original/waitCredit.png"
                alt="ToPay"
                width={256}
              />
            </div>
            <h4>{t('status.toPay.text')}</h4>
            <DAlert
              icon="chat"
            >
              {t('status.toPay.message')}
            </DAlert>
          </DCard.Body>
        </DCard>
        <DButton
          text={t('status.toPay.button')}
          onClick={goToHome}
        />
      </div>
    </div>
  );
}
