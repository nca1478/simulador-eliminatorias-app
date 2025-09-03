import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { MobileStandingsCard } from "./MobileStandingsCard";
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
      <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          🏆 Tabla de Posiciones
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">
          Eliminatorias CONMEBOL 2026
        </p>
      </CardHeader>
      <Separator className="mx-4 sm:mx-6" />
      <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
        {/* Mobile View */}
        <div className="block sm:hidden">
          {standings.map((team, index) => {
            const teamInfo = getTeamInfo(team.team);
            const position = index + 1;
            return (
              <MobileStandingsCard
                key={team.team}
                team={team}
                teamInfo={teamInfo}
                position={position}
              />
            );
          })}
        </div>

        {/* Desktop/Tablet View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-muted">
                <th className="text-left p-1 sm:p-3 font-bold text-muted-foreground">
                  #
                </th>
                <th className="text-left p-1 sm:p-3 font-bold text-muted-foreground">
                  Equipo
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden sm:table-cell">
                  Estado
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground">
                  PJ
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden md:table-cell">
                  G
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden md:table-cell">
                  E
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden md:table-cell">
                  P
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden lg:table-cell">
                  GF
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden lg:table-cell">
                  GC
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground">
                  DG
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground">
                  Pts
                </th>
                <th className="text-center p-1 sm:p-3 font-bold text-muted-foreground hidden lg:table-cell">
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
                    <td className="p-1 sm:p-3">
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white shadow-sm font-bold text-primary text-xs sm:text-sm">
                        {position}
                      </div>
                    </td>
                    <td className="p-1 sm:p-3">
                      <div className="flex items-center space-x-1 sm:space-x-3">
                        <span className="text-xl sm:text-3xl drop-shadow-sm">
                          {teamInfo?.flag}
                        </span>
                        <div>
                          <div className="font-bold text-foreground text-xs sm:text-sm lg:text-base">
                            <span className="sm:hidden">
                              {teamInfo?.name.slice(0, 3)}
                            </span>
                            <span className="hidden sm:inline">
                              {teamInfo?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-1 sm:p-3 hidden sm:table-cell">
                      {getPositionBadge(position)}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium">
                      {team.played}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium text-green-600 hidden md:table-cell">
                      {team.won}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium text-gray-600 hidden md:table-cell">
                      {team.drawn}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium text-red-600 hidden md:table-cell">
                      {team.lost}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium hidden lg:table-cell">
                      {team.goalsFor}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-medium hidden lg:table-cell">
                      {team.goalsAgainst}
                    </td>
                    <td className="text-center p-1 sm:p-3 font-bold">
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
                    <td className="text-center p-1 sm:p-3">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-lg shadow-lg">
                        {team.points}
                      </div>
                    </td>
                    <td className="text-center p-1 sm:p-3 hidden lg:table-cell">
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
        <div className="mt-6 sm:mt-8">
          <Separator className="mb-4 sm:mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <Badge variant="success" className="text-xs sm:text-sm">
                🏆 Mundial
              </Badge>
              <span className="text-xs sm:text-sm font-medium text-green-800 text-center">
                Posiciones 1-6
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Badge variant="warning" className="text-xs sm:text-sm">
                🎯 Repechaje
              </Badge>
              <span className="text-xs sm:text-sm font-medium text-yellow-800 text-center">
                Posición 7
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
              <Badge variant="destructive" className="text-xs sm:text-sm">
                ❌ Eliminado
              </Badge>
              <span className="text-xs sm:text-sm font-medium text-red-800 text-center">
                Posiciones 8-10
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
