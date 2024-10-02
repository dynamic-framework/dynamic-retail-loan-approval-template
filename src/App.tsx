import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import ApprovalLoader from './components/loaders/ApprovalLoader';
import ReceiveFundsTo from './components/ReceiveFundsTo';
import StatusAccepted from './components/StatusAccepted';
import StatusToPay from './components/StatusToPay';
import VerificationOTP from './components/VerificationOTP';
import { SITE_LANG, VARS_CURRENCY } from './config/widgetConfig';
import useGetLoan from './services/hooks/useGetLoan';
import { useAppSelector } from './store/hooks';
import { getStep } from './store/selectors';

const COMPONENTS = {
  approval: StatusAccepted,
  otp: VerificationOTP,
  receiveTo: ReceiveFundsTo,
  loan: StatusToPay,
};

export default function App() {
  const { setContext } = useDContext();
  const { loading, loanOffer } = useGetLoan();
  const step = useAppSelector(getStep);
  const View = COMPONENTS[step];

  useEffect(() => {
    setContext({
      language: SITE_LANG,
      currency: VARS_CURRENCY,
    });
  }, [setContext]);

  return (
    <div className="container py-4">
      {(loading || !loanOffer) && <ApprovalLoader />}
      {!loading && loanOffer && <View />}
    </div>
  );
}
