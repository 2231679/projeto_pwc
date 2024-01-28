function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Função para buscar os detalhes do cão com base no 'id'
async function getDogDetails() {
    const dogId = getParameterByName('id');

    // Simular uma chamada à API da Petfinder para obter detalhes do cão pelo ID
    const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJxY3VSbFI5dkxUaXA5d1VPSzJMNGkwenRvRG4zVUtzc2lENFA0RFBBck83aHFDWFVuViIsImp0aSI6ImEwODA1MjgyYjIwODg5ZTM3NWU0MTE1ZThjNTIxNmE1OTA5MjdiM2EzYjUxZDM3NmJmNDViMTMyYTc5ZWExNWE4YTRiYmRlMThmNjc3ZmQzIiwiaWF0IjoxNzA1ODg4MTg1LCJuYmYiOjE3MDU4ODgxODUsImV4cCI6MTcwNTg5MTc4NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.eLoHif1KIciVghzq-rhpkrZSzxnHODTVVBxBFQqleqCLGglsM78QlflJrjOgMpOjzG2QnHsdgFYTZymdbet1gGk-sfXrNmUzJ9oK83N13WoZ_h89lqiLenx-3_PGbwJqgqqUW14-dgiiS9RLcSuNQxkJHbcZJsfmMgCKLYOaWGwvB9NUYL7ao0ORtUbLRyRVTwwwDv1rwCjLl-qTeD9SOwhJlHkkjoiLBBaXQ5U8qm53HwdsqFnEqHK7ASjsZxkjZeqSgeJL6EGZR5nQWrR9pUe_XylgXE1pkjEf8xSHIs5Fy-yO4dgEhV37BD48QdbvY3EPJN2sV9iDNJW3DAvx_w"';
    const api_url = `https://api.petfinder.com/v2/animals/${dogId}`;

    
try {
    const response = await fetch(api_url, {
        headers: {
            Authorization: `Bearer ${api_key}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao obter dados da API da Petfinder.');
    }

    const data = await response.json();
    const dogDetails = data.animal;

    if (dogDetails.photos && dogDetails.photos.length > 0) {
        // Preencher a tabela com os detalhes obtidos
        const dogImage = document.getElementById('dogImage');
        dogImage.setAttribute('src', dogDetails.photos[0].medium);
        dogImage.setAttribute('alt', `Imagem de ${dogDetails.name}`);
        dogImage.style.width = '100%'; // Ajuste para fazer a imagem ocupar toda a largura disponível
        dogImage.style.height = 'auto'; // Mantenha a proporção original
    } else {
        console.error('Nenhuma foto disponível para este cão.');
    }

    // Preencher a tabela com os detalhes obtidos
    const fillTable = (elementId, value) => {
        const element = document.getElementById(elementId);
        element.textContent = value || 'SEM INFORMAÇÕES';
    };

    fillTable('dogName', dogDetails.name);
    fillTable('dogBreed', dogDetails.breeds.primary);
    fillTable('dogAge', dogDetails.age);
    fillTable('dogGender', dogDetails.gender);
    fillTable('dogSize', dogDetails.size);
    fillTable('dogColors', dogDetails.colors.primary);
    fillTable('dogTag', dogDetails.description);

    fillTable('contactEmail', dogDetails.contact.email);
    fillTable('contactPhone', dogDetails.contact.phone);

    const address = dogDetails.contact.address;
    const addressString = `${address.address1}, ${address.city}, ${address.state} ${address.postcode}, ${address.country}`;
    fillTable('contactAddress', addressString);

} catch (error) {
    console.error('Erro ao obter dados da API da Petfinder:', error.message);
}

}

// Chame a função ao carregar a página
document.addEventListener('DOMContentLoaded', getDogDetails);
