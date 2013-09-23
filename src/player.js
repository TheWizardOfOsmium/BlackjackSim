/* global BJ:false*/

BJ.Player = function(name){
    
    this.hands = [];
    this.hands[0] = new BJ.Hand(0);   

    this.sideBets = [];

    this.name = name || "player";
    this.bankroll = 2000;
    this.minBet = 10;
    this.maxBet = 100;
    this.spread = 4;


    this.strategy = BJ.StrategyFactory.buildBasic();

    this.setStrategy = function(strategy){
        switch(strategy){
            case "basic":
                this.strategy = BJ.StrategyFactory.buildBasic();
                break;
            case "cassidyH17":
                this.strategy = BJ.StrategyFactory.buildCassidyHybrid();
                break;
            case "hilo":
                this.strategy = BJ.StrategyFactory.buildHiLo();
                break;
        }
    };

    this.takeInsurance = function(){
        this.sideBets.push(new BJ.SideBet("insurance", this.hands[0].bet));
    }


    this.hit = function(hand, card){
        hand.cards.push(card);
    };

    this.doubleDown = function(hand, card){
        hand.cards.push(card);
        this.bankroll -= hand.bet;
        hand.bet *= 2; 
        hand.doubled = true;
    };

    this.split = function(hand){
        if(typeof this.hands[1] === "undefined"){
            this.hands[1] = new BJ.Hand(hand.bet);
            this.hands[1].cards.push(hand.cards.pop());
            this.bankroll -= this.hands[1].bet;
            return this.hands[1];
        }
        else if(typeof this.hands[2] === "undefined"){
            this.hands[2] = new BJ.Hand(hand.bet);
            this.hands[2].cards.push(hand.cards.pop());
            this.bankroll -= this.hands[2].bet;
            return this.hands[2];
        }
        else if(typeof this.hands[3] === "undefined"){
            this.hands[3] = new BJ.Hand(hand.bet);
            this.hands[3].cards.push(hand.cards.pop());
            this.hands[3].bet = hand.bet;
            this.bankroll -= this.hands[3].bet;
            return this.hands[3];
        }
        else{
            console.log("Cannot split more than four times");
            //do nothing
            return false;
        }
    };
};


