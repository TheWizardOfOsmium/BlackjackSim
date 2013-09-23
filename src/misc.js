var BJ = BJ || {};

//var _cardCount = 0;

//var _playerHit = 17;
var numberWords = ['zero', 'ace', 'two', 'three', 'four', 'five', 'six',
                   'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
                   'thirteen', 'fourteen', 'fifteen', 'sixteen',
                   'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone' ];

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
    this.value = function(){
        return (this.number >= 10) ? 10 : this.number;
    };
};

BJ.Deck = function(){
    this.cards = [];
    for (var suit = 1 ; suit < 5; suit++){
        for (var number = 1; number<14; number++){
            this.cards.push(new BJ.Card (number, suit));
        }
    }
};

BJ.CountSystem = function(countName){

    this.one   = 0;
    this.two   = 0;
    this.three = 0;
    this.four  = 0;
    this.five  = 0;
    this.six   = 0;
    this.seven = 0;
    this.eight = 0;
    this.nine  = 0;
    this.ten   = 0;

    switch (countName){
        case "hilo":
            this.setHiLo();
            break;
        case "halves":
            this.setHalves();
            break;
        case "omega2":
            this.setOmegaTwo();
            break;
    }

    this.setHiLo = function(){
        this.setCards([-1, 1, 1, 1, 1, 1, 0, 0, 0, -1]);
    };
    this.setHalves = function(){
        this.setCards([-1, .5, 1, 1, 1.5, 1, 0.5, 0, -0.5, -1]);
    };
    this.setOmegaTwo = function(){
        this.setCards([0, 1, 1, 2, 2, 2, 1, 0, -1, -2]);
    };

    this.setCards = function(cardValues){
        for (var index = 0; index < cardValues; index++){
            this[numberWords[index]] = cardValues[index];
        }

    };
    

};

BJ.SideBet = function(betName, amount){
    this.amount = 0;
    this.payout = 0;
    this.won = false;
    switch (betName){
        case "insurance":
            this.amount = amount;
            this.payout = 3;
            this.determine = function(dealerHand){
                this.won = (dealerHand.cards.length === 2 && dealerHand.score() === 21) ? true : false;
            }
            break;
    }

}

BJ.Hand = function(bet){
    this.cards = [];
    this.bet = bet;
    this.busted = false;
    this.doubled = false;
    this.isSoft = false;
    this.rocket = false;

    this.score = function(){
        var score = 0;
        for(var cardNum = 0; cardNum < this.cards.length; cardNum++){
            var value = this.cards[cardNum].value();
            score += value;
        }
        //is there an ace?
        var ace = false;
        for(var i = 0; i < this.cards.length; i++){
            ace = (this.cards[i].number === 1) ? true: ace; 
        }
        if(ace){
            if(score<12){
                score += 10;
                this.isSoft = true;
            }
            else{
                this.isSoft = false;
            }
        }
        if(score>21){
            this.busted = true;
        }
        return score;
    };
};
