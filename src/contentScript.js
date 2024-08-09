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
      lbxRatingWrapper.className =
        'sc-acdbf0f3-0 iaJqqu rating-bar__base-button';

      const lbxTextElement = document.createElement('div');
      lbxTextElement.className = 'sc-acdbf0f3-1 ioCFan';
      lbxTextElement.textContent = 'Letterboxd RATING';

      const lbxRatingElement = document.createElement('a');
      lbxRatingElement.className =
        'ipc-btn ipc-btn--single-padding ipc-btn--center-align-content ipc-btn--default-height ipc-btn--core-baseAlt ipc-btn--theme-baseAlt ipc-btn--on-textPrimary ipc-text-button sc-acdbf0f3-2 brjkFP';
      lbxRatingElement.setAttribute('role', 'button');
      lbxRatingElement.setAttribute('tabindex', '0');
      lbxRatingElement.setAttribute('aria-label', 'View Letterboxd Ratings');
      lbxRatingElement.setAttribute('aria-disabled', 'false');
      lbxRatingElement.setAttribute(
        'href',
        `https://letterboxd.com/imdb/${imdbId}/`
      );

      const lbxRatingTextWrapper = document.createElement('span');
      lbxRatingTextWrapper.className = 'ipc-btn__text';

      const lbxRatingInnerWrapper = document.createElement('div');
      lbxRatingInnerWrapper.className = 'sc-acdbf0f3-3 fRlpFA';

      const lbxLogoWrapper = document.createElement('div');
      lbxLogoWrapper.className = 'sc-acdbf0f3-4 hJNcKz';
      const lbxLogoElement = document.createElement('img');
      lbxLogoElement.src = browser.runtime.getURL(
        'icons/letterboxd-decal-dots-pos-rgb.svg'
      );
      lbxLogoElement.alt = 'Letterboxd Logo';
      lbxLogoElement.width = 24;
      lbxLogoElement.height = 24;
      lbxLogoElement.className = 'ipc-icon ipc-icon--letterboxd';

      lbxLogoWrapper.appendChild(lbxLogoElement);

      const lbxScoreElement = document.createElement('div');
      lbxScoreElement.className = 'sc-eb51e184-0 ghvwpw';

      const letterboxdScore = await fetchLetterboxdScore(imdbId);
      if (letterboxdScore) {
        lbxScoreElement.innerHTML = `<div class="sc-eb51e184-2 fAhXAe"><span class="sc-eb51e184-1 ljxVSS">${letterboxdScore}</span><span>/5</span></div><div class="sc-eb51e184-5 gDGqZp"></div>`;
      } else {
        lbxScoreElement.innerHTML =
          '<div class="sc-eb51e184-2 fAhXAe"><span class="sc-eb51e184-1 ljxVSS">N/A</span><span>/5</span></div><div class="sc-eb51e184-5 gDGqZp"></div><div class="sc-eb51e184-3 kgbSIj">N/A</div>';
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
