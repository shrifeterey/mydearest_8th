document.addEventListener('DOMContentLoaded', () => {

  const START_DATE = new Date('2026-07-14');

  function monthsSince(start) {
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months--;
    return Math.max(months, 0);
  }

  const counterEl = document.getElementById('monthCount');
  if (counterEl) {
    const total = monthsSince(START_DATE);
    let current = 0;
    const step = Math.max(Math.ceil(total / 40), 1);
    const timer = setInterval(() => {
      current += step;
      if (current >= total) {
        current = total;
        clearInterval(timer);
      }
      counterEl.textContent = String(current).padStart(2, '0');
    }, 35);
  }

  const vinylWrap = document.querySelector('.vinyl-wrap');
  const vinylRecord = document.getElementById('vinylRecord');
  const tonearm = document.getElementById('tonearm');

  if (vinylWrap) {
    let spinning = false;
    const toggleSpin = () => {
      spinning = !spinning;
      vinylRecord.classList.toggle('spinning', spinning);
      tonearm.classList.toggle('playing', spinning);
    };
    vinylWrap.addEventListener('click', toggleSpin);
    setTimeout(toggleSpin, 700);
  }

  const revealTargets = document.querySelectorAll('.track-item');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

  const audio = document.getElementById('audioPlayer');
  const tracks = document.querySelectorAll('.player-track');

  tracks.forEach(track => {
    track.addEventListener('click', () => {
      const src = track.getAttribute('data-src');
      const icon = track.querySelector('.play-icon');
      const isActive = track.classList.contains('active');

      // reset all tracks
      tracks.forEach(t => {
        t.classList.remove('active');
        t.querySelector('.play-icon').className = 'bi bi-play-circle play-icon';
      });

      if (isActive) {
        audio.pause();
        return;
      }

      audio.src = src;
      audio.play().catch(() => {
      });
      track.classList.add('active');
      icon.className = 'bi bi-pause-circle play-icon';

      if (vinylRecord && !vinylRecord.classList.contains('spinning')) {
        vinylRecord.classList.add('spinning');
        tonearm.classList.add('playing');
      }
    });
  });

  audio && audio.addEventListener('ended', () => {
    tracks.forEach(t => {
      t.classList.remove('active');
      t.querySelector('.play-icon').className = 'bi bi-play-circle play-icon';
    });
  });

  const ambience = document.getElementById('ambience');
  const symbols = ['♥', '♡', '♪', '♫'];
  if (ambience) {
    const count = window.innerWidth < 576 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left = Math.random() * 100 + 'vw';
      span.style.animationDuration = (14 + Math.random() * 12) + 's';
      span.style.animationDelay = (Math.random() * 14) + 's';
      span.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
      ambience.appendChild(span);
    }
  }

  const navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

});