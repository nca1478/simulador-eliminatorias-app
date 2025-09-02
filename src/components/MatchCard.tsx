import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { Match, Team } from "../types";
import { useEliminatoriasStore } from "../store/eliminatorias";

interface MatchCardProps {
  match: Match;
  teams: Team[];
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, teams }) => {
  const [homeScore, setHomeScore] = useState(match.homeScore?.toString() || "");
  const [awayScore, setAwayScore] = useState(match.awayScore?.toString() || "");
  const updateMatch = useEliminatoriasStore((state) => state.updateMatch);

  const homeTeam = teams.find((t) => t.id === match.homeTeam);
  const awayTeam = teams.find((t) => t.id === match.awayTeam);

  const handleSaveResult = () => {
    const home = parseInt(homeScore) || 0;
    const away = parseInt(awayScore) || 0;
    updateMatch(match.id, home, away);
  };

  const handleReset = () => {
    setHomeScore("");
    setAwayScore("");
    updateMatch(match.id, 0, 0);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          {/* Equipo Local */}
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-2xl">{homeTeam?.flag}</span>
            <span className="font-medium text-sm">{homeTeam?.name}</span>
          </div>

          {/* Marcador */}
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="0"
              max="20"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="w-16 text-center"
              placeholder="0"
            />
            <span className="text-lg font-bold">-</span>
            <Input
              type="number"
              min="0"
              max="20"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="w-16 text-center"
              placeholder="0"
            />
          </div>

          {/* Equipo Visitante */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <span className="font-medium text-sm">{awayTeam?.name}</span>
            <span className="text-2xl">{awayTeam?.flag}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            onClick={handleSaveResult}
            size="sm"
            disabled={homeScore === "" || awayScore === ""}
          >
            {match.played ? "Actualizar" : "Guardar"}
          </Button>
          {match.played && (
            <Button onClick={handleReset} variant="outline" size="sm">
              Resetear
            </Button>
          )}
        </div>

        {/* Mostrar resultado si ya está jugado */}
        {match.played && (
          <div className="text-center mt-2 text-sm text-muted-foreground">
            Resultado: {match.homeScore} - {match.awayScore}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
