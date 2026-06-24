import React from 'react';

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

/* ======================================================================
   1. SqHFold — 正方形横折/竖折
   step 0: 完整正方形
   step 1: 横向折线（红色虚线）
   step 2: 上半翻折（rotateX 3D）
   step 3: 打开，2 个长方形
   ====================================================================== */
const SqHFold: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {/* 底层纸张（折叠后露出） */}
    <rect x="75" y="25" width="150" height="150" rx="2"
      fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"
      opacity={step >= 1 ? 1 : 0} className="transition-opacity duration-500" />

    {/* 完整纸张 / 上半部分 — 3D 翻折 */}
    {step < 3 && (
      <g style={{
        transformOrigin: '150px 100px',
        transition: 'transform 0.8s ease-in-out',
        transform: step >= 2 ? 'perspective(400px) rotateX(-170deg)' : 'none',
      }}>
        <rect x="75" y="25" width="150" height={150} rx="2"
          fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {step < 1 && (
          <text x="150" y="105" textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        )}
      </g>
    )}

    {/* 折线（画在纸张上方，确保可见） */}
    {step >= 1 && step < 3 && (
      <line x1="75" y1="100" x2="225" y2="100"
        stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
    )}

    {/* 打开后：2 个长方形 */}
    {step >= 3 && (
      <>
        <rect x="80" y="28" width="140" height="68" rx="2"
          fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"
          className="animate-fade-in" />
        <text x="150" y="65" textAnchor="middle" fontSize="11"
          fill="#1e40af" fontWeight="bold">长方形</text>

        <rect x="80" y="107" width="140" height="68" rx="2"
          fill="#60a5fa" stroke="#3b82f6" strokeWidth="2"
          className="animate-fade-in" />
        <text x="150" y="145" textAnchor="middle" fontSize="11"
          fill="#1e40af" fontWeight="bold">长方形</text>

        <line x1="75" y1="100" x2="225" y2="100"
          stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <text x="150" y="192" textAnchor="middle" fontSize="12"
          fill="#ef4444" fontWeight="bold">正方形对折变长方形！</text>
      </>
    )}
  </svg>
);

/* ======================================================================
   2. SqDiagFold — 正方形对角折
   step 0: 完整正方形
   step 1: 对角线虚线
   step 2: 三角形翻折
   step 3: 打开，2 个等腰直角三角形
   ====================================================================== */
const SqDiagFold: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {/* 底层三角形（折叠后露出） */}
    {step >= 1 && step < 3 && (
      <polygon points="75,25 225,25 225,175"
        fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
    )}

    {/* 完整正方形 / 左下三角翻折 */}
    {step < 3 && (
      <g style={{
        transformOrigin: '150px 100px',
        transition: 'transform 0.8s ease-in-out',
        transform: step >= 2
          ? 'perspective(400px) rotate(45deg) rotateY(-170deg) rotate(-45deg)'
          : 'none',
      }}>
        {step < 1 ? (
          <rect x="75" y="25" width="150" height="150" rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        ) : (
          <polygon points="75,25 225,175 75,175"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        )}
        {step < 1 && (
          <text x="150" y="105" textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        )}
      </g>
    )}

    {/* 对角线（画在纸张上方，确保可见） */}
    {step >= 1 && step < 3 && (
      <line x1="75" y1="25" x2="225" y2="175"
        stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
    )}

    {/* 打开后：2 个等腰直角三角形 */}
    {step >= 3 && (
      <>
        <polygon points="40,30 160,30 40,150"
          fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"
          className="animate-fade-in" />
        <text x="65" y="90" fontSize="10" fill="#1e40af" fontWeight="bold">
          等腰直角
        </text>
        <text x="65" y="103" fontSize="10" fill="#1e40af" fontWeight="bold">
          三角形
        </text>

        <polygon points="170,50 290,170 170,170"
          fill="#60a5fa" stroke="#3b82f6" strokeWidth="2"
          className="animate-fade-in" />
        <text x="200" y="140" fontSize="10" fill="#1e40af" fontWeight="bold">
          等腰直角
        </text>
        <text x="200" y="153" fontSize="10" fill="#1e40af" fontWeight="bold">
          三角形
        </text>

        <line x1="40" y1="150" x2="160" y2="30"
          stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="170" y1="170" x2="290" y2="50"
          stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
      </>
    )}
  </svg>
);

