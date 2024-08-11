async function fetchLetterboxdScore(imdbId) {
  const letterboxdSearchUrl = `https://letterboxd.com/imdb/${imdbId}/`;
  try {
    const response = await fetch(letterboxdSearchUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const averageRatingMeta = doc.querySelector('meta[name="twitter:data2"]');

    if (averageRatingMeta) {
      const rating = averageRatingMeta.getAttribute('content');
      const numericRating = parseFloat(rating.split(' ')[0]);
      return numericRating.toFixed(1);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function createRatingWrapper() {
  const lbxRatingWrapper = document.createElement('div');
  lbxRatingWrapper.className = 'lbx-rating-wrapper';
  return lbxRatingWrapper;
}

function createTextElement() {
  const lbxTextElement = document.createElement('div');
  lbxTextElement.className = 'lbx-text-element';
  lbxTextElement.textContent = 'Letterboxd RATING';
  return lbxTextElement;
}

function createRatingElement(imdbId) {
  const lbxRatingElement = document.createElement('a');
  lbxRatingElement.className = 'lbx-rating-element';
  lbxRatingElement.setAttribute('role', 'button');
  lbxRatingElement.setAttribute('tabindex', '0');
  lbxRatingElement.setAttribute('aria-label', 'View Letterboxd Ratings');
  lbxRatingElement.setAttribute('aria-disabled', 'false');
  lbxRatingElement.href = `https://letterboxd.com/imdb/${imdbId}/`;
  return lbxRatingElement;
}

function createLogoElement() {
  const lbxLogoWrapper = document.createElement('div');
  lbxLogoWrapper.className = 'lbx-logo-wrapper';

  const lbxLogoElement = document.createElement('img');
  lbxLogoElement.src = browser.runtime.getURL(
    'icons/letterboxd-decal-dots-pos-rgb.svg'
  );
  lbxLogoElement.alt = 'Letterboxd Logo';
  lbxLogoElement.width = 24;
  lbxLogoElement.height = 24;

  lbxLogoWrapper.appendChild(lbxLogoElement);
  return lbxLogoWrapper;
}

function createScoreElement(score) {
  const lbxScoreElement = document.createElement('div');
  lbxScoreElement.className = 'lbx-score-element';

  const scoreText = score
    ? `<div class="lbx-score-inner-element"><span class="lbx-score-inner-element-span">${score}</span><span>/5</span></div><div class="gDGqZp"></div>`
    : '<div class="lbx-score-inner-element"><span class="lbx-score-inner-element-span">N/A</span><span>/5</span></div><div class="gDGqZp"></div><div class="kgbSIj">N/A</div>';

  lbxScoreElement.innerHTML = scoreText;
  return lbxScoreElement;
}

async function insertLetterboxdScore() {
  const imdbUrl = window.location.href;
  const imdbIdMatch = imdbUrl.match(/\/title\/(tt\d+)\//);

  if (imdbIdMatch) {
    const imdbId = imdbIdMatch[1];
    const aggregateRatingElement = document.querySelector(
      '[data-testid="hero-rating-bar__aggregate-rating"]'
    );

    if (aggregateRatingElement) {
      const lbxRatingWrapper = createRatingWrapper();
      const lbxTextElement = createTextElement();
      const lbxRatingElement = createRatingElement(imdbId);
      const lbxRatingInnerWrapper = document.createElement('div');
      lbxRatingInnerWrapper.className = 'lbx-rating-inner-wrapper';

      const lbxLogoWrapper = createLogoElement();
      const letterboxdScore = await fetchLetterboxdScore(imdbId);
      const lbxScoreElement = createScoreElement(letterboxdScore);

      lbxRatingInnerWrapper.appendChild(lbxLogoWrapper);
      lbxRatingInnerWrapper.appendChild(lbxScoreElement);
      lbxRatingElement.appendChild(lbxRatingInnerWrapper);
      lbxRatingWrapper.appendChild(lbxTextElement);
      lbxRatingWrapper.appendChild(lbxRatingElement);

      aggregateRatingElement.parentNode.insertBefore(
        lbxRatingWrapper,
        aggregateRatingElement
      );
    }
  }
}

insertLetterboxdScore();
