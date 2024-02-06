const headers = [
  'name',
  'type',
  'mass',
  'solarDistance',
  'description',
  'mRadius',
  'eRadius',
  'pRadius',
  'density',
  'gravity',
  'temperature',
  'surfacePressure',
  'rotationalPeriod',
];

const getHeaders = (_: ExpressRequest, res: ExpressResponse) => {
  res.status(200).send(headers);
};

export default getHeaders;
