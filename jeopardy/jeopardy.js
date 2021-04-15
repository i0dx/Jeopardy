let jService = "http://jservice.io/api/";
const sampleSize = 6;
let test;
// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
//total of 18407 categories
async function getCategoryIds() {
    let randOffset = Math.floor(Math.random() * (18407 - sampleSize)); //effective range 
    let catIds = await axios.get("http://jservice.io/api/categories", {params:{ //dynamic way fith the config and param objects
        count: sampleSize,
        offset: randOffset,
    }});
    let catIdArray = catIds.data.map(function(val){ //retrieves all id's and puts them in array
        return val.id;                              //rewrite within return?
    });

    return catIdArray;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) { //accepts a singular integer corresponding to the id of a category
    let category = await axios.get(`http://jservice.io/api/category?id=${catId}`) //short way with template literals

    return {
        title: category.data.title,
        clues: category.data.clues,
    }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    $("thead").empty();

    categories.forEach((val, idx) => {
        $("#game-board thead").append($(`<th class="category-${idx + 1}">${val.title}</th>`));
    });
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    let catId = await getCategoryIds();
    categories = catId.map(async function(val){
        await getCategory(val);
    });
    

    fillTable(categories);
}

/** On click of start / restart button, set up game. */
$("#new-game").on("click", function(evt){
    console.log("h");
    setupAndStart();
})

/** On page load, add event handler for clicking clues */
$("#jZone .clue-box").on("click", function(evt){
    handleClick();
})
