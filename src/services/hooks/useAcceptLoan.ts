import { useDPortalContext } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';

export default function useAcceptLoan() {
  const [loading, setLoading] = useState(false);
  const { openPortal } = useDPortalContext();

  const acceptLoan = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      openPortal('confirm', {});
      setLoading(false);
    }, 1000);
  }, [openPortal]);

  return {
    loading,
    acceptLoan,
  };
}
