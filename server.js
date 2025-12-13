const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "answers.json");

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // 提供静态文件服务

// 确保数据文件存在
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
}

// 提交答案的API端点
app.post("/api/submit-answers", (req, res) => {
  try {
    const { rank, answers, timestamp } = req.body;

    // 验证数据
    if (!rank && rank !== 0) {
      return res.status(400).json({ error: "缺少段位信息" });
    }

    if (!answers || !answers.question1 || !answers.question2 || !answers.question3) {
      return res.status(400).json({ error: "请完整回答所有3个问题" });
    }

    // 读取现有数据
    let submissions = [];
    try {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      submissions = JSON.parse(data);
    } catch (err) {
      console.error("读取数据文件错误:", err);
      submissions = [];
    }

    // 添加新提交
    const submission = {
      id: Date.now().toString(),
      rank: rank,
      answers: {
        question1: answers.question1,
        question2: answers.question2,
        question3: answers.question3,
      },
      timestamp: timestamp || new Date().toISOString(),
    };

    submissions.push(submission);

    // 保存数据
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf8");

    console.log(`收到新提交 - 段位: ${rank}, 时间: ${submission.timestamp}`);

    res.json({
      success: true,
      message: "答案提交成功",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("处理提交时出错:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 获取所有提交的API端点（可选，用于查看数据）
app.get("/api/submissions", (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const submissions = JSON.parse(data);
    res.json({
      success: true,
      count: submissions.length,
      submissions: submissions,
    });
  } catch (error) {
    console.error("读取提交数据时出错:", error);
    res.status(500).json({ error: "读取数据失败" });
  }
});

// 健康检查端点
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "服务器运行正常" });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`数据文件: ${DATA_FILE}`);
});
