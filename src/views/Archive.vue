<template>
  <div class="archive">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📜</span>
        医案典藏
      </h1>
      <p class="page-desc">收藏医案，温故知新</p>
    </div>

    <div class="archive-stats">
      <div class="stat-item">
        <div class="stat-number">{{ user.completedCases.length }}</div>
        <div class="stat-label">已收藏医案</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalCases }}</div>
        <div class="stat-label">总医案数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ Math.round((user.completedCases.length / totalCases) * 100) }}%</div>
        <div class="stat-label">完成度</div>
      </div>
    </div>

    <div class="case-list">
      <div 
        v-for="caseItem in caseList" 
        :key="caseItem.id"
        class="case-card"
        :class="{ 
          unlocked: user.completedCases.includes(caseItem.id),
          locked: !user.completedCases.includes(caseItem.id)
        }"
      >
        <div class="case-header">
          <div class="case-title">{{ caseItem.name }}</div>
          <div class="case-badge" v-if="user.completedCases.includes(caseItem.id)">✓ 已解锁</div>
          <div class="case-badge locked" v-else>🔒 未解锁</div>
        </div>
        <div class="case-body">
          <div class="case-patient">
            <strong>患者：</strong>{{ caseItem.patient }}
          </div>
          <div class="case-symptoms">
            <strong>主症：</strong>{{ caseItem.symptoms }}
          </div>
          <div class="case-diagnosis" v-if="user.completedCases.includes(caseItem.id)">
            <strong>辨证：</strong>{{ caseItem.diagnosis }}
          </div>
          <div class="case-treatment" v-if="user.completedCases.includes(caseItem.id)">
            <strong>治法：</strong>{{ caseItem.treatment }}
          </div>
        </div>
        <div class="case-footer" v-if="user.completedCases.includes(caseItem.id)">
          <button class="review-btn" @click="reviewCase(caseItem)">复习医案</button>
        </div>
      </div>
    </div>

    <!-- 复习弹窗 -->
    <div v-if="currentCase" class="review-modal">
      <div class="review-content">
        <div class="review-header">
          <h3>{{ currentCase.name }}</h3>
          <button class="close-btn" @click="closeReview">×</button>
        </div>
        <div class="review-body">
          <div class="review-section">
            <h4>【患者信息】</h4>
            <p>{{ currentCase.patient }}</p>
          </div>
          <div class="review-section">
            <h4>【主症】</h4>
            <p>{{ currentCase.symptoms }}</p>
          </div>
          <div class="review-section">
            <h4>【四诊信息】</h4>
            <p>{{ currentCase.fourExams }}</p>
          </div>
          <div class="review-section">
            <h4>【辨证】</h4>
            <p>{{ currentCase.diagnosis }}</p>
          </div>
          <div class="review-section">
            <h4>【治法】</h4>
            <p>{{ currentCase.treatment }}</p>
          </div>
          <div class="review-section">
            <h4>【方药】</h4>
            <p>{{ currentCase.formula }}</p>
          </div>
          <div class="review-section analysis">
            <h4>【医案分析】</h4>
            <p>{{ currentCase.analysis }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()

const caseList = [
  {
    id: 1,
    name: '风寒感冒案',
    patient: '男，28岁',
    symptoms: '恶寒发热，头痛身痛，无汗',
    fourExams: '舌淡红，苔薄白，脉浮紧',
    diagnosis: '风寒表证',
    treatment: '辛温解表',
    formula: '麻黄汤：麻黄9g，桂枝6g，杏仁9g，甘草3g',
    analysis: '患者恶寒重、发热轻、无汗、脉浮紧，为风寒表证典型表现。麻黄汤中麻黄发汗解表，桂枝温经散寒，杏仁宣肺止咳，甘草调和诸药。'
  },
  {
    id: 2,
    name: '风热感冒案',
    patient: '女，32岁',
    symptoms: '发热重，恶寒轻，有汗，咽痛',
    fourExams: '舌红，苔薄黄，脉浮数',
    diagnosis: '风热表证',
    treatment: '辛凉解表',
    formula: '银翘散：金银花15g，连翘15g，薄荷6g，牛蒡子9g',
    analysis: '患者发热重、恶寒轻、有汗、脉浮数，为风热表证。银翘散中金银花、连翘清热解毒，薄荷、牛蒡子疏散风热。'
  },
  {
    id: 3,
    name: '脾虚湿盛案',
    patient: '男，45岁',
    symptoms: '腹胀便溏，食欲不振，肢体困重',
    fourExams: '舌淡胖，苔白腻，脉濡缓',
    diagnosis: '脾虚湿盛',
    treatment: '健脾利湿',
    formula: '参苓白术散：党参12g，茯苓15g，白术12g，扁豆12g',
    analysis: '患者腹胀便溏、舌淡胖苔白腻，为脾虚湿盛。参苓白术散健脾益气，渗湿止泻。'
  },
  {
    id: 4,
    name: '肝郁气滞案',
    patient: '女，35岁',
    symptoms: '胸胁胀痛，情志抑郁，月经不调',
    fourExams: '舌淡红，苔薄白，脉弦',
    diagnosis: '肝郁气滞',
    treatment: '疏肝解郁',
    formula: '逍遥散：柴胡9g，当归9g，白芍12g，茯苓12g',
    analysis: '患者胸胁胀痛、情志抑郁、脉弦，为肝郁气滞。逍遥散疏肝解郁，健脾和营。'
  },
  {
    id: 5,
    name: '阴虚火旺案',
    patient: '男，50岁',
    symptoms: '五心烦热，盗汗，口干咽燥',
    fourExams: '舌红少苔，脉细数',
    diagnosis: '阴虚火旺',
    treatment: '滋阴降火',
    formula: '六味地黄丸：熟地黄24g，山茱萸12g，山药12g',
    analysis: '患者五心烦热、盗汗、舌红少苔，为阴虚火旺。六味地黄丸滋阴补肾，清热降火。'
  },
  {
    id: 6,
    name: '阳虚水泛案',
    patient: '女，55岁',
    symptoms: '畏寒肢冷，水肿，小便不利',
    fourExams: '舌淡胖，苔白滑，脉沉细',
    diagnosis: '阳虚水泛',
    treatment: '温阳利水',
    formula: '真武汤：附子9g，茯苓15g，白术12g，生姜9g',
    analysis: '患者畏寒肢冷、水肿、舌淡胖，为阳虚水泛。真武汤温阳利水，健脾渗湿。'
  }
]

const totalCases = computed(() => caseList.length)

const currentCase = ref(null)

const reviewCase = (caseItem) => {
  currentCase.value = caseItem
}

const closeReview = () => {
  currentCase.value = null
}
</script>

<style scoped>
.archive {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.8rem;
  color: #2c1810;
  margin-bottom: 0.5rem;
}

.title-icon {
  font-size: 2rem;
}

.page-desc {
  color: #5a4a3a;
}

.archive-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  border: 2px solid #c9b896;
}

.stat-number {
  font-size: 2rem;
  color: #8b5a2b;
  font-weight: 700;
}

.stat-label {
  color: #5a4a3a;
  font-size: 0.9rem;
}

.case-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.case-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #c9b896;
  transition: all 0.3s;
}

.case-card.locked {
  opacity: 0.7;
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.case-title {
  font-size: 1.2rem;
  color: #2c1810;
  font-weight: 600;
}

.case-badge {
  background: #2e8b57;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.case-badge.locked {
  background: #999;
}

.case-body {
  color: #5a4a3a;
  margin-bottom: 1rem;
}

.case-body > div {
  margin-bottom: 0.5rem;
}

.review-btn {
  width: 100%;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
}

.review-modal {
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

.review-content {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  border: 3px solid #8b5a2b;
}

.review-header {
  background: linear-gradient(