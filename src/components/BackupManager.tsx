import { useRef, useState } from "react";
import { useEliminatoriasStore } from "../store/eliminatorias";
import { useBackup } from "../lib/useBackup";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
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

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="text-center px-4 sm:px-6">
        <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
          <span className="text-xl sm:text-2xl">💾</span>
          <span className="hidden sm:inline">Respaldo de Datos</span>
          <span className="sm:hidden">Respaldo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        <Separator />

        {/* Botones de acción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={handleExport}
            className="flex items-center gap-2 h-10 sm:h-12 cursor-pointer text-sm sm:text-base"
            variant="outline"
          >
            <span className="text-base sm:text-lg">📤</span>
            <span className="hidden sm:inline">Exportar Datos</span>
            <span className="sm:hidden">Exportar</span>
          </Button>

          <Button
            onClick={handleImportClick}
            disabled={isImporting}
            className="flex items-center gap-2 h-10 sm:h-12 cursor-pointer text-sm sm:text-base"
            variant="default"
          >
            <span className="text-base sm:text-lg">📥</span>
            <span className="hidden sm:inline">
              {isImporting ? "Importando..." : "Importar Datos"}
            </span>
            <span className="sm:hidden">
              {isImporting ? "Importando..." : "Importar"}
            </span>
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
        <div className="text-xs text-muted-foreground text-center space-y-1 px-2">
          <p>• El archivo incluye todos los partidos y estadísticas</p>
          <p className="hidden sm:block">
            • Al importar datos se actualizará tanto el localStorage como el
            estado de la aplicación
          </p>
          <p>
            • Los archivos tienen formato JSON y son compatibles entre versiones
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
