export default function getLoanIdQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('loan_id');
}
