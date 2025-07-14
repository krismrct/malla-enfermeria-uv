const ramos = document.querySelectorAll('.ramo');

// Cargar progreso guardado al iniciar
function cargarProgreso() {
  const progreso = JSON.parse(localStorage.getItem('progresoMalla')) || {};
  ramos.forEach(r => {
    const cod = r.dataset.cod;
    if (progreso[cod] === 'aprobado') {
      r.classList.add('aprobado');
    }
  });
}

// Guardar progreso actual
function guardarProgreso() {
  const progreso = {};
  ramos.forEach(r => {
    const cod = r.dataset.cod;
    if (r.classList.contains('aprobado')) {
      progreso[cod] = 'aprobado';
    }
  });
  localStorage.setItem('progresoMalla', JSON.stringify(progreso));
}

// Activar desbloqueos según prerequisitos
function actualizarDesbloqueos() {
  ramos.forEach(r => {
    if (r.classList.contains('aprobado')) return;
    const deps = r.dataset.deps ? r.dataset.deps.split(',').map(d => d.trim()).filter(d => d) : [];
    const cumplidos = deps.every(cd =>
      [...ramos].find(x => x.dataset.cod === cd && x.classList.contains('aprobado'))
    );
    if (deps.length === 0 || cumplidos) {
      r.classList.add('desbloqueado');
    } else {
      r.classList.remove('desbloqueado');
    }
  });
}

// Al hacer clic en un ramo
function onClickRamo() {
  const cod = this.dataset.cod;
  if (!this.classList.contains('desbloqueado') && !this.classList.contains('aprobado')) {
    alert('Requisitos no cumplidos aún.');
    return;
  }

  this.classList.toggle('aprobado');
  this.classList.remove('desbloqueado');
  guardarProgreso();
  actualizarDesbloqueos();
}

// Inicializar
ramos.forEach(r => r.addEventListener('click', onClickRamo));
cargarProgreso();
actualizarDesbloqueos();
