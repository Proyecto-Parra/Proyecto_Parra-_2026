# Imagen base oficial y liviana de Python
FROM python:3.12-slim

# Evita compilación de bytecode y habilita logs en tiempo real sin búfer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo en el contenedor
WORKDIR /app

# Instalar utilidades básicas del sistema y limpiar caché
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente del proyecto
COPY . .

# Crear carpeta de subidas
RUN mkdir -p uploads

# HARDENING / PRIVILEGIO MÍNIMO: Crear usuario sin privilegios root
RUN useradd -m -u 10001 appuser && \
    chown -R appuser:appuser /app
USER appuser

# Puerto donde escucha la app
EXPOSE 5000

# Verificación periódica de estado del contenedor (Healthcheck)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1

# Servidor WSGI de producción con Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]