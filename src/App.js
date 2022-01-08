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

  return (
    <main className='app-container'>
      <NewsListing
        onSelectNews={news => setSelectedNews(news)}
        isAnyNewsSelected={!!selectedNews}
        newsList={newsList}
      />
      {
        selectedNews
        ? <NewsDetails news={selectedNews} onClose={() => setSelectedNews(null)} />
        : <NoNewsSelected isLoading={!newsList.length && isLoading} />
      }
    </main>
  );
}

export default App;
