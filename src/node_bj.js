var BJ = BJ || {};

var _dealerHit = 17;
var _playerHit = 17;
BJ.Suits = {
    CLUBS: {
        value:"Clubs",
        num: 1
    },
    DIAMONDS: {
        value: "Diamonds",
        num:2
    },
    HEARTS: {
        value: "Hearts",
        num:3
    },
    SPADES: {
        value: "Spades",
        num:4
    },
    parseEnum: function(number){
        for ( var suit in this){if (number === this[suit].num){ return this[suit];}}    
    }
};

BJ.Card = function(number, suit){ 
    this.number = number;
    this.suit = BJ.Suits.parseEnum(suit);
};

BJ.Deck = function(){
    this.cards = [];
    for(var suit = 1 ; suit<5;suit++){
        for(var number = 1; number<14; number++){
            this.cards.push(new BJ.Card (number, suit));
        }
    }
};

BJ.Shoe = function(decks){
    this.cards = [];
    var card;
    if (isNaN(decks)){
        for(var deck in decks){
            for(card in deck.cards){
                this.cards.push(deck.cards[card]);
            }
        }
    }
    else{
        for(var i = 0; i<decks; i++){
            var tempDeck = new BJ.Deck();
            for(card in tempDeck.cards){
                this.cards.push(tempDeck.cards[card]);
            }
        }
         
    }

    this.shuffle = function(){ 
        for(var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i, 10), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x){
            return this.cards; 
        }
    };
};


BJ.Player = function(name){
    
    this.cards = [];
    this.bust = false;
    this.name = name || "player";

    var i;
    var length;



    this.score = function(){
        var score = 0;
        length = this.cards.length;
        for(i = 0; i <length; i++){
            var number = this.cards[i].number;
            var value = (number >10) ? 10 : number;
            score += value;
        }
        //is there an ace?
        var ace = false;
        for(i = 0; i<length; i++){
            ace = (this.cards[i].number === 1) ? true: ace; 
        }
        if(ace){
            score = (score<12) ? score+10 : score;
        }
        if(score>21){
            this.bust = true;
        }
        return score;
    };
};

BJ.Table = function(num_of_players, num_of_decks){
    this.Players = [];
    for(var i = 0; i<num_of_players; i++){
        this.Players.push(new BJ.Player());
    }
    this.Dealer = new BJ.Player();
    this.Shoe = new BJ.Shoe(num_of_decks);

    this.Deal = function(){
        var i = 0;
        for (i = 0; i<this.Players.length; i++){
            this.Players[i].cards = [];
            this.Players[i].bust = false;
        }
        this.Dealer.cards = [];
        this.Dealer.bust = false;

        for(var j = 0; j <2; j++){
            for (i = 0; i<this.Players.length; i++){
                this.Players[i].cards.push(this.Shoe.cards.pop());
            }
            this.Dealer.cards.push(this.Shoe.cards.pop());
        }
    };

    this.Score = function(){
        var scores = {
            player: 0,
            dealer: 0
        };
        var tempScore;
        for(var i = 0 ; i<this.Players.length; i++){
            var playerScore = this.Players[i].score();
            tempScore = (this.Players[i].bust) ? 0 : playerScore;
            scores.player = tempScore;
        }
        //todo: if player busts player loses should win
        var dealerScore = this.Dealer.score();
        tempScore = (this.Dealer.bust) ? 0 : dealerScore;
        scores.dealer = tempScore;
        return scores;
    };

    this.Hit = function(){
        this.PlayerHit();
        this.DealerHit();
    };

    this.PlayerHit = function(){
        for(var i = 0; i <this.Players.length; i++){
            var keepHitting = true;
            while(keepHitting){
                var playerScore = this.Players[i].score();
                if (playerScore < _playerHit){
                    this.Players[i].cards.push(this.Shoe.cards.pop());
                    //this is to make it only hit once for testing purposes
                    //keepHitting = false;
                }
                else{
                    keepHitting = false;
                }
            }
        }
    };

    this.DealerHit = function(){
        var keepHitting = true;
        while(keepHitting){
            var dealerScore = this.Dealer.score();
            if (dealerScore < _dealerHit){
                this.Dealer.cards.push(this.Shoe.cards.pop());
            }
            else{keepHitting = false;}
        }
    };

    this.PrintScore = function(){
        var tempScore;
        for(var i = 0 ; i<this.Players.length; i++){
            tempScore = (this.Players[i].bust) ? 0 : this.Players[i].score();
            console.log("player" + i + " : " + this.Players[i].score()); 
        }
        tempScore = (this.Dealer.bust) ? 0 : this.Dealer.score();
        console.log("dealer : " + tempScore);
    };

    this.NewShoe = function(num_of_decks){
        this.Shoe = new BJ.Shoe(num_of_decks);
    };

};
//var BJ = require('./bj_objects.js');
var decksPerShoe = 6;

var table = new BJ.Table(1, decksPerShoe);
var scores = [];
var howmanyshoes = 10;
var penetration = 0.66;
var numberOfRounds = 0;

var winningRounds = 0;
var losingRounds = 0;
var pushRounds = 0;

for(var j = 0; j<howmanyshoes; j++){
    table.Shoe.shuffle();
    while(table.Shoe.cards.length > decksPerShoe * 52 * penetration){
        table.Deal();
        table.Hit();

        var round_score = table.Score();
        scores.push(round_score);

        winningRounds = (round_score.player > round_score.dealer) ? (++winningRounds) : winningRounds; 
        losingRounds = (round_score.player < round_score.dealer) ? (++losingRounds) : losingRounds; 
        losingRounds = (round_score.player === round_score.dealer) ? (++pushRounds) : pushRounds; 
        numberOfRounds++;
        table.PrintScore();
    }
    table.NewShoe();
}

console.log("Percentage won: " + Math.floor(winningRounds / numberOfRounds * 100) + "%");
console.log("Dealer Percentage won: " + Math.floor(losingRounds / numberOfRounds * 100) + "%");
console.log("Percentage tied: " + Math.floor(pushRounds / numberOfRounds * 100) + "%");

var winning = winningRounds/ numberOfRounds;
var losing = losingRounds / numberOfRounds;
var text = (winning > losing) ? "beat the man" :"lost to the man"; 

console.log(text);


