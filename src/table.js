/*global BJ:false */
/*global numberWords:false*/

BJ.Table = function(num_of_players, num_of_decks){
    this.Players = [];
    for(var i = 0; i<num_of_players; i++){
        this.Players.push(new BJ.Player());
    }
    this.dealer = new BJ.Dealer();
    this.shoe = new BJ.Shoe(num_of_decks);

    this.deal = function(){
        var trueCount = Math.floor(this.shoe.cardCount / (this.shoe.cards.length / 52));
        for (playerNum = 0; playerNum < this.Players.length; playerNum++){
            var player = this.Players[playerNum];
            var spreadMultiplier = (player.maxBet / player.spread) / player.minBet;
            var bet = player.minBet * trueCount * spreadMultiplier;
            bet = (bet > player.minBet) ? bet : player.minBet;
            bet = (bet < player.maxBet) ? bet : player.maxBet;
            player.hands = [new BJ.Hand(bet)];
            player.bankroll -= player.hands[0].bet;
        }
        this.dealer.hand = new BJ.Hand(0);

        for(var j = 0; j <2; j++){
            for (var i = 0; i<this.Players.length; i++){
                this.Players[i].hands[0].cards.push(this.shoe.dealCard());
            }
            this.dealer.hand.cards.push(this.shoe.dealCard());
            if(j === 1){this.flipCardDown(this.dealer.hand.cards[1]);}
        }
    };

    this.flipCardDown = function(card){

        var diff = 0;
        if(card.value() >= 2 && card.value() <=6){diff = -1;}
        else if(card.value === 1 || card.value() === 10){diff = 1;}

        this.shoe.cardCount += diff;
    };

    this.flipCardUp = function(card){

        var diff = 0;
        if(card.value() >= 2 && card.value() <=6){diff = 1;}
        else if(card.value === 1 || card.value() === 10){diff = -1;}

        this.shoe.cardCount += diff;
    };

    this.Score = function(){
        var scores = {
            player: {
                hands: []
            },
            dealer: 0
        };

        var tempScore;
        for(var handNum = 0; handNum < this.Players[0].hands.length; handNum++){
            var hand = this.Players[0].hands[handNum];
            var playerScore = hand.score();
            tempScore = (hand.busted) ? 0 : playerScore;
            scores.player.hands[handNum] = tempScore;
        }

        //todo: if player busts dealer should win immediately without hitting
        var dealerScore = this.dealer.hand.score();
        tempScore = (this.dealer.hand.busted) ? 0 : dealerScore;
        scores.dealer = tempScore;
        return scores;
    };

    this.decision = function(){
        if(this.dealer.hand.score() !== 21){
            for(var playerNum = 0; playerNum < this.Players.length; playerNum++){
                var player = this.Players[playerNum];
                for(var handNum = 0; handNum < player.hands.length; handNum++){
                    var hand = player.hands[handNum];
                    if(handNum > 0 && hand.cards.length === 1 && hand.cards[0].number === 1){
                        hand.rocket = true;
                    }
                    var stringHand = "";
                    hand.score();
                    while(!(hand.busted || hand.doubled)){

                        stringHand = this.getStringValueForHand(hand, (player.hands.length < 4));
                        
                        var dealerUpValue = this.dealer.hand.cards[0].value();
                        var decision = player.strategy[stringHand].dealerShowing[numberWords[dealerUpValue]];

                        //convert count dependent actions
                        if(decision.indexOf('_') > -1){
                            var temp = decision.split('_');
                            var countAction = temp[0];
                            var countReq = temp[1];

                            if(this.shoe.cardCount >= countReq){
                                if(countAction === "h"){decision = "hit";}
                                else if(countAction === "db"){decision = "doubleDown";}
                                else if(countAction === "s"){decision = "stand";}
                                else if(countAction === "sp"){decision = "split";}
                                else if(countAction === "ds" && hand.cards.length > 2){decision = "stand";}
                                else if(countAction === "ds" && hand.cards.length === 2){decision = "doubleDown";}
                                else {console.log("error in conversion");}
                            }
                            else{
                                decision = "hit";
                            }

                        }
                        
                        if(decision === "doubleDown" && hand.cards.length > 2){decision = "hit";}
                        if(decision === "ds" && hand.cards.length > 2){decision = "stand";}
                        if(decision === "ds" && hand.cards.length === 2){decision = "doubleDown";}
                        if(decision === "hit" && stringHand === "ten_ten"){decision = "stand";}
                        if(decision === "hit" && stringHand === "eight_eight"){decision = "split";}
                        if(decision === "hit" && stringHand === "nine_nine"){decision = "stand";}

                        if(hand.rocket === true && hand.cards.length === 2){
                            break;
                        }
                        else if(decision === "hit" || hand.cards.length === 1){
                            player.hit(hand, this.shoe.dealCard());
                        }
                        else if (decision === "doubleDown"){
                            player.doubleDown(hand, this.shoe.dealCard());
                        }
                        else if(decision === "split"){
                            if(stringHand === "ace_ace"){ hand.rocket = true;}
                            player.split(hand);
                        }
                        else if (decision === "stand"){
                            break;
                        }
                        else{
                            console.log("Error in decision");
                            return false;
                        }
                        hand.score();
                    }
                }
            }
        }
    };

    this.payout = function(){
        var score = this.Score();
        for (var playerNum = 0; playerNum < this.Players.length; playerNum++){
            var player = this.Players[playerNum];
            for (var handNum = 0; handNum < player.hands.length; handNum++){
                var hand = player.hands[handNum];
                var originalBet = hand.bet;
                //in this instance playerScore refers to the score of the player for this particular hand
                var playerScore = score.player.hands[handNum];
                if      (playerScore === 21 && score.dealer === 21 && this.dealer.hand.cards[0].value() === 10 && 
                         hand.cards.length === 2 && this.dealer.hand.cards.length === 2){hand.bet = hand.bet;}
                else if (playerScore === 21 && score.dealer !== 21 && hand.cards.length === 2 && 
                         player.hands.length === 1){hand.bet *= 2.5;}
                else if (playerScore === 21 && score.dealer === 21 && hand.cards.length === 2){hand.bet *= 2;}
                else if (playerScore > score.dealer){hand.bet *= 2;}
                else if (playerScore < score.dealer){hand.bet = 0;}
                else if (playerScore === score.dealer){hand.bet = hand.bet;}
                else {console.log("error in betting");}
                

                //cassidy's stats
                //if (originalBet === player.maxBet && hand.bet > = player.maxBet * 2){player.winsMoMoney++;}
                //else if (originalBet === player.maxBet && hand.bet < player.maxBet * 2){player.losesMoMoney++;}

               
                player.bankroll += hand.bet;
                hand.bet = 0;
            }
        }
    };



    this.getStringValueForHand = function(hand, splitAllowed){
        if(hand.cards.length === 1){
            return numberWords[hand.cards[0].value()];
        }
        else if(hand.cards[0].value() === hand.cards[1].value() && typeof hand.cards[2] === "undefined" && splitAllowed){
            return numberWords[hand.cards[0].value()] + "_" + numberWords[hand.cards[1].value()];
        }
        else if(hand.isSoft && !(hand.cards[0].value() === 1 && hand.cards[1].value() === 1 && hand.cards.length === 2)){
            var score = hand.score();
            var minusAce = score - 11;
            return numberWords[1] + "_" + numberWords[minusAce];
        }
        else{
            var sum = 0;
            for(var j = 0; j <hand.cards.length; j++){
                sum += hand.cards[j].value();
            }
            if (sum === 2){sum = 12;}
            return numberWords[sum];
        }
    };

    this.newShoe = function(){
        this.shoe = new BJ.Shoe(num_of_decks);
    };

    this.clearCount = function(){
        this.shoe.clearCount();
    };

};
