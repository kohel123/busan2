import React from 'react';
import { ArrowUp, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPhpModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPhpModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 text-xs leading-relaxed">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💍</span>
              <h3 className="text-base font-bold text-white tracking-tight">부산 웨딩박람회 일정 안내 포털</h3>
            </div>
            <p className="text-slate-400 max-w-xl text-xs">
              부산 벡스코, 서면 롯데호텔, 센텀시티 등 부산 전 지역 웨딩박람회 실시간 개최 일정 및 무료초대권 신청 혜택을 제공합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPhpModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              PHP 소스코드 다운로드
            </button>
            <button
              onClick={scrollToTop}
              className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-xl transition-all shadow-md shadow-rose-900/40"
              title="상단으로 이동"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal & Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-400">
          <div>
            <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              안심 안내 및 저작권 고지
            </p>
            <p>
              본 사이트의 박람회 정보 및 제휴 링크는 공인된 제휴 마케팅 네트워크(CPAAD) 및 각 행사 주관사와의 연동을 통해 실시간 제공됩니다. 사전등록 시 주어지는 혜택 및 사은품은 주관사의 사정에 따라 조기 마감되거나 변경될 수 있습니다.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-300 mb-1">문의 및 제휴 안내</p>
            <p>
              부산웨딩박람회 일정 등록 및 제휴 문의: 공식 제휴 네트워크 고객센터 | 공정거래위원회 표준약관 준수 사이트
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© 부산 웨딩박람회 안내센터. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for Busan Brides & Grooms</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
