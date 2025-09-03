import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface MatchdaySelectorProps {
  currentMatchday: number;
  onMatchdayChange: (matchday: number) => void;
  totalMatchdays: number;
}

export const MatchdaySelector: React.FC<MatchdaySelectorProps> = ({
  currentMatchday,
  onMatchdayChange,
  totalMatchdays,
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Current Selection Display */}
          <div className="text-center">
            <Badge
              variant="outline"
              className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2"
            >
              📅 Fecha {currentMatchday} de {totalMatchdays}
            </Badge>
          </div>

          {/* Matchday Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-18 gap-1 sm:gap-2 justify-items-center">
            {Array.from({ length: totalMatchdays }, (_, i) => i + 1).map(
              (matchday) => (
                <Button
                  key={matchday}
                  variant={currentMatchday === matchday ? "default" : "outline"}
                  size="sm"
                  onClick={() => onMatchdayChange(matchday)}
                  className={`
                    min-w-[2.5rem] sm:min-w-[3rem] h-8 sm:h-10 font-bold transition-all duration-200 cursor-pointer text-xs sm:text-sm
                    ${
                      currentMatchday === matchday
                        ? "shadow-lg sm:scale-110 bg-primary text-primary-foreground"
                        : "hover:scale-105 hover:shadow-md"
                    }
                  `}
                >
                  {matchday}
                </Button>
              )
            )}
          </div>

          {/* Navigation Helpers */}
          <div className="flex justify-center space-x-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMatchdayChange(Math.max(1, currentMatchday - 1))}
              disabled={currentMatchday === 1}
              className="text-xs cursor-pointer disabled:cursor-not-allowed px-2 sm:px-3"
            >
              <span className="sm:hidden">←</span>
              <span className="hidden sm:inline">← Anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onMatchdayChange(Math.min(totalMatchdays, currentMatchday + 1))
              }
              disabled={currentMatchday === totalMatchdays}
              className="text-xs cursor-pointer disabled:cursor-not-allowed px-2 sm:px-3"
            >
              <span className="sm:hidden">→</span>
              <span className="hidden sm:inline">Siguiente →</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
