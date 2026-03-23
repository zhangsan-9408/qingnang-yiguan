<template>
  <div class="profile">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">👤</span>
        个人成长
      </h1>
      <p class="page-desc">查看修为，回顾成就</p>
    </div>

    <!-- 用户信息卡 -->
    <div class="user-card">
      <div class="avatar-section">
        <div class="avatar">🧑‍⚕️</div>
        <div class="user-title">{{ user.title }}</div>
      </div>
      <div class="info-section">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-level">Lv.{{ user.level }}</div>
        <div class="exp-bar">
          <div class="exp-fill" :style="{ width: user.expProgress + '%' }"></div>
        </div>
        <div class="exp-text">{{ user.exp }} / {{ user.expToNextLevel }} EXP</div>
      </div>
      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">{{ user.reputation }}</div>
          <div class="stat-label">声望</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">💰</div>
          <div class="stat-value">{{ user.silver }}</div>
          <div class="stat-label">银两</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">{{ user.streak }}</div>
          <div class="stat-label">连续天数</div>
        </div>
      </div>
    </div>

    <!-- 学习统计 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-icon">📚</span>
          <span>学习进度</span>
        </div>
        <div class="stat-body">
          <div class="progress-item">
            <span>已完成课程</span>
            <span class="progress-value">{{ user.completedLessons.length }} / 20</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (user.completedLessons.length / 20 * 100) + '%' }"></div>
          </div>
          <div class="progress-item">
            <span>已通关病例</span>
            <span class="progress-value">{{ user.completedCases.length }} / 50</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (user.completedCases.length / 50 * 100) + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-icon">🎯</span>
          <span>能力评估</span>
        </div>
        <div class="stat-body">
          <div class="ability-item">
            <span>阴阳感知</span>
            <div class="ability-bar">
              <div class="ability-fill" style="width: 60%"></div>
            </div>
          </div>
          <div class="ability-item">
            <span>舌诊能力</span>
            <div class="ability-bar">
              <div class="ability-fill" style="width: 40%"></div>
            </div>
          </div>
          <div class="ability-item">
            <span>脉诊能力</span>
            <div class="ability-bar">
              <div class="ability-fill" style="width: 30%"></div>
            </div>
          </div>
          <div class="ability-item">
            <span>辨证能力</span>
            <div class="ability-bar">
              <div class="ability-fill" style="width: 50%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成就展示 -->
    <div class="achievements">
      <h2 class="section-title">
        <span class="title-icon">🏆</span>
        成就徽章
      </h2>
      <div class="badge-grid">
        <div 
          v-for="badge in badges" 
          :key="badge.id"
          class="badge-item"
          :class="{ unlocked: badge.unlocked }"
        >
          <div class="badge-icon">{{ badge.icon }}</div>
          <div class="badge-name">{{ badge.name }}</div>
          <div class="badge-desc">{{ badge.description }}</div>
        </div>
      </div>
    </div>

    <!-- 学习日历 -->
    <div class="calendar">
      <h2 class="section-title">
        <span class="title-icon">📅</span>
        学习日历
      </h2>
      <div class="calendar-grid">
        <div v-for="day in 30" :key="day" class="calendar-day" :class="{ active: day <= user.streak }">
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const user = useUserStore()

const badges = [
  { id: 1, icon: '🌱', name: '初入医馆', description: '完成首次学习', unlocked: true },
  { id: 2, icon: '📖', name: '勤学苦练', description: '连续学习7天', unlocked: user.streak >= 7 },
  { id: 3, icon: '💡', name: '恍然大悟', description: '单次测试全对', unlocked: false },
  { id: 4, icon: '🩺', name: '初出茅庐', description: '通关首个病例', unlocked: user.completedCases.length >= 1 },
  { id: 5, icon: '🏥', name: '小有所成', description: '通关10个病例', unlocked: user.completedCases.length >= 10 },
  { id: 6, icon: '⭐', name: '名医风采', description: '达到10级', unlocked: user.level >= 10 },
  { id: 7, icon: '🔥', name: '持之以恒', description: '连续学习30天', unlocked: user.streak >= 30 },
  { id: 8, icon: '👑', name: '神医再世', description: '通关所有病例', unlocked: user.completedCases.length >= 50 }
]
</script>

<style scoped>
.profile {
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

.user-card {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 100%);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  border: 3px solid #8b5a2b;
}

.avatar-section {
  text-align: center;
}

.avatar {
  font-size: 4rem;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #d4a574;
  margin-bottom: 0.5rem;
}

.user-title {
  color: #d4a574;
  font-size: 0.9rem;
}

.info-section {
  flex: 1;
}

.user-name {
  color: #d4a574;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-level {
  color: #a89078;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.exp-bar {
  width: 200px;
  height: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #d4a574 0%, #8b5a2b 100%);
  border-radius: 5px;
  transition: width 0.5s;
}

.exp-text {
  color: #a89078;
  font-size: 0.8rem;
}

.stats-section {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  color: #d4a574;
  font-size: 1.3rem;
  font-weight: 600;
}

.stat-label {
  color: #a89078;
  font-size: 0.8rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #c9b896;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c1810;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.stat-icon {
  font-size: 1.3rem;
}

.progress-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  color: #5a4a3a;
}

