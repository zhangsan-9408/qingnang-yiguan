<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <div class="banner-content">
        <h1 class="welcome-title">欢迎来到青囊医馆</h1>
        <p class="welcome-subtitle">传承中医智慧，修炼诊断之道</p>
        <div class="user-card">
          <div class="avatar">👤</div>
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-title">{{ user.title }}</div>
            <div class="level-bar">
              <div class="level-progress" :style="{ width: user.expProgress + '%' }"></div>
            </div>
            <div class="level-text">Lv.{{ user.level }} · {{ user.exp }}/{{ user.expToNextLevel }} EXP</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能入口 -->
    <div class="feature-grid">
      <router-link to="/diagnosis" class="feature-card diagnosis">
        <div class="card-icon">🩺</div>
        <h3>问诊闯关</h3>
        <p>接诊患者，辨证论治</p>
        <div class="card-stats">
          <span>已通关: {{ user.completedCases.length }} 例</span>
        </div>
      </router-link>

      <router-link to="/study" class="feature-card study">
        <div class="card-icon">📚</div>
        <h3>学习修炼</h3>
        <p>研读经典，提升修为</p>
        <div class="card-stats">
          <span>已学习: {{ user.completedLessons.length }} 课</span>
        </div>
      </router-link>

      <router-link to="/archive" class="feature-card archive">
        <div class="card-icon">📜</div>
        <h3>医案典藏</h3>
        <p>收藏医案，温故知新</p>
        <div class="card-stats">
          <span>已收藏: {{ user.completedCases.length }} 例</span>
        </div>
      </router-link>
    </div>

    <!-- 今日任务 -->
    <div class="daily-tasks">
      <h2 class="section-title">
        <span class="title-icon">📋</span>
        今日任务
      </h2>
      <div class="task-list">
        <div class="task-item" :class="{ completed: tasks.case }">
          <div class="task-check">{{ tasks.case ? '✓' : '○' }}</div>
          <div class="task-content">
            <div class="task-name">完成1次问诊</div>
            <div class="task-reward">奖励: 经验+20 银两+10</div>
          </div>
        </div>
        <div class="task-item" :class="{ completed: tasks.study }">
          <div class="task-check">{{ tasks.study ? '✓' : '○' }}</div>
          <div class="task-content">
            <div class="task-name">学习1节课程</div>
            <div class="task-reward">奖励: 经验+15 声望+5</div>
          </div>
        </div>
        <div class="task-item" :class="{ completed: tasks.quiz }">
          <div class="task-check">{{ tasks.quiz ? '✓' : '○' }}</div>
          <div class="task-content">
            <div class="task-name">完成5道测试题</div>
            <div class="task-reward">奖励: 经验+10 银两+5</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 连续学习 -->
    <div class="streak-banner">
      <div class="streak-content">
        <span class="streak-icon">🔥</span>
        <span class="streak-text">连续学习第 {{ user.streak }} 天</span>
        <span class="streak-bonus">明日奖励 +{{ user.streak * 5 }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()

// 今日任务状态（实际应从存储中读取）
const tasks = ref({
  case: false,
  study: false,
  quiz: false
})
</script>

<style scoped>
.home {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-banner {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 50%, #3d2418 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 2px solid #8b5a2b;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.banner-content {
  text-align: center;
}

.welcome-title {
  font-size: 2rem;
  color: #d4a574;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.welcome-subtitle {
  color: #a89078;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0,0,0,0.2);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(139, 90, 43, 0.3);
}

.avatar {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #d4a574;
}

.user-info {
  text-align: left;
}

.user-name {
  font-size: 1.3rem;
  color: #d4a574;
  font-weight: 600;
}

.user-title {
  color: #a89078;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.level-bar {
  width: 200px;
  height: 8px;
  background: rgba(0,0,0,0.3);
  border-radius: 4px;
  overflow: hidden;
}

.level-progress {
  height: 100%;
  background: linear-gradient(90deg, #8b5a2b 0%, #d4a574 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.level-text {
  color: #a89078;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  border: 2px solid #c9b896;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8b5a2b 0%, #d4a574 100%);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(139, 90, 43, 0.2);
  border-color: #8b5a2b;
}

.feature-card.diagnosis::before { background: linear-gradient(90deg, #8b4513 0%, #d2691e 100%); }
.feature-card.study::before { background: linear-gradient(90deg, #2e8b57 0%, #3cb371 100%); }
.feature-card.archive::before { background: linear-gradient(90deg, #483d8b 0%, #6a5acd 100%); }

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c1810;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #5a4a3a;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.card-stats {
  color: #8b5a2b;
  font-size: 0.85rem;
  font-weight: 600;
}

.daily-tasks {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #c9b896;
  margin-bottom: 1.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c1810;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.title-icon {
  font-size: 1.3rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255,255,255,0.5);
  border-radius: 8px;
  border: 1px solid #d4c4a8;
  transition: all 0.3s;
}

.task-item.completed {
  background: rgba(46, 139, 87, 0.1);
  border-color: #2e8b57;
}

.task-check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #8b5a2b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #8b5a2b;
}

.task-item.completed .task-check {
  background: #2e8b57;
  border-color: #2e8b57;
  color: white;
}

.task-content {
  flex: 1;
}

.task-name {
  color: #2c1810;
  font-weight: 600;
}

.task-reward {
  color: #8b5a2b;
  font-size: 0.85rem;
}

.streak-banner {
  background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.streak-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
}

.streak-icon {
  font-size: 1.5rem;
}

.streak-text {
  font-weight: 600;
}

.streak-bonus {
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>