const questions = [
    {
        question : " The capital of Kerala is",
        optionA: " Thiruvananthapuram ",
        optionB: " Delhi",
        optionC: " Kochi ",
        optionD: " Trissur ",
        correctOption: "optionA"
    },

    {
        question: " Thiruvalluvar statue is how many feet ",
        optionA: " 131 ",
        optionB: " 132 ",
        optionC: " 133 ",
        optionD: " 134 ",
        correctOption: "optionB"
    },

    {
        question: " Southern tip of Peninsula in India is ",
        optionA: " Kochi ",
        optionB: " Madurai ",
        optionC: " Kanyakumari ",
        optionD: " Kerala ",
        correctOption: "optionC"
    },

    {
        question: "Vivekananda Rock memorial which was built in ",
        optionA: " 1916 ",
        optionB: " 1917 ",
        optionC: " 1918 ",
        optionD: " 1919 ",
        correctOption: "optionB"
    },

    {
        question: " During the British rule Kanyakumari was also called ",
        optionA: " Cape Comorin ",
        optionB: " Cape Comrin ",
        optionC: " Comrin Cape ",
        optionD: " CapeThe statue ",
        correctOption: "optionA"
    },

    {
        question: " Thiruvalluvar was club by sculptured by ",
        optionA: " Sanchi stupa ",
        optionB: " Ganapathy sthapati ",
        optionC: " Sathi Gujara ",
        optionD: "Choudhary ",
        correctOption: " optionB "
    },

    {
        question: " Build on the sea shore of Tamilnadu over looking the sea the speciality of idle is amman’s…can be see even  from the sea ",
        optionA: " earing ",
        optionB: " nosering ",
        optionC: " ring ",
        optionD: " chain ",
        correctOption: "optionB"
    },

    {
        question: " The sun rises on .. and sets in .. ",
        optionA: " Bay of Bengal, Indian Ocean ",
        optionB: " Arabian sea, Indian Ocean ",
        optionC: " Bay of Bengal,  Arabian sea ",
        optionD: " Indian Ocean, Indian Ocean ",
        correctOption: "optionC"
    },

    {
        question: " The meets of three ocean in Kanyakumari is also called as ",
        optionA: " Trivenisangamam ",
        optionB: " Triveni ",
        optionC: " Thiruvanmiyur ",
        optionD: " Teri Sara ",
        correctOption: "optionA"
    },

    {
        question: " Arabian sea ,bay of Bengal ,Indian ocean meets in ",
        optionA: " Kaveri ",
        optionB: "  Rameshwaram",
        optionC: " Kanyakumari ",
        optionD: " Tiruchendur ",
        correctOption: "optionC"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
