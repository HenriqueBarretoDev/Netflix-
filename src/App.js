import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './Components/MovieRow/MovieRow'
import FeaturedMovie from './Components/Featured/FeaturedMovie';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState({});
  const [blackHeader, setBlackHeade] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      // acessando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //acesso ao filme em destaque
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo);

    }

    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeade(true);
      } else {
        setBlackHeade(false)
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {Object.keys(featuredData).length && <FeaturedMovie item={featuredData} />}
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando"></img>
        </div>
      }
    </div>
  );
}
