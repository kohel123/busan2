import React, { useState, useEffect, useCallback } from 'react';
import { WeddingAd } from './types';
import { fetchBusanWeddingAds } from './services/adService';
import { Header } from './components/Header';
import { ExpoScheduleList } from './components/ExpoScheduleList';
import { ExpoBenefitsGuide } from './components/ExpoBenefitsGuide';
import { WeddingTimeline } from './components/WeddingTimeline';
import { ContractSafetyGuide } from './components/ContractSafetyGuide';
import { InteractiveChecklist } from './components/InteractiveChecklist';
import { FaqSection } from './components/FaqSection';
import { KeywordTagCloud } from './components/KeywordTagCloud';
import { Footer } from './components/Footer';
import { PhpSourceModal } from './components/PhpSourceModal';
import { Sparkles, Calendar, Gift, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const [ads, setAds] = useState<WeddingAd[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPhpModalOpen, setIsPhpModalOpen] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchBusanWeddingAds();
      setAds(result.ads);
      setTotalCount(result.totalCount);
      setIsLive(result.isLive);
    } catch (err) {
      console.error('Failed to load busan wedding ads:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const scrollToSchedule = () => {
    const el = document.getElementById('schedule-section');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-700">
      {/* 1. Header with navigation tabs */}
      <Header
        onOpenPhpModal={() => setIsPhpModalOpen(true)}
        totalCount={totalCount}
      />

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-8 sm:pb-12 px-4 sm:px-6 border-b border-rose-100/60">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-rose-100/80 text-rose-700 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-rose-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
            <span>부산 예비 신랑·신부 공식 무료초대권 접수처</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            부산 웨딩박람회 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">실시간 일정</span> & 무료초대권
          </h2>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            벡스코, 롯데호텔, 센텀 등 부산 전 지역 웨딩홀 대관료 최대 150만원 지원 및 수입 드레스 무료 피팅 혜택을 한눈에 비교하고 무료입장 초대권을 신청하세요.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700">
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-rose-500" />
              <span>방문 전원 웨딩다이어리 증정</span>
            </span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-pink-500" />
              <span>100% 안심 가계약 표준약관 준수</span>
            </span>
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>실시간 개최일 빠른 순 정렬</span>
            </span>
          </div>

          {/* Hero CTA Button */}
          <div className="pt-4">
            <button
              onClick={scrollToSchedule}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105"
            >
              <span>이번 주 부산 웨딩박람회 일정 확인하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Expo Schedule List (Requirement 3, 4, 9, 10) */}
      <main className="flex-1">
        <ExpoScheduleList
          ads={ads}
          totalCount={totalCount}
          isLoading={isLoading}
          isLive={isLive}
          onRefresh={loadData}
        />

        {/* 4. Expo Benefits Guide (Requirement 5, 6) */}
        <ExpoBenefitsGuide />

        {/* 5. Wedding Timeline & Expo Utilization Guide (Requirement 5, 6) */}
        <WeddingTimeline />

        {/* 6. SDM Checkpoints & Contract Safety (Requirement 5, 6) */}
        <ContractSafetyGuide />

        {/* 7. Interactive Checklist & Budget Calculator */}
        <InteractiveChecklist />

        {/* 8. FAQ Section (Requirement 12 - FAQPage schema match) */}
        <FaqSection />

        {/* 9. Keyword Tag Cloud with 50% Naver / Google search (Requirement 11) */}
        <KeywordTagCloud />
      </main>

      {/* 10. Footer */}
      <Footer onOpenPhpModal={() => setIsPhpModalOpen(true)} />

      {/* 11. PHP Source Modal */}
      <PhpSourceModal
        isOpen={isPhpModalOpen}
        onClose={() => setIsPhpModalOpen(false)}
      />
    </div>
  );
}
