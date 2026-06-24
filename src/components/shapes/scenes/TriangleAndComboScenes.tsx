import React from 'react';

/*
 * 三角形拼合 & 平行四边形变换 —— 动画场景组件
 * 面向一年级小学生的图形教学，12 个场景
 * 每个场景接收 { step: number }，SVG viewBox="0 0 300 200"
 */

export interface TransformLesson {
  id: string;
  title: string;
  emoji: string;
  category: string;
  steps: Array<{ description: string; subtext?: string }>;
  summary: string;
  summaryIcon: string;
}

interface SceneProps {
  step: number;
}

/* ================================================================
 * 工具：通用 SVG 文字标签（白色底+圆角）
 * ================================================================ */

const Label = ({
  x, y, text, fontSize = 11, color = '#333', bold = false,
}: { x: number; y: number; text: string; fontSize?: number; color?: string; bold?: boolean }) => (
  <text
    x={x} y={y} textAnchor="middle" fontSize={fontSize}
    fill={color} fontWeight={bold ? 'bold' : 'normal'}
  >
    {text}
  </text>
);

/* 直角标记：在给定点画一个小正方形表示直角 */
const RightAngleMark = ({
  x, y, size = 8, rotation = 0, color = '#666',
}: { x: number; y: number; size?: number; rotation?: number; color?: string }) => (
  <g transform={`translate(${x},${y}) rotate(${rotation})`}>
    <polyline
      points={`${size},0 ${size},${size} 0,${size}`}
      fill="none" stroke={color} strokeWidth="1.2"
    />
  </g>
);

/* 角度弧线标记 */
const AngleArc = ({
  cx, cy, startAngle, endAngle, r = 12, color = '#666',
}: { cx: number; cy: number; startAngle: number; endAngle: number; r?: number; color?: string }) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return (
    <path
      d={`M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`}
      fill="none" stroke={color} strokeWidth="1.2"
    />
  );
};

/* ================================================================
 * 场景 1: 等腰直角三角形 × 2 → 正方形
 * ================================================================ */

