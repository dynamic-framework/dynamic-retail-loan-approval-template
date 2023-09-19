import { MSkeleton } from '@dynamic-framework/ui-react';

export default function LoanSkeleton() {
  return (
    <MSkeleton viewBox="0 0 320 300" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
      <rect x="20" y="0" rx="5" ry="5" width="135" height="135" />
      <rect x="160" y="0" rx="5" ry="5" width="135" height="135" />
    </MSkeleton>
  );
}
