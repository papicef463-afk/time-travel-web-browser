import { useEffect, useMemo, useState } from 'react';

const eraMetadata = {
  1995: { label: 'Early Web', vibe: 'Dial-up, portals, and splash pages', accent: '#60a5fa' },
  2000: { label: 'Dot-com Burst', vibe: 'Homepage glory days and animated navigation', accent: '#22c55e' },
  2005: { label: 'Social Web', vibe: 'Blogs, profiles, and instant messaging culture', accent: '#f59e0b' },
  2010: { label: 'Mobile Shift', vibe: 'Apps, social feeds, and streaming firsts', accent: '#f472b6' },
  2020: { label: 'Modern Net', vibe: 'Cloud platforms and creator-first experiences', accent: '#a78bfa' },
};

const curatedSites = {
  1995: [
    {
      title: 'NCSA Mosaic',
      url: 'https://www.ncsa.illinois.edu/',
      tags: ['browser', 'html', 'early-web'],
      description: 'The early browser era where the web looked more like a library than a platform.',
    },
    {
      title: 'The Internet Archive',
      url: 'https://archive.org/',
      tags: ['archive', 'history'],
      description: 'A time capsule for the cultural memory of the web.',
    },
  ],
  2000: [
    {
      title: 'Yahoo! Home',
      url: 'https://www.yahoo.com/',
      tags: ['portal', 'directory'],
      description: 'A portal era classic measuring the emotional architecture of the homepage.',
    },
    {
      title: 'GeoCities',
      url: 'https://www.geocities.ws/',
      tags: ['community', 'personal'],
      description: 'The personal web, built in colorful frames and quirky novelty sites.',
    },
  ],
  2005: [
    {
      title: 'MySpace',
      url: 'https://myspace.com/',
      tags: ['social', 'profile'],
      description: 'A social graph before social feeds were normalized into the modern feed.',
    },
    {
      title: 'YouTube',
      url: 'https://www.youtube.com/',
      tags: ['video', 'culture'],
      description: 'The shift from static pages to streaming-mediated culture.',
    },
  ],
  2010: [
    {
      title: 'Tumblr',
      url: 'https://www.tumblr.com/',
      tags: ['microblog', 'creative'],
      description: 'Short-form culture, reblogs, and the rise of social identity as aesthetic.',
    },
    {
      title: 'Pinterest',
      url: 'https://www.pinterest.com/',
      tags: ['inspiration', 'boards'],
      description: 'Visual discovery accelerated by curated networks and mood boards.',
    },
  ],
  2020: [
    {
      title: 'Discord',
      url: 'https://discord.com/',
      tags: ['community', 'live'],
      description: 'Communities are now distributed, persistent, and live by default.',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/',
      tags: ['code', 'collaboration'],
      description: 'The global platform for building software, docs, and digital culture.',
    },
  ],
};

function App() {
  const [selectedYear, setSelectedYear] = useState(2005);
  const [selectedDate, setSelectedDate] = useState('2005-04-15');
  const [flashFile, setFlashFile] = useState(null);
  const [flashUrl, setFlashUrl] = useState('');
  const [flashLoaded, setFlashLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@ruffle-rs/ruffle';
    script.async = true;
    script.onload = () => setFlashLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (flashUrl.startsWith('blob:')) URL.revokeObjectURL(flashUrl);
    };
  }, []);

  const sites = useMemo(() => curatedSites[selectedYear] ?? curatedSites[2005], [selectedYear]);

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);

    const year = new Date(value).getFullYear();
    if (year >= 1995 && year <= 2025) {
      const nearest = [1995, 2000, 2005, 2010, 2020].reduce((closest, target) => {
        return Math.abs(target - year) < Math.abs(closest - year) ? target : closest;
      }, 1995);
      setSelectedYear(nearest);
    }
  };

  const handleFlashUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (flashUrl.startsWith('blob:')) {
      URL.revokeObjectURL(flashUrl);
    }

    const url = URL.createObjectURL(file);
    setFlashFile(file);
    setFlashUrl(url);
  };

  const selectedEra = eraMetadata[selectedYear];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ChronoNet Browser</p>
          <h1>Time Travel Web Browser</h1>
        </div>
        <div className="date-panel">
          <label htmlFor="snapshot-date">Snapshot calendar</label>
          <input
            id="snapshot-date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div className="date-badge">{selectedDate}</div>
        </div>
      </header>

      <main className="content-grid">
        <aside className="sidebar">
          <h2>Timeline eras</h2>
          <div className="era-list">
            {Object.entries(eraMetadata).map(([year, info]) => (
              <button
                key={year}
                type="button"
                className={selectedYear === Number(year) ? 'era-item active' : 'era-item'}
                onClick={() => setSelectedYear(Number(year))}
                style={{ '--accent': info.accent }}
              >
                <span className="era-year">{year}</span>
                <span className="era-label">{info.label}</span>
              </button>
            ))}
          </div>

          <div className="flash-card">
            <h3>Local Flash playback</h3>
            <label className="upload-box">
              <input type="file" accept=".swf,application/x-shockwave-flash" onChange={handleFlashUpload} />
              <span>{flashFile ? 'Replace local Flash file' : 'Choose .swf file'}</span>
            </label>
            <div className="flash-status">
              <span className={flashLoaded ? 'online' : 'offline'} />
              {flashLoaded ? 'Ruffle loaded' : 'Loading emulator...'}
            </div>
          </div>
        </aside>

        <section className="browser-panel">
          <div className="browser-header">
            <div className="nav-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="browser-url">{selectedEra.label}</div>
          </div>

          <div className="browser-content">
            <div className="era-banner" style={{ '--accent': selectedEra.accent }}>
              <div>
                <p className="eyebrow">Selected era</p>
                <h2>{selectedYear}</h2>
              </div>
              <p>{selectedEra.vibe}</p>
            </div>

            <div className="site-list">
              {sites.map((site) => (
                <article key={site.title} className="site-card">
                  <div className="site-meta">
                    <h3>{site.title}</h3>
                    <span>{site.tags.join(' • ')}</span>
                  </div>
                  <p>{site.description}</p>
                  <a href={site.url} target="_blank" rel="noreferrer">
                    Visit site ↗
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="preview-panel">
          <h2>Historical preview</h2>
          {sites[0] ? (
            <iframe
              title="Historical website preview"
              src={sites[0].url}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : null}

          {flashUrl ? (
            <div className="flash-player-card">
              <h3>Flash animation player</h3>
              {flashLoaded ? (
                <ruffle-player
                  style={{ width: '100%', height: '260px', display: 'block' }}
                  src={flashUrl}
                  controls
                />
              ) : (
                <div className="flash-placeholder">Waiting for Ruffle to load...</div>
              )}
            </div>
          ) : (
            <div className="flash-player-card empty">
              <h3>Flash animation player</h3>
              <p>Select a local .swf file to preview a classic game or animation.</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
