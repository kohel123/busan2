import React from 'react';
import { ShieldCheck, CheckCircle2, MessageSquare, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { CONTRACT_SAFETY_RULES, SDM_CHECKPOINTS, ON_SITE_RESPONSES } from '../data/weddingData';

export const ContractSafetyGuide: React.FC = () => {
  return (
    <section id="safety-section" className="py-10 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto bg-slate-50/50">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          안심 계약 가이드
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2.5 tracking-tight">
          스드메 핵심 체크포인트 & 계약 안전장치
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          숨은 추가금 방지, 표준약관 환불 규정 및 현장 상황별 똑똑한 대처 화법
        </p>
      </div>

      {/* 1. SDM Checkpoints (스튜디오 / 드레스 / 메이크업 3분할) */}
      <div className="mb-10">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>스드메 (스튜디오·드레스·메이크업) 핵심 확인 포인트</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SDM_CHECKPOINTS.map((group, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900">{group.category}</h4>
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    필수 확인
                  </span>
                </div>
                <div className="space-y-3">
                  {group.points.map((pt, pIdx) => (
                    <div key={pIdx} className="text-xs">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5 mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{pt.item}</span>
                      </p>
                      <p className="text-slate-500 pl-5 text-[11px] leading-relaxed">{pt.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 6 Core Contract Safety Rules */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              웨딩박람회 계약 안전장치 6대 필수 특약 수칙
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              서명 전 반드시 계약서에 기재되어야 하는 필수 법적 보호 장치입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTRACT_SAFETY_RULES.map((rule, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-2">
                  0{idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5">{rule.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Smart On-Site Response Scripts */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-rose-400" />
          <h3 className="text-lg sm:text-xl font-bold">
            현장 영업 상황별 센스 있는 모범 대응 멘트
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ON_SITE_RESPONSES.map((item, idx) => (
            <div key={idx} className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-1">
                  상황 {idx + 1} (현장 영업 멘트)
                </span>
                <p className="text-xs font-semibold text-slate-300 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50">
                  {item.situation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60">
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                  💡 추천 답변 멘트
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {item.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
