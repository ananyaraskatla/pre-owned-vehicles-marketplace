
import { useState } from 'react';
import './App.css';

const initialVehicles = [
  {
    id: 1,
    name: 'Hyundai Creta',
    year: 2022,
    price: 1250000,
    fuel: 'Petrol',
    km: '25,000 km',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800'
  },
  {
    id: 2,
    name: 'Honda City',
    year: 2021,
    price: 950000,
    fuel: 'Petrol',
    km: '32,000 km',
    type: 'Sedan',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'
  },
  {
    id: 3,
    name: 'Royal Enfield Classic 350',
    year: 2023,
    price: 185000,
    fuel: 'Petrol',
    km: '8,000 km',
    type: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  },
  {
    id: 4,
    name: 'Maruti Suzuki Swift',
    year: 2022,
    price: 650000,
    fuel: 'Petrol',
    km: '18,000 km',
    type: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
  }
];

function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    year: '',
    price: '',
    fuel: 'Petrol',
    km: '',
    type: 'Car'
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' ||
      (category === 'Cars' ? vehicle.type !== 'Bike' : vehicle.type === 'Bike');

    return matchesSearch && matchesCategory;
  });

  function addVehicle(e) {
    e.preventDefault();

    const newVehicle = {
      ...form,
      id: Date.now(),
      year: Number(form.year),
      price: Number(form.price),
      km: form.km + ' km',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
    };

    setVehicles([newVehicle, ...vehicles]);
    setForm({
      name: '',
      year: '',
      price: '',
      fuel: 'Petrol',
      km: '',
      type: 'Car'
    });
    setShowForm(false);
  }

  function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
  }

  return (
    <div className="app">

      <nav className="navbar">
        <h2 className="logo">Auto<span>Mart.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#vehicles">Vehicles</a>
          <a href="#about">About</a>
        </div>

        <button className="sell-btn" onClick={() => setShowForm(!showForm)}>
          + Sell Vehicle
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">YOUR TRUSTED VEHICLE MARKETPLACE</p>
          <h1>Find Your Perfect<br />Ride Today.</h1>
          <p>Explore quality pre-owned cars and bikes at affordable prices.</p>

          <a href="#vehicles" className="explore-btn">
            Explore Vehicles →
          </a>
        </div>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search by vehicle name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="filters">
          {['All', 'Cars', 'Bikes'].map(item => (
            <button
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {showForm && (
        <section className="form-section">
          <h2>List Your Vehicle</h2>

          <form onSubmit={addVehicle}>
            <input
              placeholder="Vehicle Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Manufacturing Year"
              value={form.year}
              onChange={e => setForm({...form, year: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Price in Rupees"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Kilometers Driven"
              value={form.km}
              onChange={e => setForm({...form, km: e.target.value})}
              required
            />

            <select
              value={form.type}
              onChange={e => setForm({...form, type: e.target.value})}
            >
              <option>Car</option>
              <option>Bike</option>
            </select>

            <button type="submit">Add Vehicle</button>
          </form>
        </section>
      )}

      <section className="vehicles-section" id="vehicles">
        <div className="section-heading">
          <div>
            <p className="tagline">EXPLORE OUR COLLECTION</p>
            <h2>Available Vehicles</h2>
          </div>
          <span>{filteredVehicles.length} vehicles found</span>
        </div>

        <div className="vehicle-grid">
          {filteredVehicles.map(vehicle => (
            <div className="vehicle-card" key={vehicle.id}>
              <img src={vehicle.image} alt={vehicle.name} />

              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p className="vehicle-year">{vehicle.year} Model</p>

                <div className="vehicle-details">
                  <span>{vehicle.fuel}</span>
                  <span>{vehicle.km}</span>
                </div>

                <div className="vehicle-bottom">
                  <h3>{formatPrice(vehicle.price)}</h3>
                  <span className="view-label">Pre-Owned</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <p className="empty-message">No vehicles found. Try another search.</p>
        )}
      </section>

      <section className="about-section" id="about">
        <h2>About AutoMart</h2>
        <p>
          AutoMart is a pre-owned vehicle marketplace designed to make
          buying and selling used vehicles simple and convenient.
        </p>
      </section>

      <footer>
        <h2>AutoMart.</h2>
        <p>Find your next ride with confidence.</p>
        <p>© 2026 AutoMart. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
