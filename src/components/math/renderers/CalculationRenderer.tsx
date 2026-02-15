import React from 'react';
import { CalculationQuestion, MathQuestionType } from '@/data/math/types';

interface CalculationRendererProps {
  question: CalculationQuestion;
  showAnswer?: boolean;
}

const showValue = (value: number, visible: boolean): string => (visible ? String(value) : '?');

const MakeTenDiagram: React.FC<{ question: CalculationQuestion; showAnswer: boolean }> = ({ question, showAnswer }) => {
  const d = question.visualData?.makeTenTemplate;
  if (!d) return null;

  return (
    <div className="w-full max-w-lg rounded-xl border border-amber-300 bg-amber-50/50 p-3">
      <svg viewBox="0 0 420 170" className="w-full h-auto">
        <text x="35" y="34" fontSize="32" fill="#3b2412">{d.base}</text>
        <text x="85" y="34" fontSize="28" fill="#3b2412">+</text>
        <text x="125" y="34" fontSize="32" fill="#3b2412">{d.addend}</text>
        <text x="178" y="34" fontSize="28" fill="#3b2412">=</text>
        <rect x="215" y="8" width="38" height="38" rx="4" fill="#fff" stroke="#5b3a1f" strokeWidth="2" />
        <text x="234" y="35" textAnchor="middle" fontSize="26" fill="#3b2412">{showValue(d.finalResult, showAnswer)}</text>

        <line x1="138" y1="44" x2="112" y2="63" stroke="#3b2412" strokeWidth="2" />
        <line x1="138" y1="44" x2="164" y2="63" stroke="#3b2412" strokeWidth="2" />

        <rect x="94" y="64" width="34" height="34" rx="3" fill="#fff" stroke="#3b2412" strokeWidth="2" />
        <text x="111" y="88" textAnchor="middle" fontSize="24" fill="#3b2412">{showValue(d.splitToTen, showAnswer)}</text>

        <rect x="146" y="64" width="34" height="34" rx="3" fill="#fff" stroke="#3b2412" strokeWidth="2" />
        <text x="163" y="88" textAnchor="middle" fontSize="24" fill="#3b2412">{showValue(d.splitRest, showAnswer)}</text>

        <line x1="46" y1="44" x2="46" y2="122" stroke="#3b2412" strokeWidth="3" />
        <line x1="46" y1="122" x2="111" y2="122" stroke="#3b2412" strokeWidth="3" />
        <line x1="111" y1="122" x2="111" y2="100" stroke="#3b2412" strokeWidth="3" />

        <rect x="66" y="126" width="36" height="36" rx="4" fill="#fff" stroke="#3b2412" strokeWidth="2" />
        <text x="84" y="151" textAnchor="middle" fontSize="24" fill="#3b2412">{showValue(d.tenResult, showAnswer)}</text>
      </svg>
    </div>
  );
};

const BreakTenDiagram: React.FC<{ question: CalculationQuestion; showAnswer: boolean }> = ({ question, showAnswer }) => {
  const d = question.visualData?.breakTenTemplate;
  if (!d) return null;

  return (
    <div className="w-full max-w-lg rounded-xl border border-amber-300 bg-white p-3">
      <svg viewBox="0 0 430 200" className="w-full h-auto">
        <text x="24" y="36" fontSize="34" fill="#111">{d.minuend}</text>
        <text x="82" y="36" fontSize="30" fill="#111">-</text>
        <text x="116" y="36" fontSize="34" fill="#111">{d.subtrahend}</text>
        <text x="172" y="36" fontSize="30" fill="#111">=</text>
        <rect x="205" y="8" width="40" height="40" fill="#fff" stroke="#111" strokeWidth="2" />
        <text x="225" y="36" textAnchor="middle" fontSize="28" fill="#111">{showValue(d.finalResult, showAnswer)}</text>

        {/* 十几分解成 10 和几 */}
        <line x1="42" y1="44" x2="82" y2="78" stroke="#111" strokeWidth="2.5" />
        <line x1="42" y1="44" x2="18" y2="78" stroke="#111" strokeWidth="2.5" />
        <text x="8" y="104" fontSize="30" fill="#111">10</text>
        <rect x="74" y="78" width="36" height="36" fill="#fff" stroke="#111" strokeWidth="2" />
        <text x="92" y="104" textAnchor="middle" fontSize="26" fill="#111">{showValue(d.onesPart, showAnswer)}</text>

        {/* 破十主路径：10 - 减数 */}
        <line x1="30" y1="116" x2="30" y2="155" stroke="#111" strokeWidth="3" />
        <line x1="30" y1="155" x2="145" y2="155" stroke="#111" strokeWidth="3" />
        <line x1="145" y1="155" x2="145" y2="50" stroke="#111" strokeWidth="3" />
        <polygon points="140,54 145,44 150,54" fill="#111" />

        {/* 10-减数 的结果（桥数） */}
        <rect x="83" y="160" width="36" height="36" fill="#fff" stroke="#111" strokeWidth="2" />
        <text x="101" y="186" textAnchor="middle" fontSize="26" fill="#111">{showValue(d.bridge, showAnswer)}</text>

        {/* 口诀 */}
        <text x="270" y="98" fontSize="18" fill="#111">一看</text>
        <text x="270" y="126" fontSize="18" fill="#111">二减</text>
        <text x="270" y="154" fontSize="18" fill="#111">三要加</text>
      </svg>
    </div>
  );
};

export const CalculationRenderer: React.FC<CalculationRendererProps> = ({ question, showAnswer = false }) => {
  return (
    <div className="flex flex-col items-center space-y-4 py-3">
      {question.type === MathQuestionType.MAKE_TEN_METHOD && (
        <MakeTenDiagram question={question} showAnswer={showAnswer} />
      )}

      {question.type === MathQuestionType.ADDITION_WITHIN_20_CARRY && (
        <BreakTenDiagram question={question} showAnswer={showAnswer} />
      )}

      {showAnswer && question.explanation && (
        <div className="w-full max-w-2xl p-3 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-800 dark:text-purple-200">{question.explanation}</p>
        </div>
      )}

      {question.hint && !showAnswer && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">💡 {question.hint}</p>
        </div>
      )}
    </div>
  );
};
