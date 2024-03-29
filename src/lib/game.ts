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
  chipAtLoc: BoardState;
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

export const possibleGames = {
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

  status: CheckResult = {
    completed: [],
  };

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
    this.history.push({ type: "add", loc, chip, chipAtLoc: BoardState.EMPTY });
    this.updateStatus(loc);

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
    this.history.push({ type: "remove", loc, chip, chipAtLoc: cur });
    this.updateStatus(loc);
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
      } else if (lastMove.type === "remove") {
        this.board.place(lastMove.loc, lastMove.chipAtLoc);
      }
      this.updateStatus(lastMove.loc, true);
      if (this.currentPlayer <= 0) {
        this.currentPlayer = this.numPlayers - 1;
      } else {
        this.currentPlayer--;
      }
    }
  }

  isDone() {
    const score = this.score();
    for (const s of score) {
      if (s.score >= this.numSequences) {
        return s.team;
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

  getFrozenPath(loc: Location) {
    const ret = this.status.completed.find((c) => {
      return c.locs.some((l) => l[0] === loc[0] && l[1] === loc[1]);
    });
    return ret?.path;
  }

  updateStatus(loc: Location, isUndo = false) {
    if (isUndo) {
      // remove the sets that use the location loc
      this.status.completed = this.status.completed.filter((c) => {
        return !c.locs.some((l) => l[0] === loc[0] && l[1] === loc[1]);
      });
    }
    this.status = this.board.check2(loc, this.status);
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
    return this.chipFor(this.currentPlayer % this.numTeams);
  }

  chipFor(teamNum: number, numTeams = this.numTeams) {
    switch (numTeams) {
      case 2:
        return [BoardState.RED_CHIP, BoardState.BLUE_CHIP][teamNum];
      case 3:
        return [
          BoardState.RED_CHIP,
          BoardState.BLUE_CHIP,
          BoardState.GREEN_CHIP,
        ][teamNum];
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

  getCompletion(
    chunks: Location[][],
    path: CompletionPath,
  ): Completion | undefined {
    // prefer corners
    chunks.sort((a, b) => {
      if (a.some((loc) => this.get(loc) === BoardState.CORNER)) return -1;
      if (b.some((loc) => this.get(loc) === BoardState.CORNER)) return 1;
      return 0;
    });
    for (const chunk of chunks) {
      const winner = chunk
        .map((loc) => this.get(loc))
        .reduce((acc, cur) => {
          if (acc === BoardState.EMPTY || cur === BoardState.EMPTY)
            return BoardState.EMPTY;
          if (acc === BoardState.CORNER) return cur;
          if (cur === BoardState.CORNER) return acc;
          return acc === cur ? cur : BoardState.EMPTY;
        });
      if (winner !== BoardState.EMPTY) {
        return {
          state: winner,
          locs: chunk,
          path,
        };
      }
    }
    return;
  }

  check2(loc: Location, previousResult: CheckResult = { completed: [] }) {
    const rowChunks = getRowChunks(loc);
    const colChunks = getColChunks(loc);
    const diag0Chunks = getDiag0Chunks(loc);
    const diag1Chunks = getDiag1Chunks(loc);

    const rowCompletion = this.getCompletion(rowChunks, CompletionPath.ROW);
    const colCompletion = this.getCompletion(colChunks, CompletionPath.COL);
    const diag0Completion = this.getCompletion(
      diag0Chunks,
      CompletionPath.DIAG_0,
    );
    const diag1Completion = this.getCompletion(
      diag1Chunks,
      CompletionPath.DIAG_1,
    );

    const result = previousResult;

    const frozen = JSON.parse(
      JSON.stringify(previousResult.completed.map((c) => c.locs).flat(1)),
    );

    for (const completion of [
      rowCompletion,
      colCompletion,
      diag0Completion,
      diag1Completion,
    ]) {
      if (completion) {
        const numFrozen = completion.locs.filter((loc) =>
          frozen.some(
            (frozenLoc) => loc[0] === frozenLoc[0] && loc[1] === frozenLoc[1],
          ),
        ).length;
        if (numFrozen < 2) {
          result.completed.push(completion);
        }
      }
    }

    return result;
  }
}

function getChunks([x, y]: Location, kind: CompletionPath) {
  const chunks: Location[][] = [];
  for (let i = 0; i < 5; i++) {
    let minX = x - 4 + i;
    let maxX = x + i;
    let minY = y - 4 + i;
    let maxY = y + i;

    if (kind === CompletionPath.ROW) {
      if (minY < 0 || maxY > 9) continue;
    } else if (kind === CompletionPath.COL) {
      if (minX < 0 || maxX > 9) continue;
    } else if (kind === CompletionPath.DIAG_0) {
      if (minX < 0 || maxX > 9 || minY < 0 || maxY > 9) continue;
    } else if (kind === CompletionPath.DIAG_1) {
      minY = y + 4 - i;
      maxY = y - i;
      if (minX < 0 || maxX > 9 || minY < 0 || minY > 9 || maxY < 0 || maxY > 9)
        continue;
    }

    const chunk: Location[] = [];

    switch (kind) {
      case CompletionPath.ROW:
        for (let j = minY; j <= maxY; j++) {
          chunk.push([x, j]);
        }
        break;
      case CompletionPath.COL:
        for (let j = minX; j <= maxX; j++) {
          chunk.push([j, y]);
        }
        break;
      case CompletionPath.DIAG_0:
        for (let j = minX, k = minY; j <= maxX && k <= maxY; j++, k++) {
          chunk.push([j, k]);
        }
        break;
      case CompletionPath.DIAG_1:
        for (let j = minX, k = minY; j <= maxX && k >= maxY; j++, k--) {
          chunk.push([j, k]);
        }
        break;
    }

    chunks.push(chunk);
  }
  return chunks;
}

export function getRowChunks([x, y]: Location) {
  return getChunks([x, y], CompletionPath.ROW);
}
export function getColChunks([x, y]: Location) {
  return getChunks([x, y], CompletionPath.COL);
}
export function getDiag0Chunks([x, y]: Location) {
  return getChunks([x, y], CompletionPath.DIAG_0);
}
export function getDiag1Chunks([x, y]: Location) {
  return getChunks([x, y], CompletionPath.DIAG_1);
}
