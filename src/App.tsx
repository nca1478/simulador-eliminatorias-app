import { useState, useEffect } from "react";
import { useEliminatoriasStore } from "./store/eliminatorias";
import { MatchCard } from "./components/MatchCard";
import { StandingsTable } from "./components/StandingsTable";
import { MatchdaySelector } from "./components/MatchdaySelector";
import { QuickStats } from "./components/QuickStats";
import { BackupManager } from "./components/BackupManager";
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
  const [activeTab, setActiveTab] = useState<"matches" | "standings">(
    "matches"
  );

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
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="text-6xl">🏆</div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Eliminatorias CONMEBOL 2026
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Simulador de las Eliminatorias Sudamericanas para el Mundial
                2026
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Progreso del Torneo
                </span>
                <Badge variant="secondary" className="text-xs">
                  {totalPlayedMatches}/{totalMatches} partidos
                </Badge>
              </div>
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">
                {progress.toFixed(1)}% completado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "matches" | "standings")
          }
          className="w-full animate-fade-in"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg">
              <TabsTrigger value="matches" className="flex items-center gap-2">
                <span className="text-lg">⚽</span>
                Partidos
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="flex items-center gap-2"
              >
                <span className="text-lg">📊</span>
                Tabla
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="matches" className="space-y-8">
            {/* Matchday Selector */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Seleccionar Fecha
              </h2>
              <MatchdaySelector
                currentMatchday={selectedMatchday}
                onMatchdayChange={setSelectedMatchday}
                totalMatchdays={18}
              />
            </div>

            {/* Matches */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Fecha {selectedMatchday} de 18
                  </Badge>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {matchesForSelectedMatchday.map((match) => (
                    <MatchCard key={match.id} match={match} teams={teams} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="standings" className="space-y-6">
            {/* Quick Stats */}
            <QuickStats
              standings={standings}
              teams={teams}
              totalMatches={totalMatches}
              playedMatches={totalPlayedMatches}
            />
            <StandingsTable standings={standings} teams={teams} />
          </TabsContent>
        </Tabs>

        {/* Backup Manager */}
        <div className="max-w-2xl mx-auto mt-12">
          <BackupManager />
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <Card className="inline-block bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <Button
                variant="destructive"
                onClick={handleReset}
                className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span className="mr-2">🔄</span>
                Resetear Todos los Datos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <Separator className="max-w-md mx-auto" />
          <div className="text-muted-foreground">
            <p className="font-medium">
              Simulador de Eliminatorias CONMEBOL 2026
            </p>
            <div className="flex justify-center gap-6 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="success" className="w-3 h-3 p-0"></Badge>
                <span>Clasificación directa (1-6)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="w-3 h-3 p-0"></Badge>
                <span>Repechaje (7°)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
