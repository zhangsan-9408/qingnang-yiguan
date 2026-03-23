<template>
  <div class="diagnosis">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🩺</span>
        问诊闯关
      </h1>
      <p class="page-desc">接诊患者，采集四诊信息，辨证论治</p>
    </div>

    <!-- 关卡选择 -->
    <div v-if="!currentCase" class="level-select">
      <div class="level-grid">
        <div 
          v-for="level in levels" 
          :key="level.id"
          class="level-card"
          :class="{ 
            locked: level.id > user.level,
            completed: user.completedCases.includes(level.id)
          }"
          @click="startCase(level)"
        >
          <div class="level-number">第 {{ level.id }} 关</div>
          <div class="level-name">{{ level.name }}</div>
          <div class="level-difficulty">
            <span v-for="n in level.difficulty" :key="n">★</span>
          </div>
          <div class="level-status">
            <span v-if="user.completedCases.includes(level.id)">✓ 已通关</span>
            <span v-else-if="level.id > user.level">🔒 需Lv.{{ level.id }}</span>
            <span v-else>点击开始</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 问诊界面 -->
    <div v-else class="case-interface">
      <div class="case-header">
        <button class="back-btn" @click="exitCase">← 返回</button>
        <div class="case-title">{{ currentCase.name }}</div>
        <div class="case-progress">进度: {{ askedQuestions.length }}/9</div>
      </div>

      <div class="case-content">
        <!-- 患者信息 -->
        <div class="patient-card">
          <div class="patient-avatar">🧑‍⚕️</div>
          <div class="patient-info">
            <div class="patient-basic">
              {{ currentCase.patient.gender }}，{{ currentCase.patient.age }}岁
            </div>
            <div class="patient-complaint">
              <strong>主诉：</strong>{{ currentCase.patient.complaint }}
            </div>
          </div>
        </div>

        <!-- 问诊对话区 -->
        <div class="dialogue-area">
          <div 
            v-for="(msg, index) in dialogue" 
            :key="index"
            class="dialogue-msg"
            :class="msg.type"
          >
            <div class="msg-avatar">{{ msg.type === 'user' ? '👤' : '🧑‍⚕️' }}</div>
            <div class="msg-content">{{ msg.content }}</div>
          </div>
        </div>

        <!-- 问诊选项 -->
        <div v-if="!showDiagnosis" class="question-options">
          <h4>请选择问诊问题：</h4>
          <div class="option-grid">
            <button 
              v-for="q in availableQuestions" 
              :key="q.id"
              class="option-btn"
              :disabled="askedQuestions.includes(q.id)"
              @click="askQuestion(q)"
            >
              {{ q.text }}
              <span v-if="askedQuestions.includes(q.id)" class="asked-mark">✓</span>
            </button>
          </div>
          <button 
            class="diagnosis-btn"
            :disabled="askedQuestions.length < 3"
            @click="showDiagnosis = true"
          >
            已有足够信息，开始辨证
          </button>
        </div>

        <!-- 辨证输入 -->
        <div v-else class="diagnosis-input">
          <h4>请给出辨证结论：</h4>
          <div class="input-group">
            <label>证型：</label>
            <select v-model="diagnosisResult.type">
              <option value="">请选择证型</option>
              <option v-for="type in syndromeTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="input-group">
            <label>治法：</label>
            <input v-model="diagnosisResult.treatment" placeholder="如：辛温解表" />
          </div>
          <div class="input-group">
            <label>方剂：</label>
            <input v-model="diagnosisResult.formula" placeholder="如：麻黄汤" />
          </div>
          <button class="submit-btn" @click="submitDiagnosis">提交辨证</button>
        </div>
      </div>
    </div>

    <!-- 结果弹窗 -->
    <div v-if="showResult" class="result-modal">
      <div class="result-content">
        <h3>{{ isCorrect ? '🎉 辨证正确！' : '❌ 还需努力' }}</h3>
        <div class="result-details">
          <div class="result-item">
            <span>你的答案：</span>
            <span>{{ diagnosisResult.type || '未填写' }}</span>
          </div>
          <div class="result-item">
            <span>正确答案：</span>
            <span>{{ currentCase.correctAnswer.type }}</span>
          </div>
          <div class="result-analysis">
            <h4>解析：</h4>
            <p>{{ currentCase.analysis }}</p>
          </div>
        </div>
        <div class="result-rewards" v-if="isCorrect">
          <div class="reward">经验 +20</div>
          <div class="reward">银两 +10</div>
          <div class="reward">声望 +5</div>
        </div>
        <button class="close-btn" @click="closeResult">{{ isCorrect ? '下一关' : '重新挑战' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()

// 关卡数据
const levels = [
  { id: 1, name: '风寒感冒', difficulty: 1 },
  { id: 2, name: '风热感冒', difficulty: 1 },
  { id: 3, name: '脾虚湿盛', difficulty: 2 },
  { id: 4, name: '肝郁气滞', difficulty: 2 },
  { id: 5, name: '阴虚火旺', difficulty: 3 },
  { id: 6, name: '阳虚水泛', difficulty: 3 }
]

// 状态
const currentCase = ref(null)
const dialogue = ref([])
const askedQuestions = ref([])
const showDiagnosis = ref(false)
const showResult = ref(false)
const isCorrect = ref(false)

// 辨证结果
const diagnosisResult = ref({ type: '', treatment: '', formula: '' })

// 证型选项
const syndromeTypes = [
  '风寒表证', '风热表证', '风寒犯肺', '风热犯肺',
  '脾虚湿盛', '肝郁气滞', '阴虚火旺', '阳虚水泛',
  '气血两虚', '痰湿内阻'
]

// 可用问题
const availableQuestions = [
  { id: 1, text: '怕冷还是怕热？', key: 'temperature' },
  { id: 2, text: '出汗吗？', key: 'sweat' },
  { id: 3, text: '口干吗？想喝水吗？', key: 'thirst' },
  { id: 4, text: '大便怎么样？', key: 'stool' },
  { id: 5, text: '小便怎么样？', key: 'urine' },
  { id: 6, text: '睡眠怎么样？', key: 'sleep' },
  { id: 7, text: '胃口怎么样？', key: 'appetite' },
  { id: 8, text: '看看舌苔？', key: 'tongue' },
  { id: 9, text: '摸摸脉象？', key: 'pulse' }
]

// 开始病例
const startCase = (level) => {
  if (level.id > user.level) return
  
  currentCase.value = {
    id: level.id,
    name: level.name,
    patient: { gender: '男', age: 28, complaint: '恶寒发热，头痛身痛' },
    answers: {
      temperature: '怕冷明显，发热轻',
      sweat: '无汗',
      thirst: '口不渴',
      stool: '正常',
      urine: '正常',
      sleep: '因头痛睡眠差',
      appetite: '尚可',
      tongue: '舌淡红，苔薄白',
      pulse: '脉浮紧'
    },
    correctAnswer: { type: '风寒表证', treatment: '辛温解表', formula: '麻黄汤' },
    analysis: '患者恶寒重、发热轻、无汗、脉浮紧，为风寒表证典型表现。风寒外束，卫阳被郁，故恶寒；正邪相争，故发热；寒性收引，腠理闭塞，故无汗。'
  }
  
  dialogue.value = [{ type: 'patient', content: '大夫，我这几天受了凉，浑身发冷，头疼得厉害...' }]
  askedQuestions.value = []
  showDiagnosis.value = false
  diagnosisResult.value = { type: '', treatment: '', formula: '' }
}

// 提问
const askQuestion = (question) => {
  if (askedQuestions.value.includes(question.id)) return
  askedQuestions.value.push(question.id)
  dialogue.value.push({ type: 'user', content: question.text })
  setTimeout(() => {
    dialogue.value.push({ type: 'patient', content: currentCase.value.answers[question.key] })
  }, 300)
}

// 提交辨证
const submitDiagnosis = () => {
  isCorrect.value = diagnosisResult.value.type === currentCase.value.correctAnswer.type
  showResult.value = true
  if (isCorrect.value) {
    user.addExp(20)
    user.addSilver(10)
    user.addReputation(5)
    user.completeCase(currentCase.value.id)
  }
}

// 关闭结果
const closeResult = () => {
  showResult.value = false
  if (isCorrect.value) {
    currentCase.value = null
  } else {
    askedQuestions.value = []
    showDiagnosis.value = false
    dialogue.value = [{ type: 'patient', content: '大夫，我这几天受了凉，浑身发冷，头疼得厉害...' }]
  }
}

// 退出病例
const exitCase = () => {
  currentCase.value = null
}
</script>

<style scoped>
.diagnosis {
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

.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.level-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid #c9b896;
  transition: all 0.3s;
}

.level-card:hover:not(.locked) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 90, 43, 0.2);
  border-color: #8b5a2b;
}

