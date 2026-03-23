<template>
  <div class="study">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📚</span>
        学习修炼
      </h1>
      <p class="page-desc">研读经典，提升修为</p>
    </div>

    <div class="course-grid">
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="course-card"
        :class="{ completed: user.completedLessons.includes(course.id) }"
      >
        <div class="course-icon">{{ course.icon }}</div>
        <h3 class="course-name">{{ course.name }}</h3>
        <p class="course-desc">{{ course.description }}</p>
        <div class="course-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: getProgress(course.id) + '%' }"></div>
          </div>
          <span class="progress-text">{{ getProgress(course.id) }}%</span>
        </div>
        <button 
          class="start-btn"
          :disabled="user.completedLessons.includes(course.id)"
          @click="startLesson(course)"
        >
          {{ user.completedLessons.includes(course.id) ? '已完成' : '开始学习' }}
        </button>
      </div>
    </div>

    <!-- 学习弹窗 -->
    <div v-if="currentLesson" class="lesson-modal">
      <div class="lesson-content">
        <div class="lesson-header">
          <h3>{{ currentLesson.name }}</h3>
          <button class="close-btn" @click="closeLesson">×</button>
        </div>
        <div class="lesson-body">
          <div class="lesson-text" v-html="currentLesson.content"></div>
          <div class="quiz-section" v-if="currentLesson.quiz">
            <h4>随堂测试</h4>
            <div v-for="(q, index) in currentLesson.quiz" :key="index" class="quiz-item">
              <p class="quiz-question">{{ index + 1 }}. {{ q.question }}</p>
              <div class="quiz-options">
                <button 
                  v-for="opt in q.options" 
                  :key="opt"
                  class="quiz-option"
                  :class="{ 
                    selected: answers[index] === opt,
                    correct: showAnswer && opt === q.answer,
                    wrong: showAnswer && answers[index] === opt && opt !== q.answer
                  }"
                  @click="selectAnswer(index, opt)"
                  :disabled="showAnswer"
                >
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="lesson-footer">
          <button 
            class="submit-quiz"
            v-if="currentLesson.quiz && !showAnswer"
            @click="submitQuiz"
          >
            提交答案
          </button>
          <button 
            class="complete-btn"
            v-if="!currentLesson.quiz || showAnswer"
            @click="completeLesson"
          >
            {{ quizCorrect ? '完成学习' : '重新学习' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()

const courses = [
  {
    id: 1,
    name: '阴阳学说',
    icon: '☯️',
    description: '中医理论的基石，认识阴阳对立统一',
    content: `
      <h4>一、阴阳的基本概念</h4>
      <p>阴阳是中国古代哲学的一对范畴，是对自然界相互关联的事物和现象对立双方属性的概括。</p>
      <h4>二、阴阳的特性</h4>
      <ul>
        <li><strong>对立制约</strong>：阴阳相互对抗、相互制约</li>
        <li><strong>互根互用</strong>：阴阳相互依存，互为根本</li>
        <li><strong>消长平衡</strong>：阴阳处于不断变化中</li>
        <li><strong>相互转化</strong>：阴阳可向对立面转化</li>
      </ul>
      <h4>三、阴阳在人体的表现</h4>
      <p>上部为阳，下部为阴；体表为阳，体内为阴；六腑为阳，五脏为阴。</p>
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
    description: '木火土金水，相生相克规律',
    content: '<p>五行学说是中国古代哲学的重要组成部分...</p>',
    quiz: null
  },
  {
    id: 3,
    name: '藏象学说',
    icon: '🫀',
    description: '五脏六腑的生理功能与相互关系',
    content: '<p>藏象学说是中医理论的核心...</p>',
    quiz: null
  },
  {
    id: 4,
    name: '舌诊基础',
    icon: '👅',
    description: '望舌质、舌苔，辨寒热虚实',
    content: '<p>舌诊是中医望诊的重要组成部分...</p>',
    quiz: null
  },
  {
    id: 5,
    name: '脉诊入门',
    icon: '💓',
    description: '二十八脉象的辨识与主病',
    content: '<p>脉诊是中医诊断的重要手段...</p>',
    quiz: null
  },
  {
    id: 6,
    name: '八纲辨证',
    icon: '🎯',
    description: '表里寒热虚实阴阳的辨析',
    content: '<p>八纲辨证是中医辨证的总纲...</p>',
    quiz: null
  }
]

const currentLesson = ref(null)
const answers = ref({})
const showAnswer = ref(false)
const quizCorrect = ref(false)

const getProgress = (courseId) => {
  return user.completedLessons.includes(courseId) ? 100 : 0
}

const startLesson = (course) => {
  currentLesson.value = course
  answers.value = {}
  showAnswer.value = false
  quizCorrect.value = false
}

const closeLesson = () => {
  currentLesson.value = null
}

const selectAnswer = (index, option) => {
  answers.value[index] = option
}

const submitQuiz = () => {
  showAnswer.value = true
  const quiz = currentLesson.value.quiz
  let correct = 0
  quiz.forEach((q, index) => {
    if (answers.value[index] === q.answer) correct++
  })
  quizCorrect.value = correct === quiz.length
}

const completeLesson = () => {
  if (quizCorrect.value || !currentLesson.value.quiz) {
    user.completeLesson(currentLesson.value.id)
    user.addExp(15)
    user.addReputation(5)
    closeLesson()
  } else {
    answers.value = {}
    showAnswer.value = false
  }
}
</script>

<style scoped>
.study {
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

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.course-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #c9b896;
  transition: all 0.3s;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 90, 43, 0.2);
}

.course-card.completed {
  border-color: #2e8b57;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.course-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.course-name {
  color: #2c1810;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.course-desc {
  color: #5a4a3a;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.course-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5a2b 0%, #d4a574 100%);
  border-radius: 4px;
  transition: width 0.5s;
}

.progress-text {
  color: #8b5a2b;
  font-size: 0.85rem;
  font-weight: 600;
}

.start-btn {
  width: 100%;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.start-btn:disabled {
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
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  border: 3px solid #8b5a2b;
}

.lesson-header {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 100%);
  color: #d4a574;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-header h3 {
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #d4a574;
  font-size: 1.5rem;
  cursor: pointer;
}

.lesson-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.lesson-text {
  color: #2c1810;
  line-height: 1.6;
}

.lesson-text h4 {
  color: #8b5a2b;
  margin: 1rem 0 0.5rem;
}

.quiz-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #d4c4a8;
}

.quiz-section h4 {
  color: #8b5a2b;
  margin-bottom: 1rem;
}

.quiz-item {
  margin-bottom: 1rem;
}

.quiz-question {
  color: #2c1810;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quiz-option {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 1px solid #c9b896;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
}

.quiz-option:hover:not(:disabled) {
  border-color: #8b5a2b;
}

.quiz-option.selected {
  border-color: #8b5a2b;
  background: linear-gradient(135deg, #d4a574 0%, #c9b896 100%);
}

.quiz-option.correct {
  border-color: #2e8b57;
  background: rgba(46, 139, 87, 0.2);
}

.quiz-option.wrong {
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.2);
}

.lesson-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #d4c4a8;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.submit-quiz,
.complete-btn {
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}
</style>