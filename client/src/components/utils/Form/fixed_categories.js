const FOOTSTEP = [
  {
    _id: 1,
    name: 'With'
  },
  {
    _id: 0,
    name: 'Without'
  }
];

const PRICE = [
  {
    _id: 0,
    name: 'Any',
    array: []
  },
  {
    _id: 1,
    name: '$0 to $499',
    array: [0, 499]
  },
  {
    _id: 2,
    name: '$500 to $1499',
    array: [500, 1499]
  },
  {
    _id: 3,
    name: '$1500 to $2999',
    array: [1500, 2999]
  },
  {
    _id: 4,
    name: '$3000 to $4999',
    array: [3000, 4999]
  },
  {
    _id: 5,
    name: 'More than $5000',
    array: [5000, 9999999]
  }
];

export { FOOTSTEP, PRICE };
