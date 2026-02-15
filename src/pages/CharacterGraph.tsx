/**
 * 汉字图谱 2.0 主页面
 * 
 * 教材驱动、学习引导、进度可追踪的汉字关系图谱
 */

import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowLeft, Search, Menu, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { TextbookVolume } from '@/data/types';
import { GraphFilterConfig } from '@/types/graph';
import { buildCharacterGraph } from '@/data/graphBuilder';
import { useLearningPath } from '@/hooks/useLearningPath';

import { EnhancedCharacterNode } from '@/components/graph/EnhancedCharacterNode';
import { WordNode } from '@/components/graph/WordNode';
import { TextbookFilter } from '@/components/graph/TextbookFilter';
import { GraphControlPanel } from '@/components/graph/GraphControlPanel';
import { CharacterDetailDialog } from '@/components/graph/CharacterDetailDialog';
import { LearningHistorySidebar } from '@/components/graph/LearningHistorySidebar';
import { GraphSidebarContent } from '@/components/graph/GraphSidebarContent';
import { usePathVisualization } from '@/components/graph/PathVisualization';
import { GraphTutorial, useTutorial } from '@/components/graph/GraphTutorial';

// 注册自定义节点类型
const nodeTypes: NodeTypes = {
  character: EnhancedCharacterNode,
  word: WordNode,
};

export default function CharacterGraph() {
  const navigate = useNavigate();

  // ==================== 状态管理 ====================

  const [centerCharacter, setCenterCharacter] = useState('天');
  const [searchInput, setSearchInput] = useState('');
  const [textbook, setTextbook] = useState<TextbookVolume>('grade1-vol1');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPathMode, setIsPathMode] = useState(false);

  // 学习路径追踪
  const {
    records,
    currentPath,
    addLearningRecord,
    isLearned,
    markAsMastered,
    resetPath,
    clearAllRecords,
  } = useLearningPath();

  // 引导功能
  const {
    isTutorialOpen,
    hasCompletedTutorial,
    handleCompleteTutorial,
    handleCloseTutorial,
    openTutorial,
  } = useTutorial();

  const [filter, setFilter] = useState<GraphFilterConfig>({
    textbook: 'grade1-vol1',
    showSimilar: true,
    showRadical: true,
    showWord: true,
    showSentence: false,
    showStructure: false,
    showPronunciation: false,
    onlyLearned: false,
    onlyUnlearned: false,
  });

  // ==================== 图谱数据构建 ====================

  const graphData = useMemo(() => {
    return buildCharacterGraph({
      centerCharacter,
      maxNodes: 30,
      maxDepth: 2,
      filter,
      learningRecords: records,
    });
  }, [centerCharacter, filter, records]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graphData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphData.edges);

  // 当图谱数据变化时更新节点和边
  useMemo(() => {
    setNodes(graphData.nodes);
    setEdges(graphData.edges);
  }, [graphData, setNodes, setEdges]);

  // ==================== 路径可视化 ====================

  usePathVisualization({
    records,
    currentPath,
    nodes,
    edges,
    isPathMode,
    onNodesUpdate: setNodes,
    onEdgesUpdate: setEdges,
  });

  // ==================== 交互处理 ====================

  /**
   * 处理节点单击 - 显示详情
   */
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.data.type === 'character') {
      setSelectedCharacter(node.data.label);
    }
  }, []);

  /**
   * 处理节点双击 - 切换为中心节点
   */
  const onNodeDoubleClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.data.type === 'character') {
      const newChar = node.data.label;
      addLearningRecord(newChar, centerCharacter);
      setCenterCharacter(newChar);
    } else if (node.data.type === 'word') {
      // TODO: 展开词语节点为两个汉字节点
      console.log('Word node double-clicked:', node.data.word);
    }
  }, [centerCharacter, addLearningRecord]);

  /**
   * 处理搜索
   */
  const handleSearch = useCallback(() => {
    if (searchInput.trim() && /^[\u4e00-\u9fa5]$/.test(searchInput.trim())) {
      setCenterCharacter(searchInput.trim());
      setSearchInput('');
    }
  }, [searchInput]);

  /**
   * 处理教材筛选
   */
  const handleTextbookChange = useCallback((value: TextbookVolume) => {
    setTextbook(value);
    setFilter(prev => ({ ...prev, textbook: value }));
  }, []);

  /**
   * 处理推荐选择
   */
  const handleSelectRecommendation = useCallback((char: string) => {
    addLearningRecord(char, centerCharacter);
    setCenterCharacter(char);
    setMobileMenuOpen(false); // 移动端关闭菜单
  }, [centerCharacter, addLearningRecord]);

  /**
   * 切换路径可视化模式
   */
  const handleTogglePathMode = useCallback(() => {
    setIsPathMode(prev => !prev);
  }, []);

  // ==================== 渲染 ====================

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 顶部导航栏 */}
      <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* 移动端菜单按钮 */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>控制面板</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <GraphSidebarContent
                  filter={filter}
                  onFilterChange={setFilter}
                  records={records}
                  currentPath={currentPath}
                  currentChar={centerCharacter}
                  onResetPath={resetPath}
                  onClearAll={clearAllRecords}
                  onSelectCharacter={handleSelectRecommendation}
                  isPathMode={isPathMode}
                  onTogglePathMode={handleTogglePathMode}
                />
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-xl font-bold">汉字图谱 2.0</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* 教材筛选器（桌面端） */}
          <div className="hidden md:block">
            <TextbookFilter
              value={textbook}
              onChange={handleTextbookChange}
            />
          </div>

          {/* 搜索框 */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="输入汉字..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-20 md:w-32"
              maxLength={1}
            />
            <Button size="icon" variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>

            {/* 帮助按钮 */}
            <Button
              size="icon"
              variant="ghost"
              onClick={openTutorial}
              title="查看使用教程"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="flex-1 flex">
        {/* 左侧控制面板（桌面端） */}
        <aside className="hidden md:block w-64 border-r bg-card p-4 overflow-y-auto">
          <GraphSidebarContent
            filter={filter}
            onFilterChange={setFilter}
            records={records}
            currentPath={currentPath}
            currentChar={centerCharacter}
            onResetPath={resetPath}
            onClearAll={clearAllRecords}
            onSelectCharacter={handleSelectRecommendation}
            isPathMode={isPathMode}
            onTogglePathMode={handleTogglePathMode}
          />
        </aside>

        {/* ReactFlow 画布 */}
        <main className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            minZoom={0.2}
            maxZoom={2}
            defaultEdgeOptions={{
              animated: false,
              style: { stroke: '#94a3b8', strokeWidth: 2 },
            }}
          >
            <Background />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                if (node.data.isCenterNode) return '#3b82f6';
                if (node.data.isLearned) return '#22c55e';
                return '#94a3b8';
              }}
            />
          </ReactFlow>
        </main>
      </div>

      {/* 汉字详情弹窗 */}
      <CharacterDetailDialog
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        isLearned={selectedCharacter ? isLearned(selectedCharacter) : false}
        onToggleLearned={(char) => {
          if (isLearned(char)) {
            markAsMastered(char);
          } else {
            addLearningRecord(char);
          }
        }}
      />

      {/* 使用教程 */}
      <GraphTutorial
        isOpen={isTutorialOpen}
        onClose={handleCloseTutorial}
        onComplete={handleCompleteTutorial}
      />
    </div>
  );
}
