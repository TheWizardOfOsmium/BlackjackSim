describe('Cassidy H17 Blackjack scenarios', function(){
    it('scenario one', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 5;
        table.shoe.cards[50].number = 1;
        table.shoe.cards[49].number = 6;
        table.shoe.cards[48].number = 6;
        table.shoe.cards[47].number = 4;
        table.shoe.cards[46].number = 4;
        table.shoe.cards[45].number = 2;

        table.Players[0].setStrategy("cassidyH17");
        table.dealer.hitsOn = "h17";

        table.shoe.cardCount = -2;

        table.deal();
        expect(table.shoe.cardCount).toEqual(-1);

        table.decision();
        table.dealer.hit(table.Players, table.shoe);
        table.flipCardUp(table.dealer.hand.cards[1]);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(5);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(6);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(4);
        expect(table.Players[0].hands[0].cards[3].number).toEqual(4);

        expect(table.dealer.hand.cards[0].number).toEqual(1);
        expect(table.dealer.hand.cards[1].number).toEqual(6);
        expect(table.dealer.hand.cards[2].number).toEqual(2);

        expect(table.Players[0].hands[0].score()).toEqual(19);

        expect(table.dealer.hand.score()).toEqual(19);
        expect(table.shoe.cardCount).toEqual(3);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2000);

    });
    it('scenario two', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 5;
        table.shoe.cards[50].number = 2;
        table.shoe.cards[49].number = 8;
        table.shoe.cards[48].number = 11;
        table.shoe.cards[47].number = 6;
        table.shoe.cards[46].number = 11;

        table.Players[0].setStrategy("cassidyH17");
        table.dealer.hitsOn = "h17"

        table.shoe.cardCount = -3;

        table.deal();

        expect(table.shoe.cardCount).toEqual(-1);

        table.decision();
        table.dealer.hit(table.Players, table.shoe);
        table.flipCardUp(table.dealer.hand.cards[1]);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(5);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(8);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(6);

        expect(table.dealer.hand.cards[0].number).toEqual(2);
        expect(table.dealer.hand.cards[1].number).toEqual(11);
        expect(table.dealer.hand.cards[2].number).toEqual(11);

        expect(table.Players[0].hands[0].score()).toEqual(19);
        expect(table.dealer.hand.score()).toEqual(22);
        
        expect(table.shoe.cardCount).toEqual(-2);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);

    });
    it('scenario three', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 4;
        table.shoe.cards[50].number = 7;
        table.shoe.cards[49].number = 5;
        table.shoe.cards[48].number = 6;
        table.shoe.cards[47].number = 9;
        table.shoe.cards[46].number = 5;

        table.Players[0].setStrategy("cassidyH17");

        table.shoe.cardCount = 4;

        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(4);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(5);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(9);

        expect(table.dealer.hand.cards[0].number).toEqual(7);
        expect(table.dealer.hand.cards[1].number).toEqual(6);
        expect(table.dealer.hand.cards[2].number).toEqual(5);

        expect(table.Players[0].hands[0].score()).toEqual(18);
        expect(table.dealer.hand.score()).toEqual(18);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2000);

    });
    it('scenario four', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 10;
        table.shoe.cards[50].number = 4;
        table.shoe.cards[49].number = 10;
        table.shoe.cards[48].number = 10;
        table.shoe.cards[47].number = 10;
        table.shoe.cards[46].number = 9;
        table.shoe.cards[45].number = 1;
        table.shoe.cards[44].number = 10;
        table.shoe.cards[43].number = 9;
        table.shoe.cards[42].number = 7;
        table.shoe.cards[41].number = 8;

        table.Players[0].setStrategy("cassidyH17");

        table.shoe.cardCount = 12;
        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(9);
        expect(table.Players[0].hands[1].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[1].cards[1].number).toEqual(1);
        expect(table.Players[0].hands[2].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[2].cards[1].number).toEqual(9);
        expect(table.Players[0].hands[3].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[3].cards[1].number).toEqual(7);

        expect(table.dealer.hand.cards[0].number).toEqual(4);
        expect(table.dealer.hand.cards[1].number).toEqual(10);
        expect(table.dealer.hand.cards[2].number).toEqual(8);

        expect(table.Players[0].hands[0].score()).toEqual(19);
        expect(table.Players[0].hands[1].score()).toEqual(21);
        expect(table.Players[0].hands[2].score()).toEqual(19);
        expect(table.Players[0].hands[3].score()).toEqual(17);
        expect(table.dealer.hand.score()).toEqual(22);

        expect(table.Players[0].hands[0].doubled).toEqual(false);
        expect(table.Players[0].hands[1].doubled).toEqual(false);
        expect(table.Players[0].hands[2].doubled).toEqual(false);
        expect(table.Players[0].hands[3].doubled).toEqual(false);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2400);

    });
    it('scenario five', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 5;
        table.shoe.cards[49].number = 3;
        table.shoe.cards[48].number = 7;
        table.shoe.cards[47].number = 8;
        table.shoe.cards[46].number = 8;

        table.Players[0].setStrategy("cassidyH17");

        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(3);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(8);

        expect(table.dealer.hand.cards[0].number).toEqual(5);
        expect(table.dealer.hand.cards[1].number).toEqual(7);
        expect(table.dealer.hand.cards[2].number).toEqual(8);

        expect(table.Players[0].hands[0].score()).toEqual(12);
        expect(table.dealer.hand.score()).toEqual(20);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(1990);

    });

});