/* ======================================================================
   3. SqHV — 正方形横折+竖折 → 4 个小正方形（田字格）
   step 0: 完整正方形
   step 1: 横折线
   step 2: 横折
   step 3: 竖折线
   step 4: 竖折
   step 5: 打开，4 个小正方形
   ====================================================================== */
const SqHV: React.FC<SceneProps> = ({ step }) => {
  // 正方形参数
  const sx = 75, sy = 25, sw = 150, sh = 150;
  const cx = sx + sw / 2, cy = sy + sh / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* step 0: 完整正方形 */}
      {step === 0 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        </>
      )}

      {/* step 1: 显示横折线 */}
      {step === 1 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* step 2: 横折完成 → 长方形 */}
      {step === 2 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={cx} y={sy + sh / 4 + 4} textAnchor="middle" fontSize="12"
            fill="#1e40af" fontWeight="bold">横折后</text>
        </>
      )}

      {/* step 3: 竖折线 */}
      {step === 3 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={cx} y1={sy} x2={cx} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* step 4: 竖折完成 → 小正方形 */}
      {step === 4 && (
        <>
          <rect x={sx} y={sy} width={sw / 2} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
          <text x={sx + sw / 4} y={sy + sh / 4 + 4} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">小正方形</text>
        </>
      )}

      {/* step 5: 全部打开，田字格 */}
      {step >= 5 && (
        <>
          {/* 4 个小正方形 */}
          {[0, 1, 2, 3].map(i => {
            const col = i % 2, row = Math.floor(i / 2);
            const colors = ['#93c5fd', '#60a5fa', '#60a5fa', '#3b82f6'];
            return (
              <rect key={i}
                x={sx + 3 + col * (sw / 2 + 2)}
                y={sy + 3 + row * (sh / 2 + 2)}
                width={sw / 2 - 6} height={sh / 2 - 6} rx="2"
                fill={colors[i]} stroke="#2563eb" strokeWidth="2"
                className="animate-fade-in" />
            );
          })}
          {/* 田字格虚线 */}
          <line x1={cx} y1={sy} x2={cx} y2={sy + sh}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <text x={cx} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">4 个小正方形</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   4. SqHH — 正方形横折+横折 → 4 个小长方形
   step 0: 完整正方形
   step 1: 第 1 次横折线
   step 2: 第 1 次横折
   step 3: 第 2 次横折线
   step 4: 第 2 次横折
   step 5: 打开，4 个小长方形
   ====================================================================== */
const SqHH: React.FC<SceneProps> = ({ step }) => {
  const sx = 75, sy = 25, sw = 150, sh = 150;
  const cx = sx + sw / 2, cy = sy + sh / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        </>
      )}

      {step === 1 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {step === 2 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={cx} y={sy + sh / 4 + 4} textAnchor="middle" fontSize="12"
            fill="#1e40af" fontWeight="bold">第 1 次横折</text>
        </>
      )}

      {step === 3 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={sx} y1={sy + sh / 4} x2={sx + sw} y2={sy + sh / 4}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {step === 4 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 4} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
          <text x={cx} y={sy + sh / 8 + 4} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">再折一次</text>
        </>
      )}

      {step >= 5 && (
        <>
          {[0, 1, 2, 3].map(i => (
            <rect key={i}
              x={sx + 3} y={sy + 3 + i * (sh / 4 + 2)}
              width={sw - 6} height={sh / 4 - 6} rx="2"
              fill={i % 2 === 0 ? '#93c5fd' : '#60a5fa'}
              stroke="#2563eb" strokeWidth="2"
              className="animate-fade-in" />
          ))}
          {[1, 2, 3].map(i => (
            <line key={i}
              x1={sx} y1={sy + i * (sh / 4)}
              x2={sx + sw} y2={sy + i * (sh / 4)}
              stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          ))}
          <text x={cx} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">4 个小长方形</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   5. SqDiagDiag — 对角+对角 → 4 个等腰直角三角形
   step 0: 完整正方形
   step 1: 第 1 条对角线
   step 2: 第 1 次对角折（三角形）
   step 3: 第 2 条对角线（三角形的中线）
   step 4: 第 2 次对角折
   step 5: 打开，4 个等腰直角三角形
   ====================================================================== */
const SqDiagDiag: React.FC<SceneProps> = ({ step }) => {
  const sx = 75, sy = 25, sw = 150, sh = 150;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <text x={sx + sw / 2} y={sy + sh / 2 + 5} textAnchor="middle"
            fontSize="14" fill="#1e40af" fontWeight="bold">正方形</text>
        </>
      )}

      {step === 1 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1={sx} y1={sy} x2={sx + sw} y2={sy + sh}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {step === 2 && (
        <>
          <polygon points={`${sx},${sy} ${sx + sw},${sy} ${sx + sw},${sy + sh}`}
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={sx + sw / 2 + 20} y={sy + sh / 2 - 10} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">三角形</text>
        </>
      )}

      {step === 3 && (
        <>
          <polygon points={`${sx},${sy} ${sx + sw},${sy} ${sx + sw},${sy + sh}`}
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={sx + sw / 2} y1={sy + sh / 2}
            x2={sx + sw} y2={sy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {step === 4 && (
        <>
          <polygon points={`${sx},${sy} ${sx + sw / 2},${sy + sh / 2} ${sx + sw},${sy}`}
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
          <text x={sx + sw / 2} y={sy + sh / 4 + 4} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">再折一次</text>
        </>
      )}

      {step >= 5 && (
        <>
          {/* 4 个等腰直角三角形 */}
          <polygon points={`${sx + 5},${sy + 5} ${sx + sw / 2},${sy + 5} ${sx + sw / 2},${sy + sh / 2}`}
            fill="#93c5fd" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          <polygon points={`${sx + sw / 2},${sy + 5} ${sx + sw - 5},${sy + 5} ${sx + sw / 2},${sy + sh / 2}`}
            fill="#60a5fa" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          <polygon points={`${sx + 5},${sy + sh - 5} ${sx + sw / 2},${sy + sh - 5} ${sx + sw / 2},${sy + sh / 2}`}
            fill="#60a5fa" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          <polygon points={`${sx + sw / 2},${sy + sh - 5} ${sx + sw - 5},${sy + sh - 5} ${sx + sw / 2},${sy + sh / 2}`}
            fill="#3b82f6" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />

          {/* 两条对角线（虚线） */}
          <line x1={sx} y1={sy} x2={sx + sw} y2={sy + sh}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={sx + sw} y1={sy} x2={sx} y2={sy + sh}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />

          <text x={sx + sw / 2} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">4 个等腰直角三角形</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   6. SqHDiag — 横折+对角折 → 4 个直角三角形
   step 0: 完整正方形
   step 1: 横折线
   step 2: 横折
   step 3: 对角线
   step 4: 对角折
   step 5: 打开，4 个直角三角形
   ====================================================================== */
const SqHDiag: React.FC<SceneProps> = ({ step }) => {
  const sx = 75, sy = 25, sw = 150, sh = 150;
  const cx = sx + sw / 2, cy = sy + sh / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        </>
      )}

      {step === 1 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* 横折后：长方形 */}
      {step === 2 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={cx} y={sy + sh / 4 + 4} textAnchor="middle" fontSize="12"
            fill="#1e40af" fontWeight="bold">横折后</text>
        </>
      )}

      {/* 对角线 */}
      {step === 3 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={sx} y1={sy} x2={sx + sw} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* 对角折后 */}
      {step === 4 && (
        <>
          <polygon points={`${sx},${sy} ${sx + sw},${sy} ${sx + sw},${cy}`}
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
          <text x={cx + 20} y={sy + sh / 6} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">三角形</text>
        </>
      )}

      {/* 打开：4 个直角三角形（横折线 + 对角线折痕） */}
      {step >= 5 && (
        <>
          {/* 上半右三角：(左上, 右上, 右中) */}
          <polygon points={`${sx + 3},${sy + 3} ${sx + sw - 3},${sy + 3} ${sx + sw - 3},${cy}`}
            fill="#93c5fd" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          {/* 上半左三角：(左上, 左中, 右中) */}
          <polygon points={`${sx + 3},${sy + 3} ${sx + 3},${cy} ${sx + sw - 3},${cy}`}
            fill="#60a5fa" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          {/* 下半左三角：(左中, 左下, 右中) */}
          <polygon points={`${sx + 3},${cy} ${sx + 3},${sy + sh - 3} ${sx + sw - 3},${cy}`}
            fill="#60a5fa" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />
          {/* 下半右三角：(左下, 右下, 右中) */}
          <polygon points={`${sx + 3},${sy + sh - 3} ${sx + sw - 3},${sy + sh - 3} ${sx + sw - 3},${cy}`}
            fill="#3b82f6" stroke="#2563eb" strokeWidth="2"
            className="animate-fade-in" />

          {/* 折痕虚线：横折线 + 两条对角折痕 */}
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={sx} y1={sy} x2={sx + sw} y2={cy}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1={sx} y1={sy + sh} x2={sx + sw} y2={cy}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />

          <text x={cx} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">4 个直角三角形</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   7. SqHVH — 横→竖→横  → 8 个小长方形
   step 0: 完整正方形
   step 1: 横折线
   step 2: 横折
   step 3: 竖折线
   step 4: 竖折
   step 5: 再横折线
   step 6: 再横折
   step 7: 打开，8 个小长方形
   ====================================================================== */
const SqHVH: React.FC<SceneProps> = ({ step }) => {
  const sx = 75, sy = 25, sw = 150, sh = 150;
  const cx = sx + sw / 2, cy = sy + sh / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14"
            fill="#1e40af" fontWeight="bold">正方形</text>
        </>
      )}

      {step === 1 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1={sx} y1={cy} x2={sx + sw} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* 横折后 */}
      {step === 2 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={cx} y={sy + sh / 4 + 4} textAnchor="middle" fontSize="12"
            fill="#1e40af" fontWeight="bold">第 1 折</text>
        </>
      )}

      {/* 竖折线 */}
      {step === 3 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={cx} y1={sy} x2={cx} y2={cy}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* 竖折后 */}
      {step === 4 && (
        <>
          <rect x={sx} y={sy} width={sw / 2} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={sx + sw / 4} y={sy + sh / 4 + 4} textAnchor="middle"
            fontSize="12" fill="#1e40af" fontWeight="bold">第 2 折</text>
        </>
      )}

      {/* 再横折线 */}
      {step === 5 && (
        <>
          <rect x={sx} y={sy} width={sw / 2} height={sh / 2} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={sx} y1={sy + sh / 4} x2={cx} y2={sy + sh / 4}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        </>
      )}

      {/* 再横折后 */}
      {step === 6 && (
        <>
          <rect x={sx} y={sy} width={sw / 2} height={sh / 4} rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
          <text x={sx + sw / 4} y={sy + sh / 8 + 4} textAnchor="middle"
            fontSize="11" fill="#1e40af" fontWeight="bold">第 3 折</text>
        </>
      )}

      {/* 打开：8 个小长方形 */}
      {step >= 7 && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const col = i % 2, row = Math.floor(i / 2);
            const w = sw / 2 - 4, h = sh / 4 - 4;
            const colors = ['#93c5fd', '#60a5fa', '#60a5fa', '#93c5fd',
                            '#60a5fa', '#3b82f6', '#3b82f6', '#60a5fa'];
            return (
              <rect key={i}
                x={sx + 2 + col * (sw / 2)}
                y={sy + 2 + row * (sh / 4)}
                width={w} height={h} rx="1"
                fill={colors[i]} stroke="#2563eb" strokeWidth="1.5"
                className="animate-fade-in" />
            );
          })}

          {/* 网格虚线 */}
          <line x1={cx} y1={sy} x2={cx} y2={sy + sh}
            stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {[1, 2, 3].map(i => (
            <line key={i}
              x1={sx} y1={sy + i * sh / 4}
              x2={sx + sw} y2={sy + i * sh / 4}
              stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          ))}

          <text x={cx} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">折 3 次 = 8 份</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   8. SqOneDiagCut — 正方形沿 1 条对角线剪
   step 0: 完整正方形（浅红）
   step 1: 对角线 + 剪刀
   step 2: 剪开，2 个等腰直角三角形分离
   ====================================================================== */
const SqOneDiagCut: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {step < 2 && (
      <>
        <rect x="75" y="25" width="150" height="150" rx="2"
          fill="#fca5a5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {step === 0 && (
          <text x="150" y="105" textAnchor="middle" fontSize="14"
            fill="#991b1b" fontWeight="bold">正方形</text>
        )}
      </>
    )}

    {/* 对角线 + 剪刀 */}
    {step === 1 && (
      <>
        <line x1="75" y1="25" x2="225" y2="175"
          stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        <text x="160" y="90" fontSize="16">✂️</text>
        <text x="150" y="192" textAnchor="middle" fontSize="11"
          fill="#ef4444">沿对角线剪开</text>
      </>
    )}

    {/* 剪开：2 个三角形分离 */}
    {step >= 2 && (
      <>
        <g style={{ transition: 'transform 0.6s', transform: 'translate(-20px, -5px)' }}>
          <polygon points="35,30 155,30 35,150"
            fill="#fca5a5" stroke="#ef4444" strokeWidth="2"
            className="animate-fade-in" />
          <text x="60" y="80" fontSize="10" fill="#991b1b" fontWeight="bold">
            等腰直角
          </text>
          <text x="60" y="93" fontSize="10" fill="#991b1b" fontWeight="bold">
            三角形
          </text>
        </g>
        <g style={{ transition: 'transform 0.6s', transform: 'translate(20px, 5px)' }}>
          <polygon points="165,50 285,170 165,170"
            fill="#f87171" stroke="#ef4444" strokeWidth="2"
            className="animate-fade-in" />
          <text x="195" y="140" fontSize="10" fill="#991b1b" fontWeight="bold">
            等腰直角
          </text>
          <text x="195" y="153" fontSize="10" fill="#991b1b" fontWeight="bold">
            三角形
          </text>
        </g>
      </>
    )}
  </svg>
);

