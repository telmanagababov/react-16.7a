const names = [
  'Bailee',
  'Bailey',
  'Beatrice',
  'Beatrix',
  'Beatriz',
  'Beau',
  'Belen',
  'Belinda',
  'Doug',
  'Peter',
  'Sarah',
  'Kelly',
  'Brook',
  'Liam',
  'Zak',
];

function getValue(value) {
  if (value <= 0) return 0;
  if (value === 1) return 1;
  if (!getValue.cache[value]) {
    getValue.cache[value] = getValue(value - 1) + getValue(value - 2);
  }
  return getValue.cache[value];
}
getValue.cache = {};

export function getRandomName() {
  return names[Math.ceil(Math.random() * (names.length - 1))];
}

export function getRandomValue() {
  return getValue(10 + Math.round(Math.random() * 20));
}

export function generateItems(itemsNumber) {
  return Array.from(new Array(itemsNumber))
    .map(() => ({
      name: getRandomName(),
      value: getRandomValue(),
      isSelected: false,
    }));
}

export default { generateItems };