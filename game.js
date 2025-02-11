const gameData = {
    stages: [
        { question: "بین نجات جان یک حیوان دست‌آموز و یک کودک، کدام را انتخاب می‌کنی؟", option1: "نجات حیوان دست‌آموز", option2: "کودک" },
        { question: "بین خرید گوشی موردعلاقه‌ات و کمک به یک خانواده فقیر که کودکشان سوءتغذیه دارد، کدام را انتخاب می‌کنی؟", option1: "گوشی مورد علاقه", option2: "کمک به خانواده فقیر" },
        { question: "اگر توانایی اختلاس و رسیدن به تمامی آرزوهایت را داشته باشی اما ۱۰۰ خانواده با این کار تو دچار مشکل شوند، چه می‌کنی؟", option1: "اختلاس و رسیدن به آرزوها", option2: "گذشتن از آرزوها" },
        { question: "عضو تیم ورزشی مدرسه هستی، اما خانواده‌ات در همان روز برنامه سفر دارند. چه تصمیمی می‌گیری؟", option1: "سفر با خانواده", option2: "شرکت در مسابقه" },
        { question: "در یک مصاحبه مهم، اگر دروغ بگویی، احتمال پذیرفته شدنت بیشتر است. چه می‌کنی؟", option1: "دروغ می‌گویم", option2: "راست می‌گویم" },
        { question: "دوستت برای امتحان نیاز به کمک دارد، اما خودت هم باید درس بخوانی. چه می‌کنی؟", option1: "خودم درس می‌خوانم", option2: "به دوستم هم کمک می‌کنم" },
        { question: "دوستت درگیر یک رابطه ناسالم است و از خانواده‌اش مخفی می‌کند. آیا اطلاع می‌دهی؟", option1: "احترام به حریم خصوصی", option2: "به خانواده‌اش اطلاع می‌دهم" },
        { question: "یک مرکز عمومی بمب‌گذاری شده و فقط تو متوجه شده‌ای. چه می‌کنی؟", option1: "فرار می‌کنم", option2: "جلوی بمب را می‌گیرم" }
    ]
};

let currentStage = 0;
let playerProgress = { id: Date.now(), name: "", stagesCleared: 0 };

document.addEventListener("DOMContentLoaded", () => {
    showIntroScreen();
});

function showIntroScreen() {
    document.body.style.backgroundColor = "#FFC0CB"; // صورتی پاستیلی
    document.body.innerHTML = `
        <div id="game-container">
            <h1>به بازی انتخاب‌های دشوار خوش آمدید!</h1>
            <p>یه اسم برای خودت انتخاب کن:</p>
            <input type="text" id="playerName" placeholder="نام خود را وارد کنید">
            <button onclick="startGame()">شروع بازی</button>
        </div>
    `;
}

function startGame() {
    let nameInput = document.getElementById("playerName").value;
    if (nameInput.trim() === "") {
        alert("لطفاً نام خود را وارد کنید!");
        return;
    }
    playerProgress.name = nameInput;
    loadStage();
}

function loadStage() {
    if (currentStage >= gameData.stages.length) {
        endGame();
        return;
    }

    const colors = ["#FFC0CB", "#FFDDC1", "#D4A5A5", "#A5C4D4", "#C1FFD7", "#FFD1DC", "#FFFACD", "#D8BFD8"];
    document.body.style.backgroundColor = colors[currentStage % colors.length];

    const stage = gameData.stages[currentStage];
    document.body.innerHTML = `
        <div id="game-container">
            <h2>${stage.question}</h2>
            <button onclick="chooseOption(1)">${stage.option1}</button>
            <button onclick="chooseOption(2)">${stage.option2}</button>
        </div>
    `;
}

function chooseOption(option) {
    if (option === 1) {
        endGame();
    } else {
        playerProgress.stagesCleared++;
        currentStage++;
        loadStage();
    }
}

function endGame() {
    document.body.style.backgroundColor = "#FFDAB9"; // رنگ پاستیلی برای صفحه پایان
    document.body.innerHTML = `
        <div id="game-container">
            <h1>پایان بازی</h1>
            <p>ممنون که در بازی شرکت کردی، ${playerProgress.name}!</p>
            <p>شما ${playerProgress.stagesCleared} مرحله پیش رفتید.</p>
        </div>
    `;
}
