// use class to make game show 
// Catigories from the api  
// Animals - 

class Game {
    constructor(html, options={}){
    this.useCategoryIds = [21, 49, 42, 780];//grab ids from api*/
    this.catagory = [];
    this.clues = {};

    this.currentClue = null;
    this.score = 0;

    this.gameBoard = html.querySelector('.gameBoard'); // Whole gameboard
    this.scoreCount = html.querySelector('.count'); // Score counter
    this.form = html.querySelector('form') //form hiding 
    this.input = html.querySelector('input[name=answer]'); // input from the user answer 
    this.modal = html.querySelector('.modal'); //Modal for hiding and showing 
    this.questionText = html.querySelector('.question'); // question h2 
    this.resultsDiv = html.querySelector('.results'); // the result div
    this.resultText = html.querySelector('.result-correct-answer'); // corrct answer p tag 
    this.correctResultText = html.querySelector('.result-correct'); // modal if you answer correctly 
    this.incorrectResult = html.querySelector('.result-incorrect'); // modal if you answer incorrectly 

    // console.log(this.gameBoard, this.scoreCount, this.form,this.input);
    // console.log(this.modal,this.questionText,this.results,this.resultText,this.correctResultText,this.incorrectResult);
    //     console.log(this)
    }
    gameStart() {
        //Bind event handlers on gameboard/submit button 
        //render inital score to 0 
        this.updateScore(0);
        // kick of fethcing of the catagories 
        this.fetchCategories();
    }
    fetchCategories(){
        // fetch data from the api with a promise 
        // sift through the data and turn into json 
        //Build list of catagoies in an object with a question property set to an empty array 
        // Build a list of questions to plug into the category object 
        // create an id for each clue and add to our clue object 
        // render each catagory to the dom using another method 
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
                    newCat.clues[clueID] = {
                        question: clue.question,
                        answer: clue.answer,
                        value: (index +1) * 200
                    }
                })
                this.catagory.push(newCat)
        });          
    }
    updateScore(change){
        this.score += change;
        this.scoreCount.textContent = this.score;
    }
    buildBoard() {
        // Create a div split into colums and rows using css 

        // use data from fetchCatagories to append the div we create 
    }

    questionClick(){
        // Mark question clicked as used 

        // clear out the input text 

        //update the question with the current question 

        //Update the text in the dom 

        // hide the results

        // show the question modal 
    }
    sumbitHandler(){

        // prevent deafualt 

        // create a isCorrect variable 

        // if statement on if the input from the user is the same as the questions answer

        // When answer is correct show corrct answer p tag 
    }
    cleanAnswer(){
        // clean up the input a user gives to handle capitlization/ spaces correctly 
    }
    answer(){
        // show correct or incorrect answer screens 

        // add a time out so the answer screen stays for a few seconds before moving on 

    }
}
const game = new Game(document.querySelector('.game'),{})
game.gameStart()

// console.log(game)
// create game variable and iniate the new class of game 


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
