/*global BJ:false */
/*global numberWords:false */

BJ.Strategy = function(){
    var DealerShowing = function(){
        this.two   = "";
        this.three = "";
        this.four  = "";
        this.five  = "";
        this.six   = "";
        this.seven = "";
        this.eight = "";
        this.nine  = "";
        this.ten   = "";
        this.ace   = "";
    };
    this.ace = {};
    this.two = {};
    this.three = {};
    this.four = {};
    this.five = {};
    this.six = {};
    this.seven = {};
    this.eight = {};
    this.nine = {};
    this.ten = {};
    this.eleven = {};
    this.twelve = {};
    this.thirteen = {};
    this.fourteen = {};
    this.fifteen = {};
    this.sixteen = {};
    this.seventeen = {};
    this.eighteen = {};
    this.nineteen = {};
    this.twenty = {};
    this.twentyone = {};

    this.ace_two = {};
    this.ace_three = {};
    this.ace_four = {};
    this.ace_five = {};
    this.ace_six = {};
    this.ace_seven = {};
    this.ace_eight = {};
    this.ace_nine = {};
    this.ace_ten = {};

    this.two_two = {};
    this.three_three = {};
    this.four_four = {};
    this.five_five = {};
    this.six_six = {};
    this.seven_seven = {};
    this.eight_eight = {};
    this.nine_nine = {};
    this.ten_ten = {};
    this.ace_ace = {};

    this.ace.dealerShowing       = new DealerShowing();
    this.two.dealerShowing       = new DealerShowing();
    this.three.dealerShowing     = new DealerShowing();
    this.four.dealerShowing      = new DealerShowing();
    this.five.dealerShowing      = new DealerShowing();
    this.six.dealerShowing       = new DealerShowing();
    this.seven.dealerShowing     = new DealerShowing();
    this.eight.dealerShowing     = new DealerShowing();
    this.nine.dealerShowing      = new DealerShowing();
    this.ten.dealerShowing       = new DealerShowing();
    this.eleven.dealerShowing    = new DealerShowing();
    this.twelve.dealerShowing    = new DealerShowing();
    this.thirteen.dealerShowing  = new DealerShowing();
    this.fourteen.dealerShowing  = new DealerShowing();
    this.fifteen.dealerShowing   = new DealerShowing();
    this.sixteen.dealerShowing   = new DealerShowing();
    this.seventeen.dealerShowing = new DealerShowing();
    this.eighteen.dealerShowing  = new DealerShowing();
    this.nineteen.dealerShowing  = new DealerShowing();
    this.twenty.dealerShowing    = new DealerShowing();
    this.twentyone.dealerShowing = new DealerShowing();

    this.ace_two.dealerShowing   = new DealerShowing();
    this.ace_three.dealerShowing = new DealerShowing();
    this.ace_four.dealerShowing  = new DealerShowing();
    this.ace_five.dealerShowing  = new DealerShowing();
    this.ace_six.dealerShowing   = new DealerShowing();
    this.ace_seven.dealerShowing = new DealerShowing();
    this.ace_eight.dealerShowing = new DealerShowing();
    this.ace_nine.dealerShowing  = new DealerShowing();
    this.ace_ten.dealerShowing   = new DealerShowing();

    this.two_two.dealerShowing     = new DealerShowing();
    this.three_three.dealerShowing = new DealerShowing();
    this.four_four.dealerShowing   = new DealerShowing();
    this.five_five.dealerShowing   = new DealerShowing();
    this.six_six.dealerShowing     = new DealerShowing();
    this.seven_seven.dealerShowing = new DealerShowing();
    this.eight_eight.dealerShowing = new DealerShowing();
    this.nine_nine.dealerShowing   = new DealerShowing();
    this.ten_ten.dealerShowing     = new DealerShowing();
    this.ace_ace.dealerShowing     = new DealerShowing();
    
};

