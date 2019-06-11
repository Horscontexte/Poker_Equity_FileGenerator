const fs = require('fs');
const {CardGroup, OddsCalculator} = require('poker-odds-calculator');

let cardNumberOne = ['Ac','Ah','Ad','As','Kc','Kh','Kd','Ks','Qc','Qh','Qd','Qs','Jc','Jh','Jd','Js','Tc','Th','Td','Ts','9s','9c','9h','9d',
'8s','8d','8h','8c','7s','7d','7h','7c','6s','6d','6h','6c','5s','5d','5h','5c','4s','4d','4h','4c','3s','3d','3h','3c',
'2s','2d','2h','2c'];
let cardNumberTwo = cardNumberOne;
let player1Combo = [];

const getAllCombo = () => {
  cardNumberOne.forEach(function(card) {
    cardNumberTwo.forEach(function(element) {
      // If both cards are the same we dont create a combo
      if (card == element) {
        console.log('Rencontre impossile, 2x la même carte !');
      } else {
        console.log(card + element)
        player1Combo.push(card + element)
      }
    });
  });
}

const getAllEquity = () => {
  let player2Combo = player1Combo
  player1Combo.forEach(function(wombo) {
    player2Combo.forEach(function(combo) {
      if (wombo == combo) {
        console.log('Rencontre impossible, 2x la même combo !')
      } else {
        console.log(wombo + combo)
      }
    });
  });
}

async function asyncCall() {
  await getAllCombo();
  await getAllEquity();
  console.log(player1Combo.length + ' Mains possible ;)')
}

asyncCall();
