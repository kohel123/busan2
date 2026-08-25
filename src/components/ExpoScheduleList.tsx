import React, { useState } from 'react';
import { WeddingAd } from '../types';
import { getAffiliateUrl } from '../services/adService';
import { Calendar, MapPin, Gift, ExternalLink, Info, CheckCircle2, Search, RefreshCw, Clock, Car } from 'lucide-react';

interface ExpoScheduleListProps {
  ads: WeddingAd[];
  totalCount: number;
  isLoading: boolean;
  isLive: boolean;
  onRefresh: () => void;
}

export const ExpoScheduleList: React.FC<ExpoScheduleListProps> = ({
  ads,
  totalCount,
  isLoading,
  isLive,
  onRefresh
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedModalAd, setSelectedModalAd] = useState<WeddingAd | null>(null);

  const locations = ['전체', '벡스코/해운대', '서면/진구', '센텀시티', '동래/온천장'];

  const filteredAds = ads.filter((ad) => {
    const matchSearch =
      ad.gather_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.ad_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ad.ad_benefit && ad.ad_benefit.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;

    if (selectedLocation === '전체') return true;
    if (selectedLocation === '벡스코/해운대') {
      return ad.ad_location.includes('벡스코') || ad.ad_location.includes('해운대');
    }
    if (selectedLocation === '서면/진구') {
      return ad.ad_location.includes('서면') || ad.ad_location.includes('부산진구') || ad.ad_location.includes('롯데호텔');
    }
    if (selectedLocation === '센텀시티') {
      return ad.ad_location.includes('센텀') || ad.ad_location.includes('신세계') || ad.ad_location.includes('KNN');
    }
    if (selectedLocation === '동래/온천장') {
      return ad.ad_location.includes('동래') || ad.ad_location.includes('온천장');
    }
    return true;
  });

  return (
    <section id="schedule-section" className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              부산 웨딩박람회 실시간 일정
            </h2>
            {/* Requirement 9: 총 N건 count-badge */}
            <span
              id="total-count-badge"
              className="count-badge bg-rose-50 text-rose-600 border border-rose-200 font-bold px-2.5 py-0.5 rounded-full text-xs sm:text-sm inline-flex items-center gap-1 shadow-2xs"
            >
              총 <strong className="text-rose-700">{totalCount}</strong>건
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            실시간 연동 데이터 기반 개최일 빠른 순으로 정렬되어 있습니다. 사전등록 시 무료입장 및 웰컴 선물이 제공됩니다.
          </p>
        </div>

        {/* Live Status & Refresh */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
              isLive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
            {isLive ? '실시간 API 연동 중' : '안심 백업 일정 동기화'}
          </span>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            title="일정 새로고침"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs mb-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Location Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-0.5">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedLocation === loc
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="행사명, 장소(벡스코, 서면 등) 검색"
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400"
            />
          </div>
        </div>
      </div>

      {/* Compact Schedule Cards Grid (Requirement 4: 모바일 간결형 최적화) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs animate-pulse">
              <div className="h-36 bg-slate-200 rounded-xl mb-3" />
              <div className="h-4 bg-slate-200 rounded-sm w-3/4 mb-2" />
              <div className="h-3 bg-slate-100 rounded-sm w-1/2 mb-3" />
              <div className="h-8 bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredAds.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          <p className="text-sm font-medium">검색 조건에 해당하는 부산 웨딩박람회 일정이 없습니다.</p>
          <button
            onClick={() => {
              setSelectedLocation('전체');
              setSearchTerm('');
            }}
            className="mt-3 text-xs text-rose-600 font-semibold underline hover:text-rose-700"
          >
            전체 일정 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredAds.map((ad, idx) => {
            const affiliateLink = getAffiliateUrl(ad.ad_url);
            return (
              <article
                key={idx}
                id={`expo-card-${idx}`}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Thumbnail Image Container */}
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={ad.ad_thumbnail}
                    alt={`${ad.gather_name} 무료 초대권 신청`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image if remote url broken
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {/* Requirement 4: "무료초대권 신청가능" 태그 */}
                    <span className="bg-rose-500/95 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      무료초대권 신청가능
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="bg-slate-900/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                      사전예약 혜택
                    </span>
                  </div>
                </div>

                {/* Card Body - Compact & Clear */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Expo Name */}
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
                      {ad.gather_name}
                    </h3>

                    {/* Date (ad_date) */}
                    <div className="mt-2 flex items-center gap-1.5 text-rose-600 text-xs font-bold">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{ad.ad_date}</span>
                    </div>

                    {/* Location (ad_location) */}
                    <div className="mt-1 flex items-start gap-1.5 text-slate-600 text-[11px] sm:text-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{ad.ad_location}</span>
                    </div>

                    {/* Key Benefit Summary */}
                    {ad.ad_benefit && (
                      <div className="mt-2 bg-rose-50/70 border border-rose-100 rounded-lg p-2 text-[11px] text-rose-800 line-clamp-2 leading-relaxed flex items-start gap-1">
                        <Gift className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                        <span>{ad.ad_benefit}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedModalAd(ad)}
                      className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <span>상세 정보</span>
                    </button>

                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[1.4] py-2 px-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold rounded-xl shadow-xs shadow-rose-200 transition-all flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                    >
                      <span>무료초대권 신청</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Detail Modal for Selected Expo */}
      {selectedModalAd && (
        <div
          id="expo-detail-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedModalAd(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-52 w-full bg-slate-100">
              <img
                src={selectedModalAd.ad_thumbnail}
                alt={selectedModalAd.gather_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4 sm:p-6">
                <div>
                  <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                    무료초대권 신청가능
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {selectedModalAd.gather_name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedModalAd(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-900">개최 일정:</span>
                  <span>{selectedModalAd.ad_date}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900 shrink-0">개최 장소:</span>
                  <span>{selectedModalAd.ad_location}</span>
                </div>
                {selectedModalAd.ad_time && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-semibold text-slate-900">관람 시간:</span>
                    <span>{selectedModalAd.ad_time}</span>
                  </div>
                )}
                {selectedModalAd.parking_info && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-900 shrink-0">주차 안내:</span>
                    <span>{selectedModalAd.parking_info}</span>
                  </div>
                )}
              </div>

              {selectedModalAd.ad_benefit && (
                <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-3.5">
                  <h4 className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                    <Gift className="w-4 h-4 text-rose-600" />
                    사전등록자 전용 특별 혜택
                  </h4>
                  <p className="text-rose-800 text-xs leading-relaxed">{selectedModalAd.ad_benefit}</p>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModalAd(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                >
                  닫기
                </button>
                <a
                  href={getAffiliateUrl(selectedModalAd.ad_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-2 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl text-xs sm:text-sm text-center shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>지금 무료 초대권 신청하기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
