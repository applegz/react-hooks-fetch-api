import React, { useState, useEffect } from 'react';

export default function APIClient(props) {
  const [query, setQuery] = useState('');

  return (
    <div>
      Testing for APIClient.
      <form
        onSubmit={(event) => {
          props.doFetch(
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
    </div>
  );
}
