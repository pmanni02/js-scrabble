const SCORECHART = {
  "A" : 1, "B" : 3, "C" : 3, "D" : 2,
  "E" : 1, "F" : 4, "G" : 2, "H" : 4,
  "I" : 1, "J" : 8, "K" : 5, "L" : 1,
  "M" : 3, "N" : 1, "O" : 1, "P" : 3,
  "Q" : 10, "R" : 1, "S" : 1, "T" : 1,
  "U" : 1, "V" : 4, "W" : 4, "X" : 8,
  "Y" : 4, "Z" : 10
};

const REGEX = /^[a-zA-Z]+$/;

const Scrabble = {
  score(word) {
    checkWord(word);

    let wordScore = 0;
    let upperCase = word.toUpperCase();
    for(let char of upperCase) {
      wordScore += SCORECHART[char];
    }

    return checkBonus(word) ? wordScore += 50 : wordScore;
  },

  highestScoreFrom(arrayOfWords) {
    checkArray(arrayOfWords);

    let maxScore = Scrabble.score(arrayOfWords[0]);
    let maxWord = arrayOfWords[0];

    arrayOfWords.forEach( function(word){
      let currScore = Scrabble.score(word);
      if (currScore > maxScore) {
        maxScore = currScore;
        maxWord = word;
      } else if (currScore === maxScore) {
        if (word.length < maxWord.length && maxWord.length !== 7){
          maxScore = currScore;
          maxWord = word;
        } else if (word.length === 7 && maxWord.length !==7) {
          maxScore = currScore;
          maxWord = word;
        }
      }
    });
    return maxWord;
  },

  // TileBag: {
  //   alphabet: 'abcdefghijklmnopqrstuvwxyz',
  //   alphabetArr: this.alphabet.split(''),
  //   alphabetQuant: [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1],
  //   createTileBa
  //   // draw tile function. returns a tile (letter) at RANDOM
  //   drawTile() {
  //
  //   }
  //
  //   // remainingTiles function. returns quantity left for each letter
  //   // remainingTiles() {
  //   //
  //   // }
  // }
};

Scrabble.TileBag = class {
  drawTile(){
    
  }
}

Scrabble.Player = class {
  constructor(name){
    if (name === undefined || name === null){
      throw 'Must provide name';
    } else {
      this.name = name;
    }
    this.plays = [];
  }

  play(word){
    if (this.hasWon()){
      return false;
    } else {
      if (word === undefined || word === null || REGEX.test(word) === false){
        throw 'Invalid word';
      } else {
        return this.plays.push(word);
      }
    }
  }

  totalScore(){
    let total = 0;
    this.plays.forEach( (word) => {
      total += Scrabble.score(word);
    });
    return total;
  }

  hasWon(){
    return this.totalScore() >= 100 ? true : false;
  }

  highestScoringWord(){
    if (this.plays.length === 0){
      throw 'No words played';
    } else {
      return Scrabble.highestScoreFrom(this.plays)
    }
  }

  highestWordScore(){
    if (this.plays.length === 0){
      throw 'No words played';
    } else {
      return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
    }
  }
};


// Helper methods

const checkWord = function checkWord(input){
  if (input.length === 0 || input.length > 7){
    throw 'Invalid input length';
  }
  if (REGEX.test(input) === false){
    throw 'Only letters allowed';
  }
}

const checkArray = function checkArray(array){
  if (array.length === 0){
    throw 'Invalid array';
  }
}

const checkBonus = function checkBonus(word){
  if (word.length == 7) {
    return 50;
  }
}

module.exports = Scrabble;
