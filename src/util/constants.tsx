var serverURL: string;
if (process.env.NODE_ENV === 'production') {
  serverURL = '';
} else {
  serverURL = 'http://web2-elb-ntwrk-94efa0b9d1e72695.elb.us-west-2.amazonaws.com/';
}

export const fortmaticOptions = {
  apiKey: process.env.FORTMATIC_API_KEY || "pk_test_DE7A33DFF78D95FD",
  network: process.env.FORTMATIC_NETWORK || "ropsten",
};

export const globalDecimals = 1000000000000000000;

export const contractOptions = {
  AddressLib: '0x63e462658B2d2756d64EA1dba6B4bC2142d7Fd49',
  SafeMath: '0x8c5537eA1D187D38F81a2C3967C3723AbccbC0e5',
  zDai: '0x14E582420E423E0e96964dF91bD9ffc49A5f4631',
  EtherUsdAggregator: '0xe65D7D58d1A217ab14C82F2CFbC9655e404357e8',
  daiPool: '0xb96aD08bA5D4dF1A3D122A30E55CbD9909C10B57',
  lending: '0x400049a1D97eC2A58f18ce09CE1868dEa3478C1c',
  loans: '0x1b6B0145C1c1580674Ac24b718340a5EDa609539',
};

export default {
  serverURL,
  fortmaticOptions,
  globalDecimals,
  contractOptions,
};