.level-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
  background: #e0d8cc;
}

.level-card.completed {
  border-color: #2e8b57;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.level-number {
  font-size: 1.2rem;
  color: #8b5a2b;
  font-weight: 600;
}

.level-name {
  font-size: 1.1rem;
  color: #2c1810;
  margin: 0.5rem 0;
}

.level-difficulty {
  color: #d4a574;
  margin-bottom: 0.5rem;
}

.level-status {
  font-size: 0.85rem;
  color: #5a4a3a;
}

.case-interface {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  border: 2px solid #c9b896;
  overflow: hidden;
}

.case-header {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 100%);
  color: #d4a574;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  background: transparent;
  border: 1px solid #d4a574;
  color: #d4a574;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.case-content {
  padding: 1.5rem;
}

.patient-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.5);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #d4c4a8;
}

.patient-avatar {
  font-size: 2.5rem;
}

.patient-basic {
  color: #5a4a3a;
  font-size: 0.9rem;
}

.patient-complaint {
  color: #2c1810;
  font-weight: 600;
}

.dialogue-area {
  background: rgba(255,255,255,0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.dialogue-msg {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.dialogue-msg.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  font-size: 1.5rem;
}

.msg-content {
  background: rgba(139, 90, 43, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 70%;
}

.dialogue-msg.user .msg-content {
  background: rgba(46, 139, 87, 0.1);
}

.question-options h4 {
  color: #2c1810;
  margin-bottom: 0.75rem;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.option-btn {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 1px solid #c9b896;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.option-btn:hover:not(:disabled) {
  border-color: #8b5a2b;
  background: linear-gradient(135deg, #d4a574 0%, #c9b896 100%);
}

.option-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.asked-mark {
  position: absolute;
  right: 8px;
  color: #2e8b57;
}

.diagnosis-btn {
  width: 100%;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.diagnosis-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.diagnosis-input h4 {
  color: #2c1810;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  color: #5a4a3a;
  margin-bottom: 0.25rem;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #c9b896;
  border-radius: 6px;
  background: white;
  font-family: inherit;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #2e8b57 0%, #3cb371 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.result-modal {
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

.result-content {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  border: 3px solid #8b5a2b;
}

.result-content h3 {
  text-align: center;
  color: #2c1810;
  margin-bottom: 1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #d4c4a8;
}

.result-analysis {
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
}

.result-analysis h4 {
  color: #8b5a2b;
  margin-bottom: 0.5rem;
}

.result-rewards {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.reward {
  background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.close-btn {
  width: 100%;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
