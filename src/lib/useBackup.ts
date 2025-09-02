import { useCallback } from "react";
import type { Match, TeamStats } from "../types";

export interface BackupData {
  matches: Match[];
  standings: TeamStats[];
  currentMatchday: number;
  timestamp: string;
  version: string;
}

export const useBackup = () => {
  const exportData = useCallback(
    (matches: Match[], standings: TeamStats[], currentMatchday: number) => {
      const backupData: BackupData = {
        matches,
        standings,
        currentMatchday,
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      };

      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `eliminatorias-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    },
    []
  );

  const importData = useCallback((file: File): Promise<BackupData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const backupData: BackupData = JSON.parse(content);

          // Validar estructura básica
          if (
            !backupData.matches ||
            !backupData.standings ||
            !backupData.currentMatchday
          ) {
            throw new Error("Formato de archivo inválido");
          }

          resolve(backupData);
        } catch (error) {
          reject(
            new Error("Error al leer el archivo: " + (error as Error).message)
          );
        }
      };

      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };

      reader.readAsText(file);
    });
  }, []);

  return {
    exportData,
    importData,
  };
};
