// Get the Quiz categories as soon as the page loads
let currentQuizData = [];
window.onload = async function () {
    async function getCategories() {
        try {
            const response = await fetch(`https://opentdb.com/api_category.php`);
            const data = await response.json();
            return data.trivia_categories;
        } catch (err) {
            console.log('Error Fetching the data', err);
        }
    }
    const cat_arr = await getCategories() || [];

    cat_arr.forEach((cat) => {
        document.getElementById('category-options').innerHTML += `
              <option value="${cat.id}">${cat.name}</option>
         `;
    })
}

// Decode HTML entities (like &quot;)
function decodeHTML(str) {
    return new DOMParser().parseFromString(str, 'text/html').body.textContent;
}

async function getQuizData() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category-options').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    if (!amount || !category || !difficulty || !type) {
        alert('Please fill all the inputs');
        return false;
    }

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.log('Error fetching the data', err);
        return [];
    }
}

async function startQuiz() {
    const quizData = await getQuizData();
    if (!quizData || quizData.length === 0) {
        alert('No quiz data returned. Try different options.');
        return;
    }

    currentQuizData = quizData; 

    document.querySelector('.menu').style.display = 'none'; 
    document.getElementById("quiz-container").style.display = 'block'; 
    renderQuestions(quizData);
}

function renderQuestions(quizData) {
    const quizBox = quizData.map((q, index) => {
        const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

        const optionsHTML = answers.map(answer => {
            return `<div style="margin-bottom: 8px;">
                <input type="radio" name="question${index}" value="${decodeHTML(answer)}">
                <label>${decodeHTML(answer)}</label>
            </div>`;
        }).join('');

        return `
            <div class="question-block" style="margin-bottom: 25px;">
                <h3>Q${index + 1}: ${decodeHTML(q.question)}</h3>
                ${optionsHTML}
            </div>
        `;
    }).join('');

    const submitButton = `<button onclick="submitQuiz()" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: green; color: white; border: none; border-radius: 6px; cursor: pointer;">Submit Quiz</button>`;

    document.getElementById("quiz-container").innerHTML = quizBox + submitButton;
}

function submitQuiz() {
    let score = 0;
    currentQuizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === decodeHTML(q.correct_answer)) {
            score++;
        }
    });

    alert(`You scored ${score} out of ${currentQuizData.length}`);
    resetQuiz();
}

function resetQuiz() {
    document.getElementById("quiz-container").innerHTML = '';
    document.getElementById("quiz-container").style.display = 'none';
    document.querySelector(".menu").style.display = 'block';

    document.getElementById("amount").value = '';
    document.getElementById("category-options").selectedIndex = 0;
    document.getElementById("difficulty").selectedIndex = 0;
    document.getElementById("type").selectedIndex = 0;
}