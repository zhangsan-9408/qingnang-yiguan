<template>
  <div class="app">
    <!-- 古风背景 -->
    <div class="bg-pattern"></div>
    
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🌿</span>
          <span class="logo-text">青囊医馆</span>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
            <span class="nav-icon">🏠</span>
            <span>医馆</span>
          </router-link>
          <router-link to="/diagnosis" class="nav-item" :class="{ active: $route.path === '/diagnosis' }">
            <span class="nav-icon">🩺</span>
            <span>问诊</span>
          </router-link>
          <router-link to="/study" class="nav-item" :class="{ active: $route.path === '/study' }">
            <span class="nav-icon">📚</span>
            <span>修炼</span>
          </router-link>
          <router-link to="/archive" class="nav-item" :class="{ active: $route.path === '/archive' }">
            <span class="nav-icon">📜</span>
            <span>医案</span>
          </router-link>
        </nav>
        <div class="user-status">
          <div class="level-badge">Lv.{{ user.level }}</div>
          <div class="reputation">⭐ {{ user.reputation }}</div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <p>青囊医馆 · 传承中医智慧</p>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user'

const user = useUserStore()
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
}

.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(139, 90, 43, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 90, 43, 0.05) 0%, transparent 50%),
    linear-gradient(180deg, #f5f0e8 0%, #ebe5d9 100%);
  z-index: -1;
}

.bg-pattern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5a2b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.header {
  background: linear-gradient(180deg, #2c1810 0%, #3d2418 100%);
  border-bottom: 3px solid #8b5a2b;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4a574;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: #c9b896;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.nav-item:hover,
.nav-item.active {
  color: #d4a574;
  background: rgba(139, 90, 43, 0.2);
  border-color: #8b5a2b;
}

.nav-icon {
  font-size: 1.2rem;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.level-badge {
  background: linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%);
  color: #2c1810;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.reputation {
  color: #d4a574;
  font-size: 1rem;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.footer {
  background: #2c1810;
  color: #8b5a2b;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
}
</style>
