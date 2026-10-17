export const normalizeArgentinePhone = (value: string): string | null => {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('54')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  if (digits.startsWith('9')) digits = digits.slice(1);

  const direct = /^(?:11|2\d{2,3}|3\d{2,3})(\d{6,8})$/.exec(digits);
  if (direct && direct[0].length === 10) return `+549${direct[0]}`;

  const withMobilePrefix = /^(11|2\d{2,3}|3\d{2,3})15(\d{6,8})$/.exec(digits);
  if (withMobilePrefix) {
    const local = `${withMobilePrefix[1]}${withMobilePrefix[2]}`;
    if (local.length === 10) return `+549${local}`;
  }
  return null;
};
