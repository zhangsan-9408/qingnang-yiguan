<template>
  <div class="home">
    <div class="header">
      <h1>🌿 青囊医馆</h1>
      <p>传承中医智慧，修炼诊断之道</p>
    </div>
    
    <div class="user-card">
      <div class="avatar">👤</div>
      <div class="info">
        <h2>{{ user.name }}</h2>
        <p class="title">{{ user.title }}</p>
        <div class="level">Lv.{{ user.level }} | 经验: {{ user.exp }}/{{ user.expToNextLevel }}</div>
        <div class="stats">
          <span>⭐ 声望: {{ user.reputation }}</span>
          <span>💰 银两: {{ user.silver }}</span>
          <span>🔥 连续: {{ user.streak }}天</span>
        </div>
      </div>
    </div>

    <div class="menu">
      <router-link to="/diagnosis" class="menu-item">
        <span class="icon">🩺</span>
        <span>问诊闯关</span>
      </router-link>
      <router-link to="/study" class="menu-item">
        <span class="icon">📚</span>
        <span>学习修炼</span>
      </router-link>
      <router-link to="/archive" class="menu-item">
        <span class="icon">📜</span>
        <span>医案典藏</span>
      </router-link>
      <router-link to="/profile" class="menu-item">
        <span class="icon">👤</span>
        <span>个人成长</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
const user = useUserStore()
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #8b5a2b;
  font-size: 2rem;
}

.user-card {
  background: linear-gradient(135deg, #3d2418 0%, #5a3d2b 100%);
  border-radius: 16px;
  padding: 20px;
  color: #d4a574;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.avatar {
  font-size: 4rem;
}

.info h2 {
  margin: 0;
  color: #d4a574;
}

.title {
  color: #a89078;
  margin: 5px 0;
}

.level {
  color: #c9b896;
  margin-bottom: 10px;
}

.stats {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
}

.menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.menu-item {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 100%);
  border: 2px solid #c9b896;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  text-decoration: none;
  color: #2c1810;
  transition: all 0.3s;
}

.menu-item:hover {
  transform: translateY(-5px);
  border-color: #8b5a2b;
  box-shadow: 0 8px 20px rgba(139, 90, 43, 0.2);
}

.icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}
</style>
