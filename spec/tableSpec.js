/* global BJ:false */
/* global $:false */
/* global describe:false */
/* global it:false */
/* global expect:false */

//function areArraysEqual(a, b) {
//    if (a === b) {return true;}
//    if (a == null || b == null) {return false;}
//    if (a.length != b.length) {return false;}
//
//    for (var i = 0; i < a.length; ++i) {
//        if (a[i] !== b[i]) {return false;}
//    }
//    return true;
//}
//function arraysHaveSameValues(a, b) {
//    return ($(a).not(b).length === 0 && $(b).not(a).length === 0);
//}



describe("blackjack", function(){
    it("getsStringValueForHand 4 & 6", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(4, 4);
        hand.cards[1] = new BJ.Card(6, 4);
        var str = table.getStringValueForHand(hand, true);
        expect(str).toEqual("ten");
    });
    it("getsStringValueForHand 4 & 4", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(4, 4);
        hand.cards[1] = new BJ.Card(4, 4);
        var str = table.getStringValueForHand(hand, true);
        expect(str).toEqual("four_four");
    });
    it("getsStringValueForHand 4 & 4 when splitting not allowed", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(4, 4);
        hand.cards[1] = new BJ.Card(4, 4);
        var str = table.getStringValueForHand(hand, false);
        expect(str).toEqual("eight");
    });
    it("getsStringValueForHand 1 & 6", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(1, 4);
        hand.cards[1] = new BJ.Card(6, 4);
        hand.score();
        var str = table.getStringValueForHand(hand, true);
        expect(str).toEqual("ace_six");
    });
    it("getsStringValueForHand 1 & 3", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(1, 4);
        hand.cards[1] = new BJ.Card(3, 4);
        hand.score();
        var str = table.getStringValueForHand(hand, true);
        expect(str).toEqual("ace_three");
    });
    it("getsStringValueForHand 1 & 1", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(1, 4);
        hand.cards[1] = new BJ.Card(1, 4);
        hand.score();
        var str = table.getStringValueForHand(hand, false);
        expect(str).toEqual("twelve");
    });
    it("getsStringValueForHand 1 & 1 & 1", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(1, 4);
        hand.cards[1] = new BJ.Card(1, 4);
        hand.cards[2] = new BJ.Card(1, 4);
        hand.score();
        var str = table.getStringValueForHand(hand, false);
        expect(str).toEqual("ace_two");
    });
    it("getsStringValueForHand 8 & 10", function(){
        var table = new BJ.Table(1, 6);
        var hand = new BJ.Hand();
        hand.cards[0] = new BJ.Card(8, 4);
        hand.cards[1] = new BJ.Card(10, 4);
        var str = table.getStringValueForHand(hand, true);
        expect(str).toEqual("eighteen");
    });

});
