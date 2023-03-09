// *********************************************************************
// How to write instructions:
// - myQuestions : list element [] containing all questions as JSON objects
// - Each question requires the following fields:
//     1. question: String containing the question itself
//     2. name: string with the input name for this question
//     3. type: Type of question (+ shows additional fields required):
//          - radio: multiple choice question. Options are presented vertically
//              + values (default: likertValues):    list with the value to be input for each possible answer (stored data)
//              + labels (default: likertScale):    list. In case you want to label the possible answers, 
//                                     you need to provide a list with one label per value
//          - radioH: multiple choice question. Options are presented horizontally
//              + values (default: likertValues):    list with the value to be input for each possible answer (stored data)
//              + labels (default: likertScale):    list. In case you want to label the possible answers, 
//                                     you need to provide a list with one label per value
//          - scale: bar scale (similar to radioH) with buttons instead of radio buttons
//              + values (default: likertValues):    list with the value to be input for each possible answer (stored data)
//              + limits (default: likertLimits):    list with the left and right extreme labels
//          - autocomplete: Text input with list to autocomplete
//              + list: list with possible options to autocomplete 
//          - shortOpen: Text input (one row to write)
//              + validate: function with str input. Returns true if answer is valid.
//              + invalidMessage: str explaining why form is invalid
//          - longOpen: Text input for long Text. (5 rows to write) 
//              + validate: function with str input. Returns true if answer is valid.
//              + invalidMessage: str explaining why form is invalid
// *********************************************************************

// *********************************************************************
// Add here any lists that you require for the questions
// Add here any validation function
// *********************************************************************
function validInt(str) {return (!isNaN(parseInt(str)))};

function validNum(input) {
    const num = Number(input);
    return !isNaN(num) && num >= 0 && num <= 1200;
}

