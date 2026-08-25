export interface WeddingAd {
  gather_name: string;
  ad_date: string;
  ad_location: string;
  ad_thumbnail: string;
  ad_url: string;
  region?: string;
  ad_benefit?: string;
  ad_host?: string;
  ad_time?: string;
  parking_info?: string;
}

export interface AdApiResponse {
  advertisements: Record<string, WeddingAd[]> | WeddingAd[];
  status?: string;
  timestamp?: string;
}

export interface ChecklistItem {
  id: string;
  category: '상견례/택일' | '웨딩홀' | '스드메' | '예물/예단/예복' | '신혼여행' | '신혼집/혼수' | '본식준비';
  task: string;
  dDay: string;
  importance: '필수' | '선택' | '권장';
  tips: string;
  completed: boolean;
  budgetEstimate?: number;
  actualCost?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
