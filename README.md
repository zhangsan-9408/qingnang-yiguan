# 青囊医馆 (Qingnang Yiguan)

🏥 一个古风游戏化的中医诊断学习平台

## 项目简介

青囊医馆是一个将中医诊断学习游戏化的网页应用。通过角色扮演、闯关答题、病例分析等方式，让学习中医变得有趣且高效。

## 功能特色

### 🎮 游戏化学习
- **角色成长系统**：从学徒到神医的进阶之路
- **问诊闯关**：模拟真实问诊场景，采集四诊信息
- **学习修炼**：系统化的中医理论课程
- **医案典藏**：收藏和复习经典医案

### 📚 学习内容
- 阴阳五行学说
- 藏象经络基础
- 四诊（望闻问切）
- 八纲辨证
- 脏腑辨证
- 经典方剂

### 🏆 成就系统
- 连续学习奖励
- 等级称号解锁
- 徽章收集
- 学习进度追踪

## 技术栈

- **前端框架**：Vue 3 + Vite
- **状态管理**：Pinia
- **路由**：Vue Router
- **样式**：原生 CSS（古风设计）
- **部署**：GitHub Pages

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/zhangsan-9408/qingnang-yiguan.git
cd qingnang-yiguan

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署到 GitHub Pages

1. 在 GitHub 创建仓库 `qingnang-yiguan`
2. 推送代码到仓库
3. 在仓库 Settings > Pages 中启用 GitHub Pages
4. 选择 GitHub Actions 作为部署源
5. 访问 `https://zhangsan-9408.github.io/qingnang-yiguan/`

## 项目结构

```
qingnang-yiguan/
├── .github/workflows/     # GitHub Actions 配置
├── src/
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── data/             # 数据文件
│   ├── stores/           # Pinia 状态管理
│   ├── views/            # 页面视图
│   │   ├── Home.vue      # 首页/医馆
│   │   ├── Diagnosis.vue # 问诊闯关
│   │   ├── Study.vue     # 学习修炼
│   │   ├── Archive.vue   # 医案典藏
│   │   └── Profile.vue   # 个人成长
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 学习路径

### 阶段一：筑基期（Lv.1-8）
- 阴阳五行
- 藏象经络
- 四诊基础

### 阶段二：诊断核心（Lv.9-20）
- 舌诊修炼
- 脉诊入门
- 八纲辨证
- 脏腑辨证

### 阶段三：临床应用（Lv.21+）
- 经典方剂
- 病例分析
- 综合诊疗

## 未来规划

- [ ] 接入 OpenClaw API，实现 AI 智能反馈
- [ ] 舌诊图片识别功能
- [ ] 脉象音频训练
- [ ] 社交功能（排行榜、学习小组）
- [ ] 移动端适配优化

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

MIT License

## 致谢

感谢中医经典著作和各位前辈医家的智慧传承。

---

🌿 **传承中医智慧，从青囊医馆开始**
