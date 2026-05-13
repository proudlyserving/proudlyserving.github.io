(function () {
  const dataEl = document.getElementById('quotes-data');
  if (!dataEl) return;

  const quotes = JSON.parse(dataEl.textContent);
  const container = document.getElementById('quotes-container');
  const isHome = container.dataset.layout === 'home';

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderQuotes(list, showDivider) {
    return list.map((q, i) => `
      <div class="col-12 col-sm-6 d-flex align-items-stretch">
        <div class="card mb-3 mx-1 border-0 px-1${showDivider && i < list.length - 1 ? ' border-bottom' : ''}">
          <div class="card-body">
            <p class="text-center m-0 p-0">
              <svg class="icon icon-xl" aria-hidden="true"><use href="#icon-quote-left"></use></svg>
            </p>
            <p class="fs-5 my-1 py-1">${esc(q.quote)}</p>
            <p class="text-center m-0 p-0">
              <svg class="icon icon-xl" aria-hidden="true"><use href="#icon-quote-right"></use></svg>
            </p>
            <p class="text-center mt-3">
              ${esc(q.name)}
              ${q.title ? `<span class="small"><br>${esc(q.title)}</span>` : ''}
              ${q.organization ? `<span class="small"><br>${esc(q.organization)}</span>` : ''}
            </p>
          </div>
        </div>
      </div>
    `).join('');
  }

  const selected = isHome
    ? [...quotes].sort(() => Math.random() - 0.5).slice(0, 2)
    : quotes;

  container.innerHTML = renderQuotes(selected, !isHome);
}());
