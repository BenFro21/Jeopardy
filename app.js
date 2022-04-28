// use class to make game show 
class Game {
    constructor(html, options={}){
    this.categoryIds = []//grab ids from api*/
    this.catagory = []
    this.clues = {}
    this.currentClue = null
    this.score = 0000

    }
    gameStart() {
        //Bind event handlers on gameboard/submit button 
        //render inital score to 0 
        // kick of fethcing of the catagories 
    }
    fetchCatagoies(){
        // fetch data from the api with a promise 

        // sift through the data and turn into json 

        //Build list of catagoies in an object with a question property set to an empty array 

        // Build a list of questions to plug into the category object 

        // create an id for each clue and add to our clue object 

        // render each catagory to the dom using another method 

    }
    buildBoard() {
        // Create a div split into colums and rows using css 

        // use data from fetchCatagories to append the div we create 
    }
    updateScore(){
        // Update the score if the user answers the question correctly 
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

// create game variable and iniate the new class of game 

//////////////BONUS///////////////////////////
// create a double jeopardy option 
// create a start and reset button 
// create a second player option 
