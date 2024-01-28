const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJxY3VSbFI5dkxUaXA5d1VPSzJMNGkwenRvRG4zVUtzc2lENFA0RFBBck83aHFDWFVuViIsImp0aSI6IjE1NWQ2YzM1OWM2Y2NhN2YxZmRlMGE5OWM5MTM4NTE5MWJlNTU0NGZhYzlhNTIyY2UwMDAzMDU4YmY4ZmE1MWRkNWNkYjA0YjNhYWI5Nzc5IiwiaWF0IjoxNzA1ODU0MjY1LCJuYmYiOjE3MDU4NTQyNjUsImV4cCI6MTcwNTg1Nzg2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.sB7-HbpWbz1J5cNRwiQPkth-WX8IdzCeDPxcO4h11-0hXu3MrlJZPGeofGZMQa5-UzMeSVoGMBwq8MpwiDk01DE4upSVN9t52Op53wnu0Bj6tqDKLfs7Vu9vQOK1mpiHRLZQal3h6AkzYW-gzBTnDZ_NyHtE3MjIECzDH2TwhVVzJxCUugPc7ElmghSaZck3rzvyZFWAm8amxRAFwbram7qEcGs6P7vtT4Fl_5oKYtEtMHw9khtdcmQLhHXMxi8gvDoNu1j6vynPjomQDsxT1D6yCJeouSnJMiOuSEZjiUj4CP2u3QOf-M_rcM0dhtciSZe7JXEMkgBErT628ItIqA';
const api_url = 'https://api.petfinder.com/v2/animals?type=dog&limit=100&page=1';

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
        const allAnimals = data.animals;

        const animalList = document.getElementById('animals');

        if (allAnimals.length === 0) {
            animalList.innerHTML = '<p>Nenhum animal encontrado.</p>';
            return;
        }

        const shuffledAnimals = shuffleArray(allAnimals);

        animalList.classList.add('row-cols-1');

        const animalHTML = shuffledAnimals.slice(0, 3).map(animal => {
            const photoHTML = animal.photos.length > 0
                ? `<img src="${animal.photos[0].medium}" alt="${animal.name}" class="card-img-top">`
                : '<p class="no-image">SEM IMAGEM DISPONÍVEL</p>';
            return `<div class="col">
                        <div class="card shadow-sm">
                            <div style="height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                ${photoHTML}
                            </div>
                            <div class="card-body">
                                <p class="card-text">${animal.name} - ${animal.type}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary btn-saber-mais" data-animal-id="${animal.id}">Saber Mais</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }).join('');

        animalList.innerHTML = animalHTML;

        // Adicionando eventos de clique aos botões "Saber Mais"
        const btnSaberMaisList = document.querySelectorAll('.btn-saber-mais');
        btnSaberMaisList.forEach(btn => {
            btn.addEventListener('click', handleSaberMaisClick);
        });

    } catch (error) {
        console.error('Erro ao obter dados da API da Petfinder:', error.message);
    }
}

function handleSaberMaisClick(event) {
    const animalId = event.target.getAttribute('data-animal-id');
    // Redirecionar para a página de características do cão, passando o animalId como parâmetro
    window.location.href = `./detalhes_do_cao.html?id=${animalId}`;
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

document.addEventListener('DOMContentLoaded', function () {
    getAnimals();
});
