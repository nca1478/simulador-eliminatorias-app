import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { EliminatoriasState, TeamStats, Match } from "../types";
import { teams } from "../data/teams";
import { generateFixtures } from "../data/fixtures";

const initialStandings: TeamStats[] = teams.map((team) => ({
  team: team.id,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  points: 0,
  lastFive: [],
  manualPointsAdjustment: 0,
}));

export const useEliminatoriasStore = create<EliminatoriasState>()(
  devtools(
    persist(
      (set, get) => ({
        teams,
        matches: generateFixtures(),
        standings: initialStandings,
        currentMatchday: 1,

        updateMatch: (
          matchId: string,
          homeScore: number,
          awayScore: number,
          played: boolean = true
        ) => {
          set((state) => {
            const updatedMatches = state.matches.map((match) => {
              if (match.id === matchId) {
                return {
                  ...match,
                  homeScore: played ? homeScore : undefined,
                  awayScore: played ? awayScore : undefined,
                  played,
                };
              }
              return match;
            });

            return { ...state, matches: updatedMatches };
          });

          // Recalcular tabla después de actualizar partido
          get().calculateStandings();
        },

        calculateStandings: () => {
          set((state) => {
            // Preservar los ajustes manuales existentes
            const existingAdjustments = state.standings.reduce(
              (acc, teamStats) => {
                acc[teamStats.team] = teamStats.manualPointsAdjustment || 0;
                return acc;
              },
              {} as Record<string, number>
            );

            const newStandings: TeamStats[] = teams.map((team) => ({
              team: team.id,
              played: 0,
              won: 0,
              drawn: 0,
              lost: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              goalDifference: 0,
              points: 0,
              lastFive: [],
              manualPointsAdjustment: existingAdjustments[team.id] || 0,
            }));

            // Procesar todos los partidos jugados
            const playedMatches = state.matches.filter((match) => match.played);

            playedMatches.forEach((match) => {
              const homeTeamStats = newStandings.find(
                (s) => s.team === match.homeTeam
              )!;
              const awayTeamStats = newStandings.find(
                (s) => s.team === match.awayTeam
              )!;

              homeTeamStats.played++;
              awayTeamStats.played++;
              homeTeamStats.goalsFor += match.homeScore!;
              homeTeamStats.goalsAgainst += match.awayScore!;
              awayTeamStats.goalsFor += match.awayScore!;
              awayTeamStats.goalsAgainst += match.homeScore!;

              if (match.homeScore! > match.awayScore!) {
                // Victoria local
                homeTeamStats.won++;
                homeTeamStats.points += 3;
                awayTeamStats.lost++;
                homeTeamStats.lastFive.unshift("W");
                awayTeamStats.lastFive.unshift("L");
              } else if (match.homeScore! < match.awayScore!) {
                // Victoria visitante
                awayTeamStats.won++;
                awayTeamStats.points += 3;
                homeTeamStats.lost++;
                homeTeamStats.lastFive.unshift("L");
                awayTeamStats.lastFive.unshift("W");
              } else {
                // Empate
                homeTeamStats.drawn++;
                awayTeamStats.drawn++;
                homeTeamStats.points += 1;
                awayTeamStats.points += 1;
                homeTeamStats.lastFive.unshift("D");
                awayTeamStats.lastFive.unshift("D");
              }

              // Mantener solo los últimos 5 resultados
              if (homeTeamStats.lastFive.length > 5) {
                homeTeamStats.lastFive = homeTeamStats.lastFive.slice(0, 5);
              }
              if (awayTeamStats.lastFive.length > 5) {
                awayTeamStats.lastFive = awayTeamStats.lastFive.slice(0, 5);
              }
            });

            // Calcular diferencia de goles y aplicar ajustes manuales
            newStandings.forEach((team) => {
              team.goalDifference = team.goalsFor - team.goalsAgainst;
              // Aplicar ajustes manuales de puntos
              team.points += team.manualPointsAdjustment || 0;
              // Asegurar que los puntos no sean negativos
              team.points = Math.max(0, team.points);
            });

            // Ordenar tabla por puntos, diferencia de goles y goles a favor
            newStandings.sort((a, b) => {
              if (b.points !== a.points) return b.points - a.points;
              if (b.goalDifference !== a.goalDifference)
                return b.goalDifference - a.goalDifference;
              return b.goalsFor - a.goalsFor;
            });

            return { ...state, standings: newStandings };
          });
        },

        resetData: () => {
          set({
            matches: generateFixtures(),
            standings: initialStandings,
            currentMatchday: 1,
          });
        },

        restoreData: (
          matches: Match[],
          standings: TeamStats[],
          currentMatchday: number
        ) => {
          set({
            matches,
            standings,
            currentMatchday,
          });
        },

        adjustTeamPoints: (teamId: string, pointsChange: number) => {
          set((state) => {
            const updatedStandings = state.standings.map((teamStats) => {
              if (teamStats.team === teamId) {
                const currentAdjustment = teamStats.manualPointsAdjustment || 0;
                const newAdjustment = currentAdjustment + pointsChange;
                const newTotalPoints = Math.max(
                  0,
                  teamStats.points + pointsChange
                );

                return {
                  ...teamStats,
                  points: newTotalPoints,
                  manualPointsAdjustment: newAdjustment,
                };
              }
              return teamStats;
            });

            // Reordenar tabla después del cambio de puntos
            updatedStandings.sort((a, b) => {
              if (b.points !== a.points) return b.points - a.points;
              if (b.goalDifference !== a.goalDifference)
                return b.goalDifference - a.goalDifference;
              return b.goalsFor - a.goalsFor;
            });

            return { ...state, standings: updatedStandings };
          });
        },
      }),
      {
        name: "eliminatorias-storage",
      }
    ),
    {
      name: "eliminatorias-store",
    }
  )
);