/* ======================================================================
   9. SqTwoDiagCut — 正方形沿 2 条对角线剪
   step 0: 完整正方形
   step 1: 第 1 条对角线
   step 2: 第 2 条对角线（X 形）
   step 3: 4 个等腰直角三角形分开
   ====================================================================== */
const SqTwoDiagCut: React.FC<SceneProps> = ({ step }) => {
  const sx = 75, sy = 25, sw = 150, sh = 150;
  const cx = sx + sw / 2, cy = sy + sh / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step < 3 && (
        <>
          <rect x={sx} y={sy} width={sw} height={sh} rx="2"
            fill="#fca5a5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          {step === 0 && (
            <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14"
              fill="#991b1b" fontWeight="bold">正方形</text>
          )}
        </>
      )}

      {/* 第 1 条对角线 */}
      {step >= 1 && step < 3 && (
        <line x1={sx} y1={sy} x2={sx + sw} y2={sy + sh}
          stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
      )}

      {/* 第 2 条对角线 */}
      {step >= 2 && step < 3 && (
        <>
          <line x1={sx + sw} y1={sy} x2={sx} y2={sy + sh}
            stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="16">✂️</text>
        </>
      )}

      {/* 4 个三角形分开 */}
      {step >= 3 && (
        <>
          {/* 上 */}
          <g style={{ transition: 'transform 0.6s', transform: 'translate(0, -8px)' }}>
            <polygon points={`${sx + 8},${sy + 5} ${sx + sw - 8},${sy + 5} ${cx},${cy - 5}`}
              fill="#fca5a5" stroke="#ef4444" strokeWidth="2"
              className="animate-fade-in" />
          </g>
          {/* 下 */}
          <g style={{ transition: 'transform 0.6s', transform: 'translate(0, 8px)' }}>
            <polygon points={`${sx + 8},${sy + sh - 5} ${sx + sw - 8},${sy + sh - 5} ${cx},${cy + 5}`}
              fill="#f87171" stroke="#ef4444" strokeWidth="2"
              className="animate-fade-in" />
          </g>
          {/* 左 */}
          <g style={{ transition: 'transform 0.6s', transform: 'translate(-8px, 0)' }}>
            <polygon points={`${sx + 5},${sy + 8} ${sx + 5},${sy + sh - 8} ${cx - 5},${cy}`}
              fill="#fca5a5" stroke="#ef4444" strokeWidth="2"
              className="animate-fade-in" />
          </g>
          {/* 右 */}
          <g style={{ transition: 'transform 0.6s', transform: 'translate(8px, 0)' }}>
            <polygon points={`${sx + sw - 5},${sy + 8} ${sx + sw - 5},${sy + sh - 8} ${cx + 5},${cy}`}
              fill="#f87171" stroke="#ef4444" strokeWidth="2"
              className="animate-fade-in" />
          </g>

          <text x={cx} y={sy + sh + 16} textAnchor="middle" fontSize="12"
            fill="#ef4444" fontWeight="bold">4 个等腰直角三角形</text>
        </>
      )}
    </svg>
  );
};

