import { useState } from 'react'
import NasaGallery from './NasaGallery.jsx'
import SpaceXGallery from './SpaceXGallery.jsx'
import './gallery.css'

const TABS = [
  { key: 'nasa', label: 'NASA Search' },
  { key: 'spacex', label: 'SpaceX Gallery' },
]

function GalleryApp() {
  const [activeTab, setActiveTab] = useState('nasa')

  return (
    <main className="gallery-app">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">Space Image Explorer</p>
          <h1>NASA & SpaceX Galleries</h1>
          <p className="subtitle">
            Search NASA images or browse a dedicated SpaceX launch gallery.
          </p>
        </div>

        <nav className="tab-list" aria-label="Gallery tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="gallery-section">
        {activeTab === 'nasa' ? <NasaGallery /> : <SpaceXGallery />}
      </section>
    </main>
  )
}

export default GalleryApp
