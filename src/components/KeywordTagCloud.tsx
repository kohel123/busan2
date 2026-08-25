import React, { useState, useEffect } from 'react';
import { KEYWORD_TAG_POOL } from '../data/weddingData';
import { Hash, Shuffle, Search, ExternalLink } from 'lucide-react';

export const KeywordTagCloud: React.FC = () => {
  const [randomTags, setRandomTags] = useState<string[]>([]);

  const sample20Tags = () => {
    const shuffled = [...KEYWORD_TAG_POOL].sort(() => 0.5 - Math.random());
    setRandomTags(shuffled.slice(0, 20));
  };

  useEffect(() => {
    sample20Tags();
  }, []);

  // Requirement 11: randomSearch - 50% 확률로 네이버 또는 구글 검색 결과 페이지로 새 창(_blank) 연결
  const handleRandomSearch = (tag: string) => {
    const cleanKeyword = tag.replace(/^#/, '').trim();
    const isNaver = Math.random() < 0.5;
    const searchUrl = isNaver
      ? `https://search.naver.com/search.naver?query=${encodeURIComponent(cleanKeyword)}`
      : `https://www.google.com/search?q=${encodeURIComponent(cleanKeyword)}`;

    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="keyword-tag-cloud" className="bg-slate-50 border-t border-b border-slate-200/80 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Title & Shuffle Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              부산 웨딩박람회 인기 추천 키워드 (실시간 20선)
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">
              클릭 시 포털 검색 연동
            </span>
          </div>

          <button
            type="button"
            onClick={sample20Tags}
            className="self-start sm:self-auto inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>태그 새로고침</span>
          </button>
        </div>

        {/* 20 Random Tag Cloud Buttons */}
        <div className="flex flex-wrap gap-2">
          {randomTags.map((tag, idx) => (
            <button
              key={`${tag}-${idx}`}
              id={`keyword-tag-${idx}`}
              onClick={() => handleRandomSearch(tag)}
              title={`${tag} 네이버/구글 실시간 검색하기`}
              className="bg-white hover:bg-rose-500 text-slate-700 hover:text-white border border-slate-200 hover:border-rose-500 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 shadow-2xs hover:shadow-xs flex items-center gap-1 group"
            >
              <span className="text-slate-400 group-hover:text-rose-200">#</span>
              <span>{tag}</span>
              <Search className="w-3 h-3 text-slate-300 group-hover:text-rose-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
