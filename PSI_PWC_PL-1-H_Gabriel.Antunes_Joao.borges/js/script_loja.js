document.addEventListener('DOMContentLoaded', function () {
    // Função para lidar com o clique no botão "Comprar"
    function comprarItem(nomeItem, quantidade) {
      // Verifica se a quantidade é válida (maior que zero)
      if (quantidade > 0) {
        // Aqui você pode adicionar lógica para adicionar o item ao carrinho ou processar a compra
        // Por enquanto, vamos apenas exibir um alerta como exemplo
        alert(`Item adicionado ao carrinho:\n${quantidade}x ${nomeItem}`);
      } else {
        // Exibe uma mensagem se a quantidade não for válida
        alert('Por favor, insira uma quantidade válida.');
      }
    }

    // Adiciona eventos de clique aos botões "Comprar"
    function adicionarEventosBotoesComprar() {
      const botoesComprar = document.querySelectorAll('.btn-comprar');

      botoesComprar.forEach((botao) => {
        botao.addEventListener('click', function () {
          const card = this.closest('.card');
          const nomeItem = card.querySelector('.custom_text').textContent;
          const quantidade = card.querySelector('.form-control').value || 1;

          comprarItem(nomeItem, quantidade);
        });
      });
    }

    // Chama a função para adicionar eventos quando o DOM estiver carregado
    adicionarEventosBotoesComprar();
});