// 데이터 저장소
let diaries = JSON.parse(localStorage.getItem('diaries')) || {};
let todos = JSON.parse(localStorage.getItem('todos')) || {};
let tickets = parseInt(localStorage.getItem('tickets')) || 0;
let streak = JSON.parse(localStorage.getItem('streak')) || { last_completion: null, count: 0 };
let diaryImages = JSON.parse(localStorage.getItem('diaryImages')) || {};
let currentTheme = localStorage.getItem('currentTheme') || 'default';
let ownedThemes = JSON.parse(localStorage.getItem('ownedThemes')) || ['default'];

// 테마 정의
const themes = {
    default: {
        name: "기본 테마",
        price: 0,
        icon: "📅",
        bg: "#f3e8ff",
        primary: "#9333ea",
        fortunes: [
            "오늘은 행운이 가득한 날입니다! ✨",
            "좋은 소식이 곧 찾아올 거예요 💌",
            "새로운 기회가 당신을 기다리고 있어요 🌟"
        ]
    },
    ocean: {
        name: "바다 테마",
        price: 5,
        icon: "🌊",
        bg: "#dbeafe",
        primary: "#0284c7",
        fortunes: [
            "고요한 바다처럼 평화로운 하루가 될 거예요 🌊",
            "파도처럼 좋은 일이 밀려올 거예요 🏄",
            "바다의 축복이 함께할 거예요 🐚"
        ]
    },
    sunset: {
        name: "석양 테마",
        price: 5,
        icon: "🌅",
        bg: "#fed7aa",
        primary: "#ea580c",
        fortunes: [
            "아름다운 석양처럼 멋진 하루가 될 거예요 🌅",
            "황금빛 행운이 찾아올 거예요 ✨",
            "따뜻한 행복이 가득할 거예요 🧡"
        ]
    },
    forest: {
        name: "숲 테마",
        price: 5,
        icon: "🌲",
        bg: "#d1fae5",
        primary: "#059669",
        fortunes: [
            "숲의 생명력처럼 활기찬 하루가 될 거예요 🌲",
            "자연의 축복이 함께할 거예요 🍃",
            "싱그러운 행운이 찾아올 거예요 🌿"
        ]
    },
    night: {
        name: "밤하늘 테마",
        price: 8,
        icon: "🌙",
        bg: "#1e293b",
        primary: "#334155",
        fortunes: [
            "별처럼 빛나는 하루가 될 거예요 ⭐",
            "달빛 아래 꿈이 이루어질 거예요 🌙",
            "밤하늘의 신비가 행운을 가져다줄 거예요 ✨"
        ]
    },
    cherry: {
        name: "벚꽃 테마",
        price: 8,
        icon: "🌸",
        bg: "#fce7f3",
        primary: "#ec4899",
        fortunes: [
            "벚꽃처럼 아름다운 순간이 가득할 거예요 🌸",
            "봄바람처럼 상쾌한 행운이 올 거예요 🌼",
            "꽃잎처럼 사랑스러운 일이 생길 거예요 💕"
        ]
    },
    galaxy: {
        name: "은하 테마",
        price: 10,
        icon: "🌌",
        bg: "#1a1a2e",
        primary: "#16213e",
        fortunes: [
            "우주처럼 무한한 가능성이 펼쳐질 거예요 🌌",
            "별빛이 당신의 길을 밝혀줄 거예요 ✨",
            "은하수의 행운이 쏟아질 거예요 🌠"
        ]
    },
    pixel: {
        name: "픽셀 테마",
        price: 10,
        icon: "🎮",
        bg: "#fef3c7",
        primary: "#f59e0b",
        fortunes: [
            "레트로 감성처럼 특별한 날이 될 거예요 🎮",
            "게임 속 주인공처럼 승리할 거예요 🏆",
            "8비트 행운이 찾아올 거예요 ⭐"
        ]
    },
    meadow: {
        name: "초원 테마",
        price: 7,
        icon: "🌾",
        bg: "#ecfccb",
        primary: "#65a30d",
        fortunes: [
            "초원의 바람처럼 상쾌한 하루가 될 거예요 🌾",
            "들판의 자유로움이 함께할 거예요 🦋",
            "햇살처럼 따뜻한 행운이 올 거예요 ☀️"
        ]
    }
};

// 현재 날짜
let currentDate = new Date();
let selectedDate = new Date();

// 그리기 관련
let isDrawing = false;
let currentColor = '#000000';
let currentThickness = 3;
let drawingData = [];

