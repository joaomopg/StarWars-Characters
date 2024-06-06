let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards')
    }

    const nextButton = document.getElementById('next-button');  
    const backButton = document.getElementById('back-button');  

    nextButton.addEventListener('click', loadNextPage); //Método que monitora eventos e executa uma determinada ação quando esse evento ocorrer;
    backButton.addEventListener('click', loadPreviousPage);
}

async function loadCharacters(url){
    const cardsCountain = document.getElementById('cards-countain');
    cardsCountain.innerHTML = '';  //Limpando os resultados anteriores;

    try {
        const response = await fetch(url);
        const responseJson = await response.json();  

        responseJson.results.forEach((characters) => {  //Iterando sobre cada elemento do array, que representam um personagem específico;
            const card = document.createElement('div');  
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace(/\D/g, "")}.jpg')`;
            card.className = 'card';

            const button = document.createElement('button');
            button.type = "button";
            button.className = 'button-cards';
            button.innerText = `${characters.name}`;

            cardsCountain.appendChild(card);
            card.appendChild(button);

            button.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = "visible";

                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                const characterImage = document.createElement('div');
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace(/\D/g, "")}.jpg')`;      
                characterImage.className = 'character-image';
                
                const characterName = document.createElement('span');
                characterName.className = 'character-details';
                characterName.innerText = `Nome: ${characters.name}`;

                const characterHeight = document.createElement('span');
                characterHeight.className = 'character-details';
                characterHeight.innerText = `Altura: ${convertHeight(characters.height)}`;

                const characterMass = document.createElement('span');
                characterMass.className = 'character-details';
                characterMass.innerText = `Peso: ${convertMass(characters.mass)}`;

                const skinColor = document.createElement('span');
                skinColor.className = 'character-details';
                skinColor.innerHTML = `Cor do corpo: ${characters.skin_color}`

                const characterEyeColor = document.createElement('span');
                characterEyeColor.className = 'character-details';
                characterEyeColor.innerText = `Cor dos olhos: ${convertEyeColor(characters.eye_color)}`;

                const characterBirthYear = document.createElement('span');
                characterBirthYear.className = 'character-details';
                characterBirthYear.innerText = `Nascimento: ${characters.birth_year}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(characterName);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(characterMass);
                modalContent.appendChild(skinColor);
                modalContent.appendChild(characterEyeColor);
                modalContent.appendChild(characterBirthYear);
            }
            
        });

        const nextButton = document.getElementById('next-button');  
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;  
        backButton.disabled = !responseJson.previous; 

        backButton.style.visibility = responseJson.previous ? "visible": "hidden";

        currentPageUrl = url;

    } catch (error) {
        console.log(error);
        alert('Erro ao fazer a requisição');
    }
    
}

async function loadNextPage() {  
    if (!currentPageUrl) return;  

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);
        
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {  
    if (!currentPageUrl) return;  

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);
        
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}
function hideModal(){
    const modal = document.getElementById('modal');
    modal.style.visibility = "hidden";
}

function convertEyeColor(characterEyeColor){
    const cores = {
        blue: "azul",
        yellow: "amarelo",
        red: "vermelho",
        brown: "castanho",
        green: "verde",
        orange: "laranja",
        hazel: "avela",
        black: "preto",
        pink: "rosa",
        unknown: "desconhecida"
    };
    return cores[characterEyeColor.toLowerCase()] || characterEyeColor; 
}
// Ela vai retornar um determinado valor da constante se, no parâmetro em questão, estiver alguma informação que consta dentro do objeto.
//Se no parâmetro que representa o span, eu tiver alguma informação que está presente no objeto, eu vou retornar um determinado valor.
function convertHeight (characterHeight){
    if (characterHeight <= 500) {
        return `${(characterHeight/100).toFixed(2)}`;
    } else if (characterHeight === unknown){
        return "desconhecida";
    }
}

function convertMass (characterMass) {
    if (characterMass <= 300) {
        return `${characterMass} kg`
    } else (characterMass === "unknown") 
        return "desconhecido";
}

function convertBirthYear (characterBirthYear) {
    if (characterBirthYear === "unknown") {
        return `desconhecido`
    } 

    return characterBirthYear
}