const IsoRightTriToSquare: React.FC<SceneProps> = ({ step }) => {
  // 等腰直角三角形：直角边=80，斜边=80√2≈113
  // 三角形 A: 右上直角，顶点 (x,y), (x+80,y), (x,y+80)
  // 三角形 B: 同形，需要旋转 180° 后斜边对齐
  const s = 80; // 边长
  const cx = 150, cy = 100; // 中心

  // step 0: 分开
  // step 1: B 旋转 180°
  // step 2: 靠拢
  // step 3: 合体正方形

  const triAPoints = (dx: number, dy: number) =>
    `${cx - s / 2 + dx},${cy - s / 2 + dy} ${cx + s / 2 + dx},${cy - s / 2 + dy} ${cx - s / 2 + dx},${cy + s / 2 + dy}`;

  const triBPoints = (dx: number, dy: number, rot: number) => {
    // 旋转中心
    const rcx = cx + 60 + dx;
    const rcy = cy + dy;
    if (rot === 0) {
      return `${rcx - s / 2},${rcy - s / 2} ${rcx + s / 2},${rcy - s / 2} ${rcx - s / 2},${rcy + s / 2}`;
    }
    // 旋转 180° 后变为以右下角为直角：(rcx+s/2,rcy+s/2), (rcx-s/2,rcy+s/2), (rcx+s/2,rcy-s/2)
    return `${rcx + s / 2},${rcy + s / 2} ${rcx - s / 2},${rcy + s / 2} ${rcx + s / 2},${rcy - s / 2}`;
  };

  // 位置偏移
  const aDx = step >= 2 ? 30 : 0;
  const bDx = step >= 2 ? -60 : 0;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 30 : 0}px, 0)` }}>
            <polygon
              points={`${cx - s / 2 - 50},${cy - s / 2} ${cx + s / 2 - 50},${cy - s / 2} ${cx - s / 2 - 50},${cy + s / 2}`}
              fill="#fb923c" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={cx - s / 2 - 50} y={cy - s / 2} color="#c2410c" />
                <Label x={cx - 30} y={cy + s / 2 + 16} text="等腰直角三角形" fontSize={9} color="#9a3412" />
              </>
            )}
          </g>

          {/* 三角形 B */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: `${cx + 60}px ${cy}px`,
            transform: `translate(${step >= 2 ? -60 : 0}px, 0) ${step >= 1 ? 'rotate(180deg)' : ''}`,
          }}>
            <polygon
              points={`${cx + 60 - s / 2},${cy - s / 2} ${cx + 60 + s / 2},${cy - s / 2} ${cx + 60 - s / 2},${cy + s / 2}`}
              fill="#fdba74" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={cx + 60 - s / 2} y={cy - s / 2} color="#c2410c" />
                <Label x={cx + 90} y={cy + s / 2 + 16} text="等腰直角三角形" fontSize={9} color="#9a3412" />
              </>
            )}
          </g>
        </>
      ) : (
        /* step 3: 合体正方形 */
        <g className="animate-fade-in">
          <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" rx="1" />
          <line
            x1={cx - s / 2} y1={cy + s / 2} x2={cx + s / 2} y2={cy - s / 2}
            stroke="#fdba74" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={cx} y={cy + 5} text="正方形！" fontSize={16} color="#7c2d12" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 2: 等腰直角三角形 × 2 → 平行四边形
 * ================================================================ */

const IsoRightTriToPara: React.FC<SceneProps> = ({ step }) => {
  const s = 70;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A：直角在左下 */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 40 : 0}px, 0)` }}>
            <polygon
              points={`60,40 60,${40 + s} ${60 + s},${40 + s}`}
              fill="#fb923c" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={60} y={40 + s - 8} rotation={0} color="#c2410c" />
                <Label x={80} y={40 + s + 16} text="等腰直角△" fontSize={9} color="#9a3412" />
              </>
            )}
          </g>

          {/* 三角形 B：翻转后直角边对齐 */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: '210px 75px',
            transform: `translate(${step >= 2 ? -40 : 0}px, 0) ${step >= 1 ? 'scaleX(-1)' : ''}`,
          }}>
            <polygon
              points={`180,40 180,${40 + s} ${180 + s},${40 + s}`}
              fill="#fdba74" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={180} y={40 + s - 8} color="#c2410c" />
                <Label x={200} y={40 + s + 16} text="等腰直角△" fontSize={9} color="#9a3412" />
              </>
            )}
          </g>
        </>
      ) : (
        <g className="animate-fade-in">
          <polygon
            points={`60,40 ${60 + s},40 ${60 + 2 * s},${40 + s} ${60 + s},${40 + s}`}
            fill="#fb923c" stroke="#c2410c" strokeWidth="2.5"
          />
          <line
            x1={60 + s} y1={40} x2={60 + s} y2={40 + s}
            stroke="#fdba74" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={150} y={40 + s / 2 + 5} text="平行四边形！" fontSize={14} color="#7c2d12" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 3: 直角三角形（非等腰）× 2 → 长方形
 * ================================================================ */

const RightTriToRect: React.FC<SceneProps> = ({ step }) => {
  // 直角三角形：底60 高80（非等腰）
  const w = 60, h = 80;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A：直角在左下 (40,160) → (100,160) → (40,80) */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 50 : 0}px, 0)` }}>
            <polygon
              points="40,160 100,160 40,80"
              fill="#60a5fa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={40} y={152} color="#1d4ed8" />
                <Label x={65} y={175} text="直角三角形" fontSize={9} color="#1e40af" />
                {/* 标注三边不等 */}
                <Label x={30} y={125} text="80" fontSize={8} color="#6b7280" />
                <Label x={72} y={175} text="60" fontSize={8} color="#6b7280" />
              </>
            )}
          </g>

          {/* 三角形 B：旋转 180° 后斜边对齐 */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: '200px 120px',
            transform: `translate(${step >= 2 ? -50 : 0}px, 0) ${step >= 1 ? 'rotate(180deg)' : ''}`,
          }}>
            <polygon
              points="170,160 230,160 170,80"
              fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <RightAngleMark x={170} y={152} color="#1d4ed8" />
                <Label x={195} y={175} text="直角三角形" fontSize={9} color="#1e40af" />
              </>
            )}
          </g>
        </>
      ) : (
        <g className="animate-fade-in">
          <rect x={90} y={60} width={w} height={h} fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2.5" rx="1" />
          <line
            x1={90} y1={60} x2={90 + w} y2={60 + h}
            stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={120} y={105} text="长方形！" fontSize={16} color="#1e3a5f" bold />
          <RightAngleMark x={90} y={60} size={10} color="#1d4ed8" />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 4: 锐角三角形 × 2 → 平行四边形
 * ================================================================ */

const AcuteTriToPara: React.FC<SceneProps> = ({ step }) => {
  // 锐角三角形：所有角 < 90°
  // 点 A(0,0), B(90,0), C(50,-70) → 底边90
  const baseY = 145;
  const triW = 90, triH = 70;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 40 : 0}px, 0)` }}>
            <polygon
              points={`30,${baseY} ${30 + triW},${baseY} ${30 + 50},${baseY - triH}`}
              fill="#4ade80" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <AngleArc cx={30} cy={baseY} startAngle={-55} endAngle={0} r={14} color="#15803d" />
                <AngleArc cx={30 + triW} cy={baseY} startAngle={-180} endAngle={-130} r={14} color="#15803d" />
                <AngleArc cx={30 + 50} cy={baseY - triH} startAngle={115} endAngle={165} r={14} color="#15803d" />
                <Label x={75} y={baseY + 16} text="锐角三角形" fontSize={9} color="#166534" />
              </>
            )}
          </g>

          {/* 三角形 B：旋转 180° */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: '215px 110px',
            transform: `translate(${step >= 2 ? -40 : 0}px, 0) ${step >= 1 ? 'rotate(180deg)' : ''}`,
          }}>
            <polygon
              points={`170,${baseY} ${170 + triW},${baseY} ${170 + 50},${baseY - triH}`}
              fill="#86efac" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <Label x={215} y={baseY + 16} text="锐角三角形" fontSize={9} color="#166534" />
            )}
          </g>

          {step === 0 && (
            <Label x={150} y={20} text="锐角三角形：三个角都小于 90°" fontSize={10} color="#15803d" />
          )}
        </>
      ) : (
        <g className="animate-fade-in">
          <polygon
            points={`60,${baseY} ${60 + triW},${baseY} ${60 + triW + (triW - 50)},${baseY - triH} ${60 + (triW - 50)},${baseY - triH}`}
            fill="#4ade80" stroke="#15803d" strokeWidth="2.5"
          />
          <line
            x1={60 + triW} y1={baseY} x2={60 + (triW - 50)} y2={baseY - triH}
            stroke="#86efac" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={150} y={baseY - 30} text="平行四边形！" fontSize={14} color="#14532d" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 5: 钝角三角形 × 2 → 平行四边形
 * ================================================================ */

const ObtuseTriToPara: React.FC<SceneProps> = ({ step }) => {
  // 钝角三角形：有一个角 > 90°
  // A(30,150) B(120,150) C(15,95) → 在 A 处角 ≈ 105°（钝角）
  const baseY = 150;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A：钝角在左下 (30,150) */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 35 : 0}px, 0)` }}>
            <polygon
              points={`30,${baseY} 120,${baseY} 15,${baseY - 55}`}
              fill="#c084fc" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                {/* 钝角弧线标注：从向 C 的方向(≈-105°)到向 B 的方向(0°) */}
                <AngleArc cx={30} cy={baseY} startAngle={-105} endAngle={0} r={16} color="#7e22ce" />
                <Label x={14} y={baseY - 18} text="钝角" fontSize={8} color="#7e22ce" />
                <Label x={55} y={baseY + 16} text="钝角三角形" fontSize={9} color="#6b21a8" />
              </>
            )}
          </g>

          {/* 三角形 B：旋转 180° */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: '215px 131px',
            transform: `translate(${step >= 2 ? -35 : 0}px, 0) ${step >= 1 ? 'rotate(180deg)' : ''}`,
          }}>
            <polygon
              points={`170,${baseY} 260,${baseY} 155,${baseY - 55}`}
              fill="#d8b4fe" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <AngleArc cx={170} cy={baseY} startAngle={-105} endAngle={0} r={16} color="#7e22ce" />
                <Label x={215} y={baseY + 16} text="钝角三角形" fontSize={9} color="#6b21a8" />
              </>
            )}
          </g>

          {step === 0 && (
            <Label x={150} y={20} text="钝角三角形：有一个角大于 90°" fontSize={10} color="#7e22ce" />
          )}
        </>
      ) : (
        <g className="animate-fade-in">
          {/* 平行四边形：(65,150)(155,150)(140,95)(50,95) */}
          <polygon
            points={`65,${baseY} 155,${baseY} 140,${baseY - 55} 50,${baseY - 55}`}
            fill="#c084fc" stroke="#7e22ce" strokeWidth="2.5"
          />
          <line
            x1={155} y1={baseY} x2={50} y2={baseY - 55}
            stroke="#d8b4fe" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={102} y={baseY - 22} text="平行四边形！" fontSize={14} color="#581c87" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 6: 等腰三角形 × 2 → 菱形
 * ================================================================ */

const IsoTriToRhombus: React.FC<SceneProps> = ({ step }) => {
  // 等腰三角形：底 80, 腰 60, 高约 45
  const baseW = 80;
  const h = 50;
  const cx = 150;
  const baseY = 110;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 ? (
        <>
          {/* 三角形 A：顶朝上 */}
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: `translate(${step >= 2 ? 40 : 0}px, 0)` }}>
            <polygon
              points={`${cx - 80 - baseW / 2},${baseY} ${cx - 80 + baseW / 2},${baseY} ${cx - 80},${baseY - h}`}
              fill="#f472b6" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                {/* 标注等腰 */}
                <Label x={cx - 80 - baseW / 2 - 5} y={baseY - h / 2 - 5} text="腰" fontSize={8} color="#be185d" />
                <Label x={cx - 80 + baseW / 2 + 5} y={baseY - h / 2 - 5} text="腰" fontSize={8} color="#be185d" />
                <Label x={cx - 80} y={baseY + 16} text="等腰三角形" fontSize={9} color="#9d174d" />
              </>
            )}
          </g>

          {/* 三角形 B：上下翻转后底边对齐 */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: `${cx + 60}px ${baseY}px`,
            transform: `translate(${step >= 2 ? -40 : 0}px, 0) ${step >= 1 ? 'scaleY(-1)' : ''}`,
          }}>
            <polygon
              points={`${cx + 60 - baseW / 2},${baseY} ${cx + 60 + baseW / 2},${baseY} ${cx + 60},${baseY - h}`}
              fill="#f9a8d4" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && (
              <>
                <Label x={cx + 60 - baseW / 2 - 5} y={baseY - h / 2 - 5} text="腰" fontSize={8} color="#be185d" />
                <Label x={cx + 60 + baseW / 2 + 5} y={baseY - h / 2 - 5} text="腰" fontSize={8} color="#be185d" />
                <Label x={cx + 60} y={baseY + 16} text="等腰三角形" fontSize={9} color="#9d174d" />
              </>
            )}
          </g>

          {step === 0 && (
            <Label x={150} y={20} text="等腰三角形：两条腰一样长" fontSize={10} color="#be185d" />
          )}
        </>
      ) : (
        <g className="animate-fade-in">
          {/* 菱形：上下两个等腰三角形底边对齐 */}
          <polygon
            points={`${cx},${baseY - h} ${cx + baseW / 2},${baseY} ${cx},${baseY + h} ${cx - baseW / 2},${baseY}`}
            fill="#f472b6" stroke="#be185d" strokeWidth="2.5"
          />
          <line
            x1={cx - baseW / 2} y1={baseY} x2={cx + baseW / 2} y2={baseY}
            stroke="#f9a8d4" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={cx} y={baseY + 5} text="菱形！" fontSize={16} color="#831843" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 7: 2 个正方形 → 长方形
 * ================================================================ */

const TwoSqToRect: React.FC<SceneProps> = ({ step }) => {
  const s = 70; // 正方形边长
  const gap = step >= 1 ? 0 : 30;
  const startX = 150 - s - gap / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 2 ? (
        <>
          <g style={{ transition: 'transform 0.5s ease-in-out' }}>
            <rect
              x={startX} y={100 - s / 2} width={s} height={s} rx="2"
              fill="#60a5fa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && <Label x={startX + s / 2} y={100 + 4} text="正方形" fontSize={10} color="#1e40af" />}
          </g>
          <g style={{ transition: 'transform 0.5s ease-in-out' }}>
            <rect
              x={startX + s + gap} y={100 - s / 2} width={s} height={s} rx="2"
              fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
            />
            {step === 0 && <Label x={startX + s + gap + s / 2} y={100 + 4} text="正方形" fontSize={10} color="#1e40af" />}
          </g>
        </>
      ) : (
        <g className="animate-fade-in">
          <rect
            x={150 - s} y={100 - s / 2} width={s * 2} height={s} rx="2"
            fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2.5"
          />
          <line
            x1={150} y1={100 - s / 2} x2={150} y2={100 + s / 2}
            stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <Label x={150} y={104} text="长方形！" fontSize={16} color="#1e3a5f" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 8: 4 个正方形 → 大正方形（田字格）
 * ================================================================ */

const FourSqToBigSq: React.FC<SceneProps> = ({ step }) => {
  const s = 50; // 每个小正方形边长
  const colors = ['#fbbf24', '#fb923c', '#4ade80', '#60a5fa'];
  const colorsDark = ['#f59e0b', '#ea580c', '#22c55e', '#2563eb'];

  // 散开 → 靠拢 → 田字格
  const positions = [
    // step 0: 散开
    [{ x: 40, y: 20 }, { x: 190, y: 20 }, { x: 40, y: 120 }, { x: 190, y: 120 }],
    // step 1: 向中心靠拢
    [{ x: 100, y: 50 }, { x: 150, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 100 }],
    // step 2: 完美拼合
    [{ x: 100, y: 50 }, { x: 150, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 100 }],
  ];

  const pos = positions[Math.min(step, 2)];

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 2 ? (
        pos.map((p, i) => (
          <g key={i} style={{ transition: 'transform 0.5s ease-in-out', transitionDelay: `${i * 80}ms` }}>
            <rect x={p.x} y={p.y} width={s} height={s} rx="2" fill={colors[i]} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            {step === 0 && <Label x={p.x + s / 2} y={p.y + s / 2 + 4} text="⬜" fontSize={9} color="#333" />}
          </g>
        ))
      ) : (
        <g className="animate-fade-in">
          <rect x={100} y={50} width={s * 2} height={s * 2} fill="none" stroke="#d97706" strokeWidth="2.5" rx="2" />
          {pos.map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width={s} height={s} fill={colors[i]} stroke="none" rx="0" />
          ))}
          {/* 田字格线 */}
          <line x1={150} y1={50} x2={150} y2={150} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={100} y1={100} x2={200} y2={100} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <Label x={150} y={105} text="大正方形！" fontSize={14} color="#78350f" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 9: 4 个小三角形 → 大三角形
 * ================================================================ */

const FourTriToBigTri: React.FC<SceneProps> = ({ step }) => {
  // 大三角形：顶点 (150,20), 左下 (60,170), 右下 (240,170)
  // 分割为 4 个：中央倒三角 + 上、左下、右下三个
  const colors = ['#f472b6', '#fb923c', '#4ade80', '#60a5fa'];

  // 大三角关键点
  const top = { x: 150, y: 20 };
  const bl = { x: 60, y: 170 };
  const br = { x: 240, y: 170 };
  // 中点
  const mt = { x: (bl.x + br.x) / 2, y: (bl.y + br.y) / 2 }; // 底边中点 = (150, 170) — 不对
  const ml = { x: (top.x + bl.x) / 2, y: (top.y + bl.y) / 2 }; // 左边中点 (105, 95)
  const mr = { x: (top.x + br.x) / 2, y: (top.y + br.y) / 2 }; // 右边中点 (195, 95)
  const mb = { x: (bl.x + br.x) / 2, y: (bl.y + br.y) / 2 }; // 底边中点 (150, 170)

  // 4 小三角形在最终位置
  const finalTris = [
    `${top.x},${top.y} ${ml.x},${ml.y} ${mr.x},${mr.y}`,        // 上
    `${ml.x},${ml.y} ${bl.x},${bl.y} ${mb.x},${mb.y}`,          // 左下
    `${mr.x},${mr.y} ${mb.x},${mb.y} ${br.x},${br.y}`,          // 右下
    `${ml.x},${ml.y} ${mr.x},${mr.y} ${mb.x},${mb.y}`,          // 中央（倒三角）
  ];

  // 散开位置（偏移）
  const scatterOffsets = [
    { dx: 0, dy: -30 },
    { dx: -40, dy: 30 },
    { dx: 40, dy: 30 },
    { dx: 0, dy: 40 },
  ];

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 2 ? (
        <>
          {finalTris.map((pts, i) => {
            const off = step === 0 ? scatterOffsets[i] : { dx: 0, dy: 0 };
            return (
              <g key={i} style={{
                transition: 'transform 0.6s ease-in-out',
                transitionDelay: `${i * 80}ms`,
                transform: `translate(${off.dx}px, ${off.dy}px)`,
              }}>
                <polygon points={pts} fill={colors[i]} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
              </g>
            );
          })}
          {step === 0 && (
            <Label x={150} y={195} text="4 个小三角形" fontSize={10} color="#6b7280" />
          )}
        </>
      ) : (
        <g className="animate-fade-in">
          <polygon
            points={`${top.x},${top.y} ${bl.x},${bl.y} ${br.x},${br.y}`}
            fill="none" stroke="#be185d" strokeWidth="2.5"
          />
          {finalTris.map((pts, i) => (
            <polygon key={i} points={pts} fill={colors[i]} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          ))}
          <Label x={150} y={130} text="大三角形！" fontSize={14} color="#831843" bold />
          <Label x={150} y={192} text="4 个小三角形 = 1 个大三角形" fontSize={10} color="#6b7280" />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 10: 平行四边形对角剪 → 2 个三角形
 * ================================================================ */

const ParaDiagCut: React.FC<SceneProps> = ({ step }) => {
  // 平行四边形：(60,40) (200,40) (240,150) (100,150)
  const paraPoints = '60,40 200,40 240,150 100,150';

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 2 ? (
        <>
          <polygon
            points={paraPoints}
            fill="#fbbf24" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"
          />
          {step === 0 && (
            <Label x={150} y={100} text="平行四边形" fontSize={13} color="#92400e" bold />
          )}
          {step >= 1 && (
            <>
              <line x1={60} y1={40} x2={240} y2={150} stroke="#dc2626" strokeWidth="2" strokeDasharray="8,4" />
              <Label x={165} y={80} text="对角线" fontSize={10} color="#dc2626" />
              <text x={148} y={190} textAnchor="middle" fontSize={10} fill="#dc2626">✂️ 沿对角线剪开</text>
            </>
          )}
        </>
      ) : (
        <>
          {/* 两个三角形分离 */}
          <g style={{ transition: 'transform 0.6s', transform: 'translate(-15px, -10px)' }} className="animate-fade-in">
            <polygon points="50,35 190,35 230,145" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <Label x={140} y={65} text="三角形 A" fontSize={10} color="#92400e" bold />
          </g>
          <g style={{ transition: 'transform 0.6s', transform: 'translate(15px, 10px)' }} className="animate-fade-in">
            <polygon points="70,45 250,155 110,155" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <Label x={155} y={140} text="三角形 B" fontSize={10} color="#92400e" bold />
          </g>
        </>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 11: 平行四边形割补法 → 长方形
 * ================================================================ */

const ParaCutAndMove: React.FC<SceneProps> = ({ step }) => {
  // 平行四边形：左下(50,150) 右下(210,150) 右上(250,50) 左上(90,50)
  // 高线从(90,50)垂直到(90,150)
  // 被切出的直角三角形：(50,150) (90,150) (90,50) → 移到右侧(210,150) (250,150) (250,50)...不对
  // 更简单的设定：
  // 平行四边形 (70,150) (230,150) (260,60) (100,60)
  // 高：从左上角(100,60)画垂直到(100,150)
  // 剪出的直角三角形：(70,150) (100,150) (100,60) 对应偏移量30
  // 补到右边：变成(230,150) (260,150) (260,60) → 即平移 160

  const paraColor = '#fbbf24';
  const cutColor = '#fde68a';
  const triCut = '70,150 100,150 100,60'; // 左侧直角三角形

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          <polygon points="70,150 230,150 260,60 100,60" fill={paraColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <Label x={165} y={110} text="平行四边形" fontSize={13} color="#92400e" bold />
        </>
      )}

      {step === 1 && (
        <>
          <polygon points="70,150 230,150 260,60 100,60" fill={paraColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {/* 高线（垂直虚线） */}
          <line x1={100} y1={60} x2={100} y2={150} stroke="#dc2626" strokeWidth="2" strokeDasharray="6,4" />
          <RightAngleMark x={100} y={142} color="#dc2626" />
          {/* 标出三角形区域 */}
          <polygon points={triCut} fill="#dc262640" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,3" />
          <Label x={88} y={115} text="△" fontSize={12} color="#dc2626" />
          <Label x={165} y={30} text="沿着高线剪开" fontSize={10} color="#dc2626" />
        </>
      )}

      {step === 2 && (
        <>
          {/* 梯形部分 */}
          <polygon points="100,150 230,150 260,60 100,60" fill={paraColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {/* 被剪下的三角形 - 分离 + 虚化原位 */}
          <polygon points={triCut} fill="#9ca3af30" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <g style={{ transition: 'transform 0.6s ease-in-out', transform: 'translate(30px, 0)' }}>
            <polygon points={triCut} fill={cutColor} stroke="#d97706" strokeWidth="1.5" />
            <Label x={88} y={115} text="剪下" fontSize={9} color="#92400e" />
          </g>
        </>
      )}

      {step === 3 && (
        <>
          {/* 梯形部分 */}
          <polygon points="100,150 230,150 260,60 100,60" fill={paraColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {/* 虚化原位 */}
          <polygon points={triCut} fill="#9ca3af30" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {/* 三角形移到右侧 */}
          <g style={{ transition: 'transform 0.8s ease-in-out', transform: 'translate(160px, 0)' }}>
            <polygon points={triCut} fill={cutColor} stroke="#d97706" strokeWidth="1.5" />
          </g>
          <Label x={165} y={30} text="移到右边补齐" fontSize={10} color="#d97706" />
        </>
      )}

      {step >= 4 && (
        <g className="animate-fade-in">
          <rect x={100} y={60} width={160} height={90} fill={paraColor} stroke="#d97706" strokeWidth="2.5" rx="1" />
          <RightAngleMark x={100} y={60} size={10} color="#d97706" />
          <Label x={180} y={110} text="长方形！" fontSize={16} color="#78350f" bold />
          <Label x={180} y={185} text="面积不变" fontSize={11} color="#d97706" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 场景 12: 通用规律 - 任意三角形 → 平行四边形
 * ================================================================ */

const UniversalRule: React.FC<SceneProps> = ({ step }) => {
  // 任意三角形（不规则形状）
  const triPoints = '50,150 170,150 100,50';

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          {/* 左边三角形 */}
          <polygon points="30,150 120,150 80,60" fill="#a78bfa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {/* 右边完全相同的三角形 */}
          <polygon points="170,150 260,150 220,60" fill="#c4b5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <Label x={75} y={170} text="三角形 A" fontSize={9} color="#5b21b6" />
          <Label x={215} y={170} text="三角形 B" fontSize={9} color="#5b21b6" />
        </>
      )}

      {step === 1 && (
        <>
          <polygon points="30,150 120,150 80,60" fill="#a78bfa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <polygon points="170,150 260,150 220,60" fill="#c4b5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <Label x={150} y={20} text="任意 2 个相同的三角形" fontSize={12} color="#5b21b6" bold />
        </>
      )}

      {step === 2 && (
        <>
          {/* A 保持不动 */}
          <polygon points="60,150 150,150 110,60" fill="#a78bfa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {/* B 旋转 180° 并对齐 */}
          <g style={{
            transition: 'transform 0.6s ease-in-out',
            transformOrigin: '195px 105px',
            transform: 'rotate(180deg)',
          }}>
            <polygon points="150,150 240,150 200,60" fill="#c4b5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          </g>
        </>
      )}

      {step >= 3 && (
        <g className="animate-fade-in">
          {/* 拼成的平行四边形 */}
          <polygon
            points="60,150 150,150 200,60 110,60"
            fill="#a78bfa" stroke="#7c3aed" strokeWidth="2.5"
          />
          <line
            x1={150} y1={150} x2={110} y2={60}
            stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="5,3"
          />
          <rect x={25} y={10} width={250} height={30} rx="8" fill="#7c3aed" opacity="0.12" />
          <Label x={150} y={30} text="一定能拼成平行四边形！" fontSize={14} color="#5b21b6" bold />
          <Label x={150} y={110} text="平行四边形" fontSize={13} color="#4c1d95" bold />
        </g>
      )}
    </svg>
  );
};

/* ================================================================
 * 导出：场景映射 & 课程数据
 * ================================================================ */

export const TRIANGLE_COMBO_SCENE_MAP: Record<string, React.FC<SceneProps>> = {
  'iso-right-tri-to-square': IsoRightTriToSquare,
  'iso-right-tri-to-para': IsoRightTriToPara,
  'right-tri-to-rect': RightTriToRect,
  'acute-tri-to-para': AcuteTriToPara,
  'obtuse-tri-to-para': ObtuseTriToPara,
  'iso-tri-to-rhombus': IsoTriToRhombus,
  'two-sq-to-rect': TwoSqToRect,
  'four-sq-to-big-sq': FourSqToBigSq,
  'four-tri-to-big-tri': FourTriToBigTri,
  'para-diag-cut': ParaDiagCut,
  'para-cut-and-move': ParaCutAndMove,
  'universal-rule': UniversalRule,
};

export const TRIANGLE_COMBO_LESSONS: TransformLesson[] = [
  /* ---- 2 个相同三角形拼合 ---- */
  {
    id: 'iso-right-tri-to-square',
    title: '等腰直角三角形 → 正方形',
    emoji: '🔺',
    category: '三角形拼合',
    steps: [
      { description: '两个等腰直角三角形', subtext: '直角边一样长，斜边最长' },
      { description: '把一个旋转 180°', subtext: '转过来，方向相反' },
      { description: '斜边靠在一起', subtext: '两条斜边紧紧对齐' },
      { description: '变成正方形啦！', subtext: '四条边一样长，四个直角' },
    ],
    summary: '2 个等腰直角三角形 → 1 个正方形',
    summaryIcon: '⬜',
  },
  {
    id: 'iso-right-tri-to-para',
    title: '等腰直角三角形 → 平行四边形',
    emoji: '🔺',
    category: '三角形拼合',
    steps: [
      { description: '两个等腰直角三角形', subtext: '和上一个一样的三角形' },
      { description: '把一个翻过来', subtext: '左右镜像翻转' },
      { description: '直角边对齐拼合', subtext: '这次是直角边贴直角边' },
      { description: '变成平行四边形！', subtext: '换个拼法，结果不同哦' },
    ],
    summary: '2 个等腰直角三角形 → 1 个平行四边形',
    summaryIcon: '▱',
  },
  {
    id: 'right-tri-to-rect',
    title: '直角三角形 → 长方形',
    emoji: '📐',
    category: '三角形拼合',
    steps: [
      { description: '两个直角三角形', subtext: '三条边不一样长，有一个直角' },
      { description: '把一个旋转 180°', subtext: '整个转过来' },
      { description: '斜边对齐', subtext: '两条斜边紧紧贴合' },
      { description: '变成长方形！', subtext: '两条长边 + 两条短边' },
    ],
    summary: '2 个直角三角形 → 1 个长方形',
    summaryIcon: '▬',
  },
  {
    id: 'acute-tri-to-para',
    title: '锐角三角形 → 平行四边形',
    emoji: '🔻',
    category: '三角形拼合',
    steps: [
      { description: '两个锐角三角形', subtext: '三个角都是尖尖的，都小于 90°' },
      { description: '把一个旋转 180°', subtext: '头朝下翻过来' },
      { description: '一条边对齐拼合', subtext: '边和边贴合' },
      { description: '变成平行四边形！', subtext: '锐角三角形也能拼哦' },
    ],
    summary: '2 个锐角三角形 → 1 个平行四边形',
    summaryIcon: '▱',
  },
  {
    id: 'obtuse-tri-to-para',
    title: '钝角三角形 → 平行四边形',
    emoji: '🔻',
    category: '三角形拼合',
    steps: [
      { description: '两个钝角三角形', subtext: '有一个角大大的，超过 90°' },
      { description: '把一个旋转 180°', subtext: '翻转过来' },
      { description: '对齐拼在一起', subtext: '长边贴长边' },
      { description: '变成平行四边形！', subtext: '钝角三角形也可以拼' },
    ],
    summary: '2 个钝角三角形 → 1 个平行四边形',
    summaryIcon: '▱',
  },
  {
    id: 'iso-tri-to-rhombus',
    title: '等腰三角形 → 菱形',
    emoji: '💎',
    category: '三角形拼合',
    steps: [
      { description: '两个等腰三角形', subtext: '两条腰一样长' },
      { description: '一个上下翻转', subtext: '头朝下，底边对底边' },
      { description: '底边对齐', subtext: '两条底边贴在一起' },
      { description: '变成菱形！', subtext: '四条边都一样长，像个钻石' },
    ],
    summary: '2 个等腰三角形 → 1 个菱形',
    summaryIcon: '💎',
  },

  /* ---- 多图形拼合 ---- */
  {
    id: 'two-sq-to-rect',
    title: '2 个正方形 → 长方形',
    emoji: '⬜',
    category: '多图形拼合',
    steps: [
      { description: '两个一样的正方形', subtext: '大小完全相同' },
      { description: '靠在一起', subtext: '边和边紧紧贴合' },
      { description: '变成长方形！', subtext: '宽变成原来的 2 倍' },
    ],
    summary: '2 个正方形 → 1 个长方形',
    summaryIcon: '▬',
  },
  {
    id: 'four-sq-to-big-sq',
    title: '4 个正方形 → 大正方形',
    emoji: '🟨',
    category: '多图形拼合',
    steps: [
      { description: '4 个不同颜色的正方形', subtext: '大小都一样' },
      { description: '向中心靠拢', subtext: '像拼积木一样' },
      { description: '田字格排列，变成大正方形！', subtext: '边长变成 2 倍' },
    ],
    summary: '4 个小正方形 → 1 个大正方形',
    summaryIcon: '⬛',
  },
  {
    id: 'four-tri-to-big-tri',
    title: '4 个小三角形 → 大三角形',
    emoji: '🔺',
    category: '多图形拼合',
    steps: [
      { description: '4 个小三角形', subtext: '大小和形状都一样' },
      { description: '开始组合', subtext: '向中心靠拢' },
      { description: '拼成大三角形！', subtext: '4 个小三角形 = 1 个大三角形' },
    ],
    summary: '4 个小三角形 → 1 个大三角形（面积 ×4）',
    summaryIcon: '🔺',
  },

  /* ---- 平行四边形变换 ---- */
  {
    id: 'para-diag-cut',
    title: '平行四边形 → 对角剪',
    emoji: '✂️',
    category: '平行四边形变换',
    steps: [
      { description: '一个平行四边形', subtext: '对边平行且相等' },
      { description: '画出对角线', subtext: '从一个角到对面的角' },
      { description: '沿对角线剪开！', subtext: '变成两个三角形' },
    ],
    summary: '平行四边形 沿对角线剪 → 2 个三角形',
    summaryIcon: '✂️',
  },
  {
    id: 'para-cut-and-move',
    title: '平行四边形 → 割补成长方形',
    emoji: '🪄',
    category: '平行四边形变换',
    steps: [
      { description: '一个平行四边形', subtext: '看看怎么变成长方形' },
      { description: '沿高画一条垂直线', subtext: '标出左边的直角三角形' },
      { description: '把三角形剪下来', subtext: '从左边分离出来' },
      { description: '移到右边去补', subtext: '平平地移过去' },
      { description: '变成长方形啦！', subtext: '面积不变，只是换了形状' },
    ],
    summary: '平行四边形 → 割补法 → 长方形（面积不变）',
    summaryIcon: '🪄',
  },

  /* ---- 通用规律 ---- */
  {
    id: 'universal-rule',
    title: '通用规律：三角形 → 平行四边形',
    emoji: '💡',
    category: '通用规律',
    steps: [
      { description: '准备好任意 2 个相同三角形', subtext: '形状大小完全一样' },
      { description: '任意 2 个相同的三角形', subtext: '不管是什么类型的三角形' },
      { description: '旋转 180°，边对齐', subtext: '把其中一个翻转过来' },
      { description: '一定能拼成平行四边形！', subtext: '这是图形世界的通用规律哦' },
    ],
    summary: '任意 2 个相同三角形 → 一定能拼成平行四边形！',
    summaryIcon: '💡',
  },
];
