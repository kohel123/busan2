import { WeddingAd, AdApiResponse } from '../types';
import { FALLBACK_BUSAN_ADS, MY_AFFILIATE_ID } from '../data/weddingData';

// 날짜 문자열 정규화 및 비교 함수 (빠른 순 오름차순 정렬)
export function compareAdDates(a: WeddingAd, b: WeddingAd): number {
  const dateStrA = a.ad_date || '';
  const dateStrB = b.ad_date || '';
  return dateStrA.localeCompare(dateStrB, 'ko', { numeric: true });
}

// 부산 지역 필터링 함수
export function isBusanAd(ad: WeddingAd): boolean {
  if (!ad) return false;
  const loc = (ad.ad_location || '').toLowerCase();
  const name = (ad.gather_name || '').toLowerCase();
  const region = (ad.region || '').toLowerCase();

  return (
    region === 'busan' ||
    loc.includes('부산') ||
    loc.includes('벡스코') ||
    loc.includes('해운대') ||
    loc.includes('서면') ||
    loc.includes('센텀') ||
    loc.includes('동래') ||
    name.includes('부산') ||
    name.includes('벡스코')
  );
}

// 제휴 파라미터가 포함된 URL 생성
export function getAffiliateUrl(originalUrl: string): string {
  if (!originalUrl) return '#';
  if (originalUrl.includes(MY_AFFILIATE_ID)) return originalUrl;
  
  // 이미 query param이 있는 경우와 없는 경우 처리
  if (originalUrl.endsWith('=')) {
    return `${originalUrl}${MY_AFFILIATE_ID}`;
  } else if (originalUrl.includes('?')) {
    return `${originalUrl}&ref=${MY_AFFILIATE_ID}`;
  } else {
    return `${originalUrl}${MY_AFFILIATE_ID}`;
  }
}

// 실시간 API 데이터 로딩 (프록시 + 직접 + 백업 폴백 3중 안전장치)
export async function fetchBusanWeddingAds(): Promise<{ ads: WeddingAd[]; totalCount: number; isLive: boolean }> {
  let rawAds: WeddingAd[] = [];
  let isLive = false;

  // 1차 시도: 내부 Express 프록시 엔드포인트
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('/api/wedding-ads', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: AdApiResponse = await res.json();
      if (data && data.advertisements) {
        if (Array.isArray(data.advertisements)) {
          rawAds = data.advertisements;
        } else if (typeof data.advertisements === 'object') {
          // 객체 내의 모든 배열들을 병합
          rawAds = Object.values(data.advertisements).flat();
        }
        if (rawAds.length > 0) {
          isLive = true;
        }
      }
    }
  } catch {
    // 내부 프록시 실패 시 통과
  }

  // 2차 시도: 만약 프록시에서 데이터를 못 가져왔다면 직접 CPAAD API 호출 시도
  if (rawAds.length === 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch('https://cpaad.co.kr/api/ad_json.php', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data: AdApiResponse = await res.json();
        if (data && data.advertisements) {
          if (Array.isArray(data.advertisements)) {
            rawAds = data.advertisements;
          } else if (typeof data.advertisements === 'object') {
            rawAds = Object.values(data.advertisements).flat();
          }
          if (rawAds.length > 0) {
            isLive = true;
          }
        }
      }
    } catch {
      // 직접 호출도 네트워크 이슈일 경우 폴백으로 전환
    }
  }

  // 3차 시도: API 실패 시 고품질 부산 실시간 일정 기본 데이터 활용
  if (rawAds.length === 0) {
    rawAds = [...FALLBACK_BUSAN_ADS];
    isLive = false;
  }

  // 부산 지역 필터링
  let busanAds = rawAds.filter(isBusanAd);

  // 만약 필터 결과가 비어있다면 기본 부산 데이터로 채움
  if (busanAds.length === 0) {
    busanAds = [...FALLBACK_BUSAN_ADS];
  }

  // 개최일 기준 오름차순(빠른 순) 정렬
  busanAds.sort(compareAdDates);

  return {
    ads: busanAds,
    totalCount: busanAds.length,
    isLive
  };
}
