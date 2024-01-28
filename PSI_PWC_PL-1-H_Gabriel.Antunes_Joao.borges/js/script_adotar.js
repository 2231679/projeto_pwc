
function enviarFormulario() {
    var nomeInput = document.getElementById("formcontrol_nome");
    var nomeValue = nomeInput.value.trim();

    var telefoneInput = document.getElementById("formcontrol_telefone");
    var telefoneValue = telefoneInput.value.trim();

    var emailInput = document.getElementById("formcontrol_email");
    var emailValue = emailInput.value.trim();

    var idadeInput = document.getElementById("formcontrol_idade");
    var idadeValue = parseInt(idadeInput.value, 10); // Converter para número inteiro

    var adultosInput = document.getElementById("quantidade_adultos");
    var adultosValue = parseInt(adultosInput.value, 10); 

    var horasInput = document.getElementById("horas_soziho_casa");
    var horasValue = parseInt(horasInput.value, 10); // Converter para número inteiro


    // Verificar se o nome tem pelo menos 3 letras
    if (nomeValue.length < 3) {
        // Exibir mensagem de erro para o nome
        alert("ERRO NA PERGUNTA DO NOME - Por favor, forneça um nome com pelo menos 3 letras.");
        // Impedir o envio do formulário
        return false;
    }

    // Verificar se o telefone tem exatamente 9 números
    if (!/^\d{9}$/.test(telefoneValue)) {
        // Exibir mensagem de erro para o telefone
        alert("ERRO NA PERGUNTA DO TELEFONE - Por favor, forneça um número de telefone válido com exatamente 9 números.");
        // Impedir o envio do formulário
        return false;
    }

    // Verificar se o e-mail é válido
    if (!isValidEmail(emailValue)) {
        // Exibir mensagem de erro para o e-mail
        alert("ERRO NO EMAIL - Por favor, forneça um endereço de e-mail válido.");
        // Impedir o envio do formulário
        return false;
    }

    // Verificar se a idade é maior ou igual a 18
    if (idadeValue < 18) {
        // Exibir mensagem de erro para a idade
        alert("ERRO NA PERGUTA DA IDADE - Você deve ter pelo menos 18 anos para se inscrever.");
        // Impedir o envio do formulário
        return false;
    }

    if (adultosValue < 0) {
        // Exibir mensagem de erro para a idade
        alert("ERRO NA PERGUNTA DE QUANTOS ADULTOS - Você deve introduzir um numero superior a zero.");
        // Impedir o envio do formulário
        return false;
    }

    if (horasValue < 0) {
        // Exibir mensagem de erro para a idade
        alert("ERRO NA PERGUNTA DAS HORAS - Você deve introduzir um numero superior a zero.");
        // Impedir o envio do formulário
        return false;
    }

    alert("FORMULÁRIO ENVIADO COM SUCESSO");

    // Continue com o envio do formulário se o nome, telefone, e-mail e idade forem válidos
    return true;
}

// Função para validar o formato do e-mail
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
