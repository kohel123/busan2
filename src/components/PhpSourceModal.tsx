import React, { useState } from 'react';
import { Code, Copy, Check, Download, X, FileText } from 'lucide-react';

interface PhpSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpSourceModal: React.FC<PhpSourceModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const phpSourceCode = `<?php
/**
 * 부산 웨딩박람회 - 실시간 일정 안내 및 무료초대권 신청 포털 (index.php)
 */

function search($array, $key, $value)
{
    $results = array();
    if (is_array($array)) {
        if (isset($array[$key]) && $array[$key] == $value) {
            $results[] = $array;
        }
        foreach ($array as $subarray) {
            $results = array_merge($results, search($subarray, $key, $value));
        }
    }
    return $results;
}

$url = 'https://cpaad.co.kr/api/ad_json.php';
$json_string = '';

if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    $json_string = curl_exec($ch);
    curl_close($ch);
}

if (empty($json_string) && ini_get('allow_url_fopen')) {
    $context = stream_context_create(array('http' => array('timeout' => 3)));
    $json_string = @file_get_contents($url, false, $context);
}

$data = json_decode($json_string, true);
$busan_ads = array();

if (!empty($data) && isset($data['advertisements'])) {
    $results4 = search($data['advertisements'], 'region', 'busan');
    if (empty($results4)) {
        $all_ads = is_array($data['advertisements']) ? $data['advertisements'] : array();
        foreach ($all_ads as $ad) {
            if (isset($ad['ad_location']) && (mb_strpos($ad['ad_location'], '부산') !== false || mb_strpos($ad['ad_location'], '벡스코') !== false)) {
                $busan_ads[] = $ad;
            }
        }
    } else {
        foreach ($results4 as $result) {
            if (isset($result['ad_location']) && (mb_strpos($result['ad_location'], '부산') !== false || mb_strpos($result['ad_location'], '벡스코') !== false)) {
                $busan_ads[] = $result;
            }
        }
    }
}

$myid = 'wedding2026';

// 개최일 기준 빠른 순(오름차순) 정렬: usort() 및 strcmp() 적용
usort($busan_ads, function($a, $b) {
    $dateA = isset($a['ad_date']) ? $a['ad_date'] : '';
    $dateB = isset($b['ad_date']) ? $b['ad_date'] : '';
    return strcmp($dateA, $dateB);
});

// 실시간 아이템 총 개수
$total_count = count($busan_ads);

// 60개 키워드 태그 중 랜덤 20개 추출
$keyword_tags_60 = array(
    '부산웨딩박람회', '부산웨딩박람회일정', '벡스코웨딩박람회', '부산웨딩홀', '부산스드메',
    '부산결혼준비', '부산웨딩플래너', '부산웨딩드레스', '해운대웨딩홀', '서면웨딩홀',
    '부산웨딩스튜디오', '부산웨딩박람회사전예약', '부산웨딩페어', '부산스드메패키지', '부산예물',
    '부산한복', '부산신혼여행', '부산웨딩홀할인', '부산본식스냅', '부산웨딩메이크업',
    '벡스코결혼박람회', '부산웨딩박람회무료초대권', '부산웨딩홀견적', '부산웨딩투어', '부산웨딩컨설팅',
    '센텀웨딩홀', '동래웨딩홀', '부산진구웨딩홀', '부산웨딩홀비교', '부산웨딩박람회혜택',
    '부산웨딩박람회선물', '부산웨딩다이어리', '부산웨딩체크리스트', '부산결혼비용', '부산허니문',
    '부산맞춤정장', '부산웨딩홀프로모션', '부산호텔웨딩', '부산스몰웨딩', '부산야외웨딩',
    '부산하우스웨딩', '부산웨딩촬영', '부산웨딩스냅', '부산웨딩DVD', '부산혼수박람회',
    '부산가구단지', '부산웨딩밴드', '부산다이렉트웨딩', '부산웨딩카페', '부산결혼박람회일정',
    '부산웨딩박람회후기', '부산웨딩박람회신청', '부산웨딩홀추천', '부산웨딩드레스투어', '부산웨딩메이크업샵',
    '부산본식드레스', '부산스냅촬영', '부산웨딩패키지', '부산결혼준비순서', '부산웨딩페스티벌'
);
$random_keys = array_rand($keyword_tags_60, 20);
$selected_tags = array();
foreach ($random_keys as $k) {
    $selected_tags[] = $keyword_tags_60[$k];
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>부산 웨딩박람회 - 실시간 일정 & 무료초대권 신청</title>
    <!-- OpenGraph & JSON-LD Meta Tags 생략 (전체 파일에 포함) -->
</head>
<body>
    <!-- 실시간 박람회 일정 리스트 출력 (총 <?=$total_count?>건) -->
    <?php foreach ($busan_ads as $result): ?>
        <a href="<?=$result['ad_url'].$myid?>" target="_blank">
            <img src="<?=$result['ad_thumbnail']?>" alt="<?=$result['gather_name']?> 무료 초대권 신청"><br>
            💖<b><?=$result['gather_name']?></b><br>
            📍<?=$result['ad_location']?><br>
            📅<b><?=$result['ad_date']?></b>
        </a>
    <?php endforeach; ?>

    <!-- 50% 확률 네이버 / 구글 검색 연동 스크립트 -->
    <script>
    function randomSearch(keyword) {
        var cleanKey = keyword.replace(/^#/, '').trim();
        var isNaver = Math.random() < 0.5;
        var searchUrl = isNaver 
            ? 'https://search.naver.com/search.naver?query=' + encodeURIComponent(cleanKey)
            : 'https://www.google.com/search?q=' + encodeURIComponent(cleanKey);
        window.open(searchUrl, '_blank');
    }
    </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(phpSourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([phpSourceCode], { type: 'application/x-httpd-php' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.php';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
              PHP
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                부산 웨딩박람회 전체 PHP 소스코드 (index.php)
              </h3>
              <p className="text-[11px] text-slate-500">
                상대경로 적용으로 도메인 및 호스팅 서버 이전 시 즉시 사용 가능합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1"
              title="클립보드에 복사"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : '복사'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
              title="index.php 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>다운로드</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="p-4 flex-1 overflow-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="whitespace-pre overflow-x-auto selection:bg-rose-900 selection:text-white">
            {phpSourceCode}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span>루트 폴더에 <strong>index.php</strong>로 저장되어 있습니다.</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
