import React, { useEffect, useState } from "react";

const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [searchInput, setSearchInput] = useState(""); // State to manage the input value

    const handleCitySearch = (e) => {
        e.preventDefault();
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput}&days=2`;
        getWeatherDetails(API_URL); // Fetches weather details for the entered city
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value); // Updates state on input change
    };

    // Takes user's location access
    const handleLocationSearch = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
                getWeatherDetails(API_URL);

                window.innerWidth >= 768 && searchInputRef.current.focus();
            },
            () => {
                alert("Location access denied. Please enable permission to use this feature.")
            }
        )
    }

    return (
        <div className="search-section">
            <form action="#" className="search-form" onSubmit={handleCitySearch}>
                <span className="material-symbols-rounded">search</span>
                <input
                    type="text"
                    placeholder="Enter a city"
                    className="search-input"
                    // value={searchInput} // Controlled input
                    onChange={handleInputChange} // Update state on input change
                    ref={searchInputRef}
                    required
                />
            </form>
            <button className="location-button" onClick={handleLocationSearch}>
                <span className="material-symbols-rounded">my_location</span>
            </button>
        </div>
    );
};

export default SearchSection;
