// 设定目标日期（这里以2025 - 12 - 25模拟考研日期，2025 - 04 - 24模拟已过的生日日期，2025 - 09 - 10模拟N2考试日期，可按需修改）
const targetDate1 = new Date('2025 - 12 - 25');
const targetDate2 = new Date('2025 - 04 - 24');
const targetDate3 = new Date('2025 - 09 - 10');

function updateCountdown() {
  const now = new Date();
  const timeDiff1 = targetDate1.getTime() - now.getTime();
  const timeDiff2 = targetDate2.getTime() - now.getTime();
  const timeDiff3 = targetDate3.getTime() - now.getTime();

  const days1 = Math.ceil(timeDiff1 / (1000 * 60 * 60 * 24));
  const days2 = Math.ceil(timeDiff2 / (1000 * 60 * 60 * 24));
  const days3 = Math.ceil(timeDiff3 / (1000 * 60 * 60 * 24));

  document.getElementById('countdown - days - 1').textContent = days1 > 0? days1 + '天后' : days1 === 0? '今天' : Math.abs(days1) + '天前';
  document.getElementById('countdown - days - 2').textContent = days2 > 0? days2 + '天后' : days2 === 0? '今天' : Math.abs(days2) + '天前';
  document.getElementById('countdown - days - 3').textContent = days3 > 0? days3 + '天后' : days3 === 0? '今天' : Math.abs(days3) + '天前';
}

setInterval(updateCountdown, 1000);
updateCountdown();
