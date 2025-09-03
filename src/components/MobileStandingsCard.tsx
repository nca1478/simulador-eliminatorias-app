import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { TeamStats, Team } from "../types";

interface MobileStandingsCardProps {
  team: TeamStats;
  teamInfo: Team | undefined;
  position: number;
}

const getPositionColor = (position: number) => {
  if (position <= 6) return "border-l-4 border-green-500 bg-green-50";
  if (position === 7) return "border-l-4 border-yellow-500 bg-yellow-50";
  return "border-l-4 border-red-300 bg-red-50";
};

const getPositionBadge = (position: number) => {
  if (position <= 6)
    return (
      <Badge variant="success" className="text-xs">
        🏆 Mundial
      </Badge>
    );
  if (position === 7)
    return (
      <Badge variant="warning" className="text-xs">
        🎯 Repechaje
      </Badge>
    );
  return (
    <Badge variant="destructive" className="text-xs">
      ❌ Eliminado
    </Badge>
  );
};

const getResultIcon = (result: "W" | "D" | "L") => {
  switch (result) {
    case "W":
      return (
        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
          G
        </span>
      );
    case "D":
      return (
        <span className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
          E
        </span>
      );
    case "L":
      return (
        <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
          P
        </span>
      );
  }
};

export const MobileStandingsCard: React.FC<MobileStandingsCardProps> = ({
  team,
  teamInfo,
  position,
}) => {
  return (
    <Card className={`mb-3 ${getPositionColor(position)} shadow-sm`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm font-bold text-primary text-sm">
              {position}
            </div>
            <span className="text-2xl">{teamInfo?.flag}</span>
            <div>
              <div className="font-bold text-sm">{teamInfo?.name}</div>
              {getPositionBadge(position)}
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
            {team.points}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center text-xs mb-3">
          <div>
            <div className="font-medium text-muted-foreground">PJ</div>
            <div className="font-bold">{team.played}</div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">G-E-P</div>
            <div className="font-bold">
              <span className="text-green-600">{team.won}</span>-
              <span className="text-gray-600">{team.drawn}</span>-
              <span className="text-red-600">{team.lost}</span>
            </div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">GF-GC</div>
            <div className="font-bold">
              {team.goalsFor}-{team.goalsAgainst}
            </div>
          </div>
          <div>
            <div className="font-medium text-muted-foreground">DG</div>
            <div
              className={`font-bold ${
                team.goalDifference > 0
                  ? "text-green-600"
                  : team.goalDifference < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {team.goalDifference > 0 ? "+" : ""}
              {team.goalDifference}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Últimos 5:</span>
          <div className="flex space-x-1">
            {team.lastFive.map((result, idx) => (
              <div key={idx}>{getResultIcon(result)}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
