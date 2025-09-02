import { useRef, useState } from "react";
import { useEliminatoriasStore } from "../store/eliminatorias";
import { useBackup } from "../lib/useBackup";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export const BackupManager = () => {
  const {
    matches,
    standings,
    currentMatchday,
    restoreData,
    calculateStandings,
  } = useEliminatoriasStore();
  const { exportData, importData } = useBackup();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleExport = () => {
    exportData(matches, standings, currentMatchday);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus({ type: null, message: "" });

    try {
      const backupData = await importData(file);

      // Restaurar los datos en el store
      restoreData(
        backupData.matches,
        backupData.standings,
        backupData.currentMatchday
      );

      // Recalcular las estadísticas para asegurar consistencia
      calculateStandings();

      setImportStatus({
        type: "success",
        message: `Datos restaurados exitosamente desde ${new Date(
          backupData.timestamp
        ).toLocaleDateString()}`,
      });
    } catch (error) {
      setImportStatus({
        type: "error",
        message: (error as Error).message,
      });
    } finally {
      setIsImporting(false);
      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const playedMatches = matches.filter((m) => m.played).length;
  const totalMatches = matches.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <span className="text-2xl">💾</span>
          Respaldo de Datos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estado actual */}
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">Fecha {currentMatchday} de 18</Badge>
            <Badge variant="outline">
              {playedMatches}/{totalMatches} partidos jugados
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleExport}
            className="flex items-center gap-2 h-12"
            variant="default"
          >
            <span className="text-lg">📤</span>
            Exportar Datos
          </Button>

          <Button
            onClick={handleImportClick}
            disabled={isImporting}
            className="flex items-center gap-2 h-12"
            variant="outline"
          >
            <span className="text-lg">📥</span>
            {isImporting ? "Importando..." : "Importar Datos"}
          </Button>
        </div>

        {/* Input oculto para seleccionar archivo */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Mensaje de estado */}
        {importStatus.type && (
          <div
            className={`p-3 rounded-lg text-sm text-center ${
              importStatus.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {importStatus.message}
          </div>
        )}

        {/* Información adicional */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            • El archivo de respaldo incluye todos los partidos, resultados y
            estadísticas
          </p>
          <p>
            • Al importar datos se actualizará tanto el localStorage como el
            estado de la aplicación
          </p>
          <p>
            • Los archivos de respaldo tienen formato JSON y son compatibles
            entre versiones
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
