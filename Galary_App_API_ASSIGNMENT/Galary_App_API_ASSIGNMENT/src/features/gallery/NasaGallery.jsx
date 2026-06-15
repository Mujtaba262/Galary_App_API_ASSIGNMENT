import { useMemo, useState } from 'react'

const IMAGES_PER_PAGE = 20

function NasaGallery() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(null)
  const [noResults, setNoResults] = useState(false)
  const [error, setError] = useState('')

  const totalPages = useMemo(() => {
    if (!totalHits) return null
    return Math.ceil(totalHits / IMAGES_PER_PAGE)
  }, [totalHits])

  const fetchImages = async (searchQuery, pageNumber = 1) => {
    if (!searchQuery.trim()) {
      setImages([])
      setNoResults(false)
      return
    }

    setLoading(true)
    setError('')
    setNoResults(false)

    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          searchQuery,
        )}&media_type=image&page=${pageNumber}`,
      )
      if (!response.ok) {
        throw new Error(`API error ${response.status}`)
      }

      const data = await response.json()
      const items = data.collection?.items || []
      const metadata = data.collection?.metadata
      const results = items.slice(0, IMAGES_PER_PAGE).map((item) => {
        const info = item.data?.[0] || {}
        return {
          id: info.nasa_id || info.title || item.data?.[0]?.nasa_id || item?.links?.[0]?.href,
          title: info.title || 'Untitled',
          description: info.description || 'No description available.',
          thumbnail: item.links?.[0]?.href || 'https://via.placeholder.com/320x240?text=No+image',
        }
      })

      setImages(results)
      setTotalHits(metadata?.total_hits ?? null)
      setPage(pageNumber)
      setNoResults(results.length === 0)
    } catch (fetchError) {
      setError('Unable to fetch NASA images. Please try again later.')
      setImages([])
      setTotalHits(null)
      setPage(1)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => fetchImages(query, 1)

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      fetchImages(query, page - 1)
    }
  }

  const handleNext = () => {
    const nextPage = page + 1
    if (!totalPages || nextPage <= totalPages) {
      fetchImages(query, nextPage)
    }
  }

  return (
    <div className="search-gallery">
      <div className="search-panel">
        <label htmlFor="nasa-search" className="visually-hidden">
          Search NASA images
        </label>
        <input
          id="nasa-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search NASA images..."
          disabled={loading}
        />
        <button
          type="button"
          className="search-btn"
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          aria-label="Search NASA images"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {error && <div className="status-message error">{error}</div>}
      {!loading && !error && noResults && (
        <div className="status-message empty">
          No NASA images found for “{query}”.
        </div>
      )}
      {loading && <div className="status-message loading">Loading NASA images…</div>}

      <section className="gallery">
        {images.map((image) => (
          <article key={image.id} className="card">
            <img src={image.thumbnail} alt={image.title} />
            <div className="card-body">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </article>
        ))}
      </section>

      {images.length > 0 && (
        <footer className="pagination">
          <button type="button" onClick={handlePrevious} disabled={loading || page <= 1}>
            Previous
          </button>
          <div className="page-info">
            Page {page}
            {totalPages ? ` of ${totalPages}` : ''}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={loading || (totalPages ? page >= totalPages : images.length < IMAGES_PER_PAGE)}
          >
            Next
          </button>
        </footer>
      )}
    </div>
  )
}

export default NasaGallery
