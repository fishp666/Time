// 考试数据
const exams = [
    {
        name: "期末考试",
        targetDate: "2024-06-30"
    },
    {
        name: "期中考试",
        targetDate: "2024-04-15"
    },
    {
        name: "英语四级",
        targetDate: "2024-12-14"
    }
    // 可以添加更多考试
];

// 初始化倒计时
function initCountdown() {
    const tableBody = document.querySelector('#countdownTable tbody');
    tableBody.innerHTML = '';
    
    exams.forEach(exam => {
        const row = document.createElement('tr');
        
        // 名称列
        const nameCell = document.createElement('td');
        nameCell.textContent = exam.name;
        row.appendChild(nameCell);
        
        // 倒计时列
        const countdownCell = document.createElement('td');
        row.appendChild(countdownCell);
        
        // 日期列
        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(exam.targetDate);
        row.appendChild(dateCell);
        
        tableBody.appendChild(row);
        
        // 设置定时器更新倒计时
        updateCountdown(countdownCell, exam.targetDate);
    });
}

// 更新倒计时显示
function updateCountdown(element, targetDateStr) {
    const targetDate = new Date(targetDateStr + 'T00:00:00');
    const now = new Date();
    
    const diff = targetDate - now;
    
    if (diff > 0) {
        // 还未到目标日期
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        element.innerHTML = `<span class="remaining">剩余 ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒</span>`;
    } else {
        // 已过目标日期
        const daysPassed = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        element.innerHTML = `<span class="expired">已过 ${daysPassed}天</span>`;
    }
}

// 格式化日期显示
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    
    // 每秒更新一次倒计时
    setInterval(initCountdown, 1000);
});
