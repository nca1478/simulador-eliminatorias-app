import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import type { TeamStats, Team } from "../types";

interface StandingsTableProps {
  standings: TeamStats[];
  teams: Team[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  teams,
}) => {
  const getTeamInfo = (teamId: string) => {
    return teams.find((t) => t.id === teamId);
  };

  const getPositionColor = (position: number) => {
    if (position <= 6)
      return "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500"; // Clasificación directa
    if (position === 7)
      return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500"; // Repechaje
    return "bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-300"; // Eliminados
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
          <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
            G
          </span>
        );
      case "D":
        return (
          <span className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
            E
          </span>
        );
      case "L":
        return (
          <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            P
          </span>
        );
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          🏆 Tabla de Posiciones
        </CardTitle>
        <p className="text-muted-foreground">Eliminatorias CONMEBOL 2026</p>
      </CardHeader>
      <Separator className="mx-6" />
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-muted">
                <th className="text-left p-3 font-bold text-muted-foreground">
                  #
                </th>
                <th className="text-left p-3 font-bold text-muted-foreground">
                  Equipo
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  Estado
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  PJ
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  G
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  E
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  P
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  GF
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  GC
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  DG
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  Pts
                </th>
                <th className="text-center p-3 font-bold text-muted-foreground">
                  Últimos 5
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const teamInfo = getTeamInfo(team.team);
                const position = index + 1;

                return (
                  <tr
                    key={team.team}
                    className={`border-b hover:shadow-md transition-all duration-200 ${getPositionColor(
                      position
                    )}`}
                  >
                    <td className="p-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm font-bold text-primary">
                        {position}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl drop-shadow-sm">
                          {teamInfo?.flag}
                        </span>
                        <div>
                          <div className="font-bold text-foreground">
                            {teamInfo?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      {getPositionBadge(position)}
                    </td>
                    <td className="text-center p-3 font-medium">
                      {team.played}
                    </td>
                    <td className="text-center p-3 font-medium text-green-600">
                      {team.won}
                    </td>
                    <td className="text-center p-3 font-medium text-gray-600">
                      {team.drawn}
                    </td>
                    <td className="text-center p-3 font-medium text-red-600">
                      {team.lost}
                    </td>
                    <td className="text-center p-3 font-medium">
                      {team.goalsFor}
                    </td>
                    <td className="text-center p-3 font-medium">
                      {team.goalsAgainst}
                    </td>
                    <td className="text-center p-3 font-bold">
                      <span
                        className={
                          team.goalDifference > 0
                            ? "text-green-600"
                            : team.goalDifference < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }
                      >
                        {team.goalDifference > 0 ? "+" : ""}
                        {team.goalDifference}
                      </span>
                    </td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                        {team.points}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className="flex justify-center space-x-1">
                        {team.lastFive.map((result, idx) => (
                          <div
                            key={idx}
                            className="transform hover:scale-110 transition-transform duration-200"
                          >
                            {getResultIcon(result)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Leyenda mejorada */}
        <div className="mt-8">
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Badge variant="success" className="text-sm">
                🏆 Mundial
              </Badge>
              <span className="text-sm font-medium text-green-800">
                Posiciones 1-6
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Badge variant="warning" className="text-sm">
                🎯 Repechaje
              </Badge>
              <span className="text-sm font-medium text-yellow-800">
                Posición 7
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <Badge variant="destructive" className="text-sm">
                ❌ Eliminado
              </Badge>
              <span className="text-sm font-medium text-red-800">
                Posiciones 8-10
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
