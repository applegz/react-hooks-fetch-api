import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY =
  'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            term: 'parking',
            // sort_by: 'rating',
          },
        });
        let arr = result.data.businesses;
        arr.sort((a, b) => a.rating - b.rating);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

function App() {
  const [query, setQuery] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=seattle`,
    {
      businesses: [],
    }
  );

  return (
    <div className="App">
      <body>
        <form
          onSubmit={(event) => {
            doFetch(
              `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${query}`
            );
            event.preventDefault();
          }}
        >
          <label htmlFor="location">
            Find lowest rated parking space in your local area
          </label>
          <input
            type="text"
            placeholder="Seattle"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
          <input type="submit" value="Submit" disabled={!query}></input>
        </form>

        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="container">
            {data.businesses.map((item) => (
              <div key={item.id} className="item">
                <a href={item.url}>{item.name}</a>
                <p>{item.location.display_address[0]}</p>
                <p>{item.location.display_address[1]}</p>
                <p>rating: {item.rating}</p>
                <p>reviews: {item.review_count}</p>
                <p>
                  score:{' '}
                  {Math.round(
                    ((item.review_count * item.rating) /
                      (item.review_count + 1)) *
                      100
                  ) / 100}
                </p>
                <img src={item.image_url} alt={item.alias}></img>
              </div>
            ))}
          </div>
        )}
      </body>
    </div>
  );
}

export default App;
