import { useState } from 'react';

import NewsDetails from './components/NewsDetails/NewsDetails';
import NewsListing from './components/NewsListing/NewsListing';
import NoNewsSelected from './components/NoNewsSelected/NoNewsSelected';
import { useGetNews } from './hooks';
import './App.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, newsListError] = useGetNews(setIsLoading);
  const [selectedNews, setSelectedNews] = useState(null);

  const selectNews = news => {
    news && setSelectedNews(news);
  }

  return (
    <div className='app-container'>
      <NewsListing onSelectNews={selectNews} isAnyNewsSelected={!!selectedNews} newsList={newsList} />
      {
        selectedNews
        ? <NewsDetails news={selectedNews} onClose={() => setSelectedNews(null)} />
        : <NoNewsSelected isLoading={!newsList.length && isLoading} />
      }
    </div>
  );
}

export default App;
