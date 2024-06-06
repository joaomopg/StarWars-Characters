let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards');
    };
    //Implementando a lógica da navegação a partir dos botões:

    const nextButton = document.getElementById('next-button');  
    const backButton = document.getElementById('back-button');  

    nextButton.addEventListener('click', loadNextPage()); //Método que monitora eventos e executa uma determinada ação quando esse evento ocorrer;
    backButton.addEventListener('click', loadPreviousPage());
};

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

            const characterNameBG = document.createElement('div');
            characterNameBG.className = 'character-name-bg';

            const characterName = document.createElement('span');
            characterName.className = 'character-name';
            characterName.innerHTML = `${characters.name}`;

            cardsCountain.appendChild(card);
            card.appendChild(characterNameBG);
            characterNameBG.appendChild(characterName);
        });

        const nextButton = document.getElementById('next-button');  
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;  
        backButton.disabled = !responseJson.previous; 

        backButton.style.visibility = responseJson.previous ? "visible": "hidden";

        currentPageUrl = url;

    } catch (error) {
        console.log(error);
        alert('Erro ao fazer a requisição')
    }
    
};

async function loadNextPage() {  
    if (!currentPageUrl) return;  

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);
        
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página')
    }
};

async function loadPreviousPage() {  
    if (!currentPageUrl) return;  

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);
        
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior')
    }
};