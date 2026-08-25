import React, { useState } from 'react';
import { Sparkles, Calendar, Gift, CheckSquare, ShieldCheck, HelpCircle, Code, DollarSign, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenPhpModal: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPhpModal, totalCount }) => {
  const [activeTab, setActiveTab] = useState<string>('schedule');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header id="top-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium tracking-tight">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
          <span>부산 전 지역 웨딩홀 대관료 지원 & 스드메 무료 피팅권 사전신청 접수 중</span>
          <span className="hidden md:inline-block bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-semibold">
            선착순 마감 임박
          </span>
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <a href="#top-header" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 text-white group-hover:scale-105 transition-transform">
                <span className="text-xl">💍</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                    부산 웨딩박람회
                  </h1>
                  <span className="text-[11px] font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    실시간 일정
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block">
                  부산 예비 신랑·신부를 위한 공식 웨딩 일정 & 무료초대권 포털
                </p>
              </div>
            </a>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-cta-schedule"
              onClick={() => scrollToSection('schedule-section')}
              className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-sm shadow-rose-200 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>무료초대권 신청</span>
            </button>

            <button
              id="header-php-source-btn"
              onClick={onOpenPhpModal}
              title="PHP 소스코드 보기 및 다운로드"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">PHP 소스</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-medium">
          <button
            id="tab-schedule"
            onClick={() => scrollToSection('schedule-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'schedule-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>실시간 박람회 일정</span>
            <span className="bg-rose-200/70 text-rose-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {totalCount}
            </span>
          </button>

          <button
            id="tab-benefits"
            onClick={() => scrollToSection('benefits-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'benefits-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>박람회 혜택 & 꿀팁</span>
          </button>

          <button
            id="tab-timeline"
            onClick={() => scrollToSection('timeline-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'timeline-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>D-Day 준비 일정표</span>
          </button>

          <button
            id="tab-safety"
            onClick={() => scrollToSection('safety-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'safety-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>스드메 & 계약 안전장치</span>
          </button>

          <button
            id="tab-checklist"
            onClick={() => scrollToSection('checklist-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'checklist-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>체크리스트 & 예산</span>
          </button>

          <button
            id="tab-faq"
            onClick={() => scrollToSection('faq-section')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'faq-section'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>자주 묻는 질문 (FAQ)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
