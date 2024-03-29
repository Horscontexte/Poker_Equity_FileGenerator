const fs = require('fs');
const {CardGroup, OddsCalculator} = require('poker-odds-calculator');

let cardNumberOne = ['Ac','Ah','Ad','As','Kc','Kh','Kd','Ks','Qc','Qh','Qd','Qs','Jc','Jh','Jd','Js','Tc','Th','Td','Ts','9s','9c','9h','9d',
'8s','8d','8h','8c','7s','7d','7h','7c','6s','6d','6h','6c','5s','5d','5h','5c','4s','4d','4h','4c','3s','3d','3h','3c',
'2s','2d','2h','2c'];
let cardNumberTwo = cardNumberOne;
let player1Combo = [];
let heroHandCard1;
let heroHandCard2;
let vilainHandCard1;
let vilainHandCard2;

// Création du fichier contenant les résultats
let path = 'Poker_Equity_Results.csv';
let data;
let header = 'hero,vilain,victory_percentage,loose_percentage,split_percentage\r\n'
fs.writeFile(path);
fs.appendFileSync(path,header, 'utf8');

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
      // On découpe les mains :
      // - 1er et 2eme charactère pour la première carte
      // - 3eme et 4eme charactère pour la seconde carte
      let heroHandCard1 = wombo.charAt(0) + wombo.charAt(1);
      let heroHandCard2 = wombo.charAt(2) + wombo.charAt(3);
      let vilainHandCard1 = combo.charAt(0) + combo.charAt(1);
      let vilainHandCard2 = combo.charAt(2) + combo.charAt(3);
      // Si les deux combinaisons sont similaire
      if (wombo == combo) {
        console.log('Rencontre impossible entre la main de Hero et Vilain :' + wombo + '-' + combo);
      // Si la carte 1 de hero est égale à la carte 1 ou 2 de vilain
      } else if (heroHandCard1 == vilainHandCard1 || heroHandCard1 == vilainHandCard2){
        console.log('Rencontre impossible entre Hero et Vilain :' + heroHandCard1 + '-' + vilainHandCard1 + ' ou ' + heroHandCard1 + '-' + vilainHandCard2);
      // Si la carte 2 de hero est égale à la carte 1 ou 2 de vilain
      } else if (heroHandCard2 == vilainHandCard1 || heroHandCard2 == vilainHandCard2){
        console.log('Rencontre impossible entre Hero et Vilain :' + heroHandCard2 + '-' + vilainHandCard1 + ' ou ' + heroHandCard2 + '-' + vilainHandCard2)
      } else {
        // Calcul de l'Equity
        // poker-odds-calculator
        const player1Cards = CardGroup.fromString(wombo);
        const player2Cards = CardGroup.fromString(combo);
        const result = OddsCalculator.calculate([player1Cards, player2Cards]);

        console.log(`Hero - ${player1Cards} - ${result.equities[0].getEquity()}%`);
        console.log(`Vilain - ${player2Cards} - ${result.equities[1].getEquity()}%`);

        // Calcul du pourcentage de split de la situation
        var split = result.equities[0].getEquity() + result.equities[1].getEquity()
        split = 100 - split;
        // On ajoute une ligne au fichier avec toutes les informations
        var data = wombo + ',' + combo + ',' + result.equities[0].getEquity() + ',' + result.equities[1].getEquity() + ',' + split + '\r\n';
        fs.appendFileSync(path,data, 'utf8');
        console.log("Document mis à jours avec la rencontre : " + wombo + combo)
      }
    });
  });
}

async function asyncCall() {
  await getAllCombo();
  await getAllEquity();

}

asyncCall();
