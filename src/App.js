import { useState } from 'react';
import './App.scss';

import NewsDetails from './components/NewsDetails/NewsDetails';
import NewsListing from './components/NewsListing/NewsListing';

const App = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const selectNews = news => {
    news && setSelectedNews(news);
  }

  return (
    <div className='app-container'>
      <NewsListing onSelectNews={selectNews} />
      {
        selectedNews
        ? <NewsDetails news={selectedNews} />
        : <p>No news selected</p>
      }
    </div>
  );
}

export default App;
