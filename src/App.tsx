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
  const { loading, loanOffer } = useGetLoan();
  const step = useAppSelector(getStep);
  const View = COMPONENTS[step];

  return (
    <div className="container py-3">
      {(loading || !loanOffer) && <LoanSkeleton />}
      {!loading && loanOffer && <View />}
    </div>
  );
}
