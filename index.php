<?php
/**
 * 부산 웨딩박람회 - 실시간 일정 안내 및 무료초대권 신청 포털
 * 
 * Target: 20~40대 결혼을 앞둔 예비 신랑, 예비 신부
 * Core Goal: 웨딩박람회 일정을 클릭하여 무료초대권 신청하기
 * Relative Paths: 어디서나 정상 작동하는 상대경로 적용
 */

// 1. API 데이터 추출 및 검색 함수
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

// 2. 실시간 API 연동 (cURL 및 file_get_contents 폴백)
$url = 'https://cpaad.co.kr/api/ad_json.php';
$json_string = '';

if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    $json_string = curl_exec($ch);
    curl_close($ch);
}

if (empty($json_string) && ini_get('allow_url_fopen')) {
    $context = stream_context_create(array(
        'http' => array('timeout' => 3)
    ));
    $json_string = @file_get_contents($url, false, $context);
}

$data = json_decode($json_string, true);

// 3. 지역별 데이터 분리 및 부산 데이터 추출
$busan_ads = array();
if (!empty($data) && isset($data['advertisements'])) {
    $results4 = search($data['advertisements'], 'region', 'busan');
    
    // 만약 region이 없거나 비어있는 경우 ad_location에 '부산'이 포함된 아이템 필터링
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

// API 응답 부재 시 안전한 기본 데이터 세팅
if (empty($busan_ads)) {
    $busan_ads = array(
        array(
            'gather_name' => '부산 벡스코 W웨딩 프리미엄 박람회',
            'ad_date' => '03.21(토) ~ 03.22(일)',
            'ad_location' => '부산 해운대구 벡스코 제1전시장',
            'ad_thumbnail' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80',
            'ad_url' => 'https://cpaad.co.kr/ad/busan_bexco_w.php?ref='
        ),
        array(
            'gather_name' => '부산 MBC 웨딩 & 혼수 페스티벌',
            'ad_date' => '03.28(토) ~ 03.29(일)',
            'ad_location' => '부산 수영구 MBC아트홀 웨딩전시장',
            'ad_thumbnail' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=80',
            'ad_url' => 'https://cpaad.co.kr/ad/busan_mbc_wedding.php?ref='
        ),
        array(
            'gather_name' => '부산 서면 롯데호텔 하이엔드 웨딩페어',
            'ad_date' => '04.04(토) ~ 04.05(일)',
            'ad_location' => '부산 부산진구 롯데호텔 부산 3층',
            'ad_thumbnail' => 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&auto=format&fit=crop&q=80',
            'ad_url' => 'https://cpaad.co.kr/ad/busan_lotte_hotel.php?ref='
        ),
        array(
            'gather_name' => '부산 센텀 다이렉트 웨딩 대박람회',
            'ad_date' => '04.11(토) ~ 04.12(일)',
            'ad_location' => '부산 해운대구 신세계 센텀시티몰 특설관',
            'ad_thumbnail' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80',
            'ad_url' => 'https://cpaad.co.kr/ad/busan_direct_centum.php?ref='
        )
    );
}

// 4. 제휴 파라미터 ID
$myid = 'wedding2026';

// 5. 개최일 기준 빠른 순(오름차순) 정렬: usort() 및 strcmp() 적용
usort($busan_ads, function($a, $b) {
    $dateA = isset($a['ad_date']) ? $a['ad_date'] : '';
    $dateB = isset($b['ad_date']) ? $b['ad_date'] : '';
    return strcmp($dateA, $dateB);
});

// 6. 실시간 총 아이템 개수 $total_count 변수 산출
$total_count = count($busan_ads);

// 7. SEO 및 OpenGraph 동적 시간 변수 설정
$og_updated_time = date('Y-m-d\TH:i:sP');
$article_published_time = date('Y-01-01\T00:00:00P');
$article_modified_time = date('Y-m-d\TH:i:sP');

// 8. 60개 키워드 태그 배열 및 랜덤 20개 추출
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>부산 웨딩박람회 - 실시간 일정 & 무료초대권 신청</title>
    <meta name="description" content="부산 웨딩박람회 실시간 일정, 벡스코 및 호텔 웨딩페어 무료초대권 신청, 웨딩홀·스드메 특별 혜택 및 결혼준비 체크리스트">
    <meta name="keywords" content="부산웨딩박람회, 부산웨딩박람회일정, 벡스코웨딩박람회, 부산웨딩홀, 부산스드메, 부산결혼준비">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="부산 웨딩박람회 - 실시간 일정 & 무료초대권 신청">
    <meta property="og:description" content="부산 웨딩박람회 최신 일정 실시간 안내 및 무료초대권 간편 신청">
    <meta property="og:image" content="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:updated_time" content="<?php echo $og_updated_time; ?>">
    <meta property="article:published_time" content="<?php echo $article_published_time; ?>">
    <meta property="article:modified_time" content="<?php echo $article_modified_time; ?>">

    <!-- Font: NEXON Lv1 Gothic & Pretendard -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
    
    <!-- JSON-LD 구조화 데이터 -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "부산 웨딩박람회",
          "url": "./",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "./?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "name": "부산 웨딩박람회 일정 안내 및 무료초대권 신청",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "홈", "item": "./" },
              { "@type": "ListItem", "position": 2, "name": "부산 웨딩박람회 일정", "item": "./#schedule" }
            ]
          }
        },
        {
          "@type": "EventSeries",
          "name": "부산 웨딩박람회 행사",
          "location": {
            "@type": "Place",
            "name": "부산 벡스코 및 호텔 특설관",
            "address": "부산광역시"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "부산 웨딩박람회 입장료는 얼마인가요?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "사전 등록 시 입장료(10,000원 상당)가 전액 무료이며 동반 1인까지 무료 입장이 가능합니다."
              }
            },
            {
              "@type": "Question",
              "name": "웨딩박람회 당일 계약을 꼭 해야 하나요?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "14일 이내 100% 환불 규정이 적용된 안심 가계약으로 혜택만 우선 선점하고 신중히 결정하시는 것이 안전합니다."
              }
            }
          ]
        }
      ]
    }
    </script>

    <style>
        :root {
            --primary: #f43f5e;
            --primary-hover: #e11d48;
            --primary-soft: #ffe4e6;
            --text-main: #0f172a;
            --text-sub: #475569;
            --bg-main: #f8fafc;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: "Pretendard", "NEXON Lv1 Gothic OTF", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            line-height: 1.6;
            font-size: 15px;
            word-break: keep-all;
        }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1140px; margin: 0 auto; padding: 0 16px; }
        
        /* Top Banner */
        .top-banner {
            background: linear-gradient(90deg, #f43f5e, #ec4899);
            color: #fff;
            text-align: center;
            padding: 8px 12px;
            font-size: 13px;
            font-weight: 600;
        }

        /* Header */
        header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 68px;
        }
        .logo-area { display: flex; align-items: center; gap: 10px; }
        .logo-icon {
            width: 40px; height: 40px; border-radius: 10px;
            background: linear-gradient(135deg, #f43f5e, #fb7185);
            display: flex; align-items: center; justify-content: center;
            font-size: 20px; color: #fff;
        }
        .logo-title { font-size: 20px; font-weight: 800; color: var(--text-main); }
        
        /* Navigation Tabs */
        nav.nav-tabs {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 10px 0;
            border-top: 1px solid #f1f5f9;
        }
        nav.nav-tabs a {
            white-space: nowrap;
            padding: 6px 14px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-sub);
            border-radius: 8px;
            background: #f1f5f9;
            transition: all 0.2s;
        }
        nav.nav-tabs a:hover {
            background: var(--primary-soft);
            color: var(--primary);
        }

        /* Section Title & Badge */
        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 32px 0 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e2e8f0;
            flex-wrap: wrap;
            gap: 10px;
        }
        .section-title {
            font-size: 22px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .count-badge {
            background-color: var(--primary-soft);
            color: var(--primary);
            font-size: 13px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 20px;
            border: 1px solid #fecdd3;
        }

        /* Schedule Grid - Compact Cards for Mobile */
        .schedule-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 18px;
            margin-bottom: 40px;
        }
        .card {
            background: var(--card-bg);
            border-radius: 16px;
            border: 1px solid var(--border-color);
            overflow: hidden;
            box-shadow: 0 2px 6px rgba(0,0,0,0.03);
            display: flex;
            flex-direction: column;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.07);
            border-color: #fda4af;
        }
        .card-thumb {
            position: relative;
            height: 160px;
            background: #e2e8f0;
            overflow: hidden;
        }
        .card-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .card-tag {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(244, 63, 94, 0.95);
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
        }
        .card-body {
            padding: 14px 16px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .card-name {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 6px;
            line-height: 1.3;
        }
        .card-date {
            font-size: 13px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 4px;
        }
        .card-location {
            font-size: 12px;
            color: var(--text-sub);
            margin-bottom: 12px;
        }
        .card-btn {
            display: block;
            text-align: center;
            background: linear-gradient(90deg, #f43f5e, #fb7185);
            color: #fff;
            padding: 9px 12px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 13px;
            transition: opacity 0.2s;
        }
        .card-btn:hover { opacity: 0.92; }

        /* Guide Modules & Timeline */
        .guide-box {
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 30px;
        }
        .guide-title {
            font-size: 18px;
            font-weight: 800;
            margin-bottom: 16px;
            color: var(--text-main);
        }
        .guide-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        @media (max-width: 768px) {
            .guide-grid-2 { grid-template-columns: 1fr; }
        }
        .guide-item {
            background: #f8fafc;
            border: 1px solid #edf2f7;
            padding: 16px;
            border-radius: 12px;
            font-size: 13px;
        }
        .guide-item h4 { font-size: 14px; font-weight: 700; margin-bottom: 6px; color: var(--text-main); }
        .guide-item p { color: var(--text-sub); line-height: 1.5; }

        /* Tag Cloud & Random Search */
        .tag-container {
            background: #f1f5f9;
            padding: 24px 16px;
            border-top: 1px solid #e2e8f0;
            margin-top: 40px;
        }
        .tag-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; }
        .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-chip {
            background: #fff;
            border: 1px solid #cbd5e1;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .tag-chip:hover {
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
        }

        /* Footer */
        footer {
            background: #0f172a;
            color: #94a3b8;
            padding: 36px 16px;
            font-size: 12px;
            line-height: 1.7;
        }
    </style>
</head>
<body>

    <div class="top-banner">
        💖 부산 전 지역 웨딩홀 대관료 지원 & 스드메 무료 피팅권 사전신청 접수 중
    </div>

    <header>
        <div class="container">
            <div class="header-wrap">
                <div class="logo-area">
                    <div class="logo-icon">💍</div>
                    <div>
                        <div class="logo-title">부산 웨딩박람회</div>
                    </div>
                </div>
                <div>
                    <a href="#schedule" style="background:var(--primary); color:#fff; font-size:13px; font-weight:700; padding:8px 14px; border-radius:10px;">
                        무료초대권 신청
                    </a>
                </div>
            </div>
            <nav class="nav-tabs">
                <a href="#schedule">📅 실시간 일정</a>
                <a href="#benefits">🎁 박람회 혜택</a>
                <a href="#timeline">📋 D-Day 로드맵</a>
                <a href="#safety">🛡️ 계약 안전장치</a>
                <a href="#faq">❓ 자주 묻는 질문</a>
            </nav>
        </div>
    </header>

    <main class="container">
        <!-- 1. 실시간 박람회 일정 섹션 -->
        <section id="schedule">
            <div class="section-header">
                <h2 class="section-title">
                    부산 웨딩박람회 실시간 일정
                    <span class="count-badge">총 <?php echo $total_count; ?>건</span>
                </h2>
                <div style="font-size:12px; color:var(--text-sub);">
                    개최일 빠른 순으로 정렬됨 | 사전등록 시 100% 무료 입장
                </div>
            </div>

            <div class="schedule-grid">
                <?php if (!empty($busan_ads)): ?>
                    <?php foreach ($busan_ads as $result): ?>
                        <?php 
                            $affiliate_url = isset($result['ad_url']) ? $result['ad_url'].$myid : '#';
                            $img_src = isset($result['ad_thumbnail']) ? $result['ad_thumbnail'] : '';
                            $name = isset($result['gather_name']) ? $result['gather_name'] : '부산 웨딩박람회';
                            $date = isset($result['ad_date']) ? $result['ad_date'] : '';
                            $location = isset($result['ad_location']) ? $result['ad_location'] : '부산 전시장';
                        ?>
                        <article class="card">
                            <div class="card-thumb">
                                <img src="<?php echo htmlspecialchars($img_src); ?>" alt="<?php echo htmlspecialchars($name); ?> 무료 초대권 신청" loading="lazy">
                                <span class="card-tag">무료초대권 신청가능</span>
                            </div>
                            <div class="card-body">
                                <div>
                                    <h3 class="card-name"><?php echo htmlspecialchars($name); ?></h3>
                                    <div class="card-date">📅 <?php echo htmlspecialchars($date); ?></div>
                                    <div class="card-location">📍 <?php echo htmlspecialchars($location); ?></div>
                                </div>
                                <a href="<?php echo htmlspecialchars($affiliate_url); ?>" target="_blank" rel="noopener noreferrer" class="card-btn">
                                    무료 초대권 신청하기 →
                                </a>
                            </div>
                        </article>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p style="padding: 30px; text-align:center; color: #64748b;">현재 등록된 부산 웨딩박람회 일정이 없습니다.</p>
                <?php endif; ?>
            </div>
        </section>

        <!-- 2. 박람회 혜택 & 핵심 안내 -->
        <section id="benefits" class="guide-box">
            <h3 class="guide-title">🎁 부산 웨딩박람회 혜택 및 핵심 안내</h3>
            <div class="guide-grid-2">
                <div class="guide-item">
                    <h4>웨딩홀 대관료 & 식대 특별 지원</h4>
                    <p>부산 전 지역 인기 웨딩홀(해운대, 서면, 센텀, 동래 등) 대관료 무료 및 식대 1인당 추가 할인 프로모션 혜택을 제공합니다.</p>
                </div>
                <div class="guide-item">
                    <h4>스드메 현장 업그레이드 & 피팅권</h4>
                    <p>수입 프리미엄 블랙라벨 드레스 무료 피팅권 증정 및 스튜디오 촬영 앨범 페이지 무상 추가 혜택을 선점할 수 있습니다.</p>
                </div>
                <div class="guide-item">
                    <h4>시간 / 입장료 / 주차 안내</h4>
                    <p>오전 10:00 ~ 19:30까지 운영되며, 사전등록 시 입장료(1만원)가 전액 무료입니다. 벡스코 및 호텔 지하주차장 무료 주차가 지원됩니다.</p>
                </div>
                <div class="guide-item">
                    <h4>방문 전 준비 및 신청방법</h4>
                    <p>상단 무료초대권 링크를 통해 사전 등록을 완료하신 후, 카카오톡으로 발송되는 모바일 바코드를 현장 안내데스크에 제시하시면 바로 입장 가능합니다.</p>
                </div>
            </div>
        </section>

        <!-- 3. D-Day 로드맵 & 5단계 활용법 -->
        <section id="timeline" class="guide-box">
            <h3 class="guide-title">📋 결혼준비 D-Day 일정표 & 박람회 활용 순서</h3>
            <div class="guide-grid-2">
                <div class="guide-item">
                    <h4>D-300 ~ D-180 (골든타임 선점)</h4>
                    <p>상견례 및 예식 날짜 확정 후 부산 인기 웨딩홀 투어 및 스드메 패키지 플래너 계약을 조기에 체결합니다.</p>
                </div>
                <div class="guide-item">
                    <h4>D-180 ~ D-60 (스튜디오 및 예복)</h4>
                    <p>신혼집 계약 및 맞춤 예복/한복 맞춤, 스튜디오 웨딩 리허설 촬영 및 모바일 청첩장 제작을 진행합니다.</p>
                </div>
                <div class="guide-item">
                    <h4>박람회 100% 활용 5단계 순서</h4>
                    <p>1단계(사전조사) → 2단계(부스배치도 확인) → 3단계(1:1 맞춤상담) → 4단계(실물 앨범 비교) → 5단계(안심 가계약)</p>
                </div>
                <div class="guide-item">
                    <h4>박람회 다녀온 후 진행 순서</h4>
                    <p>수집한 견적서 엑셀 정리 → 웨딩홀 실제 현장 워킹투어 검증 → 14일 쿨링오프 기간 내 최종 계약 확정</p>
                </div>
            </div>
        </section>

        <!-- 4. 스드메 체크포인트 & 계약 안전장치 -->
        <section id="safety" class="guide-box">
            <h3 class="guide-title">🛡️ 스드메 핵심 확인 포인트 & 계약 안전장치</h3>
            <div class="guide-grid-2">
                <div class="guide-item">
                    <h4>스튜디오 원본/수정본 비용 사전 확인</h4>
                    <p>스튜디오 촬영 시 필수 발생하는 원본 데이터 비용(33~44만원) 및 헬퍼 이모님 수고비 포함 여부를 반드시 확인하세요.</p>
                </div>
                <div class="guide-item">
                    <h4>14일 이내 100% 전액 환불 약관</h4>
                    <p>공정거래위원회 표준약관상 계약 후 14일 이내 청약 철회 시 위약금 없이 계약금이 전액 환불되는지 체크하세요.</p>
                </div>
            </div>
        </section>

        <!-- 5. FAQ 자주 묻는 질문 -->
        <section id="faq" class="guide-box">
            <h3 class="guide-title">❓ 자주 묻는 질문 (FAQ)</h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
                <div class="guide-item">
                    <h4>Q. 부산 웨딩박람회 입장료는 정말 무료인가요?</h4>
                    <p>A. 네, 상단 리스트에서 무료초대권을 사전 신청하시면 현장 입장료 10,000원이 전액 면제되며 동반 1인까지 무료로 입장하실 수 있습니다.</p>
                </div>
                <div class="guide-item">
                    <h4>Q. 현장에서 당일 계약을 꼭 해야 하나요?</h4>
                    <p>A. 그렇지 않습니다. 14일 이내 100% 환불이 명시된 안심 가계약으로 혜택만 먼저 확보한 뒤 부모님과 상의하여 신중하게 확정하세요.</p>
                </div>
            </div>
        </section>
    </main>

    <!-- 6. 관련 키워드 태그 20개 및 랜덤 검색 기능 (50% 네이버 / 50% 구글) -->
    <div class="tag-container">
        <div class="container">
            <div class="tag-title">🔍 부산 웨딩박람회 추천 키워드 (클릭 시 실시간 검색 연동)</div>
            <div class="tag-cloud">
                <?php foreach ($selected_tags as $tag): ?>
                    <button type="button" class="tag-chip" onclick="randomSearch('<?php echo htmlspecialchars($tag); ?>')">
                        #<?php echo htmlspecialchars($tag); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- 푸터 -->
    <footer>
        <div class="container">
            <p><strong>부산 웨딩박람회 일정 안내 센터</strong></p>
            <p style="margin: 6px 0;">부산 벡스코, 서면 롯데호텔, 센텀시티 등 부산 전 지역 웨딩박람회 공식 일정 및 무료초대권 신청 포털</p>
            <p style="color:#64748b;">© 부산 웨딩박람회 안내센터. All rights reserved.</p>
        </div>
    </footer>

    <!-- JavaScript: 50% 확률 네이버 / 구글 검색 연동 -->
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
</html>
