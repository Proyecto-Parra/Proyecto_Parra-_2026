#!/bin/bash

# ==============================================================================
# SCRIPT DE MANTENIMIENTO Y RESPALDOS AUTOMATIZADOS (TP01 / TP02 / TP04)
# Proyecto: Naturgy BAN CAU / NOA / SAN JUAN
# ==============================================================================

# Definición de rutas
PROJECT_DIR="$(pwd)"
UPLOADS_DIR="$PROJECT_DIR/uploads"
BACKUP_DIR="$PROJECT_DIR/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "=================================================="
echo "🛠️  Iniciando tarea de mantenimiento: $TIMESTAMP"
echo "=================================================="

# 1. Crear directorio de respaldos si no existe
mkdir -p "$BACKUP_DIR"

# 2. Generar respaldo comprimido (.tar.gz) de la carpeta uploads con timestamp
if [ -d "$UPLOADS_DIR" ] && [ "$(ls -A "$UPLOADS_DIR")" ]; then
    BACKUP_FILE="$BACKUP_DIR/backup_uploads_$TIMESTAMP.tar.gz"
    tar -czf "$BACKUP_FILE" -C "$PROJECT_DIR" uploads
    echo "✅ Respaldo creado exitosamente: $BACKUP_FILE"
else
    echo "ℹ️  La carpeta 'uploads' está vacía o no existe. Sin archivos para respaldar."
fi

# 3. Mantenimiento: Eliminar respaldos mayores a 30 días para optimizar espacio
echo "🧹 Limpiando respaldos antiguos (>30 días)..."
find "$BACKUP_DIR" -type f -name "backup_uploads_*.tar.gz" -mtime +30 -exec rm -f {} \;

# 4. Reporte de uso de disco y recursos del sistema
echo "--------------------------------------------------"
echo "📊 Estado actual del almacenamiento en disco:"
df -h . | awk 'NR==1 || NR==2'
echo "=================================================="
echo "🎉 Mantenimiento finalizado correctamente."