BJ.StrategyFactory = {
    
    //start and end are inclusive
    setRow: function(strategy, playerHand, defaultAction, optionArray){
        if(typeof optionArray === "undefined"){
            for(i = 1; i < 11; i++){
                strategy[playerHand].dealerShowing[numberWords[i]] = defaultAction;
            }
        }
        else{
            for(var j = 0; j < optionArray.length; j++){
                for(i = 1; i < 11; i++){
                    var start = optionArray[j].start;
                    var stop = optionArray[j].stop;
                    if( i >= start && i <= stop){
                        strategy[playerHand].dealerShowing[numberWords[i]] = optionArray[j].action;
                    }
                }
            }              
            for(i = 1; i < 11; i++){
                if(strategy[playerHand].dealerShowing[numberWords[i]] === ""){
                    strategy[playerHand].dealerShowing[numberWords[i]] = defaultAction;
                }
            }
        }
    },

    setRowFromArray: function(strategy, playerHand, actions){
        for (var i = 0; i < actions.length; i++){
            //var fullAction = actions[i];
            //if(actions[i] === "h"){fullAction = "hit";}
            //else if(actions[i] === "db"){fullAction = "doubleDown";}
            //else if(actions[i] === "s"){fullAction = "stand";}
            //else if(actions[i] === "sp"){fullAction = "split";}
            strategy[playerHand].dealerShowing[numberWords[i+1]] = actions[i];
        }
    },

    buildBasic : function(){
        var strategy = new BJ.Strategy();

        var setRow = BJ.StrategyFactory.setRow;

        var Option = function(action, start, stop){
            this.action = action;
            this.start = start;
            this.stop = stop;
        }

        setRow(strategy, numberWords[1], "h");
        setRow(strategy, numberWords[2], "h");
        setRow(strategy, numberWords[3], "h");
        setRow(strategy, numberWords[4], "h");
        setRow(strategy, numberWords[5], "h");
        setRow(strategy, numberWords[6], "h");
        setRow(strategy, numberWords[7], "h");
        setRow(strategy, numberWords[8], "h");
        setRow(strategy, numberWords[9], "h", [new Option("db", 2, 6)]);
        setRow(strategy, numberWords[10], "h", [new Option("db", 2, 9)]);
        setRow(strategy, numberWords[11], "db");
        setRow(strategy, numberWords[12], "h", [new Option("s", 4, 6)]);
        setRow(strategy, numberWords[13], "h", [new Option("s", 2, 6)]);
        setRow(strategy, numberWords[14], "h", [new Option("s", 2, 6)]);
        setRow(strategy, numberWords[15], "h", [new Option("s", 2, 6)]);
        setRow(strategy, numberWords[16], "h", [new Option("s", 2, 6)]);
        setRow(strategy, numberWords[17], "s");
        setRow(strategy, numberWords[18], "s");
        setRow(strategy, numberWords[19], "s");
        setRow(strategy, numberWords[20], "s");
        setRow(strategy, numberWords[21], "s");

        setRow(strategy, (numberWords[1] + "_" + numberWords[2]), "h", [new Option("db", 5, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[3]), "h", [new Option("db", 4, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[4]), "h", [new Option("db", 4, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[5]), "h", [new Option("db", 4, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[6]), "h", [new Option("db", 3, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[7]), "h", [new Option("ds", 2, 6), new Option("s", 7, 8)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[8]), "s", [new Option("ds", 6, 6)]);
        setRow(strategy, (numberWords[1] + "_" + numberWords[9]), "s");
        setRow(strategy, (numberWords[1] + "_" + numberWords[10]), "s");

        setRow(strategy, (numberWords[1] + "_" + numberWords[1]), "sp");
        setRow(strategy, (numberWords[2] + "_" + numberWords[2]), "h", [new Option("sp", 2, 7)]);
        setRow(strategy, (numberWords[3] + "_" + numberWords[3]), "h", [new Option("sp", 2, 7)]);
        setRow(strategy, (numberWords[4] + "_" + numberWords[4]), "h", [new Option("sp", 5, 6)]);
        setRow(strategy, (numberWords[5] + "_" + numberWords[5]), "h", [new Option("db", 2, 9)]);
        setRow(strategy, (numberWords[6] + "_" + numberWords[6]), "h", [new Option("sp", 2, 6)]);
        setRow(strategy, (numberWords[7] + "_" + numberWords[7]), "h", [new Option("sp", 2, 7)]);
        setRow(strategy, (numberWords[8] + "_" + numberWords[8]), "sp");
        setRow(strategy, (numberWords[9] + "_" + numberWords[9]), "sp", [new Option("s", 7, 7), new Option("s", 10, 10), new Option("s", 1, 1)]);
        setRow(strategy, (numberWords[10] + "_" + numberWords[10]), "s");

        return strategy;


    },

    //this does not work with the new way of setting the chart
    buildHiLo : function(){
        var strategy = new BJ.Strategy();

        var setRow = BJ.StrategyFactory.setRowFromArray;

        setRow(strategy, numberWords[1], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[2], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[3], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[4], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[5], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[6], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[7], ['h', 'h', 'h', 'h', 'db_9', 'db_9', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[8], ['h', 'h', 'db_9', 'db_5', 'db_3', 'db_1', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[9], ['h', 'db_1', 'db_0', 'db_-2', 'db_-4', 'db_-6', 'db_3', 'db_7', 'h', 'h']);
        setRow(strategy, numberWords[10], ['db_3', 'db_-8', 'db_-9', 'db_-10', 'db', 'db', 'db_-6', 'db_-4', 'db_-1', 'db_4']);
        setRow(strategy, numberWords[11], ['db_0', 'db', 'db', 'db', 'db', 'db', 'db_-9', 'db_-6', 'db_-4', 'db_-4']);
        setRow(strategy, numberWords[12], ['h', 's_3', 's_1', 's_0', 's_-1', 's_-3', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[13], ['h', 's_0', 's_-1', 's_-3', 's_-4', 's_-7', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[14], ['s_9', 's_-3', 's_-5', 's_-6', 's_-7', 's_-9', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[15], ['s_5', 's_-5', 's_-7', 's_-8', 's_-9', 's', 's_10', 's_10', 's_8', 's_4']);
        setRow(strategy, numberWords[16], ['s_3', 's_-9', 's_-10', 's', 's', 's', 's_9', 's_7', 's_5', 's_0']);
        setRow(strategy, numberWords[17], ['s_-4', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[18], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[19], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[20], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[21], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);

        setRow(strategy, (numberWords[1] + "_" + numberWords[2]), ['h', 'h', 'db_7', 'db_3', 'db_3', 'db_-2', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[3]), ['h', 'h', 'db_6', 'db_1', 'db_-1', 'db_-5', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[4]), ['h', 'h', 'db_6', 'db_0', 'db_-4', 'db_-10', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[5]), ['h', 'h', 'db_3', 'db_-3', 'db_-6', 'db', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[6]), ['h', 'db_1', 'db_-3', 'db_-7', 'db_-10', 'db', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[7]), ['h', 'ds_0', 'ds_-2', 'ds_-6', 'ds_-8', 'db', 's', 's', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[8]), ['h', 'ds_8', 'ds_5', 'ds_3', 'ds_1', 'ds_0', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[9]), ['h', 'ds_10', 'ds_8', 'ds_6', 'ds_5', 'ds_4', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[10]), ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);

        setRow(strategy, (numberWords[1] + "_" + numberWords[1]), ['sp_-4', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp_-9', 'sp_-8', 'sp_-7', 'sp_-8']);
        setRow(strategy, (numberWords[2] + "_" + numberWords[2]), ['h', 'sp_-2', 'sp_-5', 'sp_-7', 'sp_-9', 'sp', 'sp', 'sp_5', 'h', 'h']);
        setRow(strategy, (numberWords[3] + "_" + numberWords[3]), ['h', 'sp_0', 'sp_-3', 'sp_-7', 'sp_-9', 'sp', 'sp', 'sp_4', 'h', 'h']);
        setRow(strategy, (numberWords[4] + "_" + numberWords[4]), ['h', 'h', 'sp_8', 'sp_3', 'sp_-1', 'sp_-5', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[5] + "_" + numberWords[5]), ['db_3', 'db_-8', 'db_-9', 'db_-10', 'db', 'db', 'db_-6', 'db_-4', 'db_-1', 'db_4']);
        setRow(strategy, (numberWords[6] + "_" + numberWords[6]), ['h', 'sp_-2', 'sp_-4', 'sp_-6', 'sp_-8', 'sp_-10', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[7] + "_" + numberWords[7]), ['h', 'sp_-10', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp_5', 'h', 'h']);
        setRow(strategy, (numberWords[8] + "_" + numberWords[8]), ['sp_-1', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 's_8']);
        setRow(strategy, (numberWords[9] + "_" + numberWords[9]), ['sp_1', 'sp_-2', 'sp_-4', 'sp_-5', 'sp_-6', 'sp_-8', 'sp_3', 'sp_-8', 'sp_-9', 's']);
        setRow(strategy, (numberWords[10] + "_" + numberWords[10]), ['s', 's', 'sp_8', 'sp_6', 'sp_5', 'sp_4', 's', 's', 's', 's']);

        return strategy;


    },
    buildCassidyHybrid : function(){
        var strategy = new BJ.Strategy();

        var setRow = BJ.StrategyFactory.setRowFromArray;

        setRow(strategy, numberWords[1], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[2], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[3], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[4], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[5], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[6], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[7], ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[8], ['h', 'h', 'h', 'h_5_db', 'h_3_db', 'h_1_db', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[9], ['h', 'h_1_db', 'h_0_db', 'db', 'db', 'db', 'h_3_db', 'h', 'h', 'h']);
        setRow(strategy, numberWords[10], ['h_3_db', 'db', 'db', 'db', 'db', 'db', 'db', 'db', 'h_-1_db', 'h_4_db']);
        setRow(strategy, numberWords[11], ['h_0_db', 'db', 'db', 'db', 'db', 'db', 'db', 'db', 'db', 'db']);
        setRow(strategy, numberWords[12], ['h', 'h_3_s', 'h_1_s', 'h_0_s', 'h_-1_s', 's', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[13], ['h', 'h_0_s', 's', 's', 's', 's', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[14], ['h', 's', 's', 's', 's', 's', 'h', 'h', 'h', 'h']);
        setRow(strategy, numberWords[15], ['h_5_s', 's', 's', 's', 's', 's', 'h', 'h', 'h', 'h_4_s']);
        setRow(strategy, numberWords[16], ['h_3_s', 's', 's', 's', 's', 's', 'h', 'h', 'h_5_s', 'h_0_s']);
        setRow(strategy, numberWords[17], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[18], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[19], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[20], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, numberWords[21], ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);

        setRow(strategy, (numberWords[1] + "_" + numberWords[2]), ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[3]), ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[4]), ['h', 'h', 'h', 'h', 'db', 'db', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[5]), ['h', 'h', 'h', 'db', 'db', 'db', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[6]), ['h', 'h', 'db', 'db', 'db', 'db', 'h', 'h', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[7]), ['h', 'ds', 'ds', 'ds', 'ds', 'ds', 's', 's', 'h', 'h']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[8]), ['s', 's', 's', 's', 's', 'ds', 's', 's', 's', 's']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[9]), ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);
        setRow(strategy, (numberWords[1] + "_" + numberWords[10]), ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's']);

        setRow(strategy, (numberWords[1] + "_" + numberWords[1]), ['sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp']);
        setRow(strategy, (numberWords[2] + "_" + numberWords[2]), ['dns', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'dns', 'dns', 'dns']);
        setRow(strategy, (numberWords[3] + "_" + numberWords[3]), ['dns', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'dns', 'dns', 'dns']);
        setRow(strategy, (numberWords[4] + "_" + numberWords[4]), ['dns', 'dns', 'dns', 'dns', 'sp', 'sp', 'dns', 'dns', 'dns', 'dns']);
        setRow(strategy, (numberWords[5] + "_" + numberWords[5]), ['dns', 'dns', 'dns', 'dns', 'dns', 'dns', 'dns', 'dns', 'dns', 'dns']);
        setRow(strategy, (numberWords[6] + "_" + numberWords[6]), ['dns', 'sp', 'sp', 'sp', 'sp', 'sp', 'dns', 'dns', 'dns', 'dns']);
        setRow(strategy, (numberWords[7] + "_" + numberWords[7]), ['dns', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'dns', 'dns']);
        setRow(strategy, (numberWords[8] + "_" + numberWords[8]), ['sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp', 'sp']);
        setRow(strategy, (numberWords[9] + "_" + numberWords[9]), ['dns', 'sp', 'sp', 'sp', 'sp', 'sp', 'dns', 'sp', 'sp', 'dns']);
        setRow(strategy, (numberWords[10] + "_" + numberWords[10]), ['dns', 'dns', 'dns', 'dns_6_sp', 'dns_5_sp', 'dns_4_sp', 'dns', 'dns', 'dns', 'dns']);

        return strategy;


    },
};
