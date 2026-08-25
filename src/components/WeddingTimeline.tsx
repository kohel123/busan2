import React, { useState } from 'react';
import { WEDDING_TIMELINE_STEPS, EXPO_USAGE_GUIDE } from '../data/weddingData';
import { Calendar, CheckCircle, ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react';

export const WeddingTimeline: React.FC = () => {
  const [activeStepTab, setActiveStepTab] = useState<'timeline' | 'expoGuide' | 'postExpo'>('timeline');

  return (
    <section id="timeline-section" className="py-10 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          결혼준비 완벽 로드맵
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2.5 tracking-tight">
          결혼준비 일정표 & 박람회 활용 순서 가이드
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          상견례부터 D-Day 본식까지, 부산 예비부부를 위한 체계적인 결혼준비 절차와 단계별 액션 플랜
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveStepTab('timeline')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              activeStepTab === 'timeline'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📅 D-Day 결혼준비 일정표 (D-300 ~ 본식)
          </button>
          <button
            onClick={() => setActiveStepTab('expoGuide')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              activeStepTab === 'expoGuide'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎯 박람회 현장 5단계 활용법
          </button>
          <button
            onClick={() => setActiveStepTab('postExpo')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              activeStepTab === 'postExpo'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📋 박람회 다녀온 후 진행 순서
          </button>
        </div>
      </div>

      {/* Tab 1: D-Day Timeline */}
      {activeStepTab === 'timeline' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WEDDING_TIMELINE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {step.period}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-3">
                    {idx + 1}. {step.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-600 mb-4">
                    {step.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 bg-indigo-50/50 p-2.5 rounded-xl text-[11px] text-indigo-900 leading-relaxed">
                  <strong>💡 핵심 팁:</strong> {step.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Expo 5 Steps Guide */}
      {activeStepTab === 'expoGuide' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              웨딩박람회 100% 실속 활용 5단계 순서
            </h3>
          </div>

          <div className="space-y-4">
            {EXPO_USAGE_GUIDE.fiveSteps.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/30 transition-colors"
              >
                <div className="w-16 sm:w-20 shrink-0">
                  <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-2xs">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{item.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Post Expo Steps */}
      {activeStepTab === 'postExpo' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              웨딩박람회 다녀온 후 진행 순서 & 체크포인트
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPO_USAGE_GUIDE.postExpoSteps.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100 mb-2 inline-block">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">{item.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
