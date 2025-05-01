function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `现在是中国北京时间 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateCurrentTime() {
  const currentTimeElement = document.querySelector('.current-time');
  const now = new Date();
  const formattedTime = formatDate(now);
  currentTimeElement.textContent = formattedTime;
}

new Vue({
  el: "#root",
  data() {
    return {
      created: (new Date()).toISOString().slice(0, 10),
      countdownList: [
        { name: '<span class="grade-tag">初三</span> 体育中考', target: "2025/05/21 00:00:00" },
        { name: '<span class="grade-tag">初一 · 初二</span> 5月份月考<br><span class="grade-tag">初三</span> 5月中考适应性考试', target: "2025/05/26 09:00:00" },
        { name: '<span class="grade-tag">初二</span> 2025地生中考<br><span class="grade-tag">初三</span> 2025中考', target: "2025/06/27 09:00:00" },
        { name: '<span class="grade-tag">初一 · 初二</span> 期末考试', target: "" },
        { name: '<span class="grade-tag">初一 · 初二 · 初三</span> 放暑假🥳', target: "2025/07/01 00:00:00" },
        { name: '<span class="grade-tag">初二</span> 2026中考', target: "2026/06/24 00:00:00" }
      ],
      countdowns: []
    }
  },
  methods: {
    updateCountdowns() {
          var now = new Date();
          this.countdowns = this.countdownList.map(item => {
            var targetDate = new Date(item.target);
            var remainMs = targetDate - now;
            var remainStr = formatRemain(remainMs);
            return {
              name: item.name,
              remainStr: remainStr,
              targetDateStr: formatDateStr(targetDate)
            }
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

function formatRemain(ms) {
  ms = Math.abs(ms);
  var days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= (24 * 60 * 60 * 1000);
  var hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= (60 * 60 * 1000);
  var minutes = Math.floor(ms / (60 * 1000));
  ms %= (60 * 1000);
  var seconds = Math.floor(ms / 1000);
  return `${days}天 ${hours}:${minutes}:${seconds}`;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function formatDateStr(date) {
  var d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
