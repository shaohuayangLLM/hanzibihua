# 版本回滚指南

本文档说明如何回滚到之前的版本。

## 🏷️ 已发布的版本

| 版本 | 标签 | 日期 | 说明 |
|------|------|------|------|
| 1.0.0 | `v1.0.0` / `k12-v1.0.0` | 2025-01-23 | 首个正式版本 |

## 📌 快速回滚命令

### 回滚源代码 (hanzibihua)

```bash
cd K12-Education

# 查看所有标签
git tag -l

# 回滚到 v1.0.0
git checkout v1.0.0

# 如果需要基于旧版本创建新分支
git checkout -b hotfix-from-v1.0.0 v1.0.0

# 如果需要强制回滚 main 分支到 v1.0.0
git reset --hard v1.0.0
git push origin main --force  # ⚠️ 谨慎使用
```

### 回滚生产环境 (portfolio-2025)

```bash
cd portfolio-2025

# 查看所有标签
git tag -l | grep k12

# 回滚到 k12-v1.0.0
git checkout k12-v1.0.0

# 如果需要基于旧版本创建新分支
git checkout -b hotfix-from-k12-v1.0.0 k12-v1.0.0

# 如果需要强制回滚 main 分支
git reset --hard k12-v1.0.0
git push origin main --force  # ⚠️ 谨慎使用，会触发部署
```

## 🔍 查看版本差异

### 查看标签之间的差异

```bash
# 在 hanzibihua 仓库
cd K12-Education
git diff v1.0.0 HEAD

# 在 portfolio-2025 仓库
cd ../portfolio-2025
git diff k12-v1.0.0 HEAD
```

### 查看特定标签的详细信息

```bash
# 查看标签信息
git show v1.0.0

# 查看标签对应的提交
git log v1.0.0 --oneline -1
```

## ⚠️ 注意事项

### 强制推送的风险

```bash
git push origin main --force
```

⚠️ **使用前请注意：**
1. 会覆盖远程分支历史
2. 可能影响其他协作者
3. 生产环境会立即重新部署
4. 建议先备份当前代码

### 更安全的回滚方法

```bash
# 1. 先创建备份分支
git branch backup-before-rollback

# 2. 创建回滚分支而不是修改 main
git checkout -b rollback-to-v1.0.0 v1.0.0

# 3. 测试确认无误后，再决定是否合并到 main

# 4. 如果要恢复到 main
git checkout main
git merge rollback-to-v1.0.0
git push origin main
```

## 🚨 紧急回滚流程

如果生产环境出现严重问题，需要立即回滚：

### 方案 1：Git 回滚（推荐）

```bash
# 1. 快速切换到稳定版本
cd portfolio-2025
git checkout k12-v1.0.0

# 2. 确认版本正确
cat k12/index.html | grep title

# 3. 强制推送到 main（触发部署）
git checkout main
git reset --hard k12-v1.0.0
git push origin main --force
```

### 方案 2：Vercel Dashboard

1. 访问 https://vercel.com/dashboard
2. 找到 `portfolio-2025` 项目
3. 进入 **Deployments** 标签
4. 找到 `k12-v1.0.0` 对应的部署
5. 点击 **Promote to Production**
6. 确认部署

### 方案 3：本地手动部署

```bash
# 1. 切换到稳定版本
cd portfolio-2025
git checkout k12-v1.0.0

# 2. 手动触发 Vercel 部署
vercel --prod
```

## 📋 回滚前检查清单

- [ ] 确认需要回滚到哪个版本
- [ ] 备份当前代码（`git branch backup-$(date +%Y%m%d)`）
- [ ] 通知团队成员即将回滚
- [ ] 在测试环境验证旧版本
- [ ] 准备回滚后的修复计划
- [ ] 确认回滚时间（选择低峰期）

## 🔄 回滚后操作

### 1. 验证生产环境

```bash
# 检查网站是否正常
curl -I https://ainside.cn/k12/

# 检查关键功能
open https://ainside.cn/k12/
```

### 2. 查看部署日志

访问 Vercel Dashboard 查看最新部署状态

### 3. 监控错误

- 查看浏览器控制台
- 检查网络请求
- 验证关键功能正常

### 4. 通知用户

如果问题严重，需要通知用户：
- 网站已回滚到稳定版本
- 正在修复问题
- 预计恢复时间

## 📚 相关文档

- [CHANGELOG.md](./CHANGELOG.md) - 查看详细更新日志
- [README.md](./README.md) - 项目说明
- [CLAUDE.md](./CLAUDE.md) - Claude 开发指南

## 💡 最佳实践

1. **定期发布版本标签** - 每次重大更新后打 tag
2. **保留稳定版本** - 不要删除旧的标签
3. **详细记录变更** - 在 CHANGELOG 中记录所有改动
4. **测试后再部署** - 避免频繁回滚
5. **灰度发布** - 重要更新先在小范围测试

---

**最后更新**: 2025-01-23
**维护者**: Claude Code
