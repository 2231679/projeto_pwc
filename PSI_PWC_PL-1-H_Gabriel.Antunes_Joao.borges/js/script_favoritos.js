function displayFavoriteDogs() {
    // Verificar se há dados salvos
    var dogsLocalStorage = localStorage.getItem("dogs");

    if (dogsLocalStorage) {
        var favoriteDogs = JSON.parse(dogsLocalStorage);

        // Exibir os dados na página
        if (favoriteDogs.length > 0) {
            var dogsHTML = favoriteDogs.map(dog => `
                <div class="card shadow-sm" style="height: 100%;">
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        ${dog.photoHTML}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${dog.name} - ${dog.type}</p>
                        <div class="d-flex justify-content-between align-items-center">
    
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary btn-retirar-favoritos" data-animal-id="${dog.animalId}">Retirar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            document.getElementById("dogDetails").innerHTML = dogsHTML;
        } else {
            // Se não houver dados, exiba uma mensagem indicando que nenhum cão favorito foi encontrado.
            document.getElementById("dogDetails").innerHTML = "Nenhum cão favorito encontrado.";
        }
    } else {
        console.log("Nenhum dado de cão favorito encontrado no localStorage.");
    }
    var retirarFavoritosButtons = document.querySelectorAll('.btn-retirar-favoritos');
    retirarFavoritosButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            var animalId = event.target.getAttribute('data-animal-id');
            removeFromFavorites(animalId);
        });
    });
}

function removeFromFavorites(animalId) {
    // Verificar se há dados salvos
    var dogsLocalStorage = localStorage.getItem("dogs");

    if (dogsLocalStorage) {
        var favoriteDogs = JSON.parse(dogsLocalStorage);

        // Encontrar o índice do cão com base no animalId
        var indexToRemove = favoriteDogs.findIndex(dog => dog.animalId === animalId);

        // Se o cão estiver na lista, remova-o
        if (indexToRemove !== -1) {
            favoriteDogs.splice(indexToRemove, 1);

            // Atualizar a lista de favoritos no armazenamento local
            localStorage.setItem("dogs", JSON.stringify(favoriteDogs));

            // Atualizar a exibição dos cães favoritos
            displayFavoriteDogs();
        }
    } else {
        console.log("Nenhum dado de cão favorito encontrado no localStorage.");
    }
}

// Chame a função ao carregar a página
displayFavoriteDogs();