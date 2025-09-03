import { useState } from "react";
import { useEliminatoriasStore } from "../store/eliminatorias";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Minus } from "lucide-react";

export function PointsManager() {
  const { teams, standings, adjustTeamPoints } = useEliminatoriasStore();
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handlePointsChange = (change: number) => {
    if (!selectedTeam) return;
    adjustTeamPoints(selectedTeam, change);
  };

  const getTeamCurrentPoints = (teamId: string) => {
    const teamStats = standings.find((s) => s.team === teamId);
    return teamStats?.points || 0;
  };

  const selectedTeamData = teams.find((team) => team.id === selectedTeam);
  const currentPoints = selectedTeam ? getTeamCurrentPoints(selectedTeam) : 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <span className="text-2xl">⚖️</span>
          Gestor de Puntos
        </CardTitle>
        <p className="text-muted-foreground">
          Ajusta manualmente los puntos de cualquier país de la CONMEBOL
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selector de País */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Seleccionar País
          </label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-full">
              {selectedTeam ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedTeamData?.flag}</span>
                  <span>{selectedTeamData?.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {currentPoints} pts
                  </Badge>
                </div>
              ) : (
                <SelectValue placeholder="Elige un país..." />
              )}
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg">{team.flag}</span>
                    <span className="flex-1">{team.name}</span>
                    <Badge variant="secondary">
                      {getTeamCurrentPoints(team.id)} pts
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Panel de Control de Puntos */}
        {selectedTeam && selectedTeamData && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">{selectedTeamData.flag}</span>
                <h3 className="text-xl font-bold">{selectedTeamData.name}</h3>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Puntos actuales:
                </span>
                <Badge variant="default" className="text-lg px-3 py-1">
                  {currentPoints}
                </Badge>
              </div>
            </div>

            {/* Botones de Control */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-center text-muted-foreground">
                  Quitar Puntos
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => handlePointsChange(-1)}
                    disabled={currentPoints === 0}
                    className="flex items-center gap-2"
                  >
                    <Minus className="h-4 w-4" />
                    -1
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => handlePointsChange(-3)}
                    disabled={currentPoints < 3}
                    className="flex items-center gap-2"
                  >
                    <Minus className="h-4 w-4" />
                    -3
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-center text-muted-foreground">
                  Agregar Puntos
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handlePointsChange(1)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    +1
                  </Button>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handlePointsChange(3)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    +3
                  </Button>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-center text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
              <p>
                💡 Los cambios se reflejan automáticamente en la tabla de
                posiciones
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
