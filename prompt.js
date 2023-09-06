let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir que o prompt padrão seja exibido automaticamente
  e.preventDefault();

  // Armazenar o evento para usá-lo posteriormente
  deferredPrompt = e;

  // Exibir o botão de instalação ou outro elemento de sua escolha
  document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', () => {
  // Verificar se há um evento de instalação adiado
  if (deferredPrompt) {
    // Mostrar o prompt de instalação
    deferredPrompt.prompt();

    // Aguarde a resposta do usuário
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação do PWA');
      } else {
        console.log('Usuário recusou a instalação do PWA');
      }

      // Limpar o evento de instalação adiado
      deferredPrompt = null;
    });
  }
});
