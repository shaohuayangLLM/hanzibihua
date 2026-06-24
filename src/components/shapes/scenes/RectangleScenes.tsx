import React from 'react';

/* ================================================================
 * 长方形折叠动画场景 —— 面向一年级小学生的图形教学
 * 共 11 个场景：
 *   普通长方形 1 次对折 × 3（横折、竖折、对角剪）
 *   普通长方形 2 次对折 × 4（横横、横竖、竖竖、横+对角）
 *   普通长方形 3 次对折 × 1（横横横）
 *   2:1 长方形 × 2（竖折、横竖）
 *   3:1 长方形 × 1（三等分）
 * ================================================================ */

// ─── 类型定义 ───────────────────────────────────────────────────

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

// ─── 公用常量 ───────────────────────────────────────────────────

const T = '0.8s ease-in-out'; // 主动画时长
const DASH = '8,4';

// ─── 1. RectHFold — 长方形横折 ──────────────────────────────────

const RectHFold: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {/* step 0: 完整长方形 */}
    {step === 0 && (
      <g>
        <rect x="50" y="30" width="200" height="140" rx="2" fill="#86efac" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#166534" fontWeight="bold">长方形</text>
      </g>
    )}

    {/* step 1: 显示折线 + 箭头 */}
    {step === 1 && (
      <g>
        <rect x="50" y="30" width="200" height="140" rx="2" fill="#86efac" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
        <defs>
          <marker id="arrowHF" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
        <path d="M150,145 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHF)" />
        <text x="168" y="140" fontSize="11" fill="#ef4444" fontWeight="bold">向上折</text>
      </g>
    )}

    {/* step 2: 下半部分翻折动画 */}
    {step === 2 && (
      <g>
        {/* 上半部分保持不动 */}
        <rect x="50" y="30" width="200" height="70" rx="2" fill="#86efac" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="150" y="70" textAnchor="middle" fontSize="11" fill="#166534">上半部分</text>
        {/* 下半部分翻折上去 */}
        <g style={{ transformOrigin: '150px 100px', transition: `transform ${T}`, transform: 'perspective(400px) rotateX(-170deg)' }}>
          <rect x="50" y="100" width="200" height="70" rx="2" fill="#4ade80" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        </g>
        <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray={DASH} />
      </g>
    )}

    {/* step 3: 打开，显示折痕分出的 2 个小长方形 */}
    {step >= 3 && (
      <g>
        {/* 上半 */}
        <rect x="50" y="30" width="200" height="65" rx="2" fill="#86efac" stroke="#22c55e" strokeWidth="2" />
        <text x="150" y="68" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">小长方形 1</text>
        {/* 折痕 */}
        <line x1="50" y1="100" x2="250" y2="100" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3" />
        {/* 下半 */}
        <rect x="50" y="105" width="200" height="65" rx="2" fill="#4ade80" stroke="#22c55e" strokeWidth="2" />
        <text x="150" y="143" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">小长方形 2</text>
        {/* 提示 */}
        <text x="150" y="190" textAnchor="middle" fontSize="11" fill="#9ca3af">折痕把长方形分成了上下两个小长方形</text>
      </g>
    )}
  </svg>
);

// ─── 2. RectVFold — 长方形竖折 ──────────────────────────────────

const RectVFold: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {/* step 0: 完整长方形 */}
    {step === 0 && (
      <g>
        <rect x="30" y="40" width="240" height="120" rx="2" fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#1e40af" fontWeight="bold">长方形</text>
      </g>
    )}

    {/* step 1: 竖向折线 + 箭头 */}
    {step === 1 && (
      <g>
        <rect x="30" y="40" width="240" height="120" rx="2" fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <line x1="150" y1="40" x2="150" y2="160" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
        <defs>
          <marker id="arrowVF" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
        <path d="M210,100 L158,100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowVF)" />
        <text x="212" y="96" fontSize="11" fill="#ef4444" fontWeight="bold">向左折</text>
      </g>
    )}

    {/* step 2: 右半翻折动画 */}
    {step === 2 && (
      <g>
        <rect x="30" y="40" width="120" height="120" rx="2" fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="90" y="105" textAnchor="middle" fontSize="11" fill="#1e40af">左半部分</text>
        <g style={{ transformOrigin: '150px 100px', transition: `transform ${T}`, transform: 'perspective(400px) rotateY(170deg)' }}>
          <rect x="150" y="40" width="120" height="120" rx="2" fill="#60a5fa" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        </g>
        <line x1="150" y1="40" x2="150" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray={DASH} />
      </g>
    )}

    {/* step 3: 打开，显示左右两个小长方形 */}
    {step >= 3 && (
      <g>
        <rect x="30" y="40" width="115" height="120" rx="2" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
        <text x="88" y="105" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">小长方形 1</text>
        <line x1="150" y1="40" x2="150" y2="160" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3" />
        <rect x="155" y="40" width="115" height="120" rx="2" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
        <text x="213" y="105" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">小长方形 2</text>
        <text x="150" y="185" textAnchor="middle" fontSize="11" fill="#9ca3af">折痕把长方形分成了左右两个小长方形</text>
      </g>
    )}
  </svg>
);

