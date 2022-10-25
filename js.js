const nameChoice = document.getElementById('name');
const button1 = document.getElementById('play1');
const fullbody = document.getElementById('full_body');
const buttonName = document.getElementById('button_name');
const inputName = document.getElementById('input_name');
const text_weapons = document.getElementById('choose_text')
const player_name = document.getElementById('player_name')
const button = document.getElementById('play');
const general = document.getElementById('general');
const cancel = document.getElementById('only');
const stone = document.getElementById('card');
const paper = document.getElementById('card2');
const scissors = document.getElementById('card3');
const player = document.getElementById('fighter1');
const computer = document.getElementById('fighter2');
const all_players = document.getElementById('players');
const all_weapons = document.getElementById('left');
const score = document.getElementById('score');
const final_text = document.getElementById('final_text');
const titre = document.getElementById('entete');
const body = document.body;

let round_number = 1;
let player_score = 0;
let computer_score = 0;
var prenom = ""


// OPTIMISATION
function switch_visu (prop1, prop2){
    general.style.display = prop1;
    button1.textContent = prop2;
}

function visu_p (prop) {
    player.style.visibility = prop;
    computer.style.visibility = prop;
}

function visu_body (prop3, prop4){
    fullbody.style.display = prop3;
    nameChoice.style.display = prop4;
}

function manche (){
    switch_visu("flex", `Manche ${round_number}`);
    all_weapons.style.visibility = "visible";
    visu_p ("hidden")
    titre.style.visibility = 'hidden';
    cancel.style.display = 'unset';
}

// BOUTONS + FAIRE EVOLUER LA PARTIE

button.addEventListener('click', () => {
    visu_body('none', 'flex');
})

buttonName.addEventListener('click', () => {
    prenom = inputName.value;
    console.log(prenom)
    if (prenom===''){
        buttonName.textContent='Met ton putain de prénom !';
    } else {
    visu_body('contents', 'none');
    button.style.display='none';
    button1.style.display='unset';
    manche()
    text_weapons.textContent = `Allé ${prenom}, on choisit son arme bordel !`
    player_name.textContent = `${prenom}`
}
})

button1.addEventListener('click', () => {
    manche()
})

// STOPPER LE JEU
cancel.addEventListener('click', () => {
    location.reload();
})

// DEFINIR LE CHOIX DU JOUEUR + DE L'ORDI
function define_computer (){
    let computer_choice = Math.floor(Math.random()*3);
    switch(computer_choice){
        case 0: 
            computer.src = 'stone.png';
        break;
        case 1: 
            computer.src = 'toilet-paper.png';
        break;
        case 2: 
            computer.src = 'scissors.png';
        break;
    }
    all_players.style.visibility = "visible";
}

define_player = click_choice => {
    player.src = click_choice;
    visu_p ("visible");
    round_number++;
}

// DETERMINER QUI EST LE GAGNANT ET FAIRE SUIVRE LE PARTIE
function winner (){
if (player.src === computer.src){
    return;
} else {
    if(player.src.slice(22) === 'stone.png' && computer.src.slice(22) === 'toilet-paper.png' || 
        player.src.slice(22) === 'toilet-paper.png' && computer.src.slice(22) === 'scissors.png' ||
        player.src.slice(22) === 'scissors.png' && computer.src.slice(22) === 'stone.png') {
        computer_score+=1;
    } else {
        player_score+=1;
    }
}
score.textContent = `${player_score} - ${computer_score}`
}

function next_round(){
    all_weapons.style.visibility = "hidden";
    button1.textContent = 'Tour suivant';
}

function end(){
    if (player_score === 3){
        style_end('none', 'flex', `Félicitation ${prenom}, tu l'as vaincu !`)
    } else if (computer_score === 3) {
        style_end('none', 'flex', `Je le savais, tu n'es pas fait pour ce job.`)
    }
}

// FONCTION CLE 
function card_number (choice, picture) {
    choice.addEventListener('click', () => {
        define_player(picture);
        define_computer ();
        winner()
        next_round();
        end()
    })
    }
    
card_number(stone, 'stone.png')
card_number(paper, 'toilet-paper.png')
card_number(scissors, 'scissors.png')

// CLORE LA PARTIE
function style_end (gene_disp, text_disp, text){
    switch_visu(gene_disp, 'Nouvelle partie');
    final_text.style.display = text_disp;
    final_text.textContent = text;
    cancel.style.display = 'none';
    button1.addEventListener('click', () => {
        body.style.display='none'
        location.reload();
    })
}

// TOUT EST PARFAIT, DONC TEST DIRECT DU MERGE GIT