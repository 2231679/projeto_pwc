const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJxY3VSbFI5dkxUaXA5d1VPSzJMNGkwenRvRG4zVUtzc2lENFA0RFBBck83aHFDWFVuViIsImp0aSI6IjlhYzE0OTljNTU3YjljY2QyZTBiYWI0NWY0NGNiYzY3N2UzZGM1OTU1NzRlYTZhNDk3OGYwN2ViZTlmZGI2ZjE1ZGEzMWIwMDY4NzNiMzBkIiwiaWF0IjoxNzA1ODk3MTA0LCJuYmYiOjE3MDU4OTcxMDQsImV4cCI6MTcwNTkwMDcwNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.MZTocnatpfRMSKGvMQmsbwoVv0hdD1MC2_ZLk5MSUxwZCpBVf4sGcNoMdMGHAkCrZn2RjxZNzhPDWb4SCms-h0cdIMAGkymtWWGhreT9eBy_Oe8eOh_g7i7BO4GzlQoXD76vlqsDMVliJcU6GgVADNPt-uLKB3-BdsdggzCbBcr4EVDxt3UsGMx5qjOWOimGW8hlXzFt7AENy5lTBN_oL3rTRGqPxWaRbFlNKkCmKADgTit9_bOO2WL4iEuOaa09vmO4EfVP9JVIPd15znz8ijErAiwrX6C82b_pGZh80GhsylfKSmf2zmWR1IaqJ9DVP9jVIeb7XW1hT1BKnVA7CQ    '; // Substitua com a sua chave de API
const api_url = 'https://api.petfinder.com/v2/animals?type=dog&page=2';

async function getAnimals() {
    try {
        const response = await fetch(`${api_url}&include=photos`, {
            headers: {
                Authorization: `Bearer ${api_key}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao obter dados da API da Petfinder.');
        }

        const data = await response.json();
        const animals = data.animals;
        const animalList = document.getElementById('animals');

        if (animals.length === 0) {
            animalList.innerHTML = '<p>Nenhum animal encontrado.</p>';
            return;
        }

        const animalHTML = animals.map(animal => {
            const photoHTML = animal.photos.length > 0
                ? `<img src="${animal.photos[0].medium}" alt="${animal.name}" class="card-img-top">`
                : '<p class="no-image">SEM IMAGEM DISPONÍVEL</p>';
                
            return `<div class="col" style="height: 300px;">${createCard(animal.id, animal.name, animal.type, photoHTML)}</div>`;
        }).join('');

        animalList.innerHTML = animalHTML;

        // Adicionando eventos de clique aos botões "Saber Mais"
        const saberMaisButtons = document.querySelectorAll('.btn-saber-mais');
        saberMaisButtons.forEach(button => {
            button.addEventListener('click', handleSaberMaisClick);
        });

        // Adicionando eventos de clique aos botões "Favoritos"
        const FavoritosButtons = document.querySelectorAll('.btn-favoritos');
        FavoritosButtons.forEach(button => {
            button.addEventListener('click', handleFavoritosClick);
        });
    } catch (error) {
        console.error('Erro ao obter dados da API da Petfinder:', error.message);
    }
}

function createCard(animalId, name, type, photoHTML) {
    return `
        <div class="card shadow-sm" style="height: 100%;">
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                ${photoHTML}
            </div>
            <div class="card-body">
                <p class="card-text">${name} - ${type}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary btn-saber-mais" data-animal-id="${animalId}">Saber Mais</button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary btn-favoritos" data-animal-id="${animalId}">Favoritos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleSaberMaisClick(event) {
    const animalId = event.target.getAttribute('data-animal-id');
    // Redirecionar para a página de características do cão, passando o animalId como parâmetro
    window.location.href = `./detalhes_do_cao.html?id=${animalId}`;
}

function handleFavoritosClick(event) {
    const animalId = event.target.getAttribute('data-animal-id');
    const animalName = event.target.getAttribute('data-animal-name');
    const animalType = event.target.getAttribute('data-animal-type');
    const animalPhotoHTML = event.target.getAttribute('data-animal-photo');

    // Chamada para a função saveDogToLocalStorage
    saveDogToLocalStorage(animalId, animalName, animalType, animalPhotoHTML);


}

function saveDogToLocalStorage(animalId, name, type, photoHTML) {
    // Verificar se já há dados salvos
    const dogsLocalStorage = localStorage.getItem('dogs');

    // Se já existirem dados, atualize a lista; caso contrário, crie uma nova lista
    const favoriteDogs = dogsLocalStorage ? JSON.parse(dogsLocalStorage) : [];

    // Adicionar o novo cão à lista
    favoriteDogs.push({ animalId, name, type, photoHTML });

    // Salvar a lista atualizada de cães no armazenamento local
    localStorage.setItem('dogs', JSON.stringify(favoriteDogs));
}

getAnimals();
