export enum Space {
  CORNER,
}

// prettier-ignore
export enum Card {
  
  // spades
	S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,SQ,SK,SA,

  // clovers / clubs
	C1,C2,C3,C4,C5,C6,C7,C8,C9,C10,CQ,CK,CA,

  // diamonds
	D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,DQ,DK,DA,

  // hearts
	H1,H2,H3,H4,H5,H6,H7,H8,H9,H10,HQ,HK,HA,
}

export type Location = [number, number];

const P = Space;
const C = Card;

export const boardConfig = {
  rows: [
    [P.CORNER, C.S2, C.S3, C.S4, C.S5, C.S6, C.S7, C.S8, C.S9, P.CORNER],
    [C.C6, C.C5, C.C4, C.C3, C.C2, C.HA, C.HK, C.HQ, C.H10, C.S10],
    [C.C7, C.SA, C.D2, C.D3, C.D4, C.D5, C.D6, C.D7, C.H9, C.SQ],
    [C.C8, C.SK, C.C6, C.C5, C.C4, C.C3, C.C2, C.D8, C.H8, C.SK],
    [C.C9, C.SQ, C.C7, C.H6, C.H5, C.H4, C.HA, C.D9, C.H7, C.SA],
    [C.C10, C.S10, C.C8, C.H7, C.H2, C.H3, C.HK, C.D10, C.H6, C.D2],
    [C.CQ, C.S9, C.C9, C.H8, C.H9, C.H10, C.HQ, C.DQ, C.H5, C.D3],
    [C.CK, C.S8, C.C10, C.CQ, C.CK, C.CA, C.DA, C.DK, C.H4, C.D4],
    [C.CA, C.S7, C.S6, C.S5, C.S4, C.S3, C.S2, C.H2, C.H3, C.D5],
    [P.CORNER, C.DA, C.DK, C.DQ, C.D10, C.D9, C.D8, C.D7, C.D6, P.CORNER],
  ],
};

export function cardname(card: Card): string {
  const [suit, ...num] = Card[card];
  const n = num.join("");
  let ret = "";
  switch (n) {
    case "A":
      ret += "Ace";
      break;
    case "K":
      ret += "King";
      break;
    case "Q":
      ret += "Queen";
      break;
    case "J":
      ret += "Jack";
      break;
    default:
      ret += n;
  }
  ret += " of ";
  switch (suit) {
    case "S":
      ret += "Spades";
      break;
    case "C":
      ret += "Clubs";
      break;
    case "D":
      ret += "Diamonds";
      break;
    case "H":
      ret += "Hearts";
      break;
  }
  return ret;
}
