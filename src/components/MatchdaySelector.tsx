import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: totalMatchdays }, (_, i) => i + 1).map(
            (matchday) => (
              <Button
                key={matchday}
                variant={currentMatchday === matchday ? "default" : "outline"}
                size="sm"
                onClick={() => onMatchdayChange(matchday)}
                className="min-w-[3rem]"
              >
                {matchday}
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};
