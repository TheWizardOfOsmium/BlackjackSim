/*global BJ:false */
BJ.Shoe = function(decks){
    this.cards = [];
    this.cardCount = 0;
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
        for(var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i, 10), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
        return this.cards; 
    };

    this.dealCard = function(){
        var card = this.cards.pop();
        if(card.number >= 10 || card.number === 1){ this.cardCount--;}
        else if (card.number >= 2 && card.number <= 6){ this.cardCount++;}
        return card;
    };

    this.clearCount = function(){
        this.cardCount = 0;
    };
};

