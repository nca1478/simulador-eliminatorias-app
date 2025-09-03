import { useState, useEffect } from "react";
import { useEliminatoriasStore } from "./store/eliminatorias";
import { MatchCard } from "./components/MatchCard";
import { StandingsTable } from "./components/StandingsTable";
import { MatchdaySelector } from "./components/MatchdaySelector";
import { QuickStats } from "./components/QuickStats";
import { BackupManager } from "./components/BackupManager";
import { PointsManager } from "./components/PointsManager";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";

function App() {
  const {
    teams,
    matches,
    standings,
    currentMatchday,
    calculateStandings,
    resetData,
  } = useEliminatoriasStore();

  const [selectedMatchday, setSelectedMatchday] = useState(currentMatchday);
  const [activeTab, setActiveTab] = useState<
    "matches" | "standings" | "utilities"
  >("matches");

  useEffect(() => {
    calculateStandings();
  }, [calculateStandings]);

  const matchesForSelectedMatchday = matches.filter(
    (match) => match.matchday === selectedMatchday
  );

  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer."
      )
    ) {
      resetData();
      setSelectedMatchday(1);
    }
  };

  const totalPlayedMatches = matches.filter((m) => m.played).length;
  const totalMatches = matches.length;
  const progress = (totalPlayedMatches / totalMatches) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex flex-col sm:inline-flex sm:flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="text-4xl sm:text-6xl">🏆</div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                Eliminatorias CONMEBOL 2026
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 px-2 sm:px-0">
                Simulador de las Eliminatorias Sudamericanas para el Mundial
                2026
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <Card className="max-w-sm sm:max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mb-3">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Progreso del Torneo
                </span>
                <Badge variant="secondary" className="text-xs">
                  {totalPlayedMatches}/{totalMatches} partidos
                </Badge>
              </div>
              <Progress value={progress} className="h-2 sm:h-3 mb-2" />
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                {progress.toFixed(1)}% completado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "matches" | "standings" | "utilities")
          }
          className="w-full animate-fade-in"
        >
          <div className="flex justify-center mb-6 sm:mb-8 px-2">
            <TabsList className="grid w-full max-w-sm sm:max-w-2xl grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg h-12 sm:h-10">
              <TabsTrigger
                value="matches"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span className="text-sm sm:text-lg">⚽</span>
                <span className="hidden xs:inline">Partidos</span>
                <span className="xs:hidden">Juegos</span>
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span className="text-sm sm:text-lg">📊</span>
                <span className="hidden xs:inline">Tabla</span>
                <span className="xs:hidden">Posiciones</span>
              </TabsTrigger>
              <TabsTrigger
                value="utilities"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span className="text-sm sm:text-lg">🔧</span>
                <span className="hidden xs:inline">Utilidades</span>
                <span className="xs:hidden">Utilidades</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="matches" className="space-y-6 sm:space-y-8">
            {/* Matchday Selector */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground px-2">
                Seleccionar Fecha
              </h2>
              <MatchdaySelector
                currentMatchday={selectedMatchday}
                onMatchdayChange={setSelectedMatchday}
                totalMatchdays={18}
              />
            </div>

            {/* Matches */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mx-2 sm:mx-0">
              <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center justify-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2"
                  >
                    Fecha {selectedMatchday} de 18
                  </Badge>
                </div>
              </CardHeader>
              <Separator className="mx-4 sm:mx-6" />
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                  {matchesForSelectedMatchday.map((match) => (
                    <MatchCard key={match.id} match={match} teams={teams} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="standings"
            className="space-y-4 sm:space-y-6 px-2 sm:px-0"
          >
            {/* Quick Stats */}
            <QuickStats
              standings={standings}
              teams={teams}
              playedMatches={totalPlayedMatches}
            />
            <StandingsTable standings={standings} teams={teams} />
          </TabsContent>

          <TabsContent
            value="utilities"
            className="space-y-6 sm:space-y-8 px-2 sm:px-0"
          >
            {/* Points Manager */}
            <div className="max-w-2xl mx-auto">
              <PointsManager />
            </div>

            {/* Backup Manager */}
            <div className="max-w-2xl mx-auto">
              <BackupManager />
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <Card className="inline-block bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <Button
                    variant="destructive"
                    onClick={handleReset}
                    className="text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    <span className="mr-2">🔄</span>
                    <span className="hidden sm:inline">
                      Resetear Todos los Datos
                    </span>
                    <span className="sm:hidden">Resetear Datos</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Separator className="my-8 sm:my-12 bg-gradient-to-r from-blue-200 via-green-200 to-blue-200 h-0.5" />
        <div className="text-center mt-6 sm:mt-8 px-4">
          <div className="text-muted-foreground">
            <p className="font-medium text-sm sm:text-base">
              Simulador de Eliminatorias CONMEBOL 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
