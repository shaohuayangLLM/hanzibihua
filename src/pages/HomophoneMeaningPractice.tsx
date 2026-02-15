import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HOMOPHONE_VISUAL_LESSONS, HOMOPHONE_WORD_VISUAL_LESSONS } from "@/data/homophoneMeaningV2Bank";

const HomophoneMeaningPractice = () => {
  const navigate = useNavigate();
  const [lessonType, setLessonType] = useState<"char" | "word">("char");

  const lessons = useMemo(
    () => (lessonType === "char" ? HOMOPHONE_VISUAL_LESSONS : HOMOPHONE_WORD_VISUAL_LESSONS),
    [lessonType]
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe4,_#f8f6f2_40%,_#ffffff_80%)]">
      <header className="w-full py-6 px-4 border-b border-amber-200/70 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-amber-950">
              {lessonType === "char" ? "同音字学习" : "同音词学习"}
            </h1>
            <p className="text-sm text-amber-800/80">先理解字义，再看语境，最后形成稳定记忆</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Card className="p-6 space-y-3 border-amber-200/80 bg-white/80">
          <p className="text-lg font-semibold text-amber-950">学习分类</p>
          <div className="flex gap-2">
            <Button
              onClick={() => setLessonType("char")}
              className={lessonType === "char" ? "bg-amber-700 hover:bg-amber-700 text-white" : ""}
              variant={lessonType === "char" ? "default" : "outline"}
            >
              同音字
            </Button>
            <Button
              onClick={() => setLessonType("word")}
              className={lessonType === "word" ? "bg-amber-700 hover:bg-amber-700 text-white" : ""}
              variant={lessonType === "word" ? "default" : "outline"}
            >
              同音词
            </Button>
          </div>
          <p className="text-lg font-semibold text-amber-950">
            {lessonType === "char" ? "同音字全量学习内容" : "同音词全量学习内容"}
          </p>
          <p className="text-sm text-amber-900/70">当前知识组数：{lessons.length}</p>
        </Card>

        {lessons.map(lesson => (
          <Card key={lesson.knowledgePointId} className="p-4 space-y-3 border-amber-200/80 bg-white/85 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-amber-950">{lessonType === "char" ? "同音字组学习卡" : "同音词组学习卡"}</p>
              <p className="text-sm text-amber-900/70">统一读音：{lesson.pinyinTone}</p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-[#fffaf0] p-2.5 md:p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.items.map(item => (
                  <div
                    key={item.word}
                    className="rounded-lg border border-amber-200 bg-white p-3 min-h-[150px] flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-2">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                        读音：{item.pinyinTone}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <div
                        className={`inline-flex items-center justify-center rounded-md border-2 border-amber-500 bg-amber-50 ${
                          lessonType === "word" ? "min-w-[132px] h-20 px-4" : "w-14 h-14"
                        }`}
                      >
                        <span
                          className={`font-bold leading-none text-amber-950 whitespace-nowrap break-keep ${
                            lessonType === "word" ? "text-[44px] tracking-[0.03em]" : "text-3xl"
                          }`}
                        >
                          {item.word}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-0.5 mt-1.5">
                      <p className="text-[15px] font-medium text-amber-950">意思：{item.meaning}</p>
                      <p className="text-[13px] text-amber-900/70">{item.illustrationLabel}</p>
                      <p className="text-[13px] text-amber-900/70">示例：{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default HomophoneMeaningPractice;
