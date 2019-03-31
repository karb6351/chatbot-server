const { getDistance } = require('./util');
let data = {
  latitude: 22.312565,
  longitude: 114.17856699999993
};

test('computed distance bewteen two same coordinate should be zero ', () => {
  expect(getDistance(data,data)).toBe(0);
})
