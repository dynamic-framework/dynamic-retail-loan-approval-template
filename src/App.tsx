import { useTranslation } from 'react-i18next';
import ReceiveFundsTo from './components/ReceiveFundsTo';
import StatusAccepted from './components/StatusAccepted';
import StatusToPay from './components/StatusToPay';
import VerificationOTP from './components/VerificationOTP';
import { useAppSelector } from './store/hooks';
import { getStep } from './store/selectors';
import LoanSkeleton from './components/LoanSkeleton';
import useGetLoan from './services/hooks/useGetLoan';

const COMPONENTS = {
  approval: StatusAccepted,
  otp: VerificationOTP,
  receiveTo: ReceiveFundsTo,
  loan: StatusToPay,
};

export default function App() {
  const { t } = useTranslation();
  const { loading, loanOffer } = useGetLoan();
  const step = useAppSelector(getStep);
  const View = COMPONENTS[step];

  return (
    <div className="container py-3">
      <h1 className="fw-bold fs-4 mb-3">{t('title')}</h1>
      {(loading || !loanOffer) && <LoanSkeleton />}
      {!loading && loanOffer && <View />}
    </div>
  );
}
