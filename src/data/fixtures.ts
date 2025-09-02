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
      { home: "colombia", away: "venezuela" },
      { home: "paraguay", away: "peru" },
      { home: "argentina", away: "ecuador" },
      { home: "brasil", away: "bolivia" },
      { home: "uruguay", away: "chile" },
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
      { home: "bolivia", away: "ecuador" },
      { home: "colombia", away: "uruguay" },
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
      { home: "uruguay", away: "bolivia" },
      { home: "ecuador", away: "chile" },
      { home: "brasil", away: "argentina" },
      { home: "peru", away: "venezuela" },
    ],
    // Fecha 7
    [
      { home: "bolivia", away: "venezuela" },
      { home: "ecuador", away: "brasil" },
      { home: "uruguay", away: "paraguay" },
      { home: "argentina", away: "chile" },
      { home: "peru", away: "colombia" },
    ],
    // Fecha 8
    [
      { home: "chile", away: "bolivia" },
      { home: "venezuela", away: "argentina" },
      { home: "paraguay", away: "ecuador" },
      { home: "colombia", away: "uruguay" },
      { home: "brasil", away: "peru" },
    ],
    // Fecha 9
    [
      { home: "bolivia", away: "uruguay" },
      { home: "ecuador", away: "peru" },
      { home: "colombia", away: "chile" },
      { home: "argentina", away: "brasil" },
      { home: "venezuela", away: "paraguay" },
    ],
    // Fecha 10
    [
      { home: "paraguay", away: "argentina" },
      { home: "chile", away: "venezuela" },
      { home: "brasil", away: "colombia" },
      { home: "uruguay", away: "ecuador" },
      { home: "peru", away: "bolivia" },
    ],
    // Fecha 11
    [
      { home: "colombia", away: "bolivia" },
      { home: "chile", away: "argentina" },
      { home: "brasil", away: "ecuador" },
      { home: "peru", away: "uruguay" },
      { home: "venezuela", away: "peru" },
    ],
    // Fecha 12
    [
      { home: "bolivia", away: "colombia" },
      { home: "ecuador", away: "venezuela" },
      { home: "uruguay", away: "peru" },
      { home: "argentina", away: "brasil" },
      { home: "chile", away: "paraguay" },
    ],
    // Fecha 13
    [
      { home: "paraguay", away: "uruguay" },
      { home: "colombia", away: "ecuador" },
      { home: "chile", away: "brasil" },
      { home: "argentina", away: "bolivia" },
      { home: "peru", away: "venezuela" },
    ],
    // Fecha 14
    [
      { home: "bolivia", away: "chile" },
      { home: "ecuador", away: "paraguay" },
      { home: "brasil", away: "uruguay" },
      { home: "venezuela", away: "colombia" },
      { home: "peru", away: "argentina" },
    ],
    // Fecha 15
    [
      { home: "paraguay", away: "brasil" },
      { home: "colombia", away: "argentina" },
      { home: "uruguay", away: "venezuela" },
      { home: "chile", away: "ecuador" },
      { home: "peru", away: "bolivia" },
    ],
    // Fecha 16
    [
      { home: "bolivia", away: "paraguay" },
      { home: "ecuador", away: "argentina" },
      { home: "venezuela", away: "uruguay" },
      { home: "brasil", away: "chile" },
      { home: "colombia", away: "peru" },
    ],
    // Fecha 17
    [
      { home: "paraguay", away: "venezuela" },
      { home: "uruguay", away: "colombia" },
      { home: "argentina", away: "peru" },
      { home: "chile", away: "bolivia" },
      { home: "brasil", away: "ecuador" },
    ],
    // Fecha 18
    [
      { home: "bolivia", away: "brasil" },
      { home: "ecuador", away: "colombia" },
      { home: "venezuela", away: "argentina" },
      { home: "uruguay", away: "chile" },
      { home: "peru", away: "paraguay" },
    ],
  ];

  // Para las fechas 10-18, invertir local y visitante (vuelta)
  if (round <= 9) {
    return fixtures[round - 1] || [];
  } else {
    const returnRound = round - 9;
    const originalMatches = fixtures[returnRound - 1] || [];
    return originalMatches.map((match) => ({
      home: match.away,
      away: match.home,
    }));
  }
}
