import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; 
import Footer from './Footer';

function App() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch shows');
      })
      .then(data => {
        setShows(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const reloadShows = () => {
    setIsLoading(true);
    setError(null);
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch shows');
      })
      .then(data => {
        setShows(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-md mx-auto p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>Loading...</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-md mx-auto p-4">
        <p>Error: {error}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reloadShows}>Retry</button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          opacity: 0.7,
          
        }}
      ></div>
      <div className="relative z-10">
      <Navbar /> {/* Include the Navbar component */}
      <div className=" mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">TV Shows</h1>
        <ul>
          {shows.map(showData => (
            <li key={showData.show.id} className="mb-8">
              <h2 className="text-xl font-bold mb-2">{showData.show.name}</h2>
              <p className="mb-4" dangerouslySetInnerHTML={{ __html: showData.show.summary }} />
              {showData.show.image && <img className="w-medium mx-auto mb-4" src={showData.show.image.medium} alt={showData.show.name} />}
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block mx-auto transition duration-300 ease-in-out hover:text-black hover:font-semibold">Click Me!</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer /> 
</div>
    </div>
  );
}

export default App;
