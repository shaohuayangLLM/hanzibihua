#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  汉字图谱 2.0 - 自动化测试脚本"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数
PASSED=0
FAILED=0

# 测试函数
test_api() {
    local name=$1
    local url=$2
    local pattern=$3
    
    echo -n "Testing: $name ... "
    
    if curl -s "$url" | grep -q "$pattern"; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((FAILED++))
    fi
}

echo "📡 测试开发服务器连接..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. 检查服务器是否运行
if lsof -ti:8080 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 开发服务器正在运行 (端口 8080)${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ 开发服务器未运行${NC}"
    echo "请先运行: npm run dev"
    exit 1
fi

echo ""
echo "🔍 测试页面加载..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 2. 测试主页面
test_api "主页加载" "http://localhost:8080/k12/" "汉字笔画学习"

# 3. 测试图谱页面
test_api "图谱页面加载" "http://localhost:8080/k12/character-graph" "汉字笔画学习"

echo ""
echo "📦 测试静态资源..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 4. 测试 React 加载
test_api "React 脚本" "http://localhost:8080/k12/" "@react-refresh"

# 5. 测试 Vite 客户端
test_api "Vite 客户端" "http://localhost:8080/k12/" "@vite/client"

echo ""
echo "📊 测试结果汇总"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "通过: ${GREEN}$PASSED${NC} | 失败: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有基础测试通过！${NC}"
    echo ""
    echo "下一步操作："
    echo "  1. 在浏览器打开: http://localhost:8080/k12/character-graph"
    echo "  2. 按照测试指南进行手动测试"
    echo "  3. 查看详细指南: cat TESTING_GUIDE.md"
    echo ""
    echo "快速测试步骤："
    echo "  • 单击节点 → 查看详情"
    echo "  • 双击节点 → 切换中心"
    echo "  • 左侧面板 → 查看学习足迹"
    echo "  • F12+Ctrl+Shift+M → 测试移动端"
else
    echo -e "${RED}⚠️  有 $FAILED 项测试失败${NC}"
    echo "请检查开发服务器日志"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
