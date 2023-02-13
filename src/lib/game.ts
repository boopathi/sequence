import { boardConfig, Card, Space, type Location } from "./board-config";

export enum GameState {
  PLAYING,
  GG_RED,
  GG_BLUE,
  GG_GREEN,
  BOARD_DRAW,
}

export enum BoardState {
  CORNER = 101,
  RED_CHIP,
  GREEN_CHIP,
  BLUE_CHIP,
  EMPTY,
}

interface Chunk {
  x: number;
  y: number;
  c: BoardState[][];
  formatted: string[][];
}

export interface CheckResult {
  completed: Completion[];
}

export enum CompletionPath {
  DIAG_0 = "DIAG_0",
  DIAG_1 = "DIAG_1",
  ROW = "ROW",
  COL = "COL",
}

export interface HistoryItem {
  type: "add" | "remove";
  loc: Location;
  chip: BoardState;
}

export interface Completion {
  state: BoardState;
  path: CompletionPath;
  locs: Location[];
}

export enum Team {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
}

const possibleGames = {
  "1vs1": {
    title: "1 vs 1",
    numTeams: 2,
    numPlayers: 2,
  },
  "1vs1vs1": {
    title: "1 vs 1 vs 1",
    numTeams: 3,
    numPlayers: 3,
  },
  "2vs2": {
    title: "2 vs 2",
    numTeams: 2,
    numPlayers: 4,
  },
  "3vs3": {
    title: "3 vs 3",
    numTeams: 2,
    numPlayers: 6,
  },
  "2vs2vs2": {
    title: "2 vs 2 vs 2",
    numTeams: 3,
    numPlayers: 6,
  },
  "4vs4": {
    title: "4 vs 4",
    numTeams: 2,
    numPlayers: 8,
  },
  "3vs3vs3": {
    title: "3 vs 3 vs 3",
    numTeams: 3,
    numPlayers: 9,
  },
  "5vs5": {
    title: "5 vs 5",
    numTeams: 2,
    numPlayers: 10,
  },
  "6vs6": {
    title: "6 vs 6",
    numTeams: 2,
    numPlayers: 12,
  },
  "4vs4vs4": {
    title: "4 vs 4 vs 4",
    numTeams: 3,
    numPlayers: 12,
  },
} as const;

export type GameSetup = keyof typeof possibleGames;

export class Game {
  board = new Board();

  history: HistoryItem[] = [];

  numPlayers: number;
  numTeams: number;
  numSequences = 2;

  status = this.board.check();

  currentPlayer = 0;

  gameState = "";

  constructor(public gameSetup: GameSetup) {
    this.numPlayers = possibleGames[gameSetup].numPlayers;
    this.numTeams = possibleGames[gameSetup].numTeams;
  }

