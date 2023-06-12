import ImportHTML from './components/importHTML.js';

// Import navigation
if (document.querySelector('.navigation')) {
  (async () => {
    await ImportHTML.importHTML('navigation');
  })();
}

// Redirection
function redirectToHTML(target) {
  window.location.href = `/asset/pages/${target}.html`;
}

// Fade in
function fadeIn() {
  const fadeElements = document.querySelector('.fade-in');
  fadeElements.style.opacity = 1;
}

// index.html Mouse Event
if (document.querySelector('.index')) {
  // 마우스 휠 이벤트에 대한 이벤트 리스너 등록
  document.addEventListener('wheel', function (event) {
    // 마우스 휠 이벤트의 deltaY 값이 음수일 때는 아래로 스크롤
    if (event.deltaY > 0) {
      redirectToHTML('about');
    }
  });
}

// about.html Mouse Event
if (document.querySelector('.about')) {
  // DOMContentLoaded 이벤트는 HTML 문서가 로드되고 파싱되었을 때 발생
  document.addEventListener('DOMContentLoaded', function () {
    fadeIn();
  });

  // 마우스 휠 이벤트에 대한 이벤트 리스너 등록
  document.addEventListener('wheel', function (event) {
    // 마우스 휠 이벤트의 deltaY 값이 음수일 때는 아래로 스크롤
    if (event.deltaY > 0) {
      redirectToHTML('interested');
    }
  });
}

// interested.html Mouse Event
if (document.querySelector('.interested')) {
  // DOMContentLoaded 이벤트는 HTML 문서가 로드되고 파싱되었을 때 발생
  document.addEventListener('DOMContentLoaded', function () {
    fadeIn();
  });

  const sections = document.querySelectorAll('.interestedContents');
  let currentSectionIndex = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    // 인덱스가 올바르지 않은 경우 함수를 종료
    if (index < 0 || index >= sections.length) return;

    // 스크롤 중임을 나타내는 변수
    isScrolling = true;
    sections[index].scrollIntoView({
      behavior: 'smooth',
    });

    // 현재 섹션 인덱스를 업데이트
    currentSectionIndex = index;

    setTimeout(function () {
      // 1초 후에 스크롤 중인 상태를 false로 변경하여 스크롤 이벤트를 재사용
      isScrolling = false;
    }, 1000);
  }

  document.addEventListener('wheel', function (event) {
    // 스크롤 중인 경우에는 이벤트를 무시
    if (isScrolling) return;

    // 스크롤 방향을 판별
    let delta = Math.sign(event.deltaY);
    if (delta > 0 && currentSectionIndex < sections.length - 1) {
      // 스크롤 방향이 아래이고, 현재 섹션이 마지막 섹션이 아닌 경우 다음 섹션으로 스크롤
      scrollToSection(currentSectionIndex + 1);
    } else if (delta < 0 && currentSectionIndex > 0) {
      // 스크롤 방향이 위이고, 현재 섹션이 첫 번째 섹션이 아닌 경우 이전 섹션으로 스크롤
      scrollToSection(currentSectionIndex - 1);
    }
  });
}