// 초기화
function init() {
    checkStreak();
    applyTheme();
    updateTicketDisplay();
    showCalendarView();
}

// 연속 보너스 체크
function checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (streak.last_completion) {
        const lastDate = new Date(streak.last_completion);
        const todayDate = new Date(today);
        const diff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diff > 1) {
            streak.count = 0;
        }
    }
    saveData();
}

// 테마 적용
function applyTheme() {
    const theme = themes[currentTheme];
    document.body.style.background = theme.bg;
    document.querySelector('.header').style.background = theme.primary;
    document.getElementById('headerTitle').textContent = `${theme.icon} 나의 다이어리`;
}

// 티켓 표시 업데이트
function updateTicketDisplay() {
    document.getElementById('ticketCount').textContent = tickets;
    document.getElementById('streakCount').textContent = streak.count;
    document.getElementById('shopTicketCount').textContent = tickets;
}

// 데이터 저장
function saveData() {
    localStorage.setItem('diaries', JSON.stringify(diaries));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('tickets', tickets);
    localStorage.setItem('streak', JSON.stringify(streak));
    localStorage.setItem('diaryImages', JSON.stringify(diaryImages));
    localStorage.setItem('currentTheme', currentTheme);
    localStorage.setItem('ownedThemes', JSON.stringify(ownedThemes));
}

// 알림 표시
function showNotification(message, duration = 2000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// 캘린더 뷰 표시
function showCalendarView() {
    hideAllViews();
    document.getElementById('calendarView').classList.remove('hidden');
    renderCalendar();
}

// 다이어리 뷰 표시
function showDiaryView() {
    hideAllViews();
    document.getElementById('diaryView').classList.remove('hidden');
    renderDiary();
}

// 할일 뷰 표시
function showTodoView() {
    hideAllViews();
    document.getElementById('todoView').classList.remove('hidden');
    renderTodos();
    
    if (streak.count > 0) {
        const banner = document.getElementById('streakBanner');
        banner.textContent = `🔥 ${streak.count}일 연속 달성 중!`;
        banner.classList.remove('hidden');
    }
}

// 테마 상점 표시
function showShop() {
    hideAllViews();
    document.getElementById('shopView').classList.remove('hidden');
    renderShop();
}

// 모든 뷰 숨기기
function hideAllViews() {
    document.getElementById('calendarView').classList.add('hidden');
    document.getElementById('diaryView').classList.add('hidden');
    document.getElementById('todoView').classList.add('hidden');
    document.getElementById('shopView').classList.add('hidden');
}

// 캘린더 렌더링
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('currentMonth').textContent = `${year}년 ${month + 1}월`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    // 요일 헤더
    ['일', '월', '화', '수', '목', '금', '토'].forEach(day => {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        div.textContent = day;
        calendar.appendChild(div);
    });
    
    // 빈 날짜
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        calendar.appendChild(div);
    }
    
    // 날짜
    for (let date = 1; date <= lastDate; date++) {
        const div = document.createElement('div');
        div.className = 'calendar-date';
        div.textContent = date;
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        
        if (diaryImages[dateStr]) {
            div.classList.add('has-image');
        } else if (diaries[dateStr] && diaries[dateStr].trim()) {
            div.classList.add('has-diary');
        }
        
        div.onclick = () => selectDate(date);
        calendar.appendChild(div);
    }
}

// 날짜 선택
function selectDate(date) {
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    showDiaryView();
}

// 이전 달
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// 다음 달
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// 다이어리 렌더링
function renderDiary() {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const displayDate = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
    
    document.getElementById('diaryDate').textContent = displayDate;
    document.getElementById('diaryText').value = diaries[dateStr] || '';
    
    // 이미지 미리보기
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    
    if (diaryImages[dateStr]) {
        const data = diaryImages[dateStr];
        
        if (data.lines) {
            // 그림
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 300;
            canvas.className = 'image-preview';
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 300, 300);
            
            const scale = 300 / 350;
            data.lines.forEach(line => {
                ctx.strokeStyle = line.color;
                ctx.lineWidth = line.width * scale;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(line.x1 * scale, line.y1 * scale);
                ctx.lineTo(line.x2 * scale, line.y2 * scale);
                ctx.stroke();
            });
            
            preview.appendChild(canvas);
        } else {
            // 사진 (파일 경로)
            const div = document.createElement('div');
            div.style.padding = '20px';
            div.style.background = '#f3f4f6';
            div.style.borderRadius = '12px';
            div.style.textAlign = 'center';
            div.innerHTML = '📷 사진이 첨부되었습니다';
            preview.appendChild(div);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = '❌ 이미지 삭제';
        deleteBtn.onclick = () => deleteImage(dateStr);
        preview.appendChild(deleteBtn);
    }
    
    // 자동 저장
    document.getElementById('diaryText').oninput = saveDiary;
}

