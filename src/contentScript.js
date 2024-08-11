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

async function insertLetterboxdScore() {
  const imdbUrl = window.location.href;
  const imdbIdMatch = imdbUrl.match(/\/title\/(tt\d+)\//);
  if (imdbIdMatch) {
    const imdbId = imdbIdMatch[1];
    const aggregateRatingElement = document.querySelector(
      '[data-testid="hero-rating-bar__aggregate-rating"]'
    );

    if (aggregateRatingElement) {
      const lbxRatingWrapper = document.createElement('div');
      lbxRatingWrapper.className = 'lbx-rating-wrapper';

      const lbxTextElement = document.createElement('div');

      lbxTextElement.className = 'lbx-text-element';
      lbxTextElement.textContent = 'Letterboxd RATING';

      const lbxRatingElement = document.createElement('a');
      lbxRatingElement.className = 'lbx-rating-element';

      lbxRatingElement.setAttribute('role', 'button');
      lbxRatingElement.setAttribute('tabindex', '0');
      lbxRatingElement.setAttribute('aria-label', 'View Letterboxd Ratings');
      lbxRatingElement.setAttribute('aria-disabled', 'false');
      lbxRatingElement.setAttribute(
        'href',
        `https://letterboxd.com/imdb/${imdbId}/`
      );

      const lbxRatingTextWrapper = document.createElement('span');
      lbxRatingTextWrapper.className = 'lbx-rating-text-wrapper';

      const lbxRatingInnerWrapper = document.createElement('div');
      lbxRatingInnerWrapper.className = 'lbx-rating-inner-wrapper';

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

      const lbxScoreElement = document.createElement('div');
      lbxScoreElement.className = 'lbx-score-element';

      const letterboxdScore = await fetchLetterboxdScore(imdbId);
      if (letterboxdScore) {
        lbxScoreElement.innerHTML = `<div class="lbx-score-inner-element"><span class="lbx-score-inner-element-span">${letterboxdScore}</span><span>/5</span></div><div class="gDGqZp"></div>`;
      } else {
        lbxScoreElement.innerHTML =
          '<div class="lbx-score-inner-element"><span class="lbx-score-inner-element-span">N/A</span><span>/5</span></div><div class="gDGqZp"></div><div class="kgbSIj">N/A</div>';
      }

      lbxRatingInnerWrapper.appendChild(lbxLogoWrapper);
      lbxRatingInnerWrapper.appendChild(lbxScoreElement);
      lbxRatingTextWrapper.appendChild(lbxRatingInnerWrapper);
      lbxRatingElement.appendChild(lbxRatingTextWrapper);
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
