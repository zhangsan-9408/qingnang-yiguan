import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const name = ref('张学徒')
  const level = ref(1)
  const exp = ref(0)
  const reputation = ref(0)
  const silver = ref(50)
  const streak = ref(1)
  const title = ref('初入医馆')
  
  // 学习进度
  const completedCases = ref([])
  const completedLessons = ref([])
  const weakPoints = ref([])
  
  // 成就
  const achievements = ref([])
  
  // 计算属性
  const expToNextLevel = computed(() => level.value * 100)
  const expProgress = computed(() => (exp.value / expToNextLevel.value) * 100)
  
  // 方法
  const addExp = (amount) => {
    exp.value += amount
    if (exp.value >= expToNextLevel.value) {
      levelUp()
    }
  }
  
  const levelUp = () => {
    exp.value -= expToNextLevel.value
    level.value++
    reputation.value += 10
    
    // 升级提示
    const titles = {
      2: '见习郎中',
      5: '正式郎中',
      10: '名医',
      20: '神医'
    }
    if (titles[level.value]) {
      title.value = titles[level.value]
    }
  }
  
  const addReputation = (amount) => {
    reputation.value += amount
  }
  
  const addSilver = (amount) => {
    silver.value += amount
  }
  
  const completeCase = (caseId) => {
    if (!completedCases.value.includes(caseId)) {
      completedCases.value.push(caseId)
    }
  }
  
  const completeLesson = (lessonId) => {
    if (!completedLessons.value.includes(lessonId)) {
      completedLessons.value.push(lessonId)
    }
  }
  
  const addWeakPoint = (point) => {
    if (!weakPoints.value.includes(point)) {
      weakPoints.value.push(point)
    }
  }
  
  const unlockAchievement = (achievement) => {
    if (!achievements.value.find(a => a.id === achievement.id)) {
      achievements.value.push(achievement)
      reputation.value += achievement.reward
    }
  }
  
  return {
    name,
    level,
    exp,
    reputation,
    silver,
    streak,
    title,
    completedCases,
    completedLessons,
    weakPoints,
    achievements,
    expToNextLevel,
    expProgress,
    addExp,
    addReputation,
    addSilver,
    completeCase,
    completeLesson,
    addWeakPoint,
    unlockAchievement
  }
})
