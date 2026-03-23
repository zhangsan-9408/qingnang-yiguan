<template>
  <div class="profile">
    <h1>👤 个人成长</h1>
    <p class="subtitle">查看修为，回顾成就</p>

    <div class="user-card">
      <div class="avatar">🧑‍⚕️</div>
      <div class="info">
        <h2>{{ user.name }}</h2>
        <p class="title">{{ user.title }}</p>
        <div class="level-bar">
          <div class="progress" :style="{ width: user.expProgress + '%' }"></div>
        </div>
        <p class="level-text">Lv.{{ user.level }} | {{ user.exp }}/{{ user.expToNextLevel }} EXP</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="icon">⭐</div>
        <div class="value">{{ user.reputation }}</div>
        <div class="label">声望</div>
      </div>
      <div class="stat-box">
        <div class="icon">💰</div>
        <div class="value">{{ user.silver }}</div>
        <div class="label">银两</div>
      </div>
      <div class="stat-box">
        <div class="icon">🔥</div>
        <div class="value">{{ user.streak }}</div>
        <div class="label">连续天数</div>
      </div>
    </div>

    <div class="progress-section">
      <h3>学习进度</h3>
      <div class="progress-item">
        <span>已完成课程</span>
        <span>{{ user.completedLessons.length }} / 6</span>
      </div>
      <div class="progress-bar">
        <div class="fill" :style="{ width: (user.completedLessons.length / 6 * 100) + '%' }"></div>
      </div>
      <div class="progress-item">
        <span>已通关病例</span>
        <span>{{ user.completedCases.length }} / 6</span>
      </div>
      <div class="progress-bar">
        <div class="fill" :style="{ width: (user.completedCases.length / 6 * 100) + '%' }"></div>
      </div>
    </div>

    <div class="achievements">
      <h3>🏆 成就徽章</h3>
      <div class="badge-grid">
        <div v-for="badge in badges" :key="badge.id" class="badge" :class="{ unlocked: badge.unlocked }">
          <div class="icon">{{ badge.icon }}</div>
          <div class="name">{{ badge.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { computed } from 'vue'

const user = useUserStore()

const badges = computed(() => [
  { id: 1, icon: '🌱', name: '初入医馆', unlocked: true },
  { id: 2, icon: '📖', name: '勤学苦练', unlocked: user.streak >= 7 },
  { id: 3, icon: '🩺', name: '初出茅庐', unlocked: user.completedCases.length >= 1 },
  { id: 4, icon: '🏥', name: '小有所成', unlocked: user.completedCases.length >= 3 },
  { id: 5, icon: '⭐', name: '名医风采', unlocked: user.level >= 5 },
  { id: 6, icon: '👑', name: '神医再世', unlocked: user.completedCases.length >= 6 }
])
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.subtitle {
  color: #5a4a3a;
  margin-bottom: 20px;
}

.user-card {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 100%);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  color: #d4a574;
}

.avatar {
  font-size: 5rem;
}

.info h2 {
  margin: 0;
  color: #d4a574;
}

.title {
  color: #a89078;
  margin: 5px 0;
}

.level-bar {
  width: 200px;
  height: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 5px;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #d4a574 0%, #8b5a2b 100%);
  border-radius: 5px;
}

.level-text {
  color: #a89078;
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-box {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.stat-box .icon {
  font-size: 2rem;
}

.stat-box .value {
  font-size: 1.5rem;
  color: #8b5a2b;
  font-weight: bold;
}

.stat-box .label {
  color: #5a4a3a;
}

.progress-section {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

.progress-section h3 {
  color: #2c1810;
  margin-bottom: 15px;
}

.progress-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #5a4a3a;
}

.progress-bar {
  height: 8px;
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
  margin-bottom: 15px;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5a2b 0%, #d4a574 100%);
  border-radius: 4px;
}

.achievements {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 20px;
}

.achievements h3 {
  color: #2c1810;
  margin-bottom: 15px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
}

.badge {
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  background: rgba(0,0,0,0.1);
  opacity: 0.5;
}

.badge.unlocked {
  background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%);
  opacity: 1;
}

.badge .icon {
  font-size: 2rem;
}

.badge .name {
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
