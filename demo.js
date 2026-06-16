/* ===== 비즈플래닛 마케팅 채널관리 데모: 시나리오 네비게이션 + 하이라이트 ===== */
(function () {
  'use strict';

  // 사용자 이용 시나리오: 테라스의원 매장 등록부터 AI 블로그 발행 요청까지
  var SCENARIO = [
    {
      page: 'soho_dashboard.html',
      label: '서비스 대시보드',
      target: { selector: '.btn-store-switch', text: '매장 추가' },
      guide: '서비스 대시보드 상단에서 [+ 매장 추가]를 눌러 테라스의원 등록을 시작합니다.',
      next: 'soho_store_register.html'
    },
    {
      page: 'soho_store_register.html',
      label: '매장 정보 등록',
      target: { selector: '#place-fetch-btn', text: '불러오기' },
      guide: '네이버 플레이스 입력창에 테라스의원 주소가 입력되어 있습니다. [불러오기]를 눌러 Place 정보를 가져옵니다.',
      next: 'soho_store_register_loaded.html'
    },
    {
      page: 'soho_store_register_loaded.html',
      label: '테라스의원 정보 확인',
      target: { selector: '#store-submit-btn', text: '등록 완료' },
      guide: '테라스의원 정보가 불러와진 상태입니다. 하단의 [등록 완료] 버튼으로 매장 등록을 마칩니다.',
      next: '03_AI학습_온보딩.html'
    },
    {
      page: '03_AI학습_온보딩.html',
      label: 'AI 학습 설정',
      target: { selector: '#training-start-btn', text: '저장 후 수집 실행' },
      guide: '네이버 블로그 50개와 플레이스 리뷰 50개 수집 범위를 확인하고 [저장 후 수집 실행]을 누릅니다.',
      next: '04_AI학습_수집중.html'
    },
    {
      page: '04_AI학습_수집중.html',
      label: '수집 진행',
      target: { selector: '#collection-next-btn', text: '분석할 콘텐츠 선택' },
      guide: '수집 완료 상태를 확인한 뒤 [분석할 콘텐츠 선택]으로 이동합니다.',
      next: '05_AI학습_콘텐츠선택.html'
    },
    {
      page: '05_AI학습_콘텐츠선택.html',
      label: '분석 콘텐츠 선택',
      target: { selector: '#selection-analysis-btn', text: '분석 실행' },
      guide: '분석에 사용할 블로그와 플레이스를 선택한 뒤 [분석 실행]을 누릅니다.',
      next: '06_AI학습_현황.html'
    },
    {
      page: '06_AI학습_현황.html',
      label: 'AI 학습 현황',
      target: { selector: '#learning-ruleset-alert-link', text: '마케팅 전략 룰셋' },
      guide: '학습 완료 후 생성된 [마케팅 전략 룰셋]을 확인합니다.',
      next: '07_마케팅전략룰셋.html'
    },
    {
      page: '07_마케팅전략룰셋.html',
      label: '마케팅 전략 룰셋 v1',
      target: { selector: '.top-tab', text: '블로그 작성 포뮬라' },
      guide: '마케팅 블로그 생성 규칙을 확인하기 위해 [블로그 작성 포뮬라] 탭으로 이동합니다.',
      next: '07_마케팅전략룰셋_블로그작성포뮬라.html'
    },
    {
      page: '07_마케팅전략룰셋_블로그작성포뮬라.html',
      label: '블로그 작성 포뮬라 v2',
      target: { selector: '.demo-flow-action', text: '블로그 관리' },
      guide: '블로그 작성 포뮬라와 AI가 생성안 초안을 확인한 뒤 [블로그 관리]로 이동합니다.',
      next: '02_블로그관리_생성배치중.html'
    },
    {
      page: '02_블로그관리_생성배치중.html',
      label: '생성배치 실행 중',
      target: { selector: '.modal-title', text: '블로그 생성배치 실행 중' },
      guide: 'AI가 본문, 이미지 설명, SEO 점수를 포함한 블로그 초안을 생성합니다. 잠시 후 생성 완료 화면으로 자동 이동합니다.',
      next: '02_블로그관리_생성완료.html',
      autoNextMs: 1800
    },
    {
      page: '02_블로그관리_생성완료.html',
      label: '생성 완료',
      target: { selector: '#blog-post-list tr', text: '리팟레이저로' },
      guide: '생성 완료 후 승인 대기 목록에 추가된 첫 번째 블로그 글을 엽니다.',
      next: '09_AI콘텐츠생성_상세.html'
    },
    {
      page: '09_AI콘텐츠생성_상세.html',
      label: 'AI 콘텐츠 상세',
      target: { selector: '#openBlogPreviewBtn', text: '블로그 적용 미리보기' },
      guide: '생성된 글, 이미지 설명, SEO 점수를 확인한 뒤 [블로그 적용 미리보기]를 엽니다.',
      next: '09_AI콘텐츠생성_상세_미리보기.html',
      extraTargets: [
        { target: { selector: '#request-publish-btn', text: '바로 발행 요청' }, next: '10_블로그_발행대기_상세.html' }
      ]
    },
    {
      page: '09_AI콘텐츠생성_상세_미리보기.html',
      label: '블로그 적용 미리보기',
      target: { selector: '#preview-publish-request', text: '바로 발행 요청' },
      guide: '블로그 적용 화면을 확인한 뒤 [바로 발행 요청]으로 승인 대기 상태를 만듭니다.',
      next: '10_블로그_발행대기_상세.html'
    },
    {
      page: '10_블로그_발행대기_상세.html',
      label: '발행 요청 완료',
      target: { selector: '.topbar-breadcrumb', text: '발행 대기' },
      guide: '발행 요청 완료와 승인 대기 상세를 확인하며 데모 시나리오를 마칩니다.',
      next: 'index.html'
    }
  ];

  var STORAGE_KEY = 'bizplanetMarketingChannelDemoGuide';
  var page = (location.pathname.split('/').pop() || 'index.html');
  try {
    page = decodeURIComponent(page);
  } catch (error) {
    // Keep the raw path if the browser supplies an undecodable URL segment.
  }
  var stepIndex = -1;
  for (var i = 0; i < SCENARIO.length; i++) {
    if (SCENARIO[i].page === page) { stepIndex = i; break; }
  }
  if (stepIndex === -1) return;

  var step = SCENARIO[stepIndex];

  function guideOn() {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  }

  function findTarget(targetConfig) {
    if (!targetConfig) return null;
    var nodes = document.querySelectorAll(targetConfig.selector);
    for (var i = 0; i < nodes.length; i++) {
      if ((nodes[i].textContent || '').indexOf(targetConfig.text) !== -1) return nodes[i];
    }
    return null;
  }

  function wireNavigation(el, nextPage) {
    if (!el || !nextPage) return;
    el.style.cursor = 'pointer';
    if ('disabled' in el) el.disabled = false;
    el.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.href = nextPage;
    }, true);
  }

  /* ---- 데모 바 (우상단 고정) ---- */
  var bar = document.createElement('div');
  bar.className = 'demo-bar';

  var homeBtn = document.createElement('a');
  homeBtn.className = 'demo-home-btn';
  homeBtn.href = 'index.html';
  homeBtn.title = '데모 홈';
  homeBtn.textContent = '⌂';

  var prevBtn = document.createElement('a');
  prevBtn.className = 'demo-nav-btn' + (stepIndex === 0 ? ' disabled' : '');
  prevBtn.href = stepIndex > 0 ? SCENARIO[stepIndex - 1].page : '#';
  prevBtn.title = '이전 화면';
  prevBtn.textContent = '‹';

  var stepLabel = document.createElement('span');
  stepLabel.className = 'demo-step-label';
  stepLabel.innerHTML = '<strong>' + (stepIndex + 1) + '/' + SCENARIO.length + '</strong>' + step.label;

  var nextBtn = document.createElement('a');
  nextBtn.className = 'demo-nav-btn';
  nextBtn.href = step.next;
  nextBtn.title = '다음 화면';
  nextBtn.textContent = '›';

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'demo-toggle';
  toggle.innerHTML = '<span class="demo-dot"></span>사용자 시나리오';

  bar.appendChild(homeBtn);
  bar.appendChild(prevBtn);
  bar.appendChild(stepLabel);
  bar.appendChild(nextBtn);
  bar.appendChild(toggle);
  document.body.appendChild(bar);

  /* ---- 하이라이트 + 말풍선 ---- */
  var tooltip = null;

  function positionTooltip(el) {
    if (!tooltip) return;
    var rect = el.getBoundingClientRect();
    var top = rect.top + window.scrollY - tooltip.offsetHeight - 14;
    var below = false;
    if (top < window.scrollY + 8) {
      top = rect.bottom + window.scrollY + 14;
      below = true;
    }
    var left = rect.left + window.scrollX;
    var maxLeft = window.scrollX + document.documentElement.clientWidth - tooltip.offsetWidth - 12;
    if (left > maxLeft) left = Math.max(maxLeft, window.scrollX + 12);
    tooltip.classList.toggle('below', below);
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function applyHighlight(el) {
    el.classList.add('demo-highlight');
    tooltip = document.createElement('div');
    tooltip.className = 'demo-tooltip';
    tooltip.innerHTML = '<span class="demo-tooltip-step">STEP ' + (stepIndex + 1) + '/' + SCENARIO.length + '</span>' + step.guide;
    document.body.appendChild(tooltip);
    positionTooltip(el);
    window.addEventListener('resize', function () { positionTooltip(el); });
    window.addEventListener('scroll', function () { positionTooltip(el); }, true);
  }

  function removeHighlight(el) {
    el.classList.remove('demo-highlight');
    if (tooltip) { tooltip.remove(); tooltip = null; }
  }

  function syncGuide(el) {
    var on = guideOn();
    toggle.classList.toggle('on', on);
    if (!el) return;
    if (on) {
      if (!el.classList.contains('demo-highlight')) applyHighlight(el);
    } else {
      removeHighlight(el);
    }
  }

  var target = findTarget(step.target);
  wireNavigation(target, step.next);
  if (step.extraTargets) {
    for (var j = 0; j < step.extraTargets.length; j++) {
      wireNavigation(findTarget(step.extraTargets[j].target), step.extraTargets[j].next);
    }
  }

  toggle.addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, guideOn() ? 'off' : 'on');
    syncGuide(target);
  });

  syncGuide(target);

  if (step.autoNextMs && step.next) {
    window.setTimeout(function () {
      location.href = step.next;
    }, step.autoNextMs);
  }
})();
