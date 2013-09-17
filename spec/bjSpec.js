/* global BJ:false */
/* global $:false */
/* global describe:false */
/* global it:false */
/* global expect:false */

function areArraysEqual(a, b) {
    if (a === b) {return true;}
    if (a == null || b == null) {return false;}
    if (a.length != b.length) {return false;}

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {return false;}
    }
    return true;
}
function arraysHaveSameValues(a, b) {
    return ($(a).not(b).length === 0 && $(b).not(a).length === 0);
}



describe("blackjack", function(){
    it("tries to create a card", function(){
        var card = new BJ.Card(2, 3);
        expect(card.number).toEqual(2);
        expect(card.suit.value).toEqual("Hearts");
    });
    it("tries to create a deck", function(){
        var deck = new BJ.Deck(2, 3);
        expect(deck.cards.length).toEqual(52);
    });
    it("tries to create a shoe", function(){
        var shoe = new BJ.Shoe(6);
        expect(shoe.cards.length).toEqual(52*6);
    });
    it("shuffles a shoe", function(){
        var shoe = new BJ.Shoe(6);
        var cards1 = shoe.cards;
        shoe.shuffle();
        var cards2 = shoe.cards.slice();
        shoe.shuffle();
        var cards3 = shoe.cards.slice();

        //below from http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays
        var equalvalues1 = arraysHaveSameValues(cards1, cards2); 
        var equalorder1 = areArraysEqual(cards1, cards2);
        
        expect(equalvalues1).toEqual(true);
        expect(equalorder1).toEqual(false);
    });
    it("tests array functions", function(){
        var a = [1, 2, 3];
        var b = [2, 1, 3];
        expect(arraysHaveSameValues(a, b)).toEqual(true);
        expect(areArraysEqual(a, b)).toEqual(false);
    });

});
