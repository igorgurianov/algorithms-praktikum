export const generateRandomArr = () => {
  const minValue = 0;
  const maxValue = 100;
  const minLen = 3;
  const maxLen = 17;

  const arrLen = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen);
  const res = Array.from({ length: arrLen }, () =>
    Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
  );
  return res;
};
