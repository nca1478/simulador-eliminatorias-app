import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
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
    updateMatch(match.id, 0, 0, false);
  };

  const handleEdit = () => {
    // Set the current scores in the input fields and make the match editable
    setHomeScore(match.homeScore?.toString() || "");
    setAwayScore(match.awayScore?.toString() || "");
    updateMatch(match.id, match.homeScore || 0, match.awayScore || 0, false);
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Status Badge */}
        <div className="flex justify-center mb-4">
          {match.played ? (
            <Badge variant="success" className="text-xs">
              ✅ Finalizado
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              ⏳ Por jugar
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          {/* Teams Display */}
          <div className="flex items-center justify-between">
            {/* Equipo Local */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="text-4xl drop-shadow-sm">{homeTeam?.flag}</div>
              <div className="text-left">
                <div className="font-bold text-lg text-foreground">
                  {homeTeam?.name}
                </div>
                <div className="text-xs text-muted-foreground">Local</div>
              </div>
            </div>

            {/* VS Separator */}
            <div className="flex flex-col items-center mx-4">
              <div className="text-2xl font-bold text-muted-foreground">VS</div>
              {match.played && (
                <div className="text-3xl font-bold text-primary mt-2">
                  {match.homeScore} - {match.awayScore}
                </div>
              )}
            </div>

            {/* Equipo Visitante */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              <div className="text-right">
                <div className="font-bold text-lg text-foreground">
                  {awayTeam?.name}
                </div>
                <div className="text-xs text-muted-foreground">Visitante</div>
              </div>
              <div className="text-4xl drop-shadow-sm">{awayTeam?.flag}</div>
            </div>
          </div>

          {/* Score Input Section */}
          {!match.played && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <label className="text-xs text-muted-foreground block mb-1">
                    {homeTeam?.name}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    className="w-20 text-center text-lg font-bold"
                    placeholder="0"
                  />
                </div>
                <div className="text-2xl font-bold text-muted-foreground">
                  -
                </div>
                <div className="text-center">
                  <label className="text-xs text-muted-foreground block mb-1">
                    {awayTeam?.name}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    className="w-20 text-center text-lg font-bold"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            {!match.played ? (
              <Button
                onClick={handleSaveResult}
                disabled={homeScore === "" || awayScore === ""}
                className="px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="mr-2">💾</span>
                Guardar Resultado
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="mr-1">✏️</span>
                  Editar
                </Button>
                <Button
                  onClick={handleReset}
                  variant="destructive"
                  size="sm"
                  className="shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="mr-1">🗑️</span>
                  Resetear
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
