import { useState, useEffect } from "react";
import { useEliminatoriasStore } from "./store/eliminatorias";
import { MatchCard } from "./components/MatchCard";
import { StandingsTable } from "./components/StandingsTable";
import { MatchdaySelector } from "./components/MatchdaySelector";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏆 Eliminatorias CONMEBOL 2026
          </h1>
          <p className="text-gray-600">
            Simulador de las Eliminatorias Sudamericanas para el Mundial 2026
          </p>

          {/* Progress Bar */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso</span>
              <span>
                {totalPlayedMatches}/{totalMatches} partidos
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={activeTab === "matches" ? "default" : "ghost"}
              onClick={() => setActiveTab("matches")}
              className="rounded-md"
            >
              ⚽ Partidos
            </Button>
            <Button
              variant={activeTab === "standings" ? "default" : "ghost"}
              onClick={() => setActiveTab("standings")}
              className="rounded-md"
            >
              📊 Tabla
            </Button>
          </div>
        </div>

        {activeTab === "matches" && (
          <div className="space-y-6">
            {/* Matchday Selector */}
            <div>
              <h2 className="text-xl font-semibold text-center mb-4">
                Seleccionar Fecha
              </h2>
              <MatchdaySelector
                currentMatchday={selectedMatchday}
                onMatchdayChange={setSelectedMatchday}
                totalMatchdays={18}
              />
            </div>

            {/* Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Fecha {selectedMatchday} de 18
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                  {matchesForSelectedMatchday.map((match) => (
                    <MatchCard key={match.id} match={match} teams={teams} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "standings" && (
          <div className="space-y-6">
            <StandingsTable standings={standings} teams={teams} />
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center mt-8">
          <Button
            variant="destructive"
            onClick={handleReset}
            className="mx-auto"
          >
            🔄 Resetear Todos los Datos
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Simulador de Eliminatorias CONMEBOL 2026</p>
          <p>Los primeros 6 clasifican directamente, el 7° va a repechaje</p>
        </div>
      </div>
    </div>
  );
}

export default App;
