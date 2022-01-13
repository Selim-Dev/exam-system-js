(function() {
    var timer = document.querySelector('.timer');
    var question = document.querySelector('.question');
    var choicesEl = document.querySelector('.question_choices');
    var questionNum = document.querySelector('.question_num');
    /// btns
    var previousBtn = document.querySelector('.previous');
    var nextBtn = document.querySelector('.next');
    var markBtn = document.querySelector('.mark');
    var deleteMarkBtn = document.querySelector('.delete-icon');
    var submitBtn = document.querySelector('.submit_button');
    var marksDiv = document.querySelector('.marks');
    var qNum = 0;
    var currentIndex;
    var radioButtons = document.querySelectorAll('input[name="rad"]');

    window.onload = function() {
        // move();
        displayResult();

        startSubmitTimer();
    };
    var time = 300;
    var questions = [];
    var score = 0;
    var result = 0;
    // MARK A QUESTION
    var markedQuestions = [];

    // creating function constructors
    var Choice = function(id, value) {
        this.id = id;
        this.value = value;
    };
    // choices database

    var Question = function(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    };
    // making dummy questions
    var question1 = new Question(
        'What Country Lies In Africa', [
            new Choice(1, 'egypt'),
            new Choice(2, 'italy'),
            new Choice(3, 'portugal'),
            new Choice(4, 'china'),
        ],
        0
    );
    var question2 = new Question(
        'Which of these is Asian Country ?', [
            new Choice(5, 'Brazil'),
            new Choice(6, 'Sudan'),
            new Choice(7, 'Taiwan'),
            new Choice(8, 'portugal'),
        ],
        2
    );

    var question3 = new Question(
        'What is the capital of egypt', [
            new Choice(9, 'Cairo'),
            new Choice(10, 'Alexandria'),
            new Choice(11, 'Arish'),
            new Choice(12, 'Loxur'),
        ],

        0
    );
    var question4 = new Question(
        'result of 4+9 is ?', [
            new Choice(13, 85),
            new Choice(14, 432),
            new Choice(15, 13),
            new Choice(16, 5),
        ],
        2
    );
    var question5 = new Question(
        'What is the product of 5*4', [
            new Choice(17, 18),
            new Choice(18, 7),
            new Choice(19, 2),
            new Choice(20, 20),
        ],
        3
    );

    // adding questions
    function addQuestion(q) {
        questions.push(q);
        q.num = questions.indexOf(q);
    }
    addQuestion(question1);
    addQuestion(question2);
    addQuestion(question3);
    addQuestion(question4);
    addQuestion(question5);
    // scoring value
    var scoreArray = [];
    // making a random array of questions
    var questionsRandomArray = randomArrayShuffle(questions);
    console.log(questionsRandomArray);
    // initializing first Question
    function randomArrayShuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    /************************************* EVENT HANDLING  ****************************** */

    function makeQuestion(i) {
        currentIndex = i;
        qNum = i + 1;

        question.textContent = `Q${qNum}- ${questionsRandomArray[i].question}`;
        // first Question
        var choices = questionsRandomArray[i].choices;
        var letters = ['a', 'b', 'c', 'd'];
        for (var y = 0; y < choices.length; y++) {
            document.querySelector(`#answer${y}`).value = y;
            document.querySelector(
                `#answer${y}-text`
            ).textContent = `${letters[y]}) ${choices[y].value}`;
        }

        questionNum.textContent = qNum;
        questionNum.dataset.index = currentIndex;
        markBtn.dataset.index = i;
        console.log(markedQuestions);
        if (markedQuestions.includes(currentIndex)) {
            markBtn.setAttribute('disabled', true);
        } else {
            markBtn.removeAttribute('disabled');
        }
        if (qNum >= questionsRandomArray.length) {
            nextBtn.setAttribute('disabled', true);
        } else {
            nextBtn.removeAttribute('disabled');
        }
        if (qNum <= 1) {
            previousBtn.setAttribute('disabled', true);
        } else {
            previousBtn.removeAttribute('disabled');
        }
        clearradioBtns();
    }

    makeQuestion(0);
    // clearing radio buttons functions
    function clearradioBtns() {
        var index = +currentIndex;
        for (var i = 0; i < radioButtons.length; i++) {
            if (scoreArray[index] == radioButtons[i].value) {
                // alert('it includes the value');
                radioButtons[i].checked = true;
            } else {
                radioButtons[i].checked = false;
            }
        }
    }
    /************************************* EVENT HANDLING  ****************************** */

    // next button event
    nextBtn.addEventListener('click', function() {
        makeQuestion(qNum);
    });
    previousBtn.addEventListener('click', function() {
        makeQuestion(Number(currentIndex) - 1);
    });
    submitBtn.addEventListener('click', function() {
        submit();
    });

    /******************************* Mark a question ********************* */
    function markQuestion(i) {
        // -${truncateString(questionsRandomArray[i].question, 20)
        if (!markedQuestions.includes(i)) {
            markedQuestions.push(+i);
            markBtn.setAttribute('disabled', true);

            var html = `<div class="mark_container"><div data-index="${i}" class="mark_item">Mark - Q${
        +i + 1
      }</div><i data-index="${i}" class="fas fa-trash-alt delete-icon"></i></div>`;

            marksDiv.insertAdjacentHTML('afterbegin', html);
        }
    }
    markBtn.addEventListener('click', function() {
        markQuestion(markBtn.dataset.index);
    });

    marksDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('mark_item')) {
            var index = e.target.dataset.index;
            makeQuestion(+index);
        }
        if (e.target.classList.contains('delete-icon')) {
            var index = e.target.dataset.index;
            if (currentIndex == index) {
                markBtn.removeAttribute('disabled');
            }
            markedQuestions.splice(markedQuestions.indexOf(index), 1);
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    });

    //  Storing Answers
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function() {
            storeAnswer(this.value);
        });
    }

    function storeAnswer(value) {
        var question_number = currentIndex;
        var q = questionsRandomArray[question_number];
        scoreArray[currentIndex] = value;
        console.log(scoreArray);
    }

    function submit() {
        score = 0;
        for (var i = 0; i < questionsRandomArray.length; i++) {
            if (Number(scoreArray[i]) == questionsRandomArray[i].answer) {
                score++;
            }
        }
        result = (score / questionsRandomArray.length) * 100;
        localStorage.setItem('result', `${result}`);
        localStorage.setItem('submitted', '1');
        displayResult();
    }

    function displayResult() {
        if (+localStorage.getItem('submitted') == 1) {
            document.querySelector('.main_container').classList.add('hidden');
            document.querySelector(
                '.result-title'
            ).textContent = `${localStorage.getItem(
        'first_name'
      )} ${localStorage.getItem('last_name')}`;
            document.querySelector(
                '.result-span'
            ).textContent = `${localStorage.getItem('result')} %`;
            document.querySelector('.result_container').classList.remove('hidden');
        } else {
            document.querySelector('.main_container').classList.remove('hidden');
        }
    }
    // start timer
    function startSubmitTimer() {
        var initial = time;
        var elem = document.getElementById('myBar');
        var timerInterval = setInterval(tic, 1000);

        function tic() {
            var min = String(Math.trunc(time / 60)).padStart(2, 0);
            var sec = String(time % 60).padStart(2, 0);
            // displaytimer
            timer.textContent = `${min}:${sec}`;

            if (localStorage.getItem('submitted') == 1) {
                clearInterval(timerInterval);
            }
            if (time === 0) {
                clearInterval(timerInterval);
                submit();
            }
            elem.style.width = (time / initial) * 100 + '%';

            // decrease 1s
            time--;
        }
        tic();
    }

    // truncate string function

    function truncateString(str, num) {
        if (str.length > num) {
            let subStr = str.substring(0, num);
            return subStr + '...';
        } else {
            return str;
        }
    }
})();