/* ======================================================================
   10. RectDiagCutType — 长方形对角剪 → 2 个直角三角形（非等腰）
   step 0: 长方形（浅绿）
   step 1: 对角线
   step 2: 剪开，标注三边不同
   ====================================================================== */
const RectDiagCutType: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {step < 2 && (
      <>
        <rect x="50" y="50" width="200" height="100" rx="2"
          fill="#bbf7d0" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {step === 0 && (
          <text x="150" y="105" textAnchor="middle" fontSize="14"
            fill="#166534" fontWeight="bold">长方形</text>
        )}
      </>
    )}

    {/* 对角线 */}
    {step === 1 && (
      <>
        <line x1="50" y1="50" x2="250" y2="150"
          stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
        <text x="160" y="95" fontSize="16">✂️</text>
        <text x="150" y="170" textAnchor="middle" fontSize="11"
          fill="#ef4444">沿对角线剪开</text>
      </>
    )}

    {/* 剪开：2 个直角三角形 */}
    {step >= 2 && (
      <>
        <g style={{ transition: 'transform 0.6s', transform: 'translate(-15px, -8px)' }}>
          <polygon points="30,40 180,40 30,120"
            fill="#bbf7d0" stroke="#22c55e" strokeWidth="2"
            className="animate-fade-in" />
          {/* 标注三边 */}
          <text x="100" y="35" textAnchor="middle" fontSize="9" fill="#166534">长</text>
          <text x="22" y="85" textAnchor="middle" fontSize="9" fill="#166534">短</text>
          <text x="115" y="88" textAnchor="middle" fontSize="9" fill="#166534">斜</text>
          <text x="75" y="72" fontSize="10" fill="#166534" fontWeight="bold">直角三角形</text>
        </g>

        <g style={{ transition: 'transform 0.6s', transform: 'translate(15px, 8px)' }}>
          <polygon points="140,90 290,170 140,170"
            fill="#86efac" stroke="#22c55e" strokeWidth="2"
            className="animate-fade-in" />
          <text x="200" y="185" textAnchor="middle" fontSize="9" fill="#166534">长</text>
          <text x="296" y="135" textAnchor="middle" fontSize="9" fill="#166534">短</text>
          <text x="180" y="125" textAnchor="middle" fontSize="9" fill="#166534">斜</text>
          <text x="195" y="155" fontSize="10" fill="#166534" fontWeight="bold">直角三角形</text>
        </g>

        <text x="150" y="196" textAnchor="middle" fontSize="11"
          fill="#ef4444" fontWeight="bold">直角三角形（非等腰）— 三边不同</text>
      </>
    )}
  </svg>
);