// ─── 3. RectDiagCut — 长方形对角剪 ─────────────────────────────

const RectDiagCut: React.FC<SceneProps> = ({ step }) => (
  <svg viewBox="0 0 300 200" className="w-full h-auto">
    {/* step 0: 完整长方形 */}
    {step === 0 && (
      <g>
        <rect x="40" y="30" width="220" height="140" rx="2"
          fill="#fecaca" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#991b1b" fontWeight="bold">长方形</text>
      </g>
    )}

    {/* step 1: 对角线 + 剪刀 */}
    {step === 1 && (
      <g>
        <rect x="40" y="30" width="220" height="140" rx="2"
          fill="#fecaca" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <line x1="40" y1="30" x2="260" y2="170" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
        <text x="160" y="80" fontSize="16" fill="#ef4444">✂️</text>
        <text x="150" y="190" textAnchor="middle" fontSize="10" fill="#ef4444">沿对角线剪开</text>
      </g>
    )}

    {/* step 2: 两个直角三角形分开 */}
    {step >= 2 && (
      <>
        {/* 上方三角形：左上→右上→右下 */}
        <g style={{ transition: `transform 0.6s ease-out`, transform: 'translate(-12px, -8px)' }}>
          <polygon points="40,30 260,30 260,170" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
          <text x="200" y="90" fontSize="11" fill="#991b1b" fontWeight="bold">直角三角形 1</text>
        </g>
        {/* 下方三角形：左上→左下→右下 */}
        <g style={{ transition: `transform 0.6s ease-out`, transform: 'translate(12px, 8px)' }}>
          <polygon points="40,30 40,170 260,170" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
          <text x="100" y="140" fontSize="11" fill="#991b1b" fontWeight="bold">直角三角形 2</text>
        </g>
      </>
    )}
  </svg>
);

// ─── 4. RectHH — 横折+横折 ─────────────────────────────────────

