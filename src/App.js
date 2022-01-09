import { useState } from 'react';

import NewsDetails from './components/NewsDetails/NewsDetails';
import NewsListing from './components/NewsListing/NewsListing';
import NoNewsSelected from './components/NoNewsSelected/NoNewsSelected';
import './App.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <main className='app-container'>
      <NewsListing
        onSelectNews={news => setSelectedNews(news)}
        isAnyNewsSelected={!!selectedNews}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onNewsLoaded={setNewsLoaded}
      />
      {
        selectedNews
        ? <NewsDetails news={selectedNews} onClose={() => setSelectedNews(null)} />
        : <NoNewsSelected isLoading={!newsLoaded && isLoading} />
      }
    </main>
  );
}

export default App;