// 다이어리 저장
function saveDiary() {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const text = document.getElementById('diaryText').value;
    diaries[dateStr] = text;
    saveData();
}

// 이미지 삭제
function deleteImage(dateStr) {
    delete diaryImages[dateStr];
    saveData();
    showNotification('이미지가 삭제되었습니다');
    renderDiary();
}

// 그림 그리기 모달 열기
function openDrawing() {
    document.getElementById('drawingModal').classList.add('show');
    initDrawing();
}

// 그림 그리기 모달 닫기
function closeDrawing() {
    document.getElementById('drawingModal').classList.remove('show');
}

// 그림 그리기 초기화
function initDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    
    // 캔버스 초기화
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawingData = [];
    currentColor = '#000000';
    currentThickness = 3;
    
    // 색상 팔레트
    const colors = ['#000000', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'];
    const picker = document.getElementById('colorPicker');
    picker.innerHTML = '';
    
    colors.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-option';
        div.style.background = color;
        if (color === '#ffffff') div.style.border = '3px solid #d1d5db';
        if (color === currentColor) div.classList.add('active');
        div.onclick = () => selectColor(color);
        picker.appendChild(div);
    });
    
    // 터치 이벤트
    let lastX = 0;
    let lastY = 0;
    
    canvas.ontouchstart = canvas.onmousedown = (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        lastX = x;
        lastY = y;
    };
    
    canvas.ontouchmove = canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentThickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        drawingData.push({
            x1: lastX,
            y1: lastY,
            x2: x,
            y2: y,
            color: currentColor,
            width: currentThickness
        });
        
        lastX = x;
        lastY = y;
    };
    
    canvas.ontouchend = canvas.onmouseup = () => {
        isDrawing = false;
    };
}

// 색상 선택
function selectColor(color) {
    currentColor = color;
    document.querySelectorAll('.color-option').forEach(el => {
        el.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 굵기 업데이트
function updateThickness() {
    currentThickness = parseInt(document.getElementById('thickness').value);
    document.getElementById('thicknessValue').textContent = currentThickness;
}

// 캔버스 지우기
function clearCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawingData = [];
}

// 그림 저장
function saveDrawing() {
    if (drawingData.length === 0) {
        showNotification('그림을 그려주세요!');
        return;
    }
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    diaryImages[dateStr] = {
        lines: drawingData,
        width: 350,
        height: 350
    };
    saveData();
    closeDrawing();
    showNotification('그림이 저장되었습니다!');
    renderDiary();
}

// 사진 추가 (모바일에서는 input file 사용)
function addPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dateStr = selectedDate.toISOString().split('T')[0];
                diaryImages[dateStr] = event.target.result;
                saveData();
                showNotification('사진이 추가되었습니다!');
                renderDiary();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// 할일 렌더링
function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    
    Object.entries(todos).forEach(([id, todo]) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        
        const checkbox = document.createElement('div');
        checkbox.className = 'todo-checkbox';
        checkbox.innerHTML = todo.completed ? '✓' : '';
        checkbox.style.background = todo.completed ? '#10b981' : 'transparent';
        checkbox.style.color = 'white';
        if (!todo.completed) {
            checkbox.onclick = () => completeTodo(id);
        }
        
        const text = document.createElement('div');
        text.className = 'todo-text' + (todo.completed ? ' completed' : '');
        text.textContent = todo.text;
        
        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'todo-delete';
        deleteBtn.textContent = '✕';
        deleteBtn.onclick = () => deleteTodo(id);
        
        div.appendChild(checkbox);
        div.appendChild(text);
        div.appendChild(deleteBtn);
        list.appendChild(div);
    });
}

// 할일 추가
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (!text) {
        showNotification('할일을 입력해주세요!');
        return;
    }
    
    const id = Date.now().toString();
    todos[id] = {
        text: text,
        completed: false
    };
    
    input.value = '';
    saveData();
    renderTodos();
}

