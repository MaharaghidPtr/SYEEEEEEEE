function saveName(name) {
  localStorage.setItem('romanticName', name.trim());
}

function getName() {
  return localStorage.getItem('romanticName') || 'Sayang';
}

function updateNameDisplay() {
  document.querySelectorAll('.display-name').forEach(function (el) {
    el.textContent = getName();
  });
}

function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(function (section) {
    section.classList.remove('active');
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);

    if (pageId === 'page-surat') {
      resetLetterAnimation();
    }
  }
}

function initNavigation() {
  document.querySelectorAll('[data-go]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showPage(btn.getAttribute('data-go'));
    });
  });
}

function initNameForm() {
  const form = document.getElementById('nameForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('userName');
    const name = input.value.trim();

    if (!name) {
      input.classList.add('is-invalid');
      return;
    }

    saveName(name);
    updateNameDisplay();
    showPage('page-surat');
  });
}

function resetLetterAnimation() {
  const envelope = document.getElementById('envelope');
  const envelopeStage = document.getElementById('envelopeStage');
  const letterReveal = document.getElementById('letterReveal');
  const hint = document.getElementById('openLetterHint');

  if (!envelope) return;

  envelope.classList.remove('opened');
  if (envelopeStage) envelopeStage.classList.remove('hidden');
  if (letterReveal) letterReveal.classList.remove('show');
  if (hint) hint.textContent = 'pencet amplopnyaa senggg';
}

function initLetterAnimation() {
  const envelope = document.getElementById('envelope');
  const envelopeStage = document.getElementById('envelopeStage');
  const letterReveal = document.getElementById('letterReveal');
  const hint = document.getElementById('openLetterHint');

  if (!envelope) return;

  envelope.addEventListener('click', function () {
    if (envelope.classList.contains('opened')) return;

    envelope.classList.add('opened');
    if (hint) hint.textContent = 'Membuka surat...';

    setTimeout(function () {
      if (envelopeStage) envelopeStage.classList.add('hidden');
      if (letterReveal) letterReveal.classList.add('show');
    }, 1400);
  });
}

function initFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const hearts = ['♥', '♡', '✿', '★'];
  for (let i = 0; i < 14; i++) {
    const span = document.createElement('span');
    span.textContent = hearts[i % hearts.length];
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDelay = Math.random() * 8 + 's';
    span.style.animationDuration = 6 + Math.random() * 6 + 's';
    span.style.fontSize = 1 + Math.random() * 1.5 + 'rem';
    container.appendChild(span);
  }
}

function initGalleryModal() {
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('photoModalImage');
  const triggers = document.querySelectorAll('.gallery-photo');
  const closeButtons = document.querySelectorAll('[data-close-photo-modal]');

  if (!modal || !modalImage || !triggers.length) return;

  const modalCaption = document.getElementById('photoModalCaption');

  function openModal(src, alt, caption) {
    if (modalImage) {
      modalImage.src = src;
      modalImage.alt = alt || 'Foto diperbesar';
    }
    if (modalCaption) {
      modalCaption.textContent = caption || 'Kenangan yang selalu menghangatkan hati.';
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(
        trigger.getAttribute('data-full') || trigger.getAttribute('src'),
        trigger.getAttribute('alt'),
        trigger.getAttribute('data-caption')
      );
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function initMusicPlayer() {
  const audio = document.getElementById('musicPlayer');
  const nowTitle = document.getElementById('nowPlayingTitle');
  const nowArtist = document.getElementById('nowPlayingArtist');
  const tracks = document.querySelectorAll('.playlist-track');

  if (!audio || !tracks.length) return;

  function activateTrack(track) {
    tracks.forEach(function (item) {
      item.classList.remove('is-playing');
    });

    if (!track) return;

    track.classList.add('is-playing');
    if (nowTitle) nowTitle.textContent = track.getAttribute('data-title') || 'Playlist Musik';
    if (nowArtist) nowArtist.textContent = track.getAttribute('data-artist') || 'Musik santai';

    const src = track.getAttribute('data-src') || '';
    if (src) {
      audio.src = src;
      audio.load();
      audio.play().catch(function () {});
    }
  }

  tracks.forEach(function (track) {
    track.addEventListener('click', function () {
      activateTrack(track);
    });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTrack(track);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initNameForm();
  initLetterAnimation();
  updateNameDisplay();
  initFloatingHearts();
  initGalleryModal();
  initMusicPlayer();
});
