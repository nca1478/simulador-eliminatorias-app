# 🏆 Eliminatorias CONMEBOL 2026

Simulador interactivo de las Eliminatorias Sudamericanas para el Mundial de Fútbol 2026. Una aplicación web moderna construida con React, TypeScript y Tailwind CSS que permite simular y seguir el desarrollo del torneo clasificatorio más competitivo del mundo.

## ✨ Características Principales

### 🎮 Simulación Completa

- **18 fechas** con todos los partidos del torneo
- **10 selecciones sudamericanas** participantes
- Sistema de puntuación FIFA oficial (3 puntos por victoria, 1 por empate)
- Cálculo automático de posiciones y estadísticas

### 📊 Gestión de Datos

- **Tabla de posiciones** en tiempo real con ordenamiento automático
- **Estadísticas detalladas** por equipo (partidos jugados, victorias, empates, derrotas, goles, diferencia de gol)
- **Historial de últimos 5 resultados** por selección
- **Progreso del torneo** con indicador visual

### 💾 Persistencia y Respaldo

- **Guardado automático** de todos los resultados en localStorage
- **Sistema de backup** para exportar/importar datos
- **Función de reset** para reiniciar el torneo completo

### 🎨 Interfaz Moderna

- Diseño responsive adaptado a todos los dispositivos
- Interfaz intuitiva con navegación por pestañas
- Animaciones suaves y efectos visuales
- Tema con gradientes y elementos glassmorphism

## 🚀 Tecnologías Utilizadas

### Frontend

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS 4** - Framework de CSS utilitario

### Gestión de Estado

- **Zustand** - Gestión de estado ligera y moderna
- **Persist middleware** - Persistencia automática en localStorage

### Componentes UI

- **Lucide React** - Iconos modernos
- **Class Variance Authority** - Gestión de variantes de componentes
- **Tailwind Merge** - Optimización de clases CSS

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **TypeScript ESLint** - Reglas específicas para TypeScript

## 📋 Equipos Participantes

La aplicación incluye las 10 selecciones sudamericanas:

| Selección | Bandera |
| --------- | ------- |
| Argentina | 🇦🇷      |
| Brasil    | 🇧🇷      |
| Uruguay   | 🇺🇾      |
| Colombia  | 🇨🇴      |
| Ecuador   | 🇪🇨      |
| Venezuela | 🇻🇪      |
| Paraguay  | 🇵🇾      |
| Perú      | 🇵🇪      |
| Bolivia   | 🇧🇴      |
| Chile     | 🇨🇱      |

## 🎯 Funcionalidades Detalladas

### Simulación de Partidos

- Navegación por fechas (1-18)
- Ingreso de resultados partido por partido
- Validación de datos de entrada
- Actualización automática de estadísticas

### Tabla de Posiciones

- Ordenamiento por puntos, diferencia de gol y goles a favor
- Indicadores visuales para posiciones de clasificación
- Estadísticas completas por equipo
- Historial de forma reciente

### Estadísticas Rápidas

- Resumen del progreso del torneo
- Equipos líderes en diferentes categorías
- Porcentaje de partidos completados

### Gestión de Datos

- Exportación de datos en formato JSON
- Importación de respaldos previos
- Reset completo del torneo
- Persistencia automática entre sesiones

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd eliminatorias-2026

# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la construcción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base de UI
│   ├── BackupManager.tsx
│   ├── MatchCard.tsx
│   ├── MatchdaySelector.tsx
│   ├── QuickStats.tsx
│   └── StandingsTable.tsx
├── data/               # Datos estáticos
│   ├── teams.ts        # Información de equipos
│   └── fixtures.ts     # Generación de fixture
├── store/              # Gestión de estado
│   └── eliminatorias.ts
├── types/              # Definiciones TypeScript
│   └── index.ts
├── lib/                # Utilidades
├── App.tsx             # Componente principal
└── main.tsx           # Punto de entrada
```

## 🎮 Cómo Usar la Aplicación

### 1. Navegación Principal

La aplicación se organiza en tres pestañas principales:

- **⚽ Partidos**: Simulación de resultados por fecha
- **📊 Tabla**: Visualización de posiciones y estadísticas
- **🔧 Utilidades**: Gestión de datos y configuración

### 2. Simular Partidos

1. Selecciona una fecha (1-18) usando el selector
2. Ingresa los resultados de cada partido
3. Los cambios se guardan automáticamente
4. La tabla se actualiza en tiempo real

### 3. Consultar Estadísticas

- Ve a la pestaña "Tabla" para ver posiciones actuales
- Revisa estadísticas detalladas de cada equipo
- Observa el progreso general del torneo

### 4. Gestionar Datos

- Usa "Exportar Datos" para crear un respaldo
- "Importar Datos" para restaurar un estado previo
- "Resetear" para comenzar un nuevo torneo

## 🏆 Sistema de Clasificación

Según el formato real de las Eliminatorias CONMEBOL:

- **Posiciones 1-6**: Clasificación directa al Mundial 2026
- **Posición 7**: Repechaje intercontinental
- **Posiciones 8-10**: Eliminadas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- Datos y formato basados en las Eliminatorias CONMEBOL oficiales
- Iconos de banderas usando emojis Unicode
- Inspirado en la pasión sudamericana por el fútbol

---

**¡Disfruta simulando el camino al Mundial 2026! ⚽🌎**