function validEmail(input) {
    if (input.trim() === '') {
      // input is empty, return false
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regular expression, at least one character before @, at least one character between @ and ., at least one character after .
    return emailRegex.test(input);
  }

function validAge(str) {
    num = parseInt(str);
    return !isNaN(num) && (num>=16 && num<= 40);
}

// there was an error in Alejandro's code because
// his way of asking for age also allows strings.  I kept the error. lol

// function validAge(input) {
//     const num = Number(input);
//     return !isNaN(num) && (num>=16 && num<= 40);
// }

function validFollowers(str) {
    num = parseInt(str);
    return ((num>=0 && num<= 1000000000000) || (str=='x' || str=='X'));
}

const likertScale = [ 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
const likertValues = [1,2,3,4,5];
const ciusScale = [ 'Never', 'Seldom', 'Sometimes', 'Often', 'Very often'];
const ciusValues = [1,2,3,4,5];

const bisScale = [ 'Rarely/Never', 'Occasionally', 'Often', 'Almost Always/Always'];
const bisValues = [1,2,3,4]; 
const warningAutocomplete = 'Please select one item from the list';
const warningEmpty = 'Please do not leave this question unanswered';
const warningAge = 'Please provide a valid answer (number from 16 to 40). Do not include any letters :D';
const warningNum = 'Please provide a valid answer (number from 0 to 1200). Do not include any letters :D';
const warningFollowers = 'Please provide a valid answer (number or x)';
const warningEmail = 'Please provide a valid email address';

const ciusLimits = ['Never','Very often'];
const likertLimits = ['Strongly Disagree','Strongly Agree'];
const bisLimits = [ 'Rarely/Never', 'Almost Always/Always'];
const countries = ["My country is not listed", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


// *********************************************************************
// Add Your Questions here
// *********************************************************************

const firstQuestions = [
    {
        question: "Please provide your email for payment:",
        name: "Email",
        type: "shortOpen",
        validate: validEmail,
        invalidMessage: warningEmail,
    }, 
    {
        question: "What is your age?",
        name: "D1",
        type: "shortOpen",
        validate: validAge,
        invalidMessage: warningAge,
    },   
    {
        question: "Which gender do you identify the most with?",
        name: "D2",
        type: "radio",
        values: [1,2,3,4],
        labels: [
            "Female",
            "Male",
            "Other",
            "Prefer not to say"
        ]    
    },    
    {
        question: "What country do you live in?",
        name: "D3",
        type: "autocomplete",
        list: countries,
    },    
    {
        question: "What is your nationality?",
        name: "D4",
        type: "autocomplete",
        list: countries,
    },
    {
        question: "Have you ever participated in an incentivized economic experiment (such as this one) before?",
        name: "D5",
        type: "radio",
        values: [1,2,3],
        labels: ['Yes','No',"Not sure / don't remember"]
    },
    {
        question: "What do you think is the purpose of this study? Describe shortly in your own words.",
        name: "D6",
        type: "longOpen",
    },
    {
        question: "During the experiment, did you feel any particular emotion?",
        name: "D7",
        type: "longOpen",
    },
    {
        question: "Highest level of education obtained?",
        name: "D8",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['Primary education','High school or equivalent','Vocational school','Bachelors degree', 'Masters degree', 'Doctorate (e.g. PhD)', 'Other']
    },
    {
        question: "How often do you use social media?",
        name: "D9",
        type: "radio",
        values: [1,2,3,4,5,6],
        labels: ['Almost Constantly','Several times a day','About once a day','Several times a week', 'Less often', 'Never']
    },
    {
        question: "Please provide an estimate of how much time you normally spend on a day inside all social media platforms:",
        name: "D10",
        type: "radio",
        values: [1,2,3,4,5,6,7,8],
        labels: ['Less than 1h','1h-2h','2h-3h','3h-4h', '4h-5h', '5h-6h', '6h-7h', 'More than 7h']
    }, 
    {
        question: "If applicable, how many likes (or similar) do you typically get when you post on social media (e.g. Instagram, Twitter, Facebook, TikTok)?",
        name: "D11",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['I do not have any social media','1-10','11-100','101-500', '501-1000', '1001-5000', '5000+']
        
    }, 
    {
        question: "How many followers/friends/subscribers (or similar) do you have on Instagram?",
        name: "D12",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['I do not have this platform','1-10','11-100','101-500', '501-1000', '1001-5000', '5000+']
    }, 
    {
        question: "How many followers/friends/subscribers (or similar) do you have on Twitter?",
        name: "D13",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['I do not have this platform','1-10','11-100','101-500', '501-1000', '1001-5000', '5000+']
    }, 
    {
        question: "How many followers/friends/subscribers (or similar) do you have on TikTok?",
        name: "D14",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['I do not have this platform','1-10','11-100','101-500', '501-1000', '1001-5000', '5000+']
    }, 
    {
        question: "How many followers/friends/subscribers (or similar) do you have on Facebook?",
        name: "D15",
        type: "radio",
        values: [1,2,3,4,5,6,7],
        labels: ['I do not have this platform','1-10','11-100','101-500', '501-1000', '1001-5000', '5000+']
    }, 
    {
        question: "For the following questions, please answer each of these questions in terms of the way you generally feel. For each question simply state as honestly and candidly as you can what you are presently experiencing. Please Select '2' to show that you read these instructions.",
        name: "V1",
        type: "scale",
    },
];


// Add questionnaire questions in different orders

const IAS = [ 
    {
    question: "In general, I am a shy person.",
    name: "IAS1",
    type: "radio",
    values: [1,2,3,4,5],
    labels: ['Not at all characteristic of me', 'A little bit characteristic of me', 'Somewhat characteristic of me', 
    'Very much characteristic of me', 'Extremely characteristic of me']
    },
    {
    question: "I often feel nervous even in casual get- togethers.",
    name: "IAS2",
    type: "radio",
    values: [1,2,3,4,5],
    labels: ['Not at all characteristic of me', 'A little bit characteristic of me', 'Somewhat characteristic of me', 
    'Very much characteristic of me', 'Extremely characteristic of me']
    },
    {
    question: "I wish I had more confidence in social situations.",
    name: "IAS3",
    type: "radio",
    values: [1,2,3,4,5],
    labels: ['Not at all characteristic of me', 'A little bit characteristic of me', 'Somewhat characteristic of me', 
    'Very much characteristic of me', 'Extremely characteristic of me']
    },
]



const SMD = [ 
    {
    question: "During the past year, have you regularly found that you can't think of anything else but the moment that you will be able to use social media again?",
    name: "SMD1",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you regularly felt dissatisfied because you wanted to spend more time on social media?",
    name: "SMD2",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you often felt bad when you could not use social media?",
    name: "SMD3",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you tried to spend less time on social media, but failed?",
    name: "SMD4",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you regularly neglected other activities (e.g. hobbies, sport) because you wanted to use social media?",
    name: "SMD5",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, regularly lied to your parents or friends about the amount of time you spend on social media?",
    name: "SMD6",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you regularly had arguments with others because of your social media use?",
    name: "SMD7",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, have you often used social media to escape from negative feelings?",
    name: "SMD8",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
    {
    question: "During the past year, had serious conflict with your parents, brother(s) or sister(s) because of your social media use?",
    name: "SMD9",
    type: "radio",
    values: [1,2],
    labels: ['Yes', 'No']
    },
];

// People differ in the ways they act and think in different situations.
// This is a test to measure some of the ways in which you act and think.
// Read each statement and select an appropriate answer.
// Do not spend too much time on any statement. Answer quickly and honestly.

const shuffleQuestions = [ 
    {
        question: "How often do you find it difficult to stop using social media when you are online?",
        name: "CIUS1",
        type: "scale",
    },
    {
        question: "How often do you continue to use social media despite your intention to stop? Do others (e.g. partner, children, parents) say you should use social media less?",
        name: "CIUS2",
        type: "scale",
    },
    {
        question: "How often do you neglect your daily obligations (work, school, or family life) because you prefer to go on social media?",
        name: "CIUS3",
        type: "scale",
    },
    {
        question: "How often are you short on sleep because of social media?",
        name: "CIUS4",
        type: "scale",
    },
    {
        question: "How often do you rush through your (home) work in order to go on social media?",
        name: "CIUS5",
        type: "scale",
    },
    {
        question: "How often do you prefer to use social media instead of spending time with others (e.g. partner, children, parents)?",
        name: "CIUS6",
        type: "scale",
    },
    {
        question: "How often do you think you should use social media less often?",
        name: "CIUS7",
        type: "scale",
    },
    {
        question: "How often do you think about social media, even when not online?",
        name: "CIUS8",
        type: "scale",
    },
    {
        question: "How often have you unsuccessfully tried to spend less time on social media?",
        name: "CIUS9",
        type: "scale",
    },
    {
        question: "How often do you feel restless, frustrated, or irritated when you cannot use social media?",
        name: "CIUS10",
        type: "scale",
    },
    {
        question: "How often do you go on social media when you are feeling down?",
        name: "CIUS11",
        type: "scale",
    },
    {
        question: "How often do you use social media to escape from your sorrows or get relief from negative feelings?",
        name: "CIUS12",
        type: "scale",
    },
    {
        question: "How often do you look forward to you going on social media soon?",
        name: "CIUS13",
        type: "scale",
    },
    {
        question: "To receive payment, Select '4'.",
        name: "V2",
        type: "scale",
    },    
    {
        question: "To show you are paying attention, please select '1'.",
        name: "V3",
        type: "scale",
    },    
];
  



// *********************************************************************
// YOU DO NOT NEED TO MODIFY ANYTHING BELOW THIS POINT. 
// *********************************************************************

// Dynamic variables
var slideIndex = 0;

// Constants and Scales
const myQuestions = firstQuestions.concat(shuffleArray(shuffleQuestions), shuffleArray(IAS)); // This might not work
const maxQ  = myQuestions.length;
const height = 70;
const width = 80;

const BackButtonProps = [
    {
        sName: 'type',
        sProperty: 'button',
    },
    {
        sName: 'class',
        sProperty: 'button QT-Back',
    },
    {
        sName: 'onclick',
        sProperty: `backSlide()`,
    },
];

const FinalButtonProps = [
    {
        sName: 'class',
        sProperty: 'button QT-Next',
    },
];



// Initialize
document.addEventListener("DOMContentLoaded", function() {

    // Create Slides
    let divAnswers = document.getElementById('final-answers');
    let counter = 0;
    myQuestions.forEach(question => { 
        // Create slide
        let slide = new QuestionSlide(counter,question);
        counter++;
        slide.printSlide();
        // Create input
        let input   = document.createElement('input');
        input.type  = 'hidden';
        input.value = '';
        input.name  = question.name;
        input.id    = question.name;
        divAnswers.appendChild(input);
        // Add autocomplete if necessary
        if (question.type==='autocomplete') {
                autocomplete(document.getElementById(`answer-${question.name}`), question.list);
        }
    });
    // prevent submitting the questionnaire if user click "Enter"
    $(document).ready(function () {
        $(window).keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    });

    // Show first slide
    showSlides(slideIndex);
});

// Define Class: QuestionSlides
function QuestionSlide(iNumber, jsonQuestion) {
        this.iSlideNumber = iNumber;
        this.Question = jsonQuestion;
};

QuestionSlide.prototype.printSlide = function() {
    // Create Slide
    let slideQuestion = document.createElement('div');
    slideQuestion.className = 'question-slide fade';
    slideQuestion.id = `slide-${this.Question.name}`;
    // Create Question
    let pQuestion = document.createElement('p');
    pQuestion.className = 'question';
    pQuestion.innerHTML = this.Question.question;
    slideQuestion.appendChild(pQuestion);
    // Depending on input type, create inputs accordingly
    if (this.Question.type==='radio' || this.Question.type==='radioH' || this.Question.type==='radioFig') {
        // 1. Radio or RadioHorizontal
        let div = writeRadio(this.Question);
        slideQuestion.appendChild(div);
    } else if ( this.Question.type==='scale' ) {
        let div = writeScale(this.Question);
        slideQuestion.appendChild(div);
    } else if (this.Question.type==='longOpen') {
        // Div container for input and Next Button
        let div     = document.createElement('div');
        div.className = 'div-input-text';
        // Create input
        let input   = document.createElement('textarea');
        input.rows  = '5';
        input.type  = 'text';
        input.className = 'input-text';
        input.name  = `answer-${this.Question.name}`;
        input.id    = `answer-${this.Question.name}`;
        input.cols  = '50';
        // Create next button
        let NextButton = writeNextButton(this.Question.name);
        // Nest elements and append them to html
        div.appendChild(input);
        div.innerHTML += NextButton;
        slideQuestion.appendChild(div);
        // Create warning message
        if (typeof this.Question.validate==='function') {
            let errorMessage = document.createElement('div');
            errorMessage.className = 'error-message fade';
            errorMessage.id = `warning-${this.Question.name}`;
            errorMessage.style.visibility = 'hidden';
            if (typeof this.Question.invalidMessage==='string') {
                errorMessage.innerHTML = invalidMessage;
            } else {
                errorMessage.innerHTML = 'Please enter a valid answer'
            }    
            slideQuestion.appendChild(errorMessage);
        }    
    
    } else if ( this.Question.type==='shortOpen' || this.Question.type==='autocomplete') {
        // Div container for input and Next Button
        let div     = document.createElement('div');
        div.className = 'div-input-text';
        // Create input
        let input   = document.createElement('input');
        input.type  = 'text';
        input.name  = `answer-${this.Question.name}`;
        input.id    = `answer-${this.Question.name}`;
        input.className = 'input-text';
        input.rows = '1';
        input.cols  = '50';
        input.placeholder = 'Type here...'
        // Add autocomplete
        if (this.Question.type ==='autocomplete') {
            input.className = 'autocomplete';
        }
        // Create wrapping form
        let form   = document.createElement('form');
        form.autocomplete  = 'off';
        form.action  = '/action_page.php';
        // Create next button
        let NextButton = writeNextButton(this.Question.name);
        // Nest elements and append them to html
        form.appendChild(input);
        div.appendChild(form);
        div.innerHTML += NextButton;
        slideQuestion.appendChild(div);
        // Create warning message
        if (typeof this.Question.validate==='function') {
            let errorMessage = document.createElement('div');
            errorMessage.className = 'error-message fade';
            errorMessage.id = `warning-${this.Question.name}`;
            errorMessage.style.visibility = 'hidden';
            if (typeof this.Question.invalidMessage==='string') {
                errorMessage.innerHTML = this.Question.invalidMessage;
            } else {
                errorMessage.innerHTML = 'Please enter a valid answer'
            }
            slideQuestion.appendChild(errorMessage);
        } else if (this.Question.type ==='autocomplete') {
            let errorMessage = document.createElement('div');
            errorMessage.className = 'error-message fade';
            errorMessage.id = `warning-${this.Question.name}`;
            errorMessage.style.visibility = 'hidden';
            errorMessage.innerHTML = warningAutocomplete;
            slideQuestion.appendChild(errorMessage);
        } 
    } else if (this.Question.type==='final') {
        let ContinueButton = writeTag('button','Continue',FinalButtonProps);
        slideQuestion.innerHTML += ContinueButton;
    }

    // Create back button

    let BackButton = writeTag('button','Back',BackButtonProps);
    // let BackButton = `<button type="button" class="button QT-Back" onclick="backSlide()" > Back </button>`
    // Create progress bar
    let progBar = writeProgBar(this.iSlideNumber)
    // Add Button and ProgressBar
    if (this.iSlideNumber>0) {slideQuestion.innerHTML+=BackButton};
    slideQuestion.innerHTML+= progBar;
    container = document.getElementsByClassName('element-container')[0];
    container.appendChild(slideQuestion);

};
// *********************************************************************
// Function Name:   writeRadio(Question)
// Functionality:
//                  1. writes the labels contianing radio inputs
//                  2. Joins all inputs in one div
//
// input:           sQuestion, string with the question name
//                  
// returns:         string with the html line
// ********************************************************************
function writeRadio(Question) {
    // Create div for inputs
    let div = document.createElement('div');
    div.className = `div-input-${Question.type}`;
    // Check if values and labels are predetermined
    let values = [];
    let labels = [];
    if (typeof Question.values === 'undefined' || Question.values === null) {
        values = ciusValues; //previously bisValues
        labels = ciusScale; // previously bisScale
    } else {
        values = Question.values
        // Check if labels for the values exist
        if (typeof Question.labels === 'undefined' || Question.labels === null) {
            labels = Question.values; 
        } else {
            labels = Question.labels;
        }
    }
    // Check that labels and values have the same length
    if (labels.length != values.length) {
        console.log(`Question ${Question.name}: Dimensions of labels and values do not match`)
    };
    // Write inputs within div
    for (let i=0; i<values.length; i++) {
        // create input (for some reason I could not add the onclick command via js, so I input this as html)
        let input = "";
        if (Question.type==='radio') {
            input = `<label class="QT-${Question.type}"> 
            <input type="radio" class="answer-${Question.name}" id="answer-${Question.name}-${i}" onclick="nextSlide('${Question.name}', '${values[i]}')"> 
            ${labels[i]} </label>`;
        } else if (Question.type==='radioH') {
            input = `<label class="QT-${Question.type}">  ${labels[i]}
            <input type="radio" class="answer-${Question.name}" id="answer-${Question.name}-${i}" onclick="nextSlide('${Question.name}', '${values[i]}')"> 
                </label>`;
        } else if (Question.type==='radioFig') {
            input = `<button type="button" class="img-button" onclick="nextSlide('${Question.name}', '${values[i]}')"> 
                    <img class="mini-graph" src="${labels[i]}"> </button>` ;
        }
        div.innerHTML +=input;
    }

    return div; 
}

// *********************************************************************
// Function Name:   writeScale(Question)
// Functionality:
//                  1. the html code for a Scale question
//                  2. puts all necessary elements within a div
//
// input:           Question: Question object from myQuestions
//                  
// returns:         div with necessary elements
// ********************************************************************
function writeScale(Question) {
    // Check if values and limits are predetermined
    let values = [];
    let limits = [];
    if (typeof Question.values === 'undefined' || Question.values === null) {
        values = ciusValues; //previously ciusValues
        limits = ciusLimits; 
    } else {
        values = Question.values;
        limits = Question.limits; 
    };
    // Create input container
    let div = document.createElement('div');
    div.className = `div-input div-input-${Question.type}`;
    // Add Left extreme of scale
    div.innerHTML = `<label class="limit_left"> ${limits[0]} </label> `;
    
    // Add Buttons
    for (i=0;i<values.length;i++) {
        let lProps = [
            {
                sName: 'class',
                sProperty: 'ScaleButton',
            },
            {
                sName: 'type',
                sProperty: 'button',
            },
            {
                sName: 'onclick',
                sProperty: `nextSlide('${Question.name}',sValue='${values[i]}')`
            }
        ];
        div.innerHTML += writeTag('button',values[i],lProps);
    };
    div.innerHTML +=  ` <label class="limit_right"> ${limits[1]} </label>`;
    return div;
}

// *********************************************************************
// Function Name:   writeNextButton('sQuestion')
// Functionality:
//                  1. writes a Tag for the Next button, and adds the functions specific to sQuestions' name
//
// input:           sQuestion, string with the question name
//                  
// returns:         string with the html line
// ********************************************************************
function writeNextButton(sQuestion) {
    let NextButtonProps = [
        {
            sName: 'type',
            sProperty: 'button',
        },
        {
            sName: 'class',
            sProperty: 'button QT-Next',
        },
        {
            sName: 'onclick',
            sProperty: `nextSlide('${sQuestion}')`,
        },
    ];

    return writeTag('button','Next',NextButtonProps);
}


// *********************************************************************
// Function Name:   writeProgBar()
// Functionality:
//                  1. writes a Tag with the specified requirements
//
// input:           sTag: Tag for the input (default: div)
//                  sInnerHTML: content inside (default: "")
//                  lAttr : list of object with all attributes. 
//                      - sName: string with the name of the attribute
//                      - sProperty: string with properties
//                  
// returns:         string with the html line
// ********************************************************************
function writeProgBar(slide) {
    return `<div class="pbar-container"> <label> 0% </label>
    <progress class="progress-bar" min="0" max="${maxQ}" value="${slide+1}"></progress>
                        <label> 100% </label> </div>`
}

// *********************************************************************
// Function Name:   writeTag()
// Functionality:
//                  1. writes a Tag with the specified requirements
//
// input:           sTag: Tag for the input (default: div)
//                  sInnerHTML: content inside (default: "")
//                  lAttr : list of object with all attributes. 
//                      - sName: string with the name of the attribute
//                      - sProperty: string with properties
//                  
// returns:         string with the html line
// ********************************************************************
function writeTag(sTag,sInnerHTML,lAttr) {
    str = `<${sTag}`;
    lAttr.forEach(elem => {
        str += ` ${elem.sName}="${elem.sProperty}"`;
    }); 
    str += `> ${sInnerHTML} </${sTag}>`;
    return str;
}

// *********************************************************************
// Function Name:   backSlide
// Functionality:
//                  1. Checks if question is answered, clears it
//                  2. Goes to the previous slide
//
// input:           null
// returns:         void
// ********************************************************************

function backSlide() {
    // uncheck answer current question
    checkAnswer(true);
    // go to previous slide
    plusSlides(-1);
    // uncheck answer previous question
    checkAnswer(true);

}



// *********************************************************************
// Function Name:   nextSlide
// Functionality:
//                  1. Checks if question is answered
//                      and adds it to the inputs
//                  2. Goes to next slide
//
// input:           sQuestionName : name of the question
//                  sValue: (default="")
// returns:         void
// ********************************************************************

function nextSlide(sQuestionName,sValue="") {
   
    if (checkAnswer()) {
        let input = document.getElementById(sQuestionName);
        if (sValue==="") {
            // Retrieve answer from forms
            let answer = document.getElementById(`answer-${sQuestionName}`).value;
            input.value =  answer;
        } else {
            input.value = sValue;
        }
    // go to next slide
    plusSlides(1);
    } else {
        let warning = document.getElementById(`warning-${sQuestionName}`);
        warning.style.visibility = 'visible';
    }

}


// *********************************************************************
// Function Name:   checkAnswer
// Functionality:
//                  1. Checks if question is answered
//                  2. In case it's needed, cleans it
//
// input:           iSlideNumber:   slide number from myQuestions
//                  bClean:         Boolean, empties answer if true
// returns:         true, if questions has been answered
//                  false, if question is empty
// ********************************************************************

function checkAnswer(bClean=false) {
    let Question = myQuestions[slideIndex];
    let qType = Question.type;
    if (qType==='radio' || qType==='radioH' ) {
        let inputs = document.getElementsByClassName(`answer-${Question.name}`);
        if (bClean) { 
            console.log(`Question ${Question.name} cleared`);
            for (let i = 0; i<Question.values.length; i++) {
                inputs[i].checked = false;
            }
            return false
        } else {
            let bAnswered = false;
            for (let i = 0; i<Question.values.length; i++) {
                if (inputs[i].checked == true) {bAnswered=true}
            }
            return bAnswered;
        };
    } else if (qType === 'longOpen'|| qType === 'shortOpen'|| qType === 'autocomplete') {
        // clean input if needed
        let input = document.getElementById(`answer-${Question.name}`);
        if (bClean) {
            console.log(`Question ${Question.name} cleaned`);
            input.value = ""
        }
        // Check if question needs to be validated:
        if (qType==='autocomplete') {
            return Question.list.includes(input.value);
        } else if (typeof Question.validate==="function" ) {
            // if required function
            return Question.validate(input.value);
        } else {
            // if no requirement, return true
            return true;
        }
    } else if (qType === 'scale' || qType === 'radioFig') {return true}; // These inputs have nothing to be cleared
}

// *********************************************************************
// Function Name:   plusSlides
// Functionality:   
//                  1. Changes slide index by adding n
//                  2. Shows slide SlideIndex+n 
//
// Source: https://www.w3schools.com/howto/howto_js_slideshow.asp
//
// input:           n: Number of slides to be skipped
//
// returns:         void
// *********************************************************************

// Advance a slide
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// *********************************************************************
// Function Name:   currentSlide
// Functionality:   
//                  1. Changes slide index to n
//                  2. Shows slide n 
//
// Source: https://www.w3schools.com/howto/howto_js_slideshow.asp
//
// input:           n: Number of slides to be skipped
//
// returns:         void
// *********************************************************************


// Show current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// *********************************************************************
// Function Name:   showSlides
// Functionality:   Display current slide, hide the rest
// Source: https://www.w3schools.com/howto/howto_js_slideshow.asp
//
// input:           n: Slide number to be shown
// returns:         void
// ********************************************************************
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("question-slide");
    // Go back when reaching the end
    if (n >= slides.length) {
        document.getElementById('final-button').click();
    } 
    // Avoid negative slide counter
    if (n < 1) {0};
  
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex].style.display = "flex";  
  
  }
// *********************************************************************
// Function Name:   autocomplete
// Functionality:   Create autocomplete for text inputs
// Source: https://www.w3schools.com/howto/howto_js_autocomplete.asp
// input:           inp: HTML object, input that needs autocomplete
//                  arr: array of autocomplete options
// returns:         void
// ********************************************************************

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// *********************************************************************
// Function Name:   shuffleArray()
// Functionality:   shuffles an array 
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// input:           array
// returns:         array, shuffled
// ********************************************************************


function shuffleArray(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