  playTurn(loc: Location) {
    if (this.isDone()) {
      throw new Error("ERR_GAME_OVER: Game over");
    }
    const chip = this.currentChip();

    this.board.place(loc, chip);
    this.history.push({ type: "add", loc, chip });
    this.status = this.board.check();

    if (this.currentPlayer >= this.numPlayers - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
  }

  remove(loc: Location) {
    if (this.isDone()) {
      throw new Error("ERR_GAME_OVER: Game over");
    }
    const chip = this.currentChip();
    const cur = this.get(loc);
    if (cur === BoardState.EMPTY) {
      throw new Error("ERR_EMPTY_SPACE: No chip to remove");
    }
    if (cur === chip) {
      throw new Error("ERR_OWN_CHIP: Cannot remove own chip");
    }
    if (this.isFrozen(loc)) {
      throw new Error("ERR_FROZEN_CHIP: Cannot remove from completed sequence");
    }
    this.board.remove(loc);
    this.history.push({ type: "remove", loc, chip });
    this.status = this.board.check();
    if (this.currentPlayer >= this.numPlayers - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
  }

  hasUndo() {
    return this.history.length > 0;
  }

  undo() {
    const lastMove = this.history.pop();
    if (lastMove) {
      if (lastMove.type === "add") {
        this.board.remove(lastMove.loc);
      } else {
        this.board.place(lastMove.loc, this.currentChip());
      }
    }
    this.status = this.board.check();
    if (this.currentPlayer <= 0) {
      this.currentPlayer = this.numPlayers - 1;
    } else {
      this.currentPlayer--;
    }
  }

  isDone() {
    const score = this.score();
    for (const s of score) {
      if (s.score >= this.numSequences) {
        return true;
      }
    }
    return false;
  }

  get(loc: Location) {
    return this.board.get(loc);
  }

  getFrozen(loc: Location) {
    return this.status.completed.find((c) => {
      return c.locs.some((l) => l[0] === loc[0] && l[1] === loc[1]);
    })?.state;
  }

  isFrozen(loc: Location) {
    const ret = this.status.completed.some((c) => {
      return c.locs.some((l) => l[0] === loc[0] && l[1] === loc[1]);
    });
    return ret;
  }

  score() {
    let red = 0;
    let blue = 0;
    let green = 0;
    for (const c of this.status.completed) {
      switch (c.state) {
        case BoardState.RED_CHIP:
          red++;
          break;
        case BoardState.BLUE_CHIP:
          blue++;
          break;
        case BoardState.GREEN_CHIP:
          green++;
          break;
      }
    }
    if (this.numTeams === 2)
      return [
        { team: BoardState.RED_CHIP, score: red },
        { team: BoardState.BLUE_CHIP, score: blue },
      ];
    else
      return [
        { team: BoardState.RED_CHIP, score: red },
        { team: BoardState.BLUE_CHIP, score: blue },
        { team: BoardState.GREEN_CHIP, score: green },
      ];
  }

  currentChip() {
    switch (this.numTeams) {
      case 2:
        return [BoardState.RED_CHIP, BoardState.BLUE_CHIP][
          this.currentPlayer % 2
        ];
      case 3:
        return [
          BoardState.RED_CHIP,
          BoardState.BLUE_CHIP,
          BoardState.GREEN_CHIP,
        ][this.currentPlayer % 3];
    }
    throw new Error(`ERR_INVALID_NUM_TEAMS`);
  }
}

export class Board {
  rows: BoardState[][];
  private n = 5;

  constructor() {
    this.rows = Array.from({ length: boardConfig.rows.length }, (_, i) =>
      Array.from({ length: boardConfig.rows[0].length }, (_, j) =>
        boardConfig.rows[i][j] === Space.CORNER
          ? BoardState.CORNER
          : BoardState.EMPTY,
      ),
    );
  }

  get(loc: Location) {
    return this.rows[loc[0]][loc[1]];
  }

  // DEV ONLY
  print(chalk: any) {
    const getBoardState = (state: BoardState) => {
      switch (state) {
        case BoardState.EMPTY:
          return chalk.gray("-");
        case BoardState.BLUE_CHIP:
          return chalk.blue("x");
        case BoardState.RED_CHIP:
          return chalk.red("x");
        case BoardState.GREEN_CHIP:
          return chalk.green("x");
        case BoardState.CORNER:
          return chalk.yellow("o");
      }
    };

    let out = "";

    for (const row of this.rows) {
      out += row.map((it) => getBoardState(it)).join(" ") + "\n";
    }

    return out;
  }

  place(loc: Location, chip: BoardState) {
    if (chip === BoardState.CORNER || chip === BoardState.EMPTY) {
      throw new Error(`ERR_INVALID_MOVE: not a chip`);
    }
    const x = loc[0];
    const y = loc[1];
    if (this.rows[x][y] === BoardState.CORNER)
      throw new Error(`ERR_CORNER_CHIP: Cannot play CORNER location`);

    if (this.rows[x][y] !== BoardState.EMPTY)
      throw new Error(
        `ERR_CHIP_EXISTS: Cannot play the card "${
          Card[boardConfig.rows[x][y]]
        }". Card already exists`,
      );

    this.rows[x][y] = chip;
  }

  remove(loc: Location) {
    const x = loc[0];
    const y = loc[1];
    if (this.rows[x][y] === BoardState.CORNER)
      throw new Error(`ERR_CORNER_CHIP: Cannot remove from CORNER location`);

    if (this.rows[x][y] === BoardState.EMPTY)
      throw new Error(`ERR_EMPTY_SPACE: No chip to remove from the space`);

    this.rows[x][y] = BoardState.EMPTY;
  }

  check(): CheckResult {
    const chunks = this.chunk();
    const reducer = (p: BoardState, d: BoardState) =>
      this.canCount(p, d) ? d : BoardState.EMPTY;

    const status = chunks.reduce<CheckResult>(
      (acc, cur) => {
        const diagonals = this.diagonals(cur.c);
        let found = diagonals[0].reduce(reducer);

        if (found !== BoardState.EMPTY) {
          const locs = Array.from(
            { length: this.n },
            (_, i) => [cur.x + i, cur.y + i] satisfies Location,
          );
          const completed = {
            state: found,
            path: CompletionPath.DIAG_0,
            locs,
          };
          if (findNumOverlap(acc.completed, completed) < 2) {
            acc.completed.push(completed);
          }
        }

        found = diagonals[1].reduce(reducer);
        if (found !== BoardState.EMPTY) {
          const completed = {
            state: found,
            path: CompletionPath.DIAG_1,
            locs: Array.from(
              { length: this.n },
              (_, i) => [cur.x + i, cur.y + this.n - 1 - i] satisfies Location,
            ),
          };
          if (findNumOverlap(acc.completed, completed) < 2) {
            acc.completed.push(completed);
          }
        }

        const columns = this.columns(cur.c);
        for (const [j, col] of columns.entries()) {
          found = col.reduce(reducer);
          if (found !== BoardState.EMPTY) {
            const completed = {
              state: found,
              path: CompletionPath.COL,
              locs: Array.from(
                { length: this.n },
                (_, i) => [cur.x + i, cur.y + j] satisfies Location,
              ),
            };
            if (findNumOverlap(acc.completed, completed) < 2) {
              acc.completed.push(completed);
            }
          }
        }

        for (const [j, row] of cur.c.entries()) {
          found = row.reduce(reducer);
          if (found !== BoardState.EMPTY) {
            const completed = {
              state: found,
              path: CompletionPath.ROW,
              locs: Array.from(
                { length: this.n },
                (_, i) => [cur.x + j, cur.y + i] satisfies Location,
              ),
            };
            if (findNumOverlap(acc.completed, completed) < 2) {
              acc.completed.push(completed);
            }
          }
        }

        return acc;
      },
      {
        completed: [],
      },
    );

    return status;
  }

  private canCount(a: BoardState, b: BoardState) {
    if (a === BoardState.EMPTY || b === BoardState.EMPTY) return false;
    if (a === BoardState.CORNER || b === BoardState.CORNER) return true;
    return a === b;
  }

  private columns(chunk: BoardState[][]) {
    return chunk.map((r, i) => r.map((_, j) => chunk[j][i]));
  }

  private diagonals(chunk: BoardState[][]) {
    const len = chunk.length;
    const result: [BoardState[], BoardState[]] = [[], []];
    for (let i = 0; i < len; i++) {
      result[0].push(chunk[i][i]);
      result[1].push(chunk[i][len - 1 - i]);
    }
    return result;
  }

  private chunk() {
    const chunks: Chunk[] = [];

    if (this.rows.length < this.n)
      throw new Error(`ERR_CHUNK_LARGER_THAN_NUM_ROWS`);

    if (this.rows[0].length < this.n)
      throw new Error(`ERR_CHUNK_LARGER_THAN_NUM_COLS`);

    for (let i = 0; i <= this.rows.length - this.n; i++) {
      for (let j = 0; j <= this.rows[0].length - this.n; j++) {
        const chunk: Chunk = { x: i, y: j, c: [], formatted: [] };
        for (let k = 0; k < this.n; k++) {
          chunk.c.push(this.rows[i + k].slice(j, j + this.n));
          chunk.formatted.push(
            ...chunk.c.map((it) => it.map((i) => BoardState[i])),
          );
        }

        chunks.push(chunk);
      }
    }

    return chunks;
  }
}

function findNumOverlap(completions: Completion[], newCompletion: Completion) {
  let numOverlaps = 0;
  for (const completion of completions) {
    numOverlaps += numLocationOverlap(completion.locs, newCompletion.locs);
  }
  return numOverlaps;
}

function numLocationOverlap(as: Location[], bs: Location[]) {
  let n = 0;
  // we assume that num As is the same as num Bs
  for (const a of as) {
    for (const b of bs) {
      if (a[0] === b[0] && a[1] === b[1]) n++;
    }
  }
  return n;
}
