function main(parameters){
    console.log('newStarted');
    $('#results').html('');
    var allParamsSet = true;
    allParamsSet = (parameters.numOfHands > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.numOfDecks > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.numOfPlayers > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.minBet > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.maxBet > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.spread > 0 && allParamsSet) ? true : false;
    allParamsSet = (parameters.penetration > 0 && parameters.penetration <= 1 && allParamsSet) ? true : false;
    allParamsSet = (parameters.dealerHits != null && allParamsSet) ? true : false;
    allParamsSet = (parameters.strategy != null && allParamsSet) ? true : false;

    if(!allParamsSet){console.log("error in params"); return false;}

    var decksPerPack = parameters.numOfDecks;
    
    var table = new BJ.Table(parameters.numOfPlayers, decksPerPack);
    table.Players[0].minBet = parameters.minBet;
    table.Players[0].maxBet = parameters.maxBet;
    table.Players[0].spread = parameters.spread;
    table.Players[0].setStrategy(parameters.strategy);

    table.dealer.hitsOn = parameters.dealerHits;
    var howManyHands = parameters.numOfHands;
    var penetration = parameters.penetration;
    var numberOfHands = 0;

    //cassidy's stats
    table.Players[0].winsMoMoney = 0;
    table.Players[0].losesMoMoney = 0;

    var percentageComplete = 0;
    var lastPercentage = 0;
    
    while(allParamsSet){
        table.shoe.shuffle();
        while(table.shoe.cards.length > decksPerPack * 52 * (1-penetration)){
            table.deal();
            table.decision();
            table.flipCardUp(table.dealer.hand.cards[1]);
            table.dealer.hit(table.Players, table.shoe);
            table.payout();
    
            numberOfHands++;
    
        }


        percentageComplete = Math.round((numberOfHands / howManyHands) * 100);
        if(percentageComplete !== lastPercentage){console.log(percentageComplete + "%");}
        lastPercentage = percentageComplete;


        if(numberOfHands > howManyHands){
            break;
        }
        else{
            table.newShoe();
            table.clearCount();
        }
    }
    
    $('#results').append('<p>Starting Bankroll: 2000</p>');
    $('#results').append('<p>Ending Bankroll: ' + table.Players[0].bankroll + '</p>');
    
    $('#results').append('<p>total hands: ' + numberOfHands + '</p>');
    $('#results').append('<p>dollars per 100 hands: ' + ((table.Players[0].bankroll - 2000)/(numberOfHands/100)) + '</p>');
    $('#results').append('<p>mo money win ratio wins:loses ' + table.Players[0].winsMoMoney + ' : ' + table.Players[0].losesMoMoney + '</p>'); 
    console.log('finished');
}

function main_old(){
    var decksPerShoe = 6;
    
    var table = new BJ.Table(1, decksPerShoe);
    //var scores = [];
    var howManyShoes = 1;
    var howManySessions = 1000000;
    var penetration = 0.84;
    var numberOfRounds = 0;
    
    //var winningRounds = 0;
    //var losingRounds = 0;
    //var pushRounds = 0;

    //var moneytracker = [2000];
    //var handtracker = [];
    for(var k = 0; k<howManySessions; k++){
        for(var j = 0; j<howManyShoes; j++){
            table.shoe.shuffle();
            while(table.shoe.cards.length > decksPerShoe * 52 * (1-penetration)){
                table.deal();
                table.decision();
                table.payout();
        
                //var round_score = table.Score();
                ////scores.push(round_score);
        
                //winningRounds = (round_score.player.hands[0] > round_score.dealer) ? (++winningRounds) : winningRounds; 
                //losingRounds = (round_score.player.hands[0] < round_score.dealer) ? (++losingRounds) : losingRounds; 
                //pushRounds = (round_score.player.hands[0] === round_score.dealer) ? (++pushRounds) : pushRounds; 
                numberOfRounds++;
                //table.PrintScore();
                //console.log("player: " + round_score.player.hands[0]);
                //console.log("dealer: " + round_score.dealer);
                //console.log("player money: " + table.Players[0].bankroll);
                //table.sweep();
        
            }
            table.newShoe();
            table.clearCount();
        }
    //moneytracker.push(table.Players[0].bankroll);
    }
    
    //console.log("Percentage won: " + Math.floor(winningRounds / numberOfRounds * 100) + "%");
    //console.log("Dealer Percentage won: " + Math.floor(losingRounds / numberOfRounds * 100) + "%");
    //console.log("Percentage tied: " + Math.floor(pushRounds / numberOfRounds * 100) + "%");
    console.log("Starting Bankroll: 2000");
    //console.log(moneytracker.toString().replace(/,/g, '\t'));
    console.log("Ending Bankroll: " + table.Players[0].bankroll);
    
    //var winning = winningRounds/ numberOfRounds;
    //var losing = losingRounds / numberOfRounds;
    //var text = (winning > losing) ? "beat the man" :"lost to the man"; 
    //
    //console.log(text);
    
    //var average = BJ.statistics.average(moneytracker);
    //console.log("average: " + average);
    //
    //var stdDev = BJ.statistics.stdev(moneytracker);
    //console.log("std dev: " + stdDev);

    console.log("total hands: " + numberOfRounds);
    console.log("dollars per 100 hands: " + ((table.Players[0].bankroll - 2000)/(numberOfRounds/100)));
}
