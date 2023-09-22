import { DSkeleton } from '@dynamic-framework/ui-react';

export default function AccountSkeleton() {
  return (
    <DSkeleton viewBox="0 0 320 50" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
      <rect x="5" y="0" rx="0" ry="0" width="310" height="40" />
    </DSkeleton>
  );
}
