
let auxiliar;
messaging.onMessage((payload) => {
    let texto = JSON.stringify(payload, null, 2);
    console.log(texto.notification['tittle']);
    console.log(texto);
    auxiliar = texto;
    // enviaNotificacao();
})

function enviaNotificacao(titulo, texto, imagem) {
    const options = {
        body: texto,
        icon: '../public/images/favicon.jpg',
        image: imagem
    };

    new Notification(titulo, options);
}

function sendTokenToServer(currentToken) {
    if (!tokenFoiEnviado()) {
        console.log('Enviando token p/ server ...');
        setarTokenEnviadoParaOServer(true)
    } else {
        console.log('Token já no server');
    }
}


function tokenFoiEnviado() {
    return window.localStorage.getItem('enviadoParaOServer') === '1'
}


function setarTokenEnviadoParaOServer(sent) {
    window.localStorage.setItem('enviadoParaOServer', sent ? '1' : '0')
}

let newWorker;

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../serviceworker.js")
        .then(function(registration) {
            registration.addEventListener("updatefound", () => { // [B]
                // Uma atualização no Service Worker foi encontrada, instalando...
                newWorker = registration.installing; // [C]

                newWorker.addEventListener("statechange", () => {
                    // O estado do Service Worker mudou?
                    switch (newWorker.state) {
                        case "installed": {
                            // Existe um novo Service Worker disponível, mostra a notificação
                            if (navigator.serviceWorker.controller) {
                                newWorker.postMessage({ action: "skipWaiting" });
                                break;
                            }
                        }
                    }
                });
            });

            // SUCESSO - ServiceWorker Registrado
            console.log(
                "ServiceWorker registrado com sucesso no escopo: ",
                registration.scope
            );
        })
        .catch(function(err) {
            // ERRO - Falha ao registrar o ServiceWorker
            console.log("Falha ao registrar o ServiceWorker: ", err);
        });

    self.addEventListener("message", function(event) {
        if (event.data.action === "skipWaiting") {
            self.skipWaiting();
        }
    });

    let refreshing;

    // Esse evento será chamado quando o Service Worker for atualizado
    // Aqui estamos recarregando a página
    navigator.serviceWorker.addEventListener("controllerchange", function() {
        if (refreshing) {
            return;
        }
        window.location.reload();
        refreshing = true;
    });

    let deferredPrompt; // Allows to show the install prompt

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        checaNotificações();
    });

    function getRespondeuSobreInstalar() {
        return window.localStorage.getItem('respondeuSobreInstalar') === '1'
    }

    function setRespondeuSobreInstalar(sent) {
        window.localStorage.setItem('respondeuSobreInstalar', sent ? '1' : '0')
    }

    function respondeSobreInstalar(){
        setRespondeuSobreInstalar(false);
        checaNotificações();
    }

    function checaNotificações(){
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                if(!getRespondeuSobreInstalar()){
                    Swal.fire({
                        title: 'Agora o site do Altanews é um WebApp!',
                        text: "Você já aceitou nossas notificações, que tal instalar o app no seu celular? É muuuito levinho (~10mb) e você manterá sempre as informações há um clique de lê-las!",
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#8f8f8f',
                        confirmButtonText: 'Quero instalar!',
                        cancelButtonText: 'Não quero.'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setRespondeuSobreInstalar(false);
                            installApp();
                        }else{
                            setRespondeuSobreInstalar(true);
                        }
                    })
                }
            }else{
                Swal.fire({
                    title: 'Nosso site pode mandar notificações!',
                    text: "Quando o navegador perguntar, aceite as notificações!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#8f8f8f',
                    confirmButtonText: 'Aceito!',
                    cancelButtonText: 'Não aceito.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setRespondeuSobreInstalar(false);

                        Notification.requestPermission().then(function(permission) {
                            if(permission == "denied"){
                                Swal.fire({
                                    title: 'Erro',
                                    text: "Você já negou as notificações, para reativá-las clique no cadeado ao lado da URL, em seu navegador, selecione notificações e clique em 'Redefinir permissões'. Aí clique em 'instalar' logo no início de nossa página.",
                                    icon: 'info',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#8f8f8f',
                                    confirmButtonText: 'OK!',
                                    cancelButtonText: 'Cancelar'
                                })
                            }else{
                                Notification.requestPermission();
                            }
                        });
                    }else{
                        setRespondeuSobreInstalar(true);
                    }
                })
            }
        });
    }

    function installApp() {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA setup aceito');
                } else {
                    console.log('PWA setup rejeitado');
                }
                deferredPrompt = null;
            });
    }
}