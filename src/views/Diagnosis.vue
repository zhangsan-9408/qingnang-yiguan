<template>
  <div class="diagnosis">
    <h1>🩺 问诊闯关</h1>
    <p class="subtitle">接诊患者，辨证论治</p>

    <div v-if="!currentCase" class="level-list">
      <div 
        v-for="level in levels" 
        :key="level.id"
        class="level-card"
        :class="{ locked: level.id > user.level }"
        @click="startLevel(level)"
      >
        <div class="level-num">第 {{ level.id }} 关</div>
        <div class="level-name">{{ level.name }}</div>
        <div class="stars">{{ '★'.repeat(level.difficulty) }}</div>
        <div class="status">
          <span v-if="level.id <= user.level">点击开始</span>
          <span v-else>需 Lv.{{ level.id }}</span>
        </div>
      </div>
    </div>

    <div v-else class="case-panel">
      <button class="back-btn" @click="currentCase = null">← 返回</button>
      <h2>{{ currentCase.name }}</h2>
      
      <div class="patient">
        <div class="patient-avatar">🧑‍⚕️</div>
        <div class="patient-info">
          <p><strong>患者：</strong>{{ currentCase.patient.gender }}，{{ currentCase.patient.age }}岁</p>
          <p><strong>主诉：</strong>{{ currentCase.patient.complaint }}</p>
        </div>
      </div>

      <div class="dialogue">
        <div v-for="(msg, i) in messages" :key="i" :class="['msg', msg.type]">
          {{ msg.content }}
        </div>
      </div>

      <div class="actions">
        <button 
          v-for="q in questions" 
          :key="q.id"
          @click="ask(q)"
          :disabled="asked.includes(q.id)"
        >
          {{ q.text }}
        </button>
        <button class="diagnosis-btn" @click="showAnswer = true">开始辨证</button>
      </div>

      <div v-if="showAnswer" class="answer-panel">
        <h3>请选择证型：</h3>
        <select v-model="answer">
          <option value="">请选择</option>
          <option v-for="t in syndromes" :key="t" :value="t">{{ t }}</option>
        </select>
        <button @click="submit">提交答案</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const currentCase = ref(null)
const messages = ref([])
const asked = ref([])
const showAnswer = ref(false)
const answer = ref('')

const levels = [
  { id: 1, name: '风寒感冒', difficulty: 1 },
  { id: 2, name: '风热感冒', difficulty: 1 },
  { id: 3, name: '脾虚湿盛', difficulty: 2 },
  { id: 4, name: '肝郁气滞', difficulty: 2 },
  { id: 5, name: '阴虚火旺', difficulty: 3 },
  { id: 6, name: '阳虚水泛', difficulty: 3 }
]

const syndromes = ['风寒表证', '风热表证', '脾虚湿盛', '肝郁气滞', '阴虚火旺', '阳虚水泛']

const questions = [
  { id: 1, text: '怕冷还是怕热？', key: 'temp' },
  { id: 2, text: '出汗吗？', key: 'sweat' },
  { id: 3, text: '口干吗？', key: 'thirst' },
  { id: 4, text: '大便如何？', key: 'stool' },
  { id: 5, text: '睡眠怎么样？', key: 'sleep' },
  { id: 6, text: '看看舌苔？', key: 'tongue' }
]

const startLevel = (level) => {
  if (level.id > user.level) return
  currentCase.value = {
    name: level.name,
    patient: { gender: '男', age: 28, complaint: '恶寒发热，头痛身痛' },
    answers: {
      temp: '怕冷明显，发热轻',
      sweat: '无汗',
      thirst: '口不渴',
      stool: '正常',
      sleep: '因头痛睡眠差',
      tongue: '舌淡红，苔薄白'
    },
    correct: '风寒表证'
  }
  messages.value = [{ type: 'patient', content: '大夫，我这几天受了凉，浑身发冷，头疼得厉害...' }]
  asked.value = []
  showAnswer.value = false
  answer.value = ''
}

const ask = (q) => {
  asked.value.push(q.id)
  messages.value.push({ type: 'user', content: q.text })
  messages.value.push({ type: 'patient', content: currentCase.value.answers[q.key] })
}

const submit = () => {
  if (answer.value === currentCase.value.correct) {
    alert('🎉 回答正确！获得经验+20，银两+10')
    user.addExp(20)
    user.addSilver(10)
    currentCase.value = null
  } else {
    alert('❌ 回答错误，请重新思考')
  }
}
</script>

<style scoped>
.diagnosis {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.subtitle {
  color: #5a4a3a;
  margin-bottom: 20px;
}

.level-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.level-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.level-card:hover:not(.locked) {
  transform: translateY(-5px);
  border-color: #8b5a2b;
}

.level-card.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.level-num {
  color: #8b5a2b;
  font-weight: bold;
}

.level-name {
  font-size: 1.2rem;
  color: #2c1810;
  margin: 10px 0;
}

.stars {
  color: #d4a574;
}

.case-panel {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  padding: 20px;
}

.back-btn {
  background: #8b5a2b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
}

.patient {
  display: flex;
  gap: 15px;
  background: rgba(255,255,255,0.5);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.patient-avatar {
  font-size: 3rem;
}

.dialogue {
  background: rgba(255,255,255,0.3);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 150px;
}

.msg {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
}

.msg.user {
  background: rgba(46, 139, 87, 0.1);
  margin-left: 20%;
}

.msg.patient {
  background: rgba(139, 90, 43, 0.1);
  margin-right: 20%;
}

.actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.actions button {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 1px solid #c9b896;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.diagnosis-btn {
  grid-column: span 3;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%) !important;
  color: white;
}

.answer-panel {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255,255,255,0.5);
  border-radius: 12px;
}

.answer-panel select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #c9b896;
}

.answer-panel button {
  background: linear-gradient(135deg, #2e8b57 0%, #3cb371 100%);
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