const RectHH: React.FC<SceneProps> = ({ step }) => {
  // step 0: 完整长方形
  // step 1: 第一条横折线
  // step 2: 折叠成半高
  // step 3: 第二条横折线
  // step 4: 折叠成更小
  // step 5: 打开，4 等分
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* step 0-1: 完整长方形 */}
      {step <= 1 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#bbf7d0" stroke="#86efac" strokeWidth="1.5" />
          {step === 0 && (
            <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#166534" fontWeight="bold">长方形</text>
          )}
          {step === 1 && (
            <>
              <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
              <defs>
                <marker id="arrowHH1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
                </marker>
              </defs>
              <path d="M150,155 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHH1)" />
              <text x="168" y="150" fontSize="10" fill="#ef4444" fontWeight="bold">第 1 折：向上</text>
            </>
          )}
        </g>
      )}

      {/* step 2-3: 半高长方形 */}
      {(step === 2 || step === 3) && (
        <g>
          <rect x="50" y="50" width="200" height="80" rx="2"
            fill="#86efac" stroke="#22c55e" strokeWidth="1.5" />
          {step === 2 && (
            <text x="150" y="95" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">折了 1 次</text>
          )}
          {step === 3 && (
            <>
              <line x1="50" y1="90" x2="250" y2="90" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
              <defs>
                <marker id="arrowHH2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
                </marker>
              </defs>
              <path d="M150,118 L150,98" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHH2)" />
              <text x="168" y="116" fontSize="10" fill="#ef4444" fontWeight="bold">第 2 折：向上</text>
            </>
          )}
        </g>
      )}

      {/* step 4: 更小长方形 */}
      {step === 4 && (
        <g>
          <rect x="50" y="60" width="200" height="40" rx="2"
            fill="#4ade80" stroke="#22c55e" strokeWidth="1.5" />
          <text x="150" y="84" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="bold">折了 2 次</text>
        </g>
      )}

      {/* step 5: 打开，4 等分 */}
      {step >= 5 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
          {[1, 2, 3].map(i => (
            <line key={i} x1="50" y1={20 + i * 40} x2="250" y2={20 + i * 40}
              stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <React.Fragment key={i}>
              <rect x="55" y={25 + i * 40} width="190" height="30" rx="1"
                fill={i % 2 === 0 ? '#86efac' : '#4ade80'} opacity="0.5" />
              <text x="150" y={44 + i * 40} textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">
                {i + 1}
              </text>
            </React.Fragment>
          ))}
          <text x="150" y="195" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="bold">
            4 个小长方形！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 5. RectHV — 横折+竖折 ─────────────────────────────────────

const RectHV: React.FC<SceneProps> = ({ step }) => {
  // step 0: 完整长方形
  // step 1: 完整长方形 + 横折线
  // step 2: 半高长方形 + 竖折线
  // step 3: 折叠成 1/4
  // step 4: 打开，田字格 4 份
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* step 0: 完整长方形 */}
      {step === 0 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#bbf7d0" stroke="#86efac" strokeWidth="1.5" />
          <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#166534" fontWeight="bold">长方形</text>
        </g>
      )}

      {/* step 1: 完整长方形 + 横折线 + 箭头 */}
      {step === 1 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#bbf7d0" stroke="#86efac" strokeWidth="1.5" />
          <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <defs>
            <marker id="arrowHV1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M150,155 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHV1)" />
          <text x="168" y="150" fontSize="10" fill="#ef4444" fontWeight="bold">第 1 折：向上</text>
        </g>
      )}

      {/* step 2: 半高长方形 + 竖折线 */}
      {step === 2 && (
        <g>
          <rect x="50" y="50" width="200" height="80" rx="2"
            fill="#86efac" stroke="#22c55e" strokeWidth="1.5" />
          <line x1="50" y1="90" x2="250" y2="90" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="150" y1="50" x2="150" y2="130" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <defs>
            <marker id="arrowHV2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M210,90 L158,90" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHV2)" />
          <text x="212" y="86" fontSize="10" fill="#ef4444" fontWeight="bold">第 2 折：向左</text>
        </g>
      )}

      {/* step 3: 1/4 大小 */}
      {step === 3 && (
        <g>
          <rect x="75" y="55" width="100" height="80" rx="2"
            fill="#4ade80" stroke="#22c55e" strokeWidth="1.5" />
          <text x="125" y="100" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="bold">折了 2 次</text>
        </g>
      )}

      {/* step 4: 田字格 */}
      {step >= 4 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
          <line x1="150" y1="20" x2="150" y2="180" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="50" y1="100" x2="250" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {/* 4 块 */}
          {[0, 1].map(r => [0, 1].map(c => (
            <React.Fragment key={`${r}-${c}`}>
              <rect x={55 + c * 100} y={25 + r * 80} width="90" height="70" rx="1"
                fill={((r + c) % 2 === 0) ? '#86efac' : '#4ade80'} opacity="0.5" />
              <text x={100 + c * 100} y={65 + r * 80} textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">
                {r * 2 + c + 1}
              </text>
            </React.Fragment>
          )))}
          <text x="150" y="195" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="bold">
            田字格：4 份！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 6. RectVV — 竖折+竖折 ─────────────────────────────────────

const RectVV: React.FC<SceneProps> = ({ step }) => {
  // step 0: 完整长方形
  // step 1: 第一条竖折线
  // step 2: 折叠成半宽
  // step 3: 第二条竖折线
  // step 4: 折叠成更窄
  // step 5: 打开，4 等分竖条
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step <= 1 && (
        <g>
          <rect x="30" y="30" width="240" height="140" rx="2"
            fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
          {step === 0 && (
            <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#1e40af" fontWeight="bold">长方形</text>
          )}
          {step === 1 && (
            <>
              <line x1="150" y1="30" x2="150" y2="170" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
              <defs>
                <marker id="arrowVV1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
                </marker>
              </defs>
              <path d="M220,100 L158,100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowVV1)" />
              <text x="222" y="96" fontSize="10" fill="#ef4444" fontWeight="bold">第 1 折：向左</text>
            </>
          )}
        </g>
      )}

      {(step === 2 || step === 3) && (
        <g>
          <rect x="75" y="30" width="120" height="140" rx="2"
            fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
          {step === 2 && (
            <text x="135" y="105" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">折了 1 次</text>
          )}
          {step === 3 && (
            <>
              <line x1="135" y1="30" x2="135" y2="170" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
              <defs>
                <marker id="arrowVV2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
                </marker>
              </defs>
              <path d="M175,100 L143,100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowVV2)" />
              <text x="177" y="96" fontSize="10" fill="#ef4444" fontWeight="bold">第 2 折：向左</text>
            </>
          )}
        </g>
      )}

      {step === 4 && (
        <g>
          <rect x="100" y="30" width="60" height="140" rx="2"
            fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="130" y="105" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="bold">折了 2 次</text>
        </g>
      )}

      {step >= 5 && (
        <g>
          <rect x="30" y="30" width="240" height="140" rx="2"
            fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          {[1, 2, 3].map(i => (
            <line key={i} x1={30 + i * 60} y1="30" x2={30 + i * 60} y2="170"
              stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <React.Fragment key={i}>
              <rect x={35 + i * 60} y="35" width="50" height="130" rx="1"
                fill={i % 2 === 0 ? '#93c5fd' : '#60a5fa'} opacity="0.5" />
              <text x={60 + i * 60} y="105" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="bold">
                {i + 1}
              </text>
            </React.Fragment>
          ))}
          <text x="150" y="185" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="bold">
            4 个小长方形！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 7. RectHDiag — 横折+对角折 ────────────────────────────────

const RectHDiag: React.FC<SceneProps> = ({ step }) => {
  // step 0: 完整长方形
  // step 1: 完整长方形 + 横折线
  // step 2: 半高长方形 + 对角线
  // step 3: 对角折叠
  // step 4: 打开，4 个直角三角形
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#92400e" fontWeight="bold">长方形</text>
        </g>
      )}

      {step === 1 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <defs>
            <marker id="arrowHD" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M150,155 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHD)" />
          <text x="168" y="150" fontSize="10" fill="#ef4444" fontWeight="bold">第 1 折：向上</text>
        </g>
      )}

      {step === 2 && (
        <g>
          <rect x="50" y="50" width="200" height="80" rx="2"
            fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="250" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray={DASH} />
          <text x="165" y="75" fontSize="10" fill="#ef4444">对角折</text>
        </g>
      )}

      {step === 3 && (
        <g>
          <polygon points="50,50 250,50 50,130" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="110" y="85" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">折好了</text>
        </g>
      )}

      {step >= 4 && (
        <g>
          <rect x="50" y="20" width="200" height="160" rx="2"
            fill="#fef9c3" stroke="#fbbf24" strokeWidth="2" />
          {/* 横折线 */}
          <line x1="50" y1="100" x2="250" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {/* 两条对角线 */}
          <line x1="50" y1="20" x2="250" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="50" y1="100" x2="250" y2="180" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {/* 标注 4 个三角形 */}
          <text x="120" y="55" textAnchor="middle" fontSize="9" fill="#92400e">△1</text>
          <text x="185" y="75" textAnchor="middle" fontSize="9" fill="#92400e">△2</text>
          <text x="120" y="135" textAnchor="middle" fontSize="9" fill="#92400e">△3</text>
          <text x="185" y="155" textAnchor="middle" fontSize="9" fill="#92400e">△4</text>
          <text x="150" y="195" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">
            4 个直角三角形！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 8. RectHHH — 横→横→横（3 次对折）────────────────────────────

const RectHHH: React.FC<SceneProps> = ({ step }) => {
  // step 0: 完整长方形
  // step 1: 完整长方形 + 第 1 折线
  // step 2: 半高 + 第 2 折线
  // step 3: 1/4 高 + 第 3 折线
  // step 4: 1/8 高
  // step 5: 打开，8 等分
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <g>
          <rect x="50" y="10" width="200" height="180" rx="2"
            fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.5" />
          <text x="150" y="105" textAnchor="middle" fontSize="14" fill="#3730a3" fontWeight="bold">长方形</text>
        </g>
      )}

      {/* step 1: 完整长方形 + 第 1 折线 */}
      {step === 1 && (
        <g>
          <rect x="50" y="10" width="200" height="180" rx="2"
            fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.5" />
          <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <text x="260" y="104" fontSize="9" fill="#ef4444">第 1 折</text>
          <defs>
            <marker id="arrowHHH1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M150,160 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowHHH1)" />
          <text x="168" y="155" fontSize="10" fill="#ef4444" fontWeight="bold">向上折</text>
        </g>
      )}

      {/* step 2: 半高 + 第 2 折线 */}
      {step === 2 && (
        <g>
          <rect x="50" y="50" width="200" height="90" rx="2"
            fill="#c7d2fe" stroke="#818cf8" strokeWidth="1.5" />
          <line x1="50" y1="95" x2="250" y2="95" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <text x="260" y="99" fontSize="9" fill="#ef4444">第 2 折</text>
          <text x="150" y="78" textAnchor="middle" fontSize="11" fill="#3730a3">折了 1 次</text>
        </g>
      )}

      {/* step 3: 1/4 高 + 第 3 折线 */}
      {step === 3 && (
        <g>
          <rect x="50" y="65" width="200" height="45" rx="2"
            fill="#a5b4fc" stroke="#818cf8" strokeWidth="1.5" />
          <line x1="50" y1="87" x2="250" y2="87" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <text x="260" y="91" fontSize="9" fill="#ef4444">第 3 折</text>
          <text x="150" y="83" textAnchor="middle" fontSize="10" fill="#3730a3">折了 2 次</text>
        </g>
      )}

      {step === 4 && (
        <g>
          <rect x="50" y="75" width="200" height="22" rx="2"
            fill="#818cf8" stroke="#6366f1" strokeWidth="1.5" />
          <text x="150" y="70" textAnchor="middle" fontSize="10" fill="#3730a3" fontWeight="bold">折了 3 次，好小！</text>
        </g>
      )}

      {step >= 5 && (
        <g>
          <rect x="50" y="10" width="200" height="176" rx="2"
            fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <line key={i} x1="50" y1={10 + i * 22} x2="250" y2={10 + i * 22}
              stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <text key={i} x="150" y={24 + i * 22} textAnchor="middle" fontSize="9"
              fill="#3730a3" fontWeight="bold">
              {i + 1}
            </text>
          ))}
          <text x="150" y="198" textAnchor="middle" fontSize="11" fill="#4f46e5" fontWeight="bold">
            折 3 次 = 8 份！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 9. Rect21VFold — 2:1 长方形竖折 ───────────────────────────

