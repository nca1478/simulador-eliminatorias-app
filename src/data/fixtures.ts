import type { Match } from "../types";

// Generar todos los partidos de las 18 fechas de eliminatorias
export const generateFixtures = (): Match[] => {
  const matches: Match[] = [];
  let matchId = 1;

  // Generar fixture completo (18 fechas)
  for (let matchday = 1; matchday <= 18; matchday++) {
    const roundMatches = generateRoundRobin(matchday);
    roundMatches.forEach((match) => {
      matches.push({
        id: `match-${matchId}`,
        homeTeam: match.home,
        awayTeam: match.away,
        matchday,
        played: false,
      });
      matchId++;
    });
  }

  return matches;
};

function generateRoundRobin(round: number): { home: string; away: string }[] {
  // Fixture predefinido para las eliminatorias sudamericanas (9 fechas de ida)
  const fixtures = [
    // Fecha 1
    [
      { home: "paraguay", away: "peru" },
      { home: "colombia", away: "venezuela" },
      { home: "argentina", away: "ecuador" },
      { home: "uruguay", away: "chile" },
      { home: "brasil", away: "bolivia" },
    ],
    // Fecha 2
    [
      { home: "bolivia", away: "argentina" },
      { home: "ecuador", away: "uruguay" },
      { home: "venezuela", away: "paraguay" },
      { home: "chile", away: "colombia" },
      { home: "peru", away: "brasil" },
    ],
    // Fecha 3
    [
      { home: "colombia", away: "uruguay" },
      { home: "bolivia", away: "ecuador" },
      { home: "argentina", away: "paraguay" },
      { home: "chile", away: "peru" },
      { home: "brasil", away: "venezuela" },
    ],
    // Fecha 4
    [
      { home: "venezuela", away: "chile" },
      { home: "paraguay", away: "bolivia" },
      { home: "ecuador", away: "colombia" },
      { home: "uruguay", away: "brasil" },
      { home: "peru", away: "argentina" },
    ],
    // Fecha 5
    [
      { home: "bolivia", away: "peru" },
      { home: "venezuela", away: "ecuador" },
      { home: "colombia", away: "brasil" },
      { home: "argentina", away: "uruguay" },
      { home: "chile", away: "paraguay" },
    ],
    // Fecha 6
    [
      { home: "paraguay", away: "colombia" },
      { home: "ecuador", away: "chile" },
      { home: "uruguay", away: "bolivia" },
      { home: "brasil", away: "argentina" },
      { home: "peru", away: "venezuela" },
    ],
    // Fecha 7
    [
      { home: "bolivia", away: "venezuela" },
      { home: "argentina", away: "chile" },
      { home: "uruguay", away: "paraguay" },
      { home: "brasil", away: "ecuador" },
      { home: "peru", away: "colombia" },
    ],
    // Fecha 8
    [
      { home: "colombia", away: "argentina" },
      { home: "ecuador", away: "peru" },
      { home: "chile", away: "bolivia" },
      { home: "venezuela", away: "uruguay" },
      { home: "paraguay", away: "brasil" },
    ],
    // Fecha 9
    [
      { home: "bolivia", away: "colombia" },
      { home: "ecuador", away: "paraguay" },
      { home: "venezuela", away: "argentina" },
      { home: "chile", away: "brasil" },
      { home: "peru", away: "uruguay" },
    ],
    // Fecha 10
    [
      { home: "colombia", away: "chile" },
      { home: "paraguay", away: "venezuela" },
      { home: "uruguay", away: "ecuador" },
      { home: "argentina", away: "bolivia" },
      { home: "brasil", away: "peru" },
    ],
    // Fecha 11
    [
      { home: "venezuela", away: "brasil" },
      { home: "paraguay", away: "argentina" },
      { home: "ecuador", away: "bolivia" },
      { home: "uruguay", away: "colombia" },
      { home: "peru", away: "chile" },
    ],
    // Fecha 12
    [
      { home: "bolivia", away: "paraguay" },
      { home: "colombia", away: "ecuador" },
      { home: "argentina", away: "peru" },
      { home: "chile", away: "venezuela" },
      { home: "brasil", away: "uruguay" },
    ],
    // Fecha 13
    [
      { home: "paraguay", away: "chile" },
      { home: "brasil", away: "colombia" },
      { home: "peru", away: "bolivia" },
      { home: "ecuador", away: "venezuela" },
      { home: "uruguay", away: "argentina" },
    ],
    // Fecha 14
    [
      { home: "bolivia", away: "uruguay" },
      { home: "chile", away: "ecuador" },
      { home: "venezuela", away: "peru" },
      { home: "colombia", away: "paraguay" },
      { home: "argentina", away: "brasil" },
    ],
    // Fecha 15
    [
      { home: "paraguay", away: "uruguay" },
      { home: "ecuador", away: "brasil" },
      { home: "chile", away: "argentina" },
      { home: "colombia", away: "peru" },
      { home: "venezuela", away: "bolivia" },
    ],
    // Fecha 16
    [
      { home: "bolivia", away: "chile" },
      { home: "uruguay", away: "venezuela" },
      { home: "argentina", away: "colombia" },
      { home: "brasil", away: "paraguay" },
      { home: "peru", away: "ecuador" },
    ],
    // Fecha 17
    [
      { home: "paraguay", away: "ecuador" },
      { home: "argentina", away: "venezuela" },
      { home: "uruguay", away: "peru" },
      { home: "colombia", away: "bolivia" },
      { home: "brasil", away: "chile" },
    ],
    // Fecha 18
    [
      { home: "ecuador", away: "argentina" },
      { home: "chile", away: "uruguay" },
      { home: "bolivia", away: "brasil" },
      { home: "venezuela", away: "colombia" },
      { home: "peru", away: "paraguay" },
    ],
  ];

  return fixtures[round - 1] || [];
}
