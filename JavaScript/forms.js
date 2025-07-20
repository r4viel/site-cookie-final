document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pedidoForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(form);

    // Exibe uma mensagem de "enviando"
    responseMessage.style.display = 'block';
    // Reseta as classes de estado (sucesso/erro) para a aparência padrão
    responseMessage.className = 'message-box';
    responseMessage.textContent = 'Enviando seu pedido, aguarde... ⏳';

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // Essencial para o Formspree retornar uma resposta JSON
      }
    }).then(response => {
      if (response.ok) {
        // Sucesso!
        responseMessage.textContent = 'Pedido enviado com sucesso! ✅';
        responseMessage.classList.add('success');
        form.reset(); // Limpa o formulário
      } else {
        // Se o servidor responder com um erro (ex: validação do Formspree)
        response.json().then(data => {
          let errorMessage = 'Ocorreu um erro ao enviar o formulário. ❌';
          if (data && data.errors) {
            // Formata a mensagem de erro vinda do Formspree
            errorMessage = data.errors.map(error => error.message).join(', ');
          }
          responseMessage.textContent = `Falha ao enviar: ${errorMessage}`;
          responseMessage.classList.add('error');
        })
      }
    }).catch(error => {
      // Falha de rede ou outro erro que impeça a comunicação
      responseMessage.textContent = `Falha ao enviar: ${error.toString()} ❌`;
      responseMessage.classList.add('error');
      console.error('Formspree error:', error);
    }).finally(() => {
      // Esconde a mensagem de status após alguns segundos, seja em caso de sucesso ou falha
      setTimeout(() => {
        responseMessage.style.display = 'none';
      }, 7000);
    });
  });
});