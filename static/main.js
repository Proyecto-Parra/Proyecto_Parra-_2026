let equipoSeleccionado = "";

// Enlaces oficiales de Canva por equipo
const CANVA_URLS = {
    "NATURGY ENERGIA SAN JUAN": "https://www.canva.com/design/DAHXwZUnr0k/JvD_ZzvuYPamtZx-xmNVXA/view?embed",
    "NATURGY BAN CAU": "https://www.canva.com/design/DAHXvwwRNs8/HhYMcTWKdey1NQEEBDMCsA/view?embed",
    "NATURGY NOA CAU": "https://www.canva.com/design/DAHXwQ2dCFQ/tFmXhbv0Zhq2woI_AlnmkA/view?embed"
};

// ==========================================
// 1. GESTIÓN DE NÓMINA DINÁMICA DESDE .ENV
// ==========================================
// Cargar la nómina del equipo seleccionado
function cargarNomina() {
    const container = document.getElementById("nomina-container");
    if (!container) return;

    container.innerHTML = "<p>Cargando nómina de personal...</p>";

    fetch("/get_nomina/" + encodeURIComponent(equipoSeleccionado))
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data && data.data.length > 0) {
            renderizarTablaNomina(container, data.data);
        } else {
            container.innerHTML = "<p class='text-muted'>No se encontraron registros de nómina para este equipo.</p>";
        }
    })
    .catch(err => {
        console.error("Error al obtener la nómina desde el servidor:", err);
        container.innerHTML = "<p class='text-danger'>Error de comunicación al consultar la nómina con el servidor.</p>";
    });
}

// Función auxiliar exclusiva para dibujar la tabla HTML con los datos recibidos
function renderizarTablaNomina(container, listaData) {
    let html = `
        <table class="table table-striped table-bordered align-middle">
            <thead class="table-dark">
                <tr>
                    <th>Legajo</th>
                    <th>Nombre y Apellido</th>
                    <th>Líder Asignado</th>
                    <th>Turno</th>
                </tr>
            </thead>
            <tbody>`;

    listaData.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.legajo || '---'}</strong></td>
                <td>${item.nombre || '---'}</td>
                <td>${item.lider || '---'}</td>
                <td><span class="badge bg-primary">${item.turno || '---'}</span></td>
            </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ==========================================
// 2. NAVEGACIÓN Y PESTAÑAS
// ==========================================
function cambiarPestana(nombrePestana, event) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const tabTarget = document.getElementById('tab-' + nombrePestana);
    if (tabTarget) {
        tabTarget.classList.add('active');
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Cargar nómina automáticamente al entrar a la pestaña 'nomina'
    if (nombrePestana === 'nomina') {
        const teamDisplay = document.getElementById("team-display");
        const equipoActual = (teamDisplay && teamDisplay.innerText.trim() !== "---") 
            ? teamDisplay.innerText.trim() 
            : equipoSeleccionado;

        if (equipoActual && equipoActual !== "---") {
            cargarNomina(equipoActual);
        }
    }
}

function cambiarSubpestanaCalidad(subpestana, event) {
    document.querySelectorAll('#tab-calidad .subtab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('#tab-calidad .subtab-content').forEach(content => content.classList.remove('active'));

    const subtabTarget = document.getElementById('subtab-calidad-' + subpestana);
    if (subtabTarget) {
        subtabTarget.classList.add('active');
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

function cambiarMes(pestana, valorMes) {
    console.log(`Cambio de mes en la pestaña ${pestana}: ${valorMes}`);
    if (pestana === 'logueos') {
        cargarReporte();
    }
}

// ==========================================
// 3. AUTENTICACIÓN Y ROLES
// ==========================================
function abrirLogin(nombreEquipo) {
    equipoSeleccionado = nombreEquipo;

    const teamDisplay = document.getElementById("team-display");
    if (teamDisplay) {
        teamDisplay.innerText = nombreEquipo;
    }

    document.getElementById("modalTitle").innerText = "Acceso a " + nombreEquipo;
    document.getElementById("loginModal").style.display = "block";
    document.getElementById("usuario").focus();
}

function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
}

function actualizarPanelesLider(rol) {
    const esLider = (rol === "lider");
    const panelesLider = [
        document.getElementById("leader-panel"),
        document.getElementById("leader-panel-calidad-resumen"),
        document.getElementById("leader-panel-calidad-detalle")
    ];

    panelesLider.forEach(panel => {
        if (panel) {
            panel.style.display = esLider ? "block" : "none";
        }
    });
}

function validarAcceso(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario: usuarioInput,
            password: passwordInput,
            equipo: equipoSeleccionado
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cerrarLogin();

            document.getElementById("equipo-section").style.display = "none";
            document.getElementById("dashboard-section").style.display = "block";

            document.getElementById("user-display").innerText = data.usuario;
            document.getElementById("team-display").innerText = data.equipo;
            document.getElementById("role-display").innerText = data.rol.toUpperCase();

            actualizarPanelesLider(data.rol);

            // Primero cambiar la pestaña activa
            const firstTabBtn = document.querySelector('.tab-btn');
            cambiarPestana('nomina', { currentTarget: firstTabBtn });

            // Luego cargar los datos del equipo logueado
            cargarNomina(data.equipo);
            cargarReporte();
            cargarInfoCampana(data.equipo);
        } else {
            alert("❌ Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error al validar acceso:", error);
        alert("❌ Error de comunicación con el servidor.");
    });
}

