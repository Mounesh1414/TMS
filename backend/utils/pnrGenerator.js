export const pnrGenerator = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const part1 = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const part2 = Math.floor(100000 + Math.random() * 900000);
  return `${part1}${part2}`;
};
