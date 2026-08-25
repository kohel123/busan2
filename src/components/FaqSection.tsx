import React, { useState } from 'react';
import { FAQ_LIST } from '../data/weddingData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-10 sm:py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          자주 묻는 질문
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2.5 tracking-tight">
          부산 웨딩박람회 FAQ & 궁금증 해결
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          입장료, 사전예약 혜택, 계약금 환불 및 스드메 준비 관련 가장 많이 하시는 질문 모음
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3.5">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-rose-300 shadow-xs ring-2 ring-rose-100/50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xs flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-rose-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-start gap-3 mt-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                      A
                    </span>
                    <p className="pt-0.5">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
