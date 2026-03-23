<template>
  <div class="archive">
    <h1>📜 医案典藏</h1>
    <p class="subtitle">收藏医案，温故知新</p>

    <div class="stats">
      <div class="stat-item">
        <div class="num">{{ user.completedCases.length }}</div>
        <div class="label">已收藏</div>
      </div>
      <div class="stat-item">
        <div class="num">{{ cases.length }}</div>
        <div class="label">总医案</div>
      </div>
      <div class="stat-item">
        <div class="num">{{ Math.round((user.completedCases.length / cases.length) * 100) }}%</div>
        <div class="label">完成度</div>
      </div>
    </div>

    <div class="case-list">
      <div 
        v-for="c in cases" 
        :key="c.id"
        class="case-item"
        :class="{ locked: !user.completedCases.includes(c.id) }"
        @click="viewCase(c)"
      >
        <div class="case-title">{{ c.name }}</div>
        <div class="case-patient">{{ c.patient }}</div>
        <div class="badge" v-if="user.completedCases.includes(c.id)">✓ 已解锁</div>
        <div class="badge locked" v-else>🔒 未解锁</div>
      </div>
    </div>

    <div v-if="currentCase" class="modal">
      <div class="modal-content">
        <h2>{{ currentCase.name }}</h2>
        <div class="case-detail">
          <p><strong>患者：</strong>{{ currentCase.patient }}</p>
          <p><strong>主症：</strong>{{ currentCase.symptoms }}</p>
          <p><strong>四诊：</strong>{{ currentCase.exam }}</p>
          <p><strong>辨证：</strong>{{ currentCase.diagnosis }}</p>
          <p><strong>治法：</strong>{{ currentCase.treatment }}</p>
          <p><strong>方药：</strong>{{ currentCase.formula }}</p>
          <div class="analysis">
            <strong>医案分析：</strong>
            <p>{{ currentCase.analysis }}</p>
          </div>
        </div>
        <button @click="currentCase = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const currentCase = ref(null)

const cases = [
  {
    id: 1,
    name: '风寒感冒案',
    patient: '男，28岁',
    symptoms: '恶寒发热，头痛身痛，无汗',
    exam: '舌淡红，苔薄白，脉浮紧',
    diagnosis: '风寒表证',
    treatment: '辛温解表',
    formula: '麻黄汤：麻黄9g，桂枝6g，杏仁9g，甘草3g',
    analysis: '患者恶寒重、发热轻、无汗、脉浮紧，为风寒表证典型表现。'
  },
  {
    id: 2,
    name: '风热感冒案',
    patient: '女，32岁',
    symptoms: '发热重，恶寒轻，有汗，咽痛',
    exam: '舌红，苔薄黄，脉浮数',
    diagnosis: '风热表证',
    treatment: '辛凉解表',
    formula: '银翘散：金银花15g，连翘15g，薄荷6g，牛蒡子9g',
    analysis: '患者发热重、恶寒轻、有汗、脉浮数，为风热表证。'
  },
  {
    id: 3,
    name: '脾虚湿盛案',
    patient: '男，45岁',
    symptoms: '腹胀便溏，食欲不振，肢体困重',
    exam: '舌淡胖，苔白腻，脉濡缓',
    diagnosis: '脾虚湿盛',
    treatment: '健脾利湿',
    formula: '参苓白术散：党参12g，茯苓15g，白术12g，扁豆12g',
    analysis: '患者腹胀便溏、舌淡胖苔白腻，为脾虚湿盛。'
  },
  {
    id: 4,
    name: '肝郁气滞案',
    patient: '女，35岁',
    symptoms: '胸胁胀痛，情志抑郁，月经不调',
    exam: '舌淡红，苔薄白，脉弦',
    diagnosis: '肝郁气滞',
    treatment: '疏肝解郁',
    formula: '逍遥散：柴胡9g，当归9g，白芍12g，茯苓12g',
    analysis: '患者胸胁胀痛、情志抑郁、脉弦，为肝郁气滞。'
  },
  {
    id: 5,
    name: '阴虚火旺案',
    patient: '男，50岁',
    symptoms: '五心烦热，盗汗，口干咽燥',
    exam: '舌红少苔，脉细数',
    diagnosis: '阴虚火旺',
    treatment: '滋阴降火',
    formula: '六味地黄丸：熟地黄24g，山茱萸12g，山药12g',
    analysis: '患者五心烦热、盗汗、舌红少苔，为阴虚火旺。'
  },
  {
    id: 6,
    name: '阳虚水泛案',
    patient: '女，55岁',
    symptoms: '畏寒肢冷，水肿，小便不利',
    exam: '舌淡胖，苔白滑，脉沉细',
    diagnosis: '阳虚水泛',
    treatment: '温阳利水',
    formula: '真武汤：附子9g，茯苓15g，白术12g，生姜9g',
    analysis: '患者畏寒肢冷、水肿、舌淡胖，为阳虚水泛。'
  }
]

const viewCase = (c) => {
  if (user.completedCases.includes(c.id)) {
    currentCase.value = c
  }
}
</script>

<style scoped>
.archive {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.subtitle {
  color: #5a4a3a;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.stat-item {
  text-align: center;
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  padding: 20px 40px;
  border-radius: 12px;
  border: 2px solid #c9b896;
}

.num {
  font-size: 2rem;
  color: #8b5a2b;
  font-weight: bold;
}

.label {
  color: #5a4a3a;
}

.case-list {
  display: grid;
  gap: 15px;
}

.case-item {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.case-item:hover:not(.locked) {
  transform: translateX(5px);
  border-color: #8b5a2b;
}

.case-item.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.case-title {
  font-size: 1.2rem;
  color: #2c1810;
  font-weight: bold;
}

.case-patient {
  color: #5a4a3a;
}

.badge {
  background: #2e8b57;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.badge.locked {
  background: #999;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.case-detail p {
  margin-bottom: 10px;
  color: #2c1810;
}

.analysis {
  background: rgba(255,255,255,0.5);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.modal-content button {
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
