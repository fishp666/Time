function pad(num) {
  return num < 10 ? '0' + num : num;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `现在是中国北京时间 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateCurrentTime() {
  const currentTimeElement = document.querySelector('.current-time');
  const now = new Date();
  const formattedTime = formatDate(now);
  currentTimeElement.textContent = formattedTime;
}

function formatRemain(ms) {
  if (isNaN(ms)) return '未设置';
  const isPast = ms < 0;
  ms = Math.abs(ms);
  var days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= (24 * 60 * 60 * 1000);
  var hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= (60 * 60 * 1000);
  var minutes = Math.floor(ms / (60 * 1000));
  ms %= (60 * 1000);
  var seconds = Math.floor(ms / 1000);
  const timeStr = `${days}天 ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  return isPast ? `已过 ${timeStr}` : `剩余 ${timeStr}`;
}

function formatDateStr(date) {
  if (isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

new Vue({
  el: "#root",
  data() {
    return {
      created: (new Date()).toISOString().slice(0, 10),
      countdownList: [
        { name: '<span class="grade-tag">初三</span> 开学注册', target: "2026/08/24 00:00:00" },
        { name: '<span class="grade-tag">初三</span> 中考', target: "2026/06/24 00:00:00" }
      ],
      countdowns: []
    }
  },
  methods: {
    updateCountdowns() {
      const now = new Date();
      this.countdowns = this.countdownList.map(item => {
        const targetDate = new Date(item.target);
        const remainMs = targetDate - now;
        return {
          name: item.name,
          remainMs: remainMs,
          remainStr: formatRemain(remainMs),
          targetDateStr: item.target ? formatDateStr(targetDate) : ''
        }
      })
      // 剩余时间从小到大排序，无效日期排最后
      .sort((a, b) => {
        if (isNaN(a.remainMs)) return 1;
        if (isNaN(b.remainMs)) return -1;
        return a.remainMs - b.remainMs;
      });
    }
  },
  mounted() {
    this.updateCountdowns();
    setInterval(this.updateCountdowns, 1000);
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
  }
});
