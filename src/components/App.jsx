// create your App component here
import React, { useEffect, useState } from "react";

/**
 * App
 * - Fetches a random dog image on initial mount (useEffect).
 * - Lets the user fetch a new image on button click.
 * - Displays "Loading..." while waiting for the API response.
 *
 * API: https://dog.ceo/api/breeds/image/random
 * Response shape includes a "message" key containing the image URL.
 */
function App() {
  const [dogImageUrl, setDogImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches a random dog image and updates state.
  async function fetchDogImage() {
    setIsLoading(true);

    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      // Dog CEO API returns the image URL in data.message
      setDogImageUrl(data.message);
    } catch (error) {
      // Log the error.
      console.error("Failed to fetch dog image:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Run once when the component first renders to load an initial dog image.
  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div>
      {/* Loading message */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <img src={dogImageUrl} alt="A Random Dog" />
      )}

      {/* Button to fetch a new dog image */}
      <button onClick={fetchDogImage}>Get New Dog</button>
    </div>
  );
}

export default App;
``