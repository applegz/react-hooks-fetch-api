import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import APIClient from './components/APIClient';
import ResultCard from './components/ResultCard';

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
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=seattle`,
    {
      businesses: [],
    }
  );

  return (
    <div className="App">
      <body>
        <APIClient doFetch={doFetch} />
        <ResultCard data={data} isLoading={isLoading} isError={isError} />
      </body>
    </div>
  );
}

export default App;
