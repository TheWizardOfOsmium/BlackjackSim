BJ.statistics = {
    average: function(moneytracker){
        //subtracts the original bankroll
        var diffFromPrev = [];
        for(var i = 1; i < moneytracker.length; i++){
            diffFromPrev[i-1] = moneytracker[i] - moneytracker[i-1];
        }
        
        var sum = 0;
        for(var i = 0; i < diffFromPrev.length; i++){
            sum+=diffFromPrev[i];
        }
        return sum/diffFromPrev.length;
        
    },

    stdev: function(moneytracker){
        var diffFromPrev = [];
        for(var i = 1; i < moneytracker.length; i++){
            diffFromPrev[i-1] = moneytracker[i] - moneytracker[i-1];
        }
        
        var sum = 0;
        for(var i = 0; i < diffFromPrev.length; i++){
            sum+=diffFromPrev[i];
        }
        var average =  sum/diffFromPrev.length;
        var diffSquareArray = [];
        for(var i = 0; i < diffFromPrev.length; i++){
            diffSquareArray.push(Math.pow(diffFromPrev[i]-average, 2));
        }
        
        sum = 0;
        for(var i = 0; i < diffSquareArray.length; i++){
            sum+=diffSquareArray[i];
        }
        return Math.sqrt(sum / diffFromPrev.length);

    }

};
