// ==========================================
// СЦЕНАРИИ
// ==========================================

const storyData = {
    // Вступительная часть (Главное меню)
    intro: [
        {
            text: "Привет! Меня зовут Даня. Добро пожаловать в мой интерактивный отчет о практике. Здесь я собрал все ключевые моменты моего обучения и работы.",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Я разделил отчет на две части: Учебная практика и Производственная практика. О чем ты хочешь узнать в первую очередь?",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png",
            choices: [ 
                { text: "Учебная практика", nextScene: "study" },
                { text: "Производственная практика", nextScene: "work" }
            ]
        }
    ],

    // Ветка: Учебная практика
    study: [
        {
            text: "Моя учебная практика была насыщенной и полезной. Я прошел несколько важных профильных курсов, чтобы подтянуть свои навыки веб-разработчика.",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Первым делом я освоил курс «Основы веб-верстки с HTML и CSS». Теперь я умею не только создавать структуры сайтов, но и стилизовать их под современные стандарты.",
            bg: "assets/cert_html.jpg",   
            name: "Даня",
            char: ""                      
        },
        {
            text: "Затем я углубился в командную разработку и изучил системы контроля версий на курсе «Основы Git и GitHub» на платформе Stepik. Это критически важный навык для любого программиста.",
            bg: "assets/cert_git.jpg",    
            name: "Даня",
            char: ""
        },
        {
            text: "Кроме учебы, у нас были интересные выездные мероприятия для расширения кругозора. Например, мы всей группой посетили головной офис компании 2ГИС с экскурсией.",
            bg: "assets/2gis_tour.jpg",   
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Это был крутой опыт — увидеть, как работают большие IT-компании изнутри, как устроены их процессы и офисы. Это очень мотивирует развиваться в профессии.",
            bg: "assets/2gis_tour.jpg",
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Это основные моменты моей учебной практики. Я получил крепкую базу знаний. Хочешь узнать, как я применял навыки на реальной работе?",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png",
            choices: [
                { text: "Перейти к Производственной практике", nextScene: "work" },
                { text: "Вернуться в начало", nextScene: "intro" }
            ]
        }
    ],

    // Ветка: Производственная практика
    work: [
        {
            text: "Производственная практика позволила мне поработать с реальными данными и системами учета. Это была отличная возможность увидеть, как IT-системы помогают бизнесу.",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "В первые дни (1-3 день) я занимался внесением новой товарной номенклатуры. Это требовало внимательности, так как любая ошибка могла привести к путанице на складе.",
            bg: "assets/atel.jpg", 
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Моя задача заключалась в сканировании штрих-кодов товаров и аккуратном добавлении их в кассовую систему и общую базу данных предприятия.",
            bg: "assets/scaner.jpg", // Исправлено: добавлена ваша картинка
            name: "Даня",
            char: "" 
        },
        {
            text: "С 4 по 7 день я проводил масштабную проверку и актуализацию данных об остатках. Важно было убедиться, что цифры в компьютере совпадают с реальностью.",
            bg: "assets/atel.jpg", 
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Я сверял фактическое наличие товаров с тем количеством, которое числилось в базе данных, отмечая все расхождения.",
            bg: "assets/atel.jpg", 
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "В финальные дни (8-10 день) я занимался аналитикой и корректировкой информации. Это был этап 'чистки' данных после инвентаризации.",
            bg: "assets/atel.jpg", 
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Я искал ошибки, дубли и недочеты в записях базы данных и исправлял их, чтобы информация была максимально точной и готовой к дальнейшей работе.",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png"
        },
        {
            text: "Практика дала мне отличный опыт внимательной работы с большими объемами данных! Теперь я лучше понимаю важность точности в информационных системах.",
            bg: "assets/atel.jpg",
            name: "Даня",
            char: "assets/danya.png",
            choices: [
                { text: "Посмотреть Учебную практику", nextScene: "study" },
                { text: "В начало", nextScene: "intro" }
            ]
        }
    ]
};