/* ===================================================================
   导出：场景映射 + 课程数据
   =================================================================== */

export const SQUARE_SCENE_MAP: Record<string, React.FC<SceneProps>> = {
  'sq-h-fold': SqHFold,
  'sq-diag-fold': SqDiagFold,
  'sq-hv': SqHV,
  'sq-hh': SqHH,
  'sq-diag-diag': SqDiagDiag,
  'sq-h-diag': SqHDiag,
  'sq-hvh': SqHVH,
  'sq-one-diag-cut': SqOneDiagCut,
  'sq-two-diag-cut': SqTwoDiagCut,
  'rect-diag-cut-type': RectDiagCutType,
};

export const SQUARE_LESSONS: TransformLesson[] = [
  // === 正方形 1 次对折 ===
  {
    id: 'sq-h-fold',
    title: '正方形 → 横着对折',
    emoji: '📄',
    category: '正方形 1 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '四条边一样长' },
      { description: '找到中间的横线', subtext: '从上到下的正中间' },
      { description: '沿横线向上折', subtext: '下半部分翻上去' },
      { description: '打开看看！', subtext: '正方形对折变长方形！' },
    ],
    summary: '正方形 → 横着对折 → 2 个长方形',
    summaryIcon: '▬',
  },
  {
    id: 'sq-diag-fold',
    title: '正方形 → 对角折',
    emoji: '📐',
    category: '正方形 1 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '四条边一样长' },
      { description: '画一条对角线', subtext: '从左上角到右下角' },
      { description: '沿对角线折', subtext: '一个角翻到对角去' },
      { description: '打开看看！', subtext: '变成 2 个等腰直角三角形' },
    ],
    summary: '正方形 → 对角折 → 2 个等腰直角三角形',
    summaryIcon: '🔺',
  },

  // === 正方形 2 次对折 ===
  {
    id: 'sq-hv',
    title: '正方形 → 横折 + 竖折',
    emoji: '➕',
    category: '正方形 2 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备折两次' },
      { description: '找到中间横线', subtext: '先横着折' },
      { description: '横折完成', subtext: '变成了长方形' },
      { description: '再找竖线', subtext: '长方形的正中间' },
      { description: '竖折完成', subtext: '变成了小正方形' },
      { description: '全部打开！', subtext: '变成了田字格：4 个小正方形' },
    ],
    summary: '正方形 → 横折 + 竖折 → 4 个小正方形（田字格）',
    summaryIcon: '⊞',
  },
  {
    id: 'sq-hh',
    title: '正方形 → 横折 + 横折',
    emoji: '📄',
    category: '正方形 2 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备横折两次' },
      { description: '第 1 次横折线', subtext: '从上到下的中间' },
      { description: '第 1 次横折完成', subtext: '变成了长方形' },
      { description: '第 2 次横折线', subtext: '再对折一次' },
      { description: '第 2 次横折完成', subtext: '变得更窄了' },
      { description: '全部打开！', subtext: '4 条横线分出 4 个小长方形' },
    ],
    summary: '正方形 → 2 次横折 → 4 个小长方形',
    summaryIcon: '▬',
  },
  {
    id: 'sq-diag-diag',
    title: '正方形 → 对角 + 对角',
    emoji: '✕',
    category: '正方形 2 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备对角折两次' },
      { description: '第 1 条对角线', subtext: '从左上到右下' },
      { description: '第 1 次对角折', subtext: '变成三角形' },
      { description: '三角形的中线', subtext: '再折一次' },
      { description: '第 2 次对角折', subtext: '变成更小的三角形' },
      { description: '全部打开！', subtext: '4 个等腰直角三角形' },
    ],
    summary: '正方形 → 2 次对角折 → 4 个等腰直角三角形',
    summaryIcon: '🔺',
  },
  {
    id: 'sq-h-diag',
    title: '正方形 → 横折 + 对角折',
    emoji: '📐',
    category: '正方形 2 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '先横折，再对角折' },
      { description: '找到横线', subtext: '先横着折' },
      { description: '横折完成', subtext: '变成了长方形' },
      { description: '画对角线', subtext: '长方形的对角' },
      { description: '对角折完成', subtext: '变成三角形' },
      { description: '全部打开！', subtext: '4 个直角三角形' },
    ],
    summary: '正方形 → 横折 + 对角折 → 4 个直角三角形',
    summaryIcon: '📐',
  },

  // === 正方形 3 次对折 ===
  {
    id: 'sq-hvh',
    title: '正方形 → 横→竖→横（3 次折）',
    emoji: '🔢',
    category: '正方形 3 次对折',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备折三次' },
      { description: '第 1 折：横折线', subtext: '先横着折' },
      { description: '第 1 折完成', subtext: '变成长方形' },
      { description: '第 2 折：竖折线', subtext: '再竖着折' },
      { description: '第 2 折完成', subtext: '变成小正方形' },
      { description: '第 3 折：再横折', subtext: '最后一次' },
      { description: '第 3 折完成', subtext: '变得很小了' },
      { description: '全部打开！', subtext: '折 3 次 = 8 份！' },
    ],
    summary: '正方形 → 折 3 次 → 8 个小长方形',
    summaryIcon: '🔢',
  },

  // === 剪切变换 ===
  {
    id: 'sq-one-diag-cut',
    title: '正方形沿 1 条对角线剪',
    emoji: '✂️',
    category: '剪切变换',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备沿对角线剪开' },
      { description: '画对角线', subtext: '从左上到右下，准备剪' },
      { description: '剪开了！', subtext: '2 个完全一样的等腰直角三角形' },
    ],
    summary: '正方形 → 沿 1 条对角线剪 → 2 个等腰直角三角形',
    summaryIcon: '✂️',
  },
  {
    id: 'sq-two-diag-cut',
    title: '正方形沿 2 条对角线剪',
    emoji: '✂️',
    category: '剪切变换',
    steps: [
      { description: '这是一张正方形纸', subtext: '准备剪两刀' },
      { description: '画第 1 条对角线', subtext: '从左上到右下' },
      { description: '画第 2 条对角线', subtext: '形成 X 形' },
      { description: '全部剪开！', subtext: '4 个等腰直角三角形' },
    ],
    summary: '正方形 → 沿 2 条对角线剪 → 4 个等腰直角三角形',
    summaryIcon: '✂️',
  },
  {
    id: 'rect-diag-cut-type',
    title: '长方形对角剪（三角形类型）',
    emoji: '✂️',
    category: '剪切变换',
    steps: [
      { description: '这是一张长方形纸', subtext: '注意：长和宽不一样' },
      { description: '画对角线', subtext: '从左上到右下' },
      { description: '剪开了！', subtext: '直角三角形（非等腰）— 三条边长不同' },
    ],
    summary: '长方形 → 对角剪 → 2 个直角三角形（非等腰）',
    summaryIcon: '✂️',
  },
];
