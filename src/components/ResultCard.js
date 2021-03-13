import React from 'react';

export default function ResultCard(props) {
  const { data, isLoading, isError } = props;
  return (
    <div>
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
    </div>
  );
}