// ==========================================
// ДВИЖОК НОВЕЛЛЫ
// ==========================================

let currentScene = "intro"; // Текущая ветка
let currentIndex = 0;       // Текущий слайд в ветке
let isTyping = false;       // Флаг: идет ли печать текста?
let typeInterval;
let historyStack = [];      // История переходов

// Элементы DOM
const bgLayer = document.getElementById('background-layer');
const charImg = document.getElementById('character-img');
const nameTag = document.getElementById('name-tag');
const dialogueText = document.getElementById('dialogue-text');
const clickHint = document.querySelector('.click-hint');
const choicesContainer = document.getElementById('choices-container');
const slideCounter = document.getElementById('slide-counter');
const btnBack = document.getElementById('btn-back');
const container = document.getElementById('game-container');

function showSlide() {
    // Получаем текущий объект слайда
    const sceneArray = storyData[currentScene];
    const slide = sceneArray[currentIndex];

    // 1. Сбрасываем интерфейс
    choicesContainer.innerHTML = "";
    choicesContainer.classList.add('hidden');
    clickHint.style.display = "block"; 
    
    // 2. Обновляем счетчик
    slideCounter.innerText = `${currentIndex + 1} / ${sceneArray.length}`;

    // 3. Обновляем кнопку "Назад"
    if (currentIndex === 0 && historyStack.length === 0) {
        btnBack.style.opacity = "0.5";
        btnBack.style.pointerEvents = "none";
    } else {
        btnBack.style.opacity = "1";
        btnBack.style.pointerEvents = "auto";
    }

    // 4. Обновляем контент
    nameTag.innerText = slide.name;
    
    // Фон
    if (slide.bg) {
        bgLayer.style.backgroundImage = `url('${slide.bg}')`;
    } else {
        bgLayer.style.background = "#333";
    }

    // Персонаж
    if (slide.char) {
        charImg.src = slide.char;
        charImg.classList.remove('hidden');
        charImg.style.display = "block";
    } else {
        charImg.classList.add('hidden');
        charImg.style.display = "none";
    }

    // Текст
    dialogueText.innerText = "";
    typeWriter(slide.text, slide.choices);
}

function typeWriter(text, choices) {
    isTyping = true;
    let i = 0;
    clearInterval(typeInterval);
    
    typeInterval = setInterval(() => {
        if (i < text.length) {
            dialogueText.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            
            if (choices) {
                showChoices(choices);
            }
        }
    }, 20); 
}

function showChoices(choices) {
    clickHint.style.display = "none"; 
    choicesContainer.classList.remove('hidden');

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.classList.add('choice-btn');
        btn.onclick = (e) => {
            e.stopPropagation(); 
            changeScene(choice.nextScene);
        };
        choicesContainer.appendChild(btn);
    });
}

function changeScene(sceneName) {
    if (storyData[sceneName]) {
        historyStack.push({
            scene: currentScene,
            index: currentIndex
        });

        currentScene = sceneName;
        currentIndex = 0;
        showSlide();
    } else {
        console.error(`Сцена "${sceneName}" не найдена!`);
    }
}

// Кнопка НАЗАД
btnBack.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (currentIndex > 0) {
        currentIndex--;
        showSlide();
        return;
    }

    if (historyStack.length > 0) {
        const prevState = historyStack.pop();
        currentScene = prevState.scene;
        currentIndex = prevState.index;
        showSlide();
    }
});

// Клик по экрану
container.addEventListener('click', (e) => {
    if (e.target.closest('#controls-top')) return;

    const sceneArray = storyData[currentScene];
    const slide = sceneArray[currentIndex];

    if (isTyping) {
        clearInterval(typeInterval);
        dialogueText.innerText = slide.text;
        isTyping = false;
        if (slide.choices) showChoices(slide.choices);
        return;
    }

    if (slide.choices) return;

    if (currentIndex < sceneArray.length - 1) {
        currentIndex++;
        showSlide();
    }
});

showSlide();