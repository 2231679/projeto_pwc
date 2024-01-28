// Função para adicionar um cão aos favoritos
function adicionarAosFavoritos(nomeCao) {
    // Verifica se o nome do cão já está nos favoritos
    const favoritos = obterFavoritos();
    if (!favoritos.includes(nomeCao)) {
        favoritos.push(nomeCao);
        salvarFavoritos(favoritos);
    }
}

// Função para remover um cão dos favoritos
function removerDosFavoritos(nomeCao) {
    const favoritos = obterFavoritos();
    const index = favoritos.indexOf(nomeCao);
    if (index !== -1) {
        favoritos.splice(index, 1);
        salvarFavoritos(favoritos);
    }
}

// Função para obter a lista de favoritos
function obterFavoritos() {
    const favoritos = localStorage.getItem('favoritos');
    return favoritos ? JSON.parse(favoritos) : [];
}

// Função para salvar a lista de favoritos
function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Função para exibir a lista de favoritos na página
function exibirFavoritos() {
    const favoritos = obterFavoritos();
    const listaFavoritos = document.getElementById('favoritos-list');

    listaFavoritos.innerHTML = '';

    favoritos.forEach(function (nomeCao) {
        const listItem = document.createElement('li');
        listItem.textContent = nomeCao;
        listaFavoritos.appendChild(listItem);
    });
}

// Chama a função para exibir a lista de favoritos na página
exibirFavoritos();
