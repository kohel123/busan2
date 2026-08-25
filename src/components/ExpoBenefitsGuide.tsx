import React from 'react';
import { Gift, AlertTriangle, Clock, Ticket, MapPin, Car, BookOpen, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';
import { BUSAN_EXPO_VENUES } from '../data/weddingData';

export const ExpoBenefitsGuide: React.FC = () => {
  const benefitsList = [
    {
      title: '웨딩홀 대관료 & 식대 특별 할인',
      desc: '부산 인기 웨딩홀(해운대, 서면, 센텀 등) 대관료 최대 150만원 지원 및 하객 식대 1인당 2,000~5,000원 추가 할인 혜택',
      icon: '🏰'
    },
    {
      title: '스드메 패키지 현장 업그레이드',
      desc: '수입 프리미엄 블랙라벨 드레스 피팅권 무상 제공 및 스튜디오 본식 앨범 페이지 무상 추가권 증정',
      icon: '👗'
    },
    {
      title: '방문객 100% 전원 증정 웰컴 기프트',
      desc: '사전등록 후 방문만 해도 웨딩다이어리, 신부 파우치, 디퓨저, 스타벅스 음료 쿠폰 등 풍성한 선물 증정',
      icon: '🎁'
    },
    {
      title: '혼수·예물·허니문 다이렉트 캐시백',
      desc: '신혼여행 조기예약 얼리버드 프로모션 및 예물 순금 1돈 증정, 혼수 가전 구매 시 백화점 상품권 캐시백',
      icon: '💎'
    }
  ];

  const precautions = [
    {
      title: '당일 계약 강요에 흔들리지 마세요',
      desc: '"지금 계약 안 하면 할인 혜택이 사라진다"는 말에 쫓기지 마시고, 14일 이내 100% 환불 가능한 가계약 조항을 확인하세요.'
    },
    {
      title: '스드메 부대비용(숨은 추가금) 총액 확인',
      desc: '스튜디오 원본/수정본 데이터비, 드레스 피팅비, 헬퍼비, 메이크업 얼리비 등 최종 지출 총합계를 미리 계산하세요.'
    },
    {
      title: '구두 약속은 반드시 계약서에 기재',
      desc: '상담 시 플래너가 약속한 모든 서비스 품목(액자 업그레이드, 부케 세트 등)은 계약서 비고란에 활자화하여 서명받으세요.'
    },
    {
      title: '예식장 최소 보증인원 유연성 확보',
      desc: '예상 하객수를 너무 넉넉하게 잡지 말고, 최소 보증인원을 낮게 책정한 뒤 예식 2주 전 최종 조율 가능한지 확인하세요.'
    }
  ];

  const tips = [
    '웨딩박람회 방문 1주일 전, 둘만의 예산 총액과 희망 예식 시기(1~3순위)를 결정해 두세요.',
    '오랜 시간 도보 이동과 상담이 이어지므로 편안한 단화 또는 운동화 착용을 권장합니다.',
    '마음에 드는 스튜디오 화보 및 드레스 스타일 사진을 스마트폰에 4~5장 캡처해 오세요.',
    '상담 부스마다 제공하는 명함과 견적서 뒷면에 담당 플래너의 추가 혜택 조건을 메모해 두세요.',
    '지정 주차장 주차권(보통 2~3시간)은 박람회 안내데스크에서 나갈 때 모바일 초대권 제시 후 수령하세요.',
    '양가 부모님의 의견이 필요한 부분(폐백 여부, 예단 범위, 특정 웨딩홀 선호)은 미리 체크해 두세요.'
  ];

  return (
    <section id="benefits-section" className="py-10 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto bg-slate-50/50">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          부산 웨딩 가이드
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2.5 tracking-tight">
          부산 웨딩박람회 혜택 & 필수 주의사항
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          박람회 방문 전 혜택을 극대화하고 후회 없는 선택을 돕는 필수 가이드라인입니다.
        </p>
      </div>

      {/* 4 Core Benefits Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {benefitsList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-rose-100/80 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 inline-block">{item.icon}</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">{item.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-rose-600 text-[11px] font-semibold">
              <span>사전등록 전용 혜택</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Essential Expo Facts Grid (운영시간, 입장료, 위치, 주차장, 신청방법) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-500" />
          <span>부산 웨딩박람회 핵심 안내 (시간·입장료·위치·주차·신청방법)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Box 1: 입장료 & 시간 */}
          <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-3">
              <Ticket className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">입장료 및 관람 비용</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  현장 입장료(10,000원)는 <strong>온라인 사전예약 시 100% 무료</strong>로 면제됩니다. 초대권 1매당 예비 신랑·신부 <strong>동반 1인까지 무료 입장</strong>이 가능합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
              <Clock className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">운영 시간 및 관람 소요</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  대부분의 박람회는 <strong>오전 10:00 ~ 오후 19:30</strong>까지 운영됩니다. 웨딩홀 및 스드메 1:1 상담 시 평균 <strong>2~3시간</strong> 정도 소요되므로 여유 있게 방문하시는 것이 좋습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: 예약신청방법 & 주차 */}
          <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">사전 예약신청 초간단 방법</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  1) 상단 일정 리스트에서 원하는 박람회의 <strong>[무료초대권 신청]</strong> 클릭<br />
                  2) 신청자 성함 및 연락처, 희망 결혼 시기 입력 후 제출<br />
                  3) 카카오톡 또는 문자로 발송된 <strong>모바일 바코드 초대권</strong> 수령 후 현장 바코드 태그 입장
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
              <Car className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">주차장 이용 및 무료 등록 팁</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  벡스코 제1·제2전시장 지하주차장 및 호텔 컨벤션 주차장 <strong>2~4시간 무료 주차권</strong>이 제공됩니다. 행사 퇴장 시 안내데스크에서 차량 번호를 꼭 등록하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Major Busan Venues Guide */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>부산 주요 박람회 개최 거점 위치 & 대중교통 안내</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BUSAN_EXPO_VENUES.map((v, i) => (
              <div key={i} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-[11px] sm:text-xs">
                <p className="font-bold text-slate-900">{v.name}</p>
                <p className="text-rose-600 text-[10px] font-semibold mb-1">{v.sub}</p>
                <p className="text-slate-600 text-[10px] mb-1">{v.address}</p>
                <p className="text-slate-500 text-[10px] leading-tight">🚇 {v.transit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Precautions and Smart Tips (2 Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Precautions (주의사항) */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base sm:text-lg text-amber-950">
              웨딩박람회 필수 주의사항 (계약 전 체크)
            </h3>
          </div>
          <div className="space-y-3.5">
            {precautions.map((p, idx) => (
              <div key={idx} className="bg-white/90 p-3.5 rounded-xl border border-amber-100 text-xs">
                <p className="font-bold text-slate-900 mb-1">
                  {idx + 1}. {p.title}
                </p>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips (실전 꿀팁) */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base sm:text-lg text-rose-950">
              부산 웨딩박람회 200% 활용 꿀팁
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {tips.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-rose-100">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
