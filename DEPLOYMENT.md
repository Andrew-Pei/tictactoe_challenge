# 部署指南

针对60名学生的教学场景，推荐以下部署方案：

## 🎯 推荐方案对比

### 方案一：Railway（⭐ 最推荐）

**优点：**
- ✅ 完全免费（每月$5免费额度，足够60名学生使用）
- ✅ 一键部署，无需配置
- ✅ 自动HTTPS证书
- ✅ 支持自定义域名
- ✅ 自动重启和监控
- ✅ 适合教学场景

**缺点：**
- 免费额度有限（但60名学生完全够用）

**部署步骤：**
1. 访问 https://railway.app
2. 使用GitHub账号登录
3. 点击"New Project" → "Deploy from GitHub repo"
4. 选择你的仓库
5. Railway会自动检测Node.js项目并部署
6. 部署完成后会获得一个 `*.railway.app` 域名

**成本：** 免费（教学用途完全够用）

---

### 方案二：Render

**优点：**
- ✅ 免费套餐可用
- ✅ 简单易用
- ✅ 自动HTTPS
- ✅ 支持自定义域名

**缺点：**
- 免费套餐在15分钟无活动后会休眠（首次访问需要几秒唤醒）

**部署步骤：**
1. 访问 https://render.com
2. 注册账号（可用GitHub登录）
3. 点击"New" → "Web Service"
4. 连接GitHub仓库
5. 配置：
   - Build Command: `npm install`
   - Start Command: `npm start`
6. 点击"Create Web Service"

**成本：** 免费（有休眠限制，但教学场景可接受）

---

### 方案三：云服务器（阿里云/腾讯云）

**优点：**
- ✅ 完全控制
- ✅ 无休眠限制
- ✅ 性能稳定

**缺点：**
- ❌ 需要自己配置和维护
- ❌ 需要购买服务器（约50-100元/月）
- ❌ 需要配置域名和SSL证书

**适用场景：** 如果学校已有云服务器资源

**部署步骤：**
1. 购买轻量应用服务器（1核2G即可）
2. 安装Node.js环境
3. 上传代码
4. 使用PM2管理进程
5. 配置Nginx反向代理
6. 配置SSL证书（Let's Encrypt免费）

**成本：** 约50-100元/月

---

### 方案四：Vercel（不推荐，需要重构）

需要将后端改为Serverless函数，改动较大。

---

## 📊 方案选择建议

### 对于60名学生的教学场景：

**首选：Railway**
- 免费额度充足
- 部署简单（5分钟完成）
- 稳定可靠
- 适合教学演示

**备选：Render**
- 如果Railway不可用
- 免费但有小休眠延迟

**如果学校有资源：云服务器**
- 最稳定
- 但需要技术维护

---

## 🚀 Railway 详细部署步骤

### 1. 准备代码

确保项目包含以下文件：
- `package.json`
- `server.js`
- `index.html`
- `admin.html`

### 2. 创建GitHub仓库

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/tictactoe-challenge.git
git push -u origin main
```

### 3. 在Railway部署

1. 访问 https://railway.app
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 授权GitHub访问
5. 选择你的仓库
6. Railway会自动：
   - 检测到Node.js项目
   - 运行 `npm install`
   - 运行 `npm start`
   - 分配一个域名

### 4. 获取访问地址

部署完成后，Railway会提供一个类似 `https://your-project.railway.app` 的地址。

- 学生访问：`https://your-project.railway.app/index.html` 或直接 `https://your-project.railway.app`
- 教师后台：`https://your-project.railway.app/admin.html`

### 5. 自定义域名（可选）

如果需要自定义域名：
1. 在Railway项目设置中添加自定义域名
2. 按照提示配置DNS记录
3. Railway会自动配置SSL证书

---

## 🔧 本地测试

部署前可以在本地测试：

```bash
# 安装依赖
npm install

# 启动服务器
npm start

# 访问
# http://localhost:3000/index.html
# http://localhost:3000/admin.html
```

---

## 📝 注意事项

1. **数据持久化**：Railway和Render的免费套餐数据会持久化，但建议定期导出备份
2. **并发处理**：60名学生同时使用完全没问题，代码已经优化
3. **API地址**：代码已自动适配，无需修改
4. **端口配置**：服务器会自动使用环境变量中的PORT

---

## 🆘 常见问题

### Q: Railway免费额度够用吗？
A: 完全够用。60名学生，每人提交一次，数据量很小，免费额度绰绰有余。

### Q: 数据会丢失吗？
A: Railway和Render都会持久化数据文件，但建议定期通过后台页面导出备份。

### Q: 可以同时支持多少学生？
A: 代码已优化，可以轻松支持100+并发用户。

### Q: 如何备份数据？
A: 在后台管理页面点击"导出数据"按钮即可下载JSON文件。

---

## 📞 技术支持

如果遇到部署问题，可以：
1. 查看Railway/Render的日志
2. 检查环境变量配置
3. 确认代码已推送到GitHub
