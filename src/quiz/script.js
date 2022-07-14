let questionImage = document.getElementById("questionImage");
let optionButtons = document.getElementsByClassName("option");
let correct = document.getElementById("correct");
let wrong = document.getElementById("wrong");
let rateP = document.getElementById("rate");

let molecules = [
    {
        name: "3-metil-4-metil-hexino",
        image: "../assets/images/3-metil-4-metil-hexino.png",
    }, {
        name: "ciclohexano",
        image: "../assets/images/ciclohexano.png",
    }, {
        name: "eteno",
        image: "../assets/images/eteno.png",
    }, {
        name: "isooctano",
        image: "../assets/images/isooctano.png",
    }, {
        name: "isopreno",
        image: "../assets/images/isopreno.jpg",
    }, {
        name: "naftaleno",
        image: "../assets/images/naftaleno.png",
    }, {
        name: "octano",
        image: "../assets/images/octano.png",
    }, {
        name: "para-meti-isopropil-benzeno",
        image: "../assets/images/para-meti-isopropil-benzeno.png",
    }, {
        name: "pent-2-eno",
        image: "../assets/images/pent-2-eno.png",
    }, {
        name: "tolueno",
        image: "../assets/images/tolueno.png",
    },
]

let correctMolecule = null
var questionOptions = []
var results = {
    correct: 0,
    wrong: 0,
    correctRate: () => Number(results.correct) / (results.correct + results.wrong)
}


function generateQuestionOptions() {
    questionOptions = []
    let correctMoleculeIndex = Math.floor(Math.random() * molecules.length);
    correctMolecule = molecules[correctMoleculeIndex];
    questionOptions.push(correctMolecule)
    for (let i = 0; i < 4; i++) {
        let wrongMoleculeIndex = Math.floor(Math.random() * molecules.length);
        if (
            wrongMoleculeIndex != correctMoleculeIndex
            && questionOptions.every(qo => qo.name != molecules[wrongMoleculeIndex].name)
        ) {
            questionOptions.push(molecules[wrongMoleculeIndex]);
        } else {
            i--;
        }
    }
    questionOptions = questionOptions.sort((a, b) => 0.5 - Math.random());
}

function setQuestionOptions() {
    // if (checkValidImage(correctMolecule.image)) {
    questionImage.src = correctMolecule.image;
    questionImage.style.objectFit = 'contain'
    // }else{
    //     questionImage.src = "https://greenvolt.com.br/wp-content/uploads/2018/05/ef3-placeholder-image.jpg";
    // }
    for (let i = 0; i < questionOptions.length; i++) {
        optionButtons[i].style.backgroundColor = '#36643B';
        optionButtons[i].innerHTML = questionOptions[i].name;
    }
}

function checkQuestionAswer(answer) {
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].style.backgroundColor = "#777";
    }
    if (questionOptions[answer].name == correctMolecule.name) {
        optionButtons[answer].style.backgroundColor = "green";
        results.correct++;
    } else {
        optionButtons[answer].style.backgroundColor = "red";
        results.wrong++;
    }
    updateResults();
    questionImage.src = "http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif";
    questionImage.style.objectFit = 'contain'
    setTimeout(() => {
        questionImage.style.objectFit = 'cover'
        prepareQuestion();
    }, 2000);
}

function checkValidImage(imageUrl) {
    try {
        url = new URL(imageUrl);
        return true
    } catch (_) {
        return false;
    }
}

function updateResults() {
    correct.innerHTML = `<p id="correct"><span class="material-icons">check</span>&nbsp;` + results.correct;
    wrong.innerHTML = `<p id="wrong"><span class="material-icons">clear</span>&nbsp;` + results.wrong;
    rateP.innerHTML = `<p id="rate"><span class="material-icons">star</span>&nbsp;` + (results.correctRate() * 100).toFixed(0) + '%';
}

function prepareQuestion() {
    generateQuestionOptions()
    setQuestionOptions()
}

prepareQuestion()