// 할일 완료
function completeTodo(id) {
    todos[id].completed = true;
    
    // 연속 보너스
    const today = new Date().toISOString().split('T')[0];
    let bonus = 1;
    
    if (streak.last_completion) {
        const lastDate = new Date(streak.last_completion);
        const todayDate = new Date(today);
        const diff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diff === 1) {
            streak.count++;
            bonus = 1 + Math.floor(streak.count / 3);
        } else if (diff === 0) {
            bonus = 1;
        } else {
            streak.count = 1;
        }
    } else {
        streak.count = 1;
    }
    
    streak.last_completion = today;
    tickets += bonus;
    
    saveData();
    updateTicketDisplay();
    renderTodos();
    
    if (bonus > 1) {
        showNotification(`🔥 ${streak.count}일 연속 달성!\n티켓 ${bonus}개 획득! (보너스 +${bonus-1})`, 3000);
    } else {
        showNotification(`티켓 1개 획득!\n현재 티켓: ${tickets}개`);
    }
}

// 할일 삭제
function deleteTodo(id) {
    delete todos[id];
    saveData();
    renderTodos();
}

// 포춘 뽑기
function drawFortune() {
    if (tickets <= 0) {
        showNotification('티켓이 없습니다!\n할일을 완료하여 티켓을 얻으세요.');
        return;
    }
    
    tickets--;
    saveData();
    updateTicketDisplay();
    
    const theme = themes[currentTheme];
    const fortune = theme.fortunes[Math.floor(Math.random() * theme.fortunes.length)];
    
    showNotification(fortune, 4000);
}

// 테마 상점 렌더링
function renderShop() {
    const list = document.getElementById('themeList');
    list.innerHTML = '';
    
    Object.entries(themes).forEach(([id, theme]) => {
        const card = document.createElement('div');
        card.className = 'theme-card';
        
        const header = document.createElement('div');
        header.className = 'theme-card-header';
        
        const icon = document.createElement('div');
        icon.className = 'theme-icon';
        icon.textContent = theme.icon;
        
        const info = document.createElement('div');
        info.className = 'theme-info';
        
        const name = document.createElement('h3');
        name.textContent = theme.name;
        
        const status = document.createElement('p');
        if (ownedThemes.includes(id)) {
            if (id === currentTheme) {
                status.textContent = '✓ 사용중';
                status.style.color = '#10b981';
            } else {
                status.textContent = '보유중';
                status.style.color = '#6b7280';
            }
        } else {
            status.textContent = `가격: ${theme.price}🎟️`;
            status.style.color = '#ea580c';
        }
        
        info.appendChild(name);
        info.appendChild(status);
        header.appendChild(icon);
        header.appendChild(info);
        card.appendChild(header);
        
        // 버튼
        if (ownedThemes.includes(id)) {
            if (id !== currentTheme) {
                const btn = document.createElement('button');
                btn.className = 'btn';
                btn.style.background = theme.primary;
                btn.style.color = 'white';
                btn.textContent = '적용하기';
                btn.onclick = () => applyThemeClick(id);
                card.appendChild(btn);
            }
        } else {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.background = tickets >= theme.price ? '#fbbf24' : '#d1d5db';
            btn.style.color = 'white';
            btn.textContent = `구매하기 (${theme.price}🎟️)`;
            btn.onclick = () => buyTheme(id, theme.price);
            card.appendChild(btn);
        }
        
        list.appendChild(card);
    });
}

// 테마 구매
function buyTheme(id, price) {
    if (tickets < price) {
        showNotification(`티켓이 부족합니다!\n필요: ${price}🎟️ / 보유: ${tickets}🎟️`);
        return;
    }
    
    if (confirm(`${themes[id].name}을(를) ${price}🎟️에 구매하시겠습니까?`)) {
        tickets -= price;
        ownedThemes.push(id);
        saveData();
        updateTicketDisplay();
        showNotification(`${themes[id].name}을(를) 구매했습니다!`);
        renderShop();
    }
}

// 테마 적용
function applyThemeClick(id) {
    currentTheme = id;
    saveData();
    applyTheme();
    showNotification(`${themes[id].name}이(가) 적용되었습니다!`);
    setTimeout(() => {
        showCalendarView();
    }, 1000);
}

// Enter 키로 할일 추가
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});

// PWA 설치 지원
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // 설치 안내 표시 (선택 사항)
    setTimeout(() => {
        if (confirm('홈 화면에 앱을 추가하시겠습니까?')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
            });
        }
    }, 3000);
});

// Service Worker 등록
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
