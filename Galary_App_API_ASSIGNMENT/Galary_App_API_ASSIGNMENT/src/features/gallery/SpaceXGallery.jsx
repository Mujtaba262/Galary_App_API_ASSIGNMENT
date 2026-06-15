const SPACEX_IMAGES = [
  {
    id: 'spacex-1',
    title: 'Falcon Heavy Launch',
    description: 'Spectacular Falcon Heavy liftoff with a full rocket stack.',
    thumbnail:
      'https://images2.imgbox.com/73/8d/N6G4fWnl_o.jpg',
  },
  {
    id: 'spacex-2',
    title: 'Starship First Flight',
    description: 'Starship rising from the launch pad during its first test flight.',
    thumbnail:
      'https://images.unsplash.com/photo-1614540397761-70e7008ed0af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spacex-3',
    title: 'Crew Dragon Docking',
    description: 'Crew Dragon approaches the International Space Station.',
    thumbnail:
      'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spacex-4',
    title: 'Launch Tower',
    description: 'The launch tower illuminated before a SpaceX mission.',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
]

function SpaceXGallery() {
  return (
    <div className="spacex-gallery">
      <p className="gallery-intro">
        This SpaceX gallery showcases curated launch and spacecraft imagery.
      </p>
      <section className="gallery">
        {SPACEX_IMAGES.map((image) => (
          <article key={image.id} className="card">
            <img src={image.thumbnail} alt={image.title} />
            <div className="card-body">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default SpaceXGallery
