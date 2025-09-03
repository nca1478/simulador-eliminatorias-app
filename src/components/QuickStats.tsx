import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { TeamStats, Team } from "../types";

interface QuickStatsProps {
  standings: TeamStats[];
  teams: Team[];
  playedMatches: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  standings,
  teams,
  playedMatches,
}) => {
  const leader = standings[0];
  const leaderTeam = teams.find((t) => t.id === leader?.team);

  const totalGoals = standings.reduce((sum, team) => sum + team.goalsFor, 0);
  const avgGoalsPerMatch =
    playedMatches > 0 ? (totalGoals / playedMatches).toFixed(1) : "0.0";

  const highestScorer = standings.reduce((prev, current) =>
    prev.goalsFor > current.goalsFor ? prev : current
  );
  const highestScorerTeam = teams.find((t) => t.id === highestScorer?.team);

  const bestDefense = standings.reduce((prev, current) =>
    prev.goalsAgainst < current.goalsAgainst ? prev : current
  );
  const bestDefenseTeam = teams.find((t) => t.id === bestDefense?.team);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {/* Líder */}
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
        <CardContent className="p-3 sm:p-4 text-center">
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">👑</div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            Líder
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="text-xl sm:text-2xl">{leaderTeam?.flag}</span>
            <div>
              <div className="font-bold text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                {leaderTeam?.name}
              </div>
              <Badge variant="secondary" className="text-xs">
                {leader?.points} pts
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mejor Ataque */}
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
        <CardContent className="p-3 sm:p-4 text-center">
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚽</div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            <span className="hidden sm:inline">Mejor Ataque</span>
            <span className="sm:hidden">Ataque</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="text-xl sm:text-2xl">
              {highestScorerTeam?.flag}
            </span>
            <div>
              <div className="font-bold text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                {highestScorerTeam?.name}
              </div>
              <Badge variant="secondary" className="text-xs">
                {highestScorer?.goalsFor} goles
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mejor Defensa */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
        <CardContent className="p-3 sm:p-4 text-center">
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🛡️</div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            <span className="hidden sm:inline">Mejor Defensa</span>
            <span className="sm:hidden">Defensa</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="text-xl sm:text-2xl">{bestDefenseTeam?.flag}</span>
            <div>
              <div className="font-bold text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                {bestDefenseTeam?.name}
              </div>
              <Badge variant="secondary" className="text-xs">
                {bestDefense?.goalsAgainst} goles
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas Generales */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
        <CardContent className="p-3 sm:p-4 text-center">
          <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📊</div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">
            Promedio
          </div>
          <div className="space-y-1">
            <div className="font-bold text-base sm:text-lg">
              {avgGoalsPerMatch}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="hidden sm:inline">goles por partido</span>
              <span className="sm:hidden">goles/partido</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {totalGoals} goles
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
