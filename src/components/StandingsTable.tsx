import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
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
    if (position <= 6) return "bg-green-100 border-l-4 border-green-500"; // Clasificación directa
    if (position === 7) return "bg-yellow-100 border-l-4 border-yellow-500"; // Repechaje
    return "bg-red-50 border-l-4 border-red-300"; // Eliminados
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Tabla de Posiciones - Eliminatorias CONMEBOL 2026
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-semibold">#</th>
                <th className="text-left p-2 font-semibold">Equipo</th>
                <th className="text-center p-2 font-semibold">PJ</th>
                <th className="text-center p-2 font-semibold">G</th>
                <th className="text-center p-2 font-semibold">E</th>
                <th className="text-center p-2 font-semibold">P</th>
                <th className="text-center p-2 font-semibold">GF</th>
                <th className="text-center p-2 font-semibold">GC</th>
                <th className="text-center p-2 font-semibold">DG</th>
                <th className="text-center p-2 font-semibold">Pts</th>
                <th className="text-center p-2 font-semibold">Últimos 5</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const teamInfo = getTeamInfo(team.team);
                const position = index + 1;

                return (
                  <tr
                    key={team.team}
                    className={`border-b hover:bg-gray-50 ${getPositionColor(
                      position
                    )}`}
                  >
                    <td className="p-2 font-semibold">{position}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{teamInfo?.flag}</span>
                        <span className="font-medium">{teamInfo?.name}</span>
                      </div>
                    </td>
                    <td className="text-center p-2">{team.played}</td>
                    <td className="text-center p-2">{team.won}</td>
                    <td className="text-center p-2">{team.drawn}</td>
                    <td className="text-center p-2">{team.lost}</td>
                    <td className="text-center p-2">{team.goalsFor}</td>
                    <td className="text-center p-2">{team.goalsAgainst}</td>
                    <td className="text-center p-2 font-semibold">
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
                    </td>
                    <td className="text-center p-2 font-bold text-lg">
                      {team.points}
                    </td>
                    <td className="text-center p-2">
                      <div className="flex justify-center space-x-1">
                        {team.lastFive.map((result, idx) => (
                          <div key={idx}>{getResultIcon(result)}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Leyenda */}
        <div className="mt-4 text-xs text-gray-600">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Clasificación directa (1-6)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Repechaje (7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-300 rounded"></div>
              <span>Eliminados (8-10)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
