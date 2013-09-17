describe('Basic Strategy Blackjack scenarios', function(){
    it('scenario one', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 6;
        table.shoe.cards[50].number = 5;
        table.shoe.cards[49].number = 6;
        table.shoe.cards[48].number = 10;
        table.shoe.cards[47].number = 8;
        table.shoe.cards[46].number = 11;
        table.shoe.cards[45].number = 2;

        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(6);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(8);
        expect(table.Players[0].hands[1].cards[0].number).toEqual(6);
        expect(table.Players[0].hands[1].cards[1].number).toEqual(11);

        expect(table.dealer.hand.cards[0].number).toEqual(5);
        expect(table.dealer.hand.cards[1].number).toEqual(10);
        expect(table.dealer.hand.cards[2].number).toEqual(2);

        expect(table.Players[0].hands[0].score()).toEqual(14);
        expect(table.Players[0].hands[1].score()).toEqual(16);
        expect(table.dealer.hand.score()).toEqual(17);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(1980);

    });
    it('scenario two', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 9;
        table.shoe.cards[49].number = 2;
        table.shoe.cards[48].number = 12;
        table.shoe.cards[47].number = 3;
        table.shoe.cards[46].number = 11;
        table.shoe.cards[45].number = 2;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(2);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(3);
        expect(table.Players[0].hands[0].cards[3].number).toEqual(11);
        expect(table.Players[0].hands[0].cards[4].number).toEqual(2);

        expect(table.dealer.hand.cards[0].number).toEqual(9);
        expect(table.dealer.hand.cards[1].number).toEqual(12);

        expect(table.Players[0].hands[0].score()).toEqual(18);
        expect(table.dealer.hand.score()).toEqual(19);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(1990);

    });
    it('scenario three', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 7;
        table.shoe.cards[49].number = 4;
        table.shoe.cards[48].number = 3;
        table.shoe.cards[47].number = 1;
        table.shoe.cards[46].number = 1;
        table.shoe.cards[45].number = 8;
        table.shoe.cards[44].number = 6;
        table.shoe.cards[43].number = 4;
        table.shoe.cards[42].number = 10;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(4);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[3].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[4].number).toEqual(8);
        expect(table.Players[0].hands[0].cards[5].number).toEqual(6);

        expect(table.dealer.hand.cards[0].number).toEqual(7);
        expect(table.dealer.hand.cards[1].number).toEqual(3);
        expect(table.dealer.hand.cards[2].number).toEqual(4);
        expect(table.dealer.hand.cards[3].number).toEqual(10);

        expect(table.Players[0].hands[0].score()).toEqual(21);
        expect(table.dealer.hand.score()).toEqual(24);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);

    });
    it('scenario four, two players', function(){
        var table = new BJ.Table(2, 1);

        table.shoe.cards[51].number = 10;
        table.shoe.cards[50].number = 1;
        table.shoe.cards[49].number = 7;
        table.shoe.cards[48].number = 9;
        table.shoe.cards[47].number = 9;
        table.shoe.cards[46].number = 10;

        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(9);

        expect(table.Players[1].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[1].hands[0].cards[1].number).toEqual(9);

        expect(table.dealer.hand.cards[0].number).toEqual(7);
        expect(table.dealer.hand.cards[1].number).toEqual(10);

        expect(table.Players[0].hands[0].score()).toEqual(19);
        expect(table.Players[1].hands[0].score()).toEqual(20);
        expect(table.dealer.hand.score()).toEqual(17);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);
        expect(table.Players[1].bankroll).toEqual(2010);

    });
    it('scenario five', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 8;
        table.shoe.cards[50].number = 7;
        table.shoe.cards[49].number = 8;
        table.shoe.cards[48].number = 10;
        table.shoe.cards[47].number = 8;
        table.shoe.cards[46].number = 3;
        table.shoe.cards[45].number = 9;
        table.shoe.cards[44].number = 8;
        table.shoe.cards[43].number = 10;
        table.shoe.cards[42].number = 2;
        table.shoe.cards[41].number = 2;
        table.shoe.cards[40].number = 8;
        table.shoe.cards[39].number = 4;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(8);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(3);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(9);
        expect(table.Players[0].hands[1].cards[0].number).toEqual(8);
        expect(table.Players[0].hands[1].cards[1].number).toEqual(10);
        expect(table.Players[0].hands[2].cards[0].number).toEqual(8);
        expect(table.Players[0].hands[2].cards[1].number).toEqual(2);
        expect(table.Players[0].hands[2].cards[2].number).toEqual(2);
        expect(table.Players[0].hands[3].cards[0].number).toEqual(8);
        expect(table.Players[0].hands[3].cards[1].number).toEqual(8);
        expect(table.Players[0].hands[3].cards[2].number).toEqual(4);

        expect(table.dealer.hand.cards[0].number).toEqual(7);
        expect(table.dealer.hand.cards[1].number).toEqual(10);

        expect(table.Players[0].hands[0].score()).toEqual(20);
        expect(table.Players[0].hands[1].score()).toEqual(18);
        expect(table.Players[0].hands[2].score()).toEqual(12);
        expect(table.Players[0].hands[3].score()).toEqual(20);
        expect(table.dealer.hand.score()).toEqual(17);

        expect(table.Players[0].hands[0].doubled).toEqual(true);
        expect(table.Players[0].hands[1].doubled).toEqual(false);
        expect(table.Players[0].hands[2].doubled).toEqual(true);
        expect(table.Players[0].hands[3].doubled).toEqual(false);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2020);

    });
    it('scenario six', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 9;
        table.shoe.cards[49].number = 8;
        table.shoe.cards[48].number = 9;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(8);

        expect(table.dealer.hand.cards[0].number).toEqual(9);
        expect(table.dealer.hand.cards[1].number).toEqual(9);

        expect(table.Players[0].hands[0].score()).toEqual(19);
        expect(table.dealer.hand.score()).toEqual(18);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);

    });

    it('scenario seven', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 12;
        table.shoe.cards[49].number = 11;
        table.shoe.cards[48].number = 1;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(11);

        expect(table.dealer.hand.cards[0].number).toEqual(12);
        expect(table.dealer.hand.cards[1].number).toEqual(1);

        expect(table.Players[0].hands[0].score()).toEqual(21);
        expect(table.dealer.hand.score()).toEqual(21);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2000);

    });
    it('scenario eight', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 1;
        table.shoe.cards[49].number = 11;
        table.shoe.cards[48].number = 12;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(11);

        expect(table.dealer.hand.cards[0].number).toEqual(1);
        expect(table.dealer.hand.cards[1].number).toEqual(12);

        expect(table.Players[0].hands[0].score()).toEqual(21);
        expect(table.dealer.hand.score()).toEqual(21);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);

    });
    it('scenario nine', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 7;
        table.shoe.cards[50].number = 1;
        table.shoe.cards[49].number = 8;
        table.shoe.cards[48].number = 1;
        table.shoe.cards[47].number = 4;
        table.shoe.cards[46].number = 1;
        table.shoe.cards[45].number = 1;
        table.shoe.cards[44].number = 1;
        table.shoe.cards[43].number = 1;
        table.shoe.cards[42].number = 10;
        table.shoe.cards[41].number = 8;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(7);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(8);
        expect(table.Players[0].hands[0].cards[2].number).toEqual(4);

        expect(table.dealer.hand.cards[0].number).toEqual(1);
        expect(table.dealer.hand.cards[1].number).toEqual(1);
        expect(table.dealer.hand.cards[2].number).toEqual(1);
        expect(table.dealer.hand.cards[3].number).toEqual(1);
        expect(table.dealer.hand.cards[4].number).toEqual(1);
        expect(table.dealer.hand.cards[5].number).toEqual(1);
        expect(table.dealer.hand.cards[6].number).toEqual(10);
        expect(table.dealer.hand.cards[7].number).toEqual(8);

        expect(table.Players[0].hands[0].score()).toEqual(19);
        expect(table.dealer.hand.score()).toEqual(24);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2010);

    });
    it('scenario ten', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 2;
        table.shoe.cards[50].number = 10;
        table.shoe.cards[49].number = 2;
        table.shoe.cards[48].number = 1;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(2);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(2);

        expect(table.dealer.hand.cards[0].number).toEqual(10);
        expect(table.dealer.hand.cards[1].number).toEqual(1);

        expect(table.Players[0].hands[0].score()).toEqual(4);
        expect(table.dealer.hand.score()).toEqual(21);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(1990);

    });
    it('scenario eleven', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 10;
        table.shoe.cards[50].number = 2;
        table.shoe.cards[49].number = 1;
        table.shoe.cards[48].number = 2;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(10);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(1);

        expect(table.dealer.hand.cards[0].number).toEqual(2);
        expect(table.dealer.hand.cards[1].number).toEqual(2);

        expect(table.Players[0].hands[0].score()).toEqual(21);
        expect(table.dealer.hand.score()).toEqual(4);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2015);


    });
    it('scenario twelve', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 7;
        table.shoe.cards[49].number = 1;
        table.shoe.cards[48].number = 1;
        table.shoe.cards[47].number = 1;
        table.shoe.cards[46].number = 2;


        table.deal();

        table.decision();
        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(1);
        expect(table.Players[0].hands[1].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[1].cards[1].number).toEqual(2);

        expect(table.dealer.hand.cards[0].number).toEqual(7);
        expect(table.dealer.hand.cards[1].number).toEqual(1);

        expect(table.Players[0].hands[0].score()).toEqual(12);
        expect(table.Players[0].hands[1].score()).toEqual(13);
        expect(table.dealer.hand.score()).toEqual(18);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(1980);

    });

    it('scenario thirteen', function(){
        var table = new BJ.Table(1, 1);

        table.shoe.cards[51].number = 1;
        table.shoe.cards[50].number = 5;
        table.shoe.cards[49].number = 1;
        table.shoe.cards[48].number = 10;
        table.shoe.cards[47].number = 10;
        table.shoe.cards[46].number = 5;
        table.shoe.cards[45].number = 10;

        table.deal();

        table.decision();

        table.dealer.hit(table.Players, table.shoe);

        expect(table.Players[0].hands[0].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[0].cards[1].number).toEqual(10);
        expect(table.Players[0].hands[1].cards[0].number).toEqual(1);
        expect(table.Players[0].hands[1].cards[1].number).toEqual(5);
        expect(typeof table.Players[0].hands[1].cards[2]).toEqual('undefined');

        expect(table.dealer.hand.cards[0].number).toEqual(5);
        expect(table.dealer.hand.cards[1].number).toEqual(10);
        expect(table.dealer.hand.cards[2].number).toEqual(10);

        expect(table.Players[0].hands[0].score()).toEqual(21);
        expect(table.Players[0].hands[1].score()).toEqual(16);
        expect(table.dealer.hand.score()).toEqual(25);

        table.payout();

        expect(table.Players[0].bankroll).toEqual(2020);

    });
});
