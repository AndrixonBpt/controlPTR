document.addEventListener('DOMContentLoaded', () => {
  const linkContainer = document.getElementById('link-container');
  const copyBtn = document.getElementById('copy-btn');
  const statusEl = document.getElementById('status');
  let mobileLink = '';

  // Buscar la IP dinámica desde el servidor local
  fetch('http://localhost:3000/api/ip')
    .then(res => res.json())
    .then(data => {
      mobileLink = `http://${data.ip}:${data.port}`;
      linkContainer.textContent = mobileLink;
      copyBtn.disabled = false;
    })
    .catch(err => {
      linkContainer.textContent = 'Error: Servidor Node no iniciado';
      linkContainer.style.color = '#dc3545';
      copyBtn.disabled = true;
    });

  copyBtn.addEventListener('click', () => {
    if (mobileLink) {
      navigator.clipboard.writeText(mobileLink).then(() => {
        statusEl.textContent = '¡Copiado al portapapeles!';
        setTimeout(() => { statusEl.textContent = ''; }, 3000);
      });
    }
  });
});
