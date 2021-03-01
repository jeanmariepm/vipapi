class bid_agent:
    def __init__(self, hand):
        self.hand = hand
        self.hcp = 0
        self.ltc = 0
        self.distribution = []
        self.handShape = ""
        self.evaluate_hand()

    def __str__(self):
        return (
            f" {self.hand}\n{self.hcp} {self.ltc} {self.distribution} {self.handShape}"
        )

    def evaluate_hand(self):
        for suit, cards in self.hand.items():
            self.hcp += 4 if "A" in cards else 0
            self.hcp += 3 if "K" in cards else 0
            self.hcp += 2 if "Q" in cards else 0
            self.hcp += 1 if "J" in cards else 0
            self.distribution.append(len(cards))
            ltcCards = [x for x in cards if x not in "AKQ"]
            self.ltc += min(3, len(cards)) - (len(cards) - len(ltcCards))
        if self.distribution.count(0) > 0:
            self.handShape = "U"  # void
        elif self.distribution.count(1) > 0:
            self.handShape = "U"  # singleton
        elif self.distribution.count(2) > 1:
            self.handShape = "S"  # multiple doubletons
        else:
            self.handShape = "B"  # balanced hand

    def getNTBid(self):
        if self.handShape == "U":  # unbalaced
            return "TBD"
        if self.handShape == "B":
            # add a pt for 5-cd suit
            adjustedHcp = self.hcp + (1 if self.distribution.count(5) == 1 else 0)
        elif self.handShape == "S":
            adjustedHcp = self.hcp
        if adjustedHcp >= 15 and adjustedHcp <= 17:
            return "1NT"
        if adjustedHcp >= 20 and adjustedHcp <= 21:
            return "1NT"
        return "TBD"

    def get1MajorBid(self):
        spadeLength = self.distribution[0]
        heartLength = self.distribution[1]
        if spadeLength < 5 and heartLength < 5:
            return "TBD"
        if self.hcp >= 11 and self.hcp <= 21:
            return "1S" if spadeLength >= heartLength else "1H"
        if self.hcp == 10 and self.handShape == "U":
            return "1S" if spadeLength >= heartLength else "1H"
        return "TBD"

    def get1MinorBid(self):
        diamondLength = self.distribution[2]
        clubLength = self.distribution[3]
        if self.hcp >= 12 and self.hcp <= 21:
            return "1D" if diamondLength >= clubLength and diamondLength >= 4 else "1C"
        if self.hcp == 11 and (diamondLength + clubLength) >= 10:
            return "1D" if diamondLength >= clubLength else "1C"
        return "TBD"

    def get2CBid(self):
        if self.hcp >= 21:
            return "2C"
        return "TBD"

    def getPreemptBid(self):
        if self.ltc >= 9:
            return "TBD"
        if max(self.distribution) < 6:
            return "TBD"
        spadeLength = self.distribution[0]
        heartLength = self.distribution[1]
        diamondLength = self.distribution[2]
        clubLength = self.distribution[3]
        if max(self.distribution) == 6:
            return (
                "2S"
                if spadeLength == 6
                else "2H"
                if heartLength == 6
                else "2D"
                if diamondLength == 6
                else "TBD"
            )
        if max(self.distribution) > 6:
            suit = (
                "S"
                if spadeLength > 6
                else "H"
                if heartLength > 6
                else "D"
                if diamondLength > 6
                else "C"
            )
            level = 11 - self.ltc
            return f"{level}{suit}"
        return "TBD"

    def make_bid(self):
        ai_bid = self.getNTBid()
        if ai_bid == "TBD":
            ai_bid = self.get1MajorBid()
        if ai_bid == "TBD":
            ai_bid = self.get1MinorBid()
        if ai_bid == "TBD":
            ai_bid = self.get2CBid()
        if ai_bid == "TBD":
            ai_bid = self.getPreemptBid()
        if ai_bid == "TBD":
            ai_bid = "Pass"

        return f"{ai_bid}"
