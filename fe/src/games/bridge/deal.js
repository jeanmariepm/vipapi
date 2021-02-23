import brisgeService from "../../common/bridgeService";
class Deal {
  static apiBase = "http://localhost:8000/games/api/deals/";
  static shuffle() {
    let cards = [];
    for (let i = 0; i < 52; i++) {
      cards[i] = i;
    }
    let card;
    let deal = [];

    for (let j = 0; j < 4; j++) {
      let player = { Spade: [], Heart: [], Diamond: [], Club: [] };
      for (let k = 0; k < 13; k++) {
        card = cards[Math.floor(Math.random() * cards.length)];
        cards.splice(cards.indexOf(card), 1);
        if (card < 13) player["Spade"].push(card);
        else if (card < 26) player["Heart"].push(card);
        else if (card < 39) player["Diamond"].push(card);
        else if (card < 52) player["Club"].push(card);
      }
      deal.push(player);
    }
    console.log("Shuffled: ", deal);
    return deal;
  }

  static async save(deals) {
    for (let i = 0; i < deals.length; i++) {
      const { deal: hands, bid } = deals[i];
      console.log({ hands, bid });
      brisgeService.saveDeal(hands, bid);
      console.log("Saved!!!");
    }
  }
}

export default Deal;