const Rect21VFold: React.FC<SceneProps> = ({ step }) => {
  // step 0: 2:1 长方形，标注"长 = 2 × 宽"
  // step 1: 竖向折线
  // step 2: 折叠
  // step 3: 2 个正方形（惊喜！）
  // 2:1 比例：200 × 100，竖折后每半 100×100 = 正方形
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* 底层（折叠时露出的底色） */}
      <rect x="50" y="50" width="200" height="100" rx="2"
        fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"
        opacity={step >= 1 ? 1 : 0}
        style={{ transition: `opacity 0.5s` }} />

      {/* 折线 */}
      {step >= 1 && step < 3 && (
        <line x1="150" y1="50" x2="150" y2="150"
          stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
      )}

      {/* 主体（可动画翻转） */}
      <g style={{
        transformOrigin: '150px 100px',
        transition: `transform ${T}, opacity 0.3s`,
        transform: step >= 2 ? 'perspective(400px) rotateY(170deg)' : 'none',
        opacity: step >= 3 ? 0 : 1,
      }}>
        <rect x="50" y="50" width="200" height="100" rx="2"
          fill="#93c5fd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {step === 0 && (
          <>
            <text x="150" y="95" textAnchor="middle" fontSize="13" fill="#1e40af" fontWeight="bold">2:1 长方形</text>
            <text x="150" y="112" textAnchor="middle" fontSize="10" fill="#3b82f6">长 = 2 × 宽</text>
            {/* 标注宽度 */}
            <line x1="42" y1="50" x2="42" y2="150" stroke="#3b82f6" strokeWidth="1" />
            <text x="36" y="105" textAnchor="middle" fontSize="8" fill="#3b82f6" transform="rotate(-90,36,105)">宽</text>
            {/* 标注长度 */}
            <line x1="50" y1="158" x2="250" y2="158" stroke="#3b82f6" strokeWidth="1" />
            <text x="150" y="168" textAnchor="middle" fontSize="8" fill="#3b82f6">长（= 2 × 宽）</text>
          </>
        )}
      </g>

      {/* 结果：2 个正方形 */}
      {step >= 3 && (
        <g style={{ transition: `opacity 0.5s` }}>
          <rect x="50" y="50" width="95" height="100" rx="2" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" />
          <text x="98" y="105" textAnchor="middle" fontSize="13" fill="#1e40af" fontWeight="bold">正方形!</text>
          <rect x="155" y="50" width="95" height="100" rx="2" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
          <text x="203" y="105" textAnchor="middle" fontSize="13" fill="#1e40af" fontWeight="bold">正方形!</text>
          <line x1="150" y1="50" x2="150" y2="150" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="150" y="175" textAnchor="middle" fontSize="12" fill="#2563eb" fontWeight="bold">
            变成 2 个正方形啦!
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 10. Rect21HV — 2:1 横折+竖折 ──────────────────────────────

const Rect21HV: React.FC<SceneProps> = ({ step }) => {
  // step 0: 2:1 长方形
  // step 1: 完整 2:1 长方形 + 横折线
  // step 2: 半高 + 竖折线
  // step 3: 折叠
  // step 4: 打开，4 个小 2:1 长方形
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <g>
          <rect x="30" y="40" width="240" height="120" rx="2"
            fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="150" y="95" textAnchor="middle" fontSize="13" fill="#1e40af" fontWeight="bold">2:1 长方形</text>
          <text x="150" y="112" textAnchor="middle" fontSize="10" fill="#3b82f6">长 = 2 × 宽</text>
        </g>
      )}

      {/* step 1: 完整 2:1 长方形 + 横折线 */}
      {step === 1 && (
        <g>
          <rect x="30" y="40" width="240" height="120" rx="2"
            fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="30" y1="100" x2="270" y2="100" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <defs>
            <marker id="arrow21HV" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M150,140 L150,108" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow21HV)" />
          <text x="168" y="138" fontSize="10" fill="#ef4444" fontWeight="bold">第 1 折：向上</text>
        </g>
      )}

      {/* step 2: 半高 + 竖折线 */}
      {step === 2 && (
        <g>
          <rect x="30" y="70" width="240" height="60" rx="2"
            fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="30" y1="100" x2="270" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="150" y1="70" x2="150" y2="130" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <defs>
            <marker id="arrow21HV2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>
          <path d="M220,100 L158,100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow21HV2)" />
          <text x="222" y="96" fontSize="10" fill="#ef4444" fontWeight="bold">第 2 折：向左</text>
        </g>
      )}

      {step === 3 && (
        <g>
          <rect x="60" y="70" width="120" height="60" rx="2"
            fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="120" y="105" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="bold">折了 2 次</text>
        </g>
      )}

      {step >= 4 && (
        <g>
          <rect x="30" y="40" width="240" height="120" rx="2"
            fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <line x1="150" y1="40" x2="150" y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="30" y1="100" x2="270" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {[0, 1].map(r => [0, 1].map(c => (
            <React.Fragment key={`${r}-${c}`}>
              <rect x={35 + c * 120} y={45 + r * 60} width="110" height="50" rx="1"
                fill={((r + c) % 2 === 0) ? '#93c5fd' : '#60a5fa'} opacity="0.5" />
              <text x={90 + c * 120} y={75 + r * 60} textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="bold">
                小长方形 {r * 2 + c + 1}
              </text>
            </React.Fragment>
          )))}
          <text x="150" y="180" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="bold">
            4 个小 2:1 长方形！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 11. Rect31Trisect — 3:1 三等分 ────────────────────────────

const Rect31Trisect: React.FC<SceneProps> = ({ step }) => {
  // step 0: 3:1 长方形，标注"长 = 3 × 宽"
  // step 1: 2 条竖向等分线
  // step 2: 折叠动画
  // step 3: 打开，3 个正方形
  // 3:1 比例：270 × 90，每等分 90×90 = 正方形
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {step === 0 && (
        <g>
          <rect x="15" y="55" width="270" height="90" rx="2"
            fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" />
          <text x="150" y="95" textAnchor="middle" fontSize="13" fill="#5b21b6" fontWeight="bold">3:1 长方形</text>
          <text x="150" y="115" textAnchor="middle" fontSize="10" fill="#7c3aed">长 = 3 × 宽</text>
          {/* 标注宽 */}
          <line x1="8" y1="55" x2="8" y2="145" stroke="#7c3aed" strokeWidth="1" />
          <text x="3" y="105" textAnchor="middle" fontSize="7" fill="#7c3aed" transform="rotate(-90,3,105)">宽</text>
          {/* 标注长 */}
          <line x1="15" y1="153" x2="285" y2="153" stroke="#7c3aed" strokeWidth="1" />
          <text x="150" y="163" textAnchor="middle" fontSize="8" fill="#7c3aed">长（= 3 × 宽）</text>
        </g>
      )}

      {step === 1 && (
        <g>
          <rect x="15" y="55" width="270" height="90" rx="2"
            fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="105" y1="55" x2="105" y2="145" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <line x1="195" y1="55" x2="195" y2="145" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={DASH} />
          <text x="60" y="105" textAnchor="middle" fontSize="10" fill="#5b21b6">1</text>
          <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#5b21b6">2</text>
          <text x="240" y="105" textAnchor="middle" fontSize="10" fill="#5b21b6">3</text>
          <text x="150" y="160" textAnchor="middle" fontSize="10" fill="#ef4444">三等分线</text>
        </g>
      )}

      {step === 2 && (
        <g>
          <rect x="105" y="55" width="90" height="90" rx="2"
            fill="#a78bfa" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="150" y="105" textAnchor="middle" fontSize="11" fill="#5b21b6" fontWeight="bold">折好了</text>
        </g>
      )}

      {step >= 3 && (
        <g>
          <rect x="15" y="55" width="270" height="90" rx="2"
            fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <line x1="105" y1="55" x2="105" y2="145" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="195" y1="55" x2="195" y2="145" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,3" />
          {[0, 1, 2].map(i => (
            <React.Fragment key={i}>
              <rect x={20 + i * 90} y="60" width="80" height="80" rx="1"
                fill={['#c4b5fd', '#a78bfa', '#8b5cf6'][i]} opacity="0.5" />
              <text x={60 + i * 90} y="105" textAnchor="middle" fontSize="12" fill="#5b21b6" fontWeight="bold">
                正方形!
              </text>
            </React.Fragment>
          ))}
          <text x="150" y="165" textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="bold">
            3 个正方形！
          </text>
        </g>
      )}
    </svg>
  );
};

// ─── 场景映射表 ─────────────────────────────────────────────────

export const RECTANGLE_SCENE_MAP: Record<string, React.FC<SceneProps>> = {
  'rect-h-fold': RectHFold,
  'rect-v-fold': RectVFold,
  'rect-diag-cut': RectDiagCut,
  'rect-hh': RectHH,
  'rect-hv': RectHV,
  'rect-vv': RectVV,
  'rect-h-diag': RectHDiag,
  'rect-hhh': RectHHH,
  'rect-21-v-fold': Rect21VFold,
  'rect-21-hv': Rect21HV,
  'rect-31-trisect': Rect31Trisect,
};

// ─── 课程列表 ───────────────────────────────────────────────────

export const RECTANGLE_LESSONS: TransformLesson[] = [
  // ── 普通长方形 1 次对折 ──
  {
    id: 'rect-h-fold',
    title: '长方形横折',
    emoji: '📄',
    category: '1 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '浅绿色的长方形，观察它的形状' },
      { description: '画一条横线', subtext: '红色虚线在正中间，箭头提示向上折' },
      { description: '沿横线向上折', subtext: '下半部分翻上去，看 3D 折叠效果' },
      { description: '打开看看！', subtext: '变成了 2 个小长方形' },
    ],
    summary: '横着折 1 次 → 2 个小长方形',
    summaryIcon: '📐',
  },
  {
    id: 'rect-v-fold',
    title: '长方形竖折',
    emoji: '📄',
    category: '1 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '浅蓝色的长方形' },
      { description: '画一条竖线', subtext: '红色虚线在正中间，箭头提示向左折' },
      { description: '沿竖线向左折', subtext: '右半部分翻到左边' },
      { description: '打开看看！', subtext: '变成了 2 个小长方形' },
    ],
    summary: '竖着折 1 次 → 2 个小长方形',
    summaryIcon: '📐',
  },
  {
    id: 'rect-diag-cut',
    title: '长方形对角剪',
    emoji: '✂️',
    category: '1 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '浅红色的长方形' },
      { description: '画对角线，准备剪', subtext: '虚线从左上到右下，✂️ 准备好了' },
      { description: '剪开了！', subtext: '变成了 2 个直角三角形' },
    ],
    summary: '对角线剪开 → 2 个直角三角形',
    summaryIcon: '🔺',
  },

  // ── 普通长方形 2 次对折 ──
  {
    id: 'rect-hh',
    title: '横折 + 横折',
    emoji: '🔄',
    category: '2 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '准备折 2 次' },
      { description: '第 1 次横折', subtext: '沿中间横线折叠' },
      { description: '折好了，变成半高', subtext: '再来一次！' },
      { description: '第 2 次横折', subtext: '再沿中间折一次' },
      { description: '又变小了！', subtext: '折了 2 次' },
      { description: '打开看看！', subtext: '4 个横条小长方形' },
    ],
    summary: '横折 2 次 → 4 个小长方形',
    summaryIcon: '📐',
  },
  {
    id: 'rect-hv',
    title: '横折 + 竖折',
    emoji: '🔄',
    category: '2 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '准备先横折再竖折' },
      { description: '第 1 次横折', subtext: '沿中间横线向上折' },
      { description: '再竖着折', subtext: '半高长方形，沿竖线向左折' },
      { description: '折好了', subtext: '变成原来的 1/4 大小' },
      { description: '打开看看！', subtext: '田字格 4 份！' },
    ],
    summary: '横折+竖折 → 田字格 4 份',
    summaryIcon: '⊞',
  },
  {
    id: 'rect-vv',
    title: '竖折 + 竖折',
    emoji: '🔄',
    category: '2 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '准备竖着折 2 次' },
      { description: '第 1 次竖折', subtext: '沿中间竖线折叠' },
      { description: '折好了，变窄了', subtext: '再来一次！' },
      { description: '第 2 次竖折', subtext: '再沿中间折一次' },
      { description: '更窄了！', subtext: '折了 2 次' },
      { description: '打开看看！', subtext: '4 个竖条小长方形' },
    ],
    summary: '竖折 2 次 → 4 个小长方形',
    summaryIcon: '📐',
  },
  {
    id: 'rect-h-diag',
    title: '横折 + 对角折',
    emoji: '🔄',
    category: '2 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '准备先横折再对角折' },
      { description: '第 1 次横折', subtext: '沿中间横线向上折' },
      { description: '画对角线', subtext: '红色虚线从左上到右下' },
      { description: '沿对角线折', subtext: '变成三角形了' },
      { description: '打开看看！', subtext: '4 个直角三角形！' },
    ],
    summary: '横折+对角折 → 4 个直角三角形',
    summaryIcon: '🔺',
  },

  // ── 普通长方形 3 次对折 ──
  {
    id: 'rect-hhh',
    title: '横折 × 3',
    emoji: '🎯',
    category: '3 次对折',
    steps: [
      { description: '一张长方形纸', subtext: '这次要折 3 次！' },
      { description: '第 1 折', subtext: '沿中间横线向上折' },
      { description: '第 2 折', subtext: '半高了，再沿中间折' },
      { description: '第 3 折', subtext: '更小了，最后再折一次！' },
      { description: '好小！', subtext: '折了 3 次' },
      { description: '打开看看！', subtext: '折 3 次 = 8 份！' },
    ],
    summary: '折 3 次 = 8 个小长方形',
    summaryIcon: '🎯',
  },

  // ── 2:1 长方形 ──
  {
    id: 'rect-21-v-fold',
    title: '2:1 竖折',
    emoji: '✨',
    category: '2:1 长方形',
    steps: [
      { description: '一张 2:1 长方形', subtext: '长是宽的 2 倍' },
      { description: '竖向折线', subtext: '在正中间画一条竖线' },
      { description: '沿竖线折叠', subtext: '右边翻到左边' },
      { description: '打开看看！', subtext: '哇！变成 2 个正方形！' },
    ],
    summary: '2:1 竖折 → 2 个正方形！',
    summaryIcon: '⬜',
  },
  {
    id: 'rect-21-hv',
    title: '2:1 横折+竖折',
    emoji: '🔄',
    category: '2:1 长方形',
    steps: [
      { description: '一张 2:1 长方形', subtext: '长是宽的 2 倍' },
      { description: '第 1 次横折', subtext: '沿中间横线向上折' },
      { description: '再竖着折', subtext: '半高长方形，沿竖线向左折' },
      { description: '折好了', subtext: '变成原来的 1/4 大小' },
      { description: '打开看看！', subtext: '4 个小 2:1 长方形' },
    ],
    summary: '2:1 折 2 次 → 4 个小长方形',
    summaryIcon: '📐',
  },

  // ── 3:1 长方形 ──
  {
    id: 'rect-31-trisect',
    title: '3:1 三等分',
    emoji: '💜',
    category: '3:1 长方形',
    steps: [
      { description: '一张 3:1 长方形', subtext: '长是宽的 3 倍' },
      { description: '画 2 条等分线', subtext: '把它分成 3 等份' },
      { description: '折叠起来', subtext: '三折叠合' },
      { description: '打开看看！', subtext: '哇！3 个正方形！' },
    ],
    summary: '3:1 三等分 → 3 个正方形！',
    summaryIcon: '⬜',
  },
];
