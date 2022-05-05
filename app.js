

class Game {
    constructor(html, options={}){
    this.useCategoryIds = [21, 49, 42, 780];
    this.catagory = [];
    this.clues = {};
    this.currentClue = null;
    this.score = 0;
    this.gameBoard = html.querySelector('.gameBoard'); 
    this.scoreCount = html.querySelector('.count');
    this.form = html.querySelector('form') 
    this.input = html.querySelector('input[name=answer]');
    this.modal = html.querySelector('.modal');
    this.questionText = html.querySelector('.question'); 
    this.resultsDiv = html.querySelector('.results'); 
    this.resultText = html.querySelector('.result-correct-answer');
    this.correctResultText = html.querySelector('.result-correct'); 
    this.incorrectResult = html.querySelector('.result-incorrect');
    }
    gameStart() {
        this.updateScore(0);
        this.fetchCategories();
        this.gameBoard.addEventListener('click', event => {
            if(event.target){
                this.handleQuestionClick(event)
            }
        })
        this.form.addEventListener("submit", e => {
            this.sumbitHandler(e)
        })
    }
    fetchCategories(){
        let fetchCats = [];
        this.useCategoryIds.forEach( category_id => {
             fetch(`https://jservice.io/api/category?id=${category_id}`)
                  .then(response => response.json())
                  .then(data => {
                      fetchCats.push(data)
                  })
                  .then(() => {
                     if(fetchCats.length === 4){
                        this.updateClues(fetchCats)

                     } 
                  }) 
                })
    }    
    updateClues(categories){
            categories.forEach((catagory, categoryIndex) => {
                let newCat = {
                    title: catagory.title,
                    clues: []
                }
                let clues = shuffle(catagory.clues).splice(0,5).forEach((clue, index) => {
                    let clueID = categoryIndex + "-" + index;
                    newCat.clues.push(clueID)
                    this.clues[clueID] = {
                        question: clue.question,
                        answer: clue.answer,
                        value: (index +1) * 200
                    }
                })
                this.catagory.push(newCat)
        });
        this.catagory.forEach(c => {
            this.buildBoard(c)
        })  
        console.log(this)        
    }
    updateScore(change){
        this.score += change;
        this.scoreCount.textContent = this.score;
    }
    buildBoard(category) {
        let column = document.createElement('div')
        column.classList.add('column')
        column.innerHTML  = (`<header>${category.title}</header><ul></ul>`)
        let ul = column.querySelector('ul')
        category.clues.forEach(clueId => {
            let clue = this.clues[clueId]
            ul.innerHTML += `<li><button dataset-clueId=${clueId}>${clue.value}</button></li>`
        })
        this.gameBoard.appendChild(column)
    }
    handleQuestionClick(event) {
    event.preventDefault()
    console.log('clicked', event)
    //   let clue = "";
        let clue = this.clues[event.target.attributes[0].textContent];
         event.target.classList.add('used');
         this.input.value ="";
         this.currentClue = clue;
         this.questionText.textContent = this.currentClue.question;
         this.resultText.textContent = this.currentClue.answer;
         this.modal.classList.remove("showing-result");
         this.modal.classList.add("visible");
         this.input.focus()
        console.log(clue)    
    }
    sumbitHandler(event){
        event.preventDefault();
        let isCorrect = this.input.value === this.currentClue.answer;
        if(isCorrect){
            this.updateScore(this.currentClue.value)
        }
        this.showAnswer(isCorrect)
    }
    showAnswer(isCorrect){
        this.correctResultText.style.display = isCorrect ? "block" : "none";
        this.incorrectResult.style.display = !isCorrect ? "block" : "none";
        this.modal.classList.add('showing-result');
        setTimeout(() => {
            this.modal.classList.remove('visible');
        }, 3000);

    }
    cleanAnswer(){
        // clean up the input a user gives to handle capitlization/ spaces correctly 
    }
}
const game = new Game(document.querySelector('.game'),{})
game.gameStart()


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//////////////BONUS///////////////////////////
// create a double jeopardy option 
// create a start and reset button 
// create a second player option 
