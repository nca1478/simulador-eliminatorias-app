export interface Team {
  id: string;
  name: string;
  flag: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  matchday: number;
  played: boolean;
}

export interface TeamStats {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  lastFive: ("W" | "D" | "L")[];
}

export interface EliminatoriasState {
  teams: Team[];
  matches: Match[];
  standings: TeamStats[];
  currentMatchday: number;
  updateMatch: (matchId: string, homeScore: number, awayScore: number) => void;
  calculateStandings: () => void;
  resetData: () => void;
}
