/* global BJ:false*/

BJ.Dealer = function(){
    this.busted = false;
    
    this.hand = new BJ.Hand(0);
    this.hand.score();

    this.hit = function(players, shoe){

        var keepHitting = true;
        var bustCount = 0;
        var blackJackCount = 0;

        for (var i = 0; i < players.length; i++){
            var player = players[i];
            if (player.hands[0].busted === true){bustCount++;}
            if (player.hands[0].score() === 21 &&
                player.hands[0].cards.length === 2 &&
                player.hands.length === 1){blackJackCount++;}
        }

        if(bustCount === players.length || blackJackCount === players.length){keepHitting = false;}

        while(keepHitting){
            var dealerScore = this.hand.score();

            var canHitOnSoft = (this.hitsOn === "h17") ? true : false;

            if(dealerScore === 17 && (canHitOnSoft && this.hand.isSoft)){
                this.hand.cards.push(shoe.dealCard());
            }
            else if (dealerScore < 17){
                this.hand.cards.push(shoe.dealCard());
            }
            else{keepHitting = false;}
        }
    };
};


