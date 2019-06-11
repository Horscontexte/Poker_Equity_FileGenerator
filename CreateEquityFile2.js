const fs = require('fs');
const { CardGroup, OddsCalculator } = require('poker-odds-calculator');

const cardNumberOne = ['Ac', 'Ah', 'Ad', 'As', 'Kc', 'Kh', 'Kd', 'Ks', 'Qc', 'Qh', 'Qd', 'Qs', 'Jc', 'Jh', 'Jd', 'Js', 'Tc', 'Th', 'Td', 'Ts', '9s', '9c', '9h', '9d',
  '8s', '8d', '8h', '8c', '7s', '7d', '7h', '7c', '6s', '6d', '6h', '6c', '5s', '5d', '5h', '5c', '4s', '4d', '4h', '4c', '3s', '3d', '3h', '3c',
  '2s', '2d', '2h', '2c'];
let onePlayerCombos = [];
let twoPlayersCombos = [];

const getAllCombos = () => {
  cardNumberOne.map((card) => {
    cardNumberOne.map((card2) => {
      card !== card2 ? onePlayerCombos.push(card + card2) : null;
    });
  });
};

const isWomboValid = (wombo) => {
  let x = wombo.split("");
  if (((x[0] + x[1]) || (x[2] + x[3])) === ((x[4] + x[5]) || (x[6] + x[7]))) {
    // <3
    return false;
  } else return true;
};

const getAllEquity = () => {
  onePlayerCombos.map((combo) => {
    onePlayerCombos.map((combo2) => {
      if (combo !== combo2) {
        let wombo = combo + combo2;
        isWomboValid(wombo) ? twoPlayersCombos.push(wombo) : null;
        // null remplaçable par un push/consolelog ou autre
      };
    });
  });
};

asyncCall = async () => {
  await getAllCombos();
  await getAllEquity();
  await console.log(onePlayerCombos.length + ' mains possibles ;).');
  await console.log(twoPlayersCombos.length + ' total combos 2j ?');
}

asyncCall();