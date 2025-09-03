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
  const [isEditing, setIsEditing] = useState(false);
  const [originalHomeScore, setOriginalHomeScore] = useState(
    match.homeScore || 0
  );
  const [originalAwayScore, setOriginalAwayScore] = useState(
    match.awayScore || 0
  );
  const updateMatch = useEliminatoriasStore((state) => state.updateMatch);

  const homeTeam = teams.find((t) => t.id === match.homeTeam);
  const awayTeam = teams.find((t) => t.id === match.awayTeam);

  const handleSaveResult = () => {
    const home = parseInt(homeScore) || 0;
    const away = parseInt(awayScore) || 0;
    updateMatch(match.id, home, away);
    setIsEditing(false);
  };

  const handleReset = () => {
    setHomeScore("0");
    setAwayScore("0");
    updateMatch(match.id, 0, 0, true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    // Store original scores before editing
    setOriginalHomeScore(match.homeScore || 0);
    setOriginalAwayScore(match.awayScore || 0);
    // Set the current scores in the input fields and make the match editable
    setHomeScore(match.homeScore?.toString() || "");
    setAwayScore(match.awayScore?.toString() || "");
    setIsEditing(true);
    updateMatch(match.id, match.homeScore || 0, match.awayScore || 0, false);
  };

  const handleDiscard = () => {
    // Restore original scores and exit editing mode
    setHomeScore(originalHomeScore.toString());
    setAwayScore(originalAwayScore.toString());
    updateMatch(match.id, originalHomeScore, originalAwayScore, true);
    setIsEditing(false);
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 sm:hover:scale-[1.02]">
      <CardContent className="p-4 sm:p-6">
        {/* Status Badge */}
        <div className="flex justify-center mb-3 sm:mb-4">
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

        <div className="space-y-4 sm:space-y-6">
          {/* Teams Display - Mobile: horizontal layout, Desktop: same as before */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            {/* Mobile Layout: Teams in one row */}
            <div className="flex sm:hidden items-center justify-between w-full gap-2">
              {/* Equipo Local */}
              <div className="flex items-center space-x-2 flex-1">
                <div className="text-2xl drop-shadow-sm">{homeTeam?.flag}</div>
                <div className="text-left">
                  <div className="font-bold text-sm text-foreground">
                    {homeTeam?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">Local</div>
                </div>
              </div>

              {/* VS */}
              <div className="text-lg font-bold text-muted-foreground px-2">
                VS
              </div>

              {/* Equipo Visitante */}
              <div className="flex items-center space-x-2 flex-1 justify-end">
                <div className="text-right">
                  <div className="font-bold text-sm text-foreground">
                    {awayTeam?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">Visitante</div>
                </div>
                <div className="text-2xl drop-shadow-sm">{awayTeam?.flag}</div>
              </div>
            </div>

            {/* Desktop Layout: Original layout */}
            <div className="hidden sm:flex items-center justify-between gap-0 w-full">
              {/* Equipo Local */}
              <div className="flex items-center space-x-3 flex-1 justify-start">
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
                <div className="text-2xl font-bold text-muted-foreground">
                  VS
                </div>
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
          </div>

          {/* Mobile Score Display - Separate row for mobile */}
          {match.played && (
            <div className="flex sm:hidden justify-center">
              <div className="text-2xl font-bold text-primary">
                {match.homeScore} - {match.awayScore}
              </div>
            </div>
          )}

          {/* Score Input Section */}
          {(!match.played || isEditing) && (
            <div className="bg-muted/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="text-center">
                  <label className="text-xs text-muted-foreground block mb-1 truncate max-w-[80px] sm:max-w-none">
                    {homeTeam?.name}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    className="w-16 sm:w-20 text-center text-base sm:text-lg font-bold"
                    placeholder="0"
                  />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-muted-foreground">
                  -
                </div>
                <div className="text-center">
                  <label className="text-xs text-muted-foreground block mb-1 truncate max-w-[80px] sm:max-w-none">
                    {awayTeam?.name}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    className="w-16 sm:w-20 text-center text-base sm:text-lg font-bold"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {!match.played || isEditing ? (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSaveResult}
                  disabled={homeScore === "" || awayScore === ""}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span className="mr-1 sm:mr-2">💾</span>
                  <span className="hidden sm:inline">Guardar Resultado</span>
                  <span className="sm:hidden">Guardar</span>
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleDiscard}
                    className="px-4 sm:px-6 py-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <span className="mr-1 sm:mr-2">❌</span>
                    <span className="hidden sm:inline">Descartar</span>
                    <span className="sm:hidden">Descartar</span>
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-xs sm:text-sm px-3 sm:px-4"
                >
                  <span className="mr-1">✏️</span>
                  Editar
                </Button>
                <Button
                  onClick={handleReset}
                  variant="destructive"
                  size="sm"
                  className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-xs sm:text-sm px-3 sm:px-4"
                >
                  <span className="mr-1">🗑️</span>
                  <span className="hidden sm:inline">Resetear</span>
                  <span className="sm:hidden">Reset</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
