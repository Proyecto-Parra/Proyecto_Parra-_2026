// Cargar la nómina del equipo seleccionado
function cargarNomina() {
    const container = document.getElementById("nomina-container");
    if (!container) return;

    container.innerHTML = "<p>Cargando nómina de personal...</p>";

    fetch("/get_nomina/" + encodeURIComponent(equipoSeleccionado))
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data && data.data.length > 0) {
            let html = `
                <table class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Líder Asignado</th>
                            <th>Turno</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            data.data.forEach(item => {
                html += `
                    <tr>
                        <td>${item.nombre}</td>
                        <td>${item.lider}</td>
                        <td><span class="badge bg-primary">${item.turno}</span></td>
                    </tr>`;
            });

            html += `</tbody></table>`;
            container.innerHTML = html;
        } else {
            container.innerHTML = "<p class='text-muted'>No se encontraron registros de nómina para este equipo.</p>";
        }
    })
    .catch(err => {
        console.error("Error al obtener nómina:", err);
        container.innerHTML = "<p class='text-danger'>Error de comunicación al consultar la nómina.</p>";
    });
}