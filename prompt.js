window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que o prompt padrão seja exibido automaticamente
    e.preventDefault();
  
    // Exibir o prompt de instalação automaticamente
    e.prompt();
  
    // Aguarde a resposta do usuário
    e.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação do PWA');
      } else {
        console.log('Usuário recusou a instalação do PWA');
      }
    });
  });
  