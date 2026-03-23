<template>
  <div class="study">
    <h1>📚 学习修炼</h1>
    <p class="subtitle">研读经典，提升修为</p>

    <div class="course-list">
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="course-card"
        :class="{ completed: user.completedLessons.includes(course.id) }"
      >
        <div class="course-icon">{{ course.icon }}</div>
        <h3>{{ course.name }}</h3>
        <p>{{ course.desc }}</p>
        <button 
          :disabled="user.completedLessons.includes(course.id)"
          @click="startCourse(course)"
        >
          {{ user.completedLessons.includes(course.id) ? '已完成' : '开始学习' }}
        </button>
      </div>
    </div>

    <div v-if="currentCourse" class="lesson-modal">
      <div class="lesson-content">
        <h2>{{ currentCourse.name }}</h2>
        <div class="lesson-text" v-html="currentCourse.content"></div>
        
        <div v-if="currentCourse.quiz" class="quiz">
          <h3>随堂测试</h3>
          <div v-for="(q, i) in currentCourse.quiz" :key="i" class="quiz-item">
            <p>{{ i+1 }}. {{ q.question }}</p>
            <div class="options">
              <button 
                v-for="opt in q.options" 
                :key="opt"
                :class="{ selected: answers[i] === opt }"
                @click="answers[i] = opt"
              >
                {{ opt }}
              </button>
            </div>
          </div>
          <button class="submit-btn" @click="submitQuiz">提交答案</button>
        </div>
        
        <button v-else class="complete-btn" @click="complete">完成学习</button>
        <button class="close-btn" @click="currentCourse = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const currentCourse = ref(null)
const answers = ref({})

const courses = [
  {
    id: 1,
    name: '阴阳学说',
    icon: '☯️',
    desc: '中医理论的基石',
    content: `
      <h4>阴阳的基本概念</h4>
      <p>阴阳是对自然界相互关联的事物和现象对立双方属性的概括。</p>
      <h4>阴阳的特性</h4>
      <ul>
        <li><b>对立制约</b>：阴阳相互对抗、相互制约</li>
        <li><b>互根互用</b>：阴阳相互依存，互为根本</li>
        <li><b>消长平衡</b>：阴阳处于不断变化中</li>
        <li><b>相互转化</b>：阴阳可向对立面转化</li>
      </ul>
    `,
    quiz: [
      {
        question: '"阴平阳秘，精神乃治"体现的是阴阳的什么关系？',
        options: ['对立制约', '互根互用', '消长平衡', '相互转化'],
        answer: '消长平衡'
      },
      {
        question: '下列哪项属阳？',
        options: ['寒凉', '静止', '兴奋', '抑制'],
        answer: '兴奋'
      }
    ]
  },
  {
    id: 2,
    name: '五行学说',
    icon: '🌳',
    desc: '木火土金水相生相克',
    content: '<p>五行学说是中国古代哲学的重要组成部分...</p>',
    quiz: null
  },
  {
    id: 3,
    name: '藏象学说',
    icon: '🫀',
    desc: '五脏六腑的生理功能',
    content: '<p>藏象学说是中医理论的核心...</p>',
    quiz: null
  },
  {
    id: 4,
    name: '舌诊基础',
    icon: '👅',
    desc: '望舌质舌苔辨寒热',
    content: '<p>舌诊是中医望诊的重要组成部分...</p>',
    quiz: null
  },
  {
    id: 5,
    name: '脉诊入门',
    icon: '💓',
    desc: '二十八脉象辨识',
    content: '<p>脉诊是中医诊断的重要手段...</p>',
    quiz: null
  },
  {
    id: 6,
    name: '八纲辨证',
    icon: '🎯',
    desc: '表里寒热虚实阴阳',
    content: '<p>八纲辨证是中医辨证的总纲...</p>',
    quiz: null
  }
]

const startCourse = (course) => {
  currentCourse.value = course
  answers.value = {}
}

const submitQuiz = () => {
  const quiz = currentCourse.value.quiz
  let correct = 0
  quiz.forEach((q, i) => {
    if (answers.value[i] === q.answer) correct++
  })
  if (correct === quiz.length) {
    alert(`🎉 测试通过！获得经验+15，声望+5`)
    user.completeLesson(currentCourse.value.id)
    user.addExp(15)
    user.addReputation(5)
    currentCourse.value = null
  } else {
    alert(`❌ 答对 ${correct}/${quiz.length} 题，请重新学习`)
  }
}

const complete = () => {
  alert('🎉 学习完成！获得经验+15，声望+5')
  user.completeLesson(currentCourse.value.id)
  user.addExp(15)
  user.addReputation(5)
  currentCourse.value = null
}
</script>

<style scoped>
.study {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.subtitle {
  color: #5a4a3a;
  margin-bottom: 20px;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.course-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
}

.course-card.completed {
  border-color: #2e8b57;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.course-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.course-card h3 {
  color: #2c1810;
  margin: 10px 0;
}

.course-card p {
  color: #5a4a3a;
  margin-bottom: 15px;
}

.course-card button {
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.course-card button:disabled {
  background: #999;
  cursor: not-allowed;
}

.lesson-modal {
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

.lesson-content {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.lesson-text {
  color: #2c1810;
  line-height: 1.6;
}

.lesson-text h4 {
  color: #8b5a2b;
  margin-top: 20px;
}

.quiz {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #c9b896;
}

.quiz-item {
  margin-bottom: 15px;
}

.quiz-item p {
  font-weight: bold;
  color: #2c1810;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.options button {
  background: white;
  border: 1px solid #c9b896;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
}

.options button.selected {
  background: #d4a574;
  border-color: #8b5a2b;
}

.submit-btn, .complete-btn {
  background: linear-gradient(135deg, #2e8b57 0%, #3cb371 100%) !important;
  color: white;
  margin-top: 20px;
}

.close-btn {
  background: #999 !important;
  margin-top: 10px;
}
</style>
