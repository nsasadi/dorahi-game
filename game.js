const gameData = {
    stages: [
        { question: "بین نجات جان یک حیوان دست آموز و یک کودک کدوم رو انتخاب می‌کنی؟", option1: "نجات حیوان دست‌آموز", option2: "کودک" },
        { question: "بین خرید گوشی مورد علاقه‌ات و کمک به یک خانواده به شدت فقیر که کودکش سوءتغذیه داره کدوم رو انتخاب می‌کنی؟", option1: "گوشی مورد علاقه", option2: "کمک به خانواده فقیر" },
        { question: "اگر توانایی اختلاس و رسیدن به تمامی آرزوهات رو داشته باشی ولی ۱۰۰ خانواده با این کار تو امورات روزمره‌شون نمی‌گذره؟", option1: "اختلاس و رسیدن به آرزوها", option2: "گذشتن از آرزوها" },
        { question: "عضو گروه ورزشی مدرسه هستی و مسابقه در یک روز برقرار است. ولی متوجه می‌شی دقیقا همان روز خانواده‌ات قرار است به سفر تفریحی که خیلی مورد علاقه توست، بروند. اگر امکان جابه‌جایی زمان هیچ‌کدام نباشد، کدوم رو انتخاب می‌کنی؟", option1: "سفر با خانواده", option2: "شرکت در مسابقه" },
        { question: "در یک مصاحبه مهم، از تو درباره تجربه‌ای پرسیده می‌شود که در واقع نداشته‌ای، اما اگر دروغ بگویی، احتمال پذیرفته شدنت بیشتر است. چه تصمیمی می‌گیری؟", option1: "دروغ می‌گویم و شغل را می‌گیرم.", option2: "راست می‌گویم و شغل را از دست می‌دهم." },
        { question: "دوستت به کمک نیاز دارد تا برای امتحان آماده شود، اما تو هم نیاز داری که درس بخوانی. آیا وقتت را با او تقسیم می‌کنی یا فقط بر مطالعه خودت تمرکز می‌کنی؟", option1: "خودم درس می‌خوانم.", option2: "به دوستم هم کمک می‌کنم." },
        { question: "متوجه شده‌ای که دوستت درگیر یک رابطه ناسالم است و این موضوع را از خانواده‌اش مخفی می‌کند. آیا به خانواده‌اش اطلاع می‌دهی یا به حریم خصوصی او احترام می‌گذاری؟", option1: "به حریم خصوصی او احترام می‌گذارم.", option2: "به خانواده‌اش اطلاع می‌دهم." },
        { question: "یک مرکز بازی و خرید شلوغ بمب گذاری شده و فقط تو فهمیدی. فرصت بسیار کمی داری. اگر جلوی بمب بایستی، اتفاقی برای کسی نمی‌افته و فقط خودت کشته می‌شی. اگر فرار کنی معلوم نیست چند نفر کشته بشن؟", option1: "فرار می‌کنم و جان خودم را نجات می‌دهم.", option2: "جلوی بمب را می‌گیرم، حتی اگر جان خودم را از دست بدهم." }
    ]
};

let currentStage = 0;
let playerProgress = { id: Date.now(), name: "", stagesCleared: 0 };

document.addEventListener("DOMContentLoaded", () => {
    showIntroScreen();
});

function showIntroScreen() {
    document.body.innerHTML = `
        <div>
            <h1>به بازی دوراهی‌های تلخ و شیرین خوش آمدید!</h1>
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
    const stage = gameData.stages[currentStage];
    document.body.innerHTML = `
        <div style="background-color: hsl(${Math.random() * 360}, 100%, 90%); padding: 20px; border-radius: 10px; text-align: center;">
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
    sendResultsToGoogleSheets();
    document.body.innerHTML = `
        <div>
            <h1>پایان بازی</h1>
            <p>ممنون که در بازی شرکت کردی، ${playerProgress.name}!</p>
            <p>شما ${playerProgress.stagesCleared} مرحله پیش رفتید.</p>
        </div>
    `;
}

function sendResultsToGoogleSheets() {
    const url = "https://script.google.com/macros/s/AKfycbxfK2LR66MTAK4gDaY8n8wo_324mcHgE6JltPKpypg_D06i1LqjpEaIujKoOF2j-7Gf/exec";
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerProgress)
    });
}