function cerrarSesion() {
    fetch("/logout", { method: "POST" })
    .then(() => {
        document.getElementById("dashboard-section").style.display = "none";
        document.getElementById("equipo-section").style.display = "flex";
        alert("Sesión cerrada correctamente.");
    })
    .catch(error => {
        console.error("Error al cerrar sesión:", error);
        document.getElementById("dashboard-section").style.display = "none";
        document.getElementById("equipo-section").style.display = "flex";
    });
}

// ==========================================
// 4. MÓDULOS Y REPORTES (LOGUEOS, CAMPAÑA, CALIDAD)
// ==========================================
function cargarInfoCampana(equipo) {
    const container = document.getElementById("canva-container");
    const title = document.getElementById("campana-title");
    if (!container || !title) return;
    
    const urlCanva = CANVA_URLS[equipo] || CANVA_URLS["NATURGY BAN CAU"];
    title.innerText = "📢 Información de Campaña - " + equipo;
    
    container.innerHTML = `
        <div class="canva-responsive-wrapper">
            <iframe loading="lazy" src="${urlCanva}" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>
        </div>
    `;
}

function cargarReporte() {
    const tableContainer = document.getElementById("table-container");
    if (!tableContainer) return;

    tableContainer.innerHTML = "<p>Cargando información de logueos del equipo...</p>";

    fetch("/obtener_reporte")
    .then(response => response.json())
    .then(data => {
        if (data.success && data.html_tabla) {
            tableContainer.innerHTML = data.html_tabla;
        } else {
            tableContainer.innerHTML = `<p>${data.message || "No hay reportes cargados aún para este equipo."}</p>`;
        }
    })
    .catch(error => {
        console.error("Error al obtener el reporte:", error);
        tableContainer.innerHTML = "<p>Ocurrió un error al cargar la información.</p>";
    });
}

function subirArchivo() {
    const fileInput = document.getElementById('excelFile');
    const tableContainer = document.getElementById('table-container');

    if (!fileInput || !fileInput.files[0]) {
        alert("Por favor, selecciona un archivo de logueo antes de presionar Subir Reporte.");
        return;
    }

    if (!tableContainer) return;

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    tableContainer.innerHTML = '<p class="text-muted">Procesando y actualizando logueos...</p>';

    fetch('/upload_logueo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            tableContainer.innerHTML = data.html_tabla;
            alert(data.message);
            fileInput.value = '';
        } else {
            tableContainer.innerHTML = `<p class="text-danger">Aviso: ${data.message}</p>`;
            alert("No se pudo procesar: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error en la petición:", error);
        tableContainer.innerHTML = '<p class="text-danger">Error de comunicación con el servidor.</p>';
    });
}

function subirArchivoCalidadResumen() {
    const fileInput = document.getElementById("excelCalidadResumenFile");

    if (!fileInput || fileInput.files.length === 0) {
        alert("⚠️ Por favor selecciona un archivo Excel para el Resumen de Calidad.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload_calidad_resumen", {
        method: "POST",
        body: formData
    })
    .then(async response => {
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Error en el servidor.");
            }
            return data;
        } catch (e) {
            console.error("Respuesta completa del servidor:", text);
            throw new Error("El servidor devolvió un error (Código " + response.status + "). Revisa la consola de Python.");
        }
    })
    .then(data => {
        alert("✅ " + data.message);
        fileInput.value = "";
        const container = document.getElementById("table-calidad-resumen-container");
        if (container && data.html_tabla) {
            container.innerHTML = data.html_tabla;
        }
    })
    .catch(error => {
        console.error("Error al subir planilla resumen:", error);
        alert("❌ Error: " + error.message);
    });
}

function cambiarColorEstado(selectElement) {
    selectElement.className = 'select-estado-logueo';
    const nuevoEstado = selectElement.value;
    selectElement.classList.add('estado-' + nuevoEstado);
}

// ==========================================
// 5. MODO OSCURO (DARK MODE) Y EVENTOS GLOBAL
// ==========================================
function aplicarTema(esOscuro) {
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");
    const themeText = document.getElementById("theme-toggle-text");

    if (esOscuro) {
        document.body.classList.add("dark-mode");
        if (sunIcon) sunIcon.style.display = "inline";
        if (moonIcon) moonIcon.style.display = "none";
        if (themeText) themeText.innerText = "Modo Claro";
        localStorage.setItem("naturgy_theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "inline";
        if (themeText) themeText.innerText = "Modo Oscuro";
        localStorage.setItem("naturgy_theme", "light");
    }
}

function toggleDarkMode() {
    const esOscuroActual = document.body.classList.contains("dark-mode");
    aplicarTema(!esOscuroActual);
}

document.addEventListener("DOMContentLoaded", () => {
    // Restaurar tema
    const temaGuardado = localStorage.getItem("naturgy_theme");
    aplicarTema(temaGuardado === "dark");

    // Event Listener para Limpiar Logueos
    const btnLimpiar = document.getElementById('btnLimpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas borrar todos los reportes subidos y empezar de cero?')) {
                fetch('/limpiar_logueos', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const contenedorTabla = document.querySelector('.tabla-logueos');
                        if (contenedorTabla) {
                            contenedorTabla.innerHTML = '';
                        } else {
                            location.reload();
                        }
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error al limpiar:', error);
                    alert('Ocurrió un error al intentar limpiar los datos.');
                });
            }
        });
    }
});