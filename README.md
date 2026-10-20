# 🏢 Naturgy - Sistema de Autenticación y Gestión de Reportes

Sistema web integral desarrollado para **Naturgy / CAT** enfocado en la gestión operativa, control de asistencia, seguimiento de logueos y centralización de la información para los equipos regionales de atención telefónica (**BAN CAU**, **NOA CAU** y **Energía San Juan**).

---

## 🚀 Características Principales

* **🔐 Autenticación y Control de Accesos:**
  * **Líderes:** Acceso global para carga de planillas, gestión de reportes y administración general.
  * **Operadores:** Permisos restringidos exclusivamente a su equipo asignado.
* **📊 Módulo de Logueos y Asistencia Consolidada:**
  * Procesamiento inteligente de planillas descargadas (`.xlsx`, `.xls`, `.csv`).
  * Extracción automática de horarios de **Hora de Entrada** y **Hora de Salida** por asesor.
  * Unificación dinámica en un tablero diario de asistencia.
* **📢 Información de Campaña Interactivas:**
  * Integración directa mediante iFrames responsive con presentaciones oficiales de **Canva** según el equipo seleccionado.
* **🗂️ Navegación por Pestañas Corporativas:**
  * **👥 Nómina:** Listado de personal y distribución por Líderes de equipo.
  * **📢 Info Campaña:** Presentaciones interactivas de procesos y novedades.
  * **⏱️ Logueos:** Control de asistencia y carga de reportes.
  * **📋 Novedades:** Registro de incidencias y licencias.
  * **🎯 Calidad:** Pautas de atención y evaluaciones.
  * **📈 Métricas:** Indicadores clave de rendimiento (KPIs) y selector de mes.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Python 3, Flask, Pandas, OpenPyXL, XLRD.
* **Frontend:** HTML5, CSS3 (Diseño responsivo corporativo), JavaScript Vanilla (AJAX/Fetch API).
* **Integraciones:** Canva Embed API.
* **Control de Versiones:** Git & GitHub.

---

## 📂 Estructura del Proyecto

```text
Naturgy-equipos/
│
├── app.py                      # Servidor principal Flask y procesador de planillas
├── uploads/                    # Carpeta de almacenamiento de reportes subidos
│
├── templates/
│   └── index.html              # Interfaz de usuario y estructura de pestañas
│
└── static/
    ├── style.css               # Hoja de estilos corporativa e íconos SVG
    ├── main.js                 # Lógica interactiva del cliente y peticiones AJAX
    ├── CAT.png                 # Isologotipo oficial CAT
    └── naturgy.png             # Isologotipo oficial Naturgy
🔑 Credenciales de Prueba
Usuario
Contraseña
Rol
Equipo Asignado
Lideres

⚙️ Instalación y Ejecución Local
Clonar el repositorio:
git clone https://github.com/karyparrauni/Naturgy-equipos.git
cd Naturgy-equipos
Instalar dependencias necesarias:
pip install flask pandas openpyxl xlrd
Iniciar el servidor web:
python app.py

Acceder desde el navegador: Navega a http://127.0.0.1:

🌿 Estructura de Ramas Git
El desarrollo del proyecto está organizado en las siguientes ramas:
main: Código consolidado y estable listo para producción.
feature/backend: Desarrollo del servidor Flask, rutas y procesamiento Pandas.
feature/frontend: Maquetación HTML, diseño CSS e interactividad JS.
feature/docs-data: Documentación, imágenes y archivos de pruebas.# 🏢 Naturgy - Sistema de Autenticación y Gestión de Reportes
