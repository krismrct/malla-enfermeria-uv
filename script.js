const ramos = document.querySelectorAll('.ramo');

function onClickRamo() {
  const cod = this.dataset.cod;
  if (!this.classList.contains('desbloqueado') && !this.classList.contains('aprobado')) {
    alert('Requisitos no cumplidos aún.');
    return;
  }
  this.classList.toggle('aprobado');
  this.classList.remove('desbloqueado');

  actualizarDesbloqueos();
}

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

ramos.forEach(r => r.addEventListener('click', onClickRamo));
actualizarDesbloqueos();
