import React, { useContext, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { Store } from "../store";

const EpisodesList = lazy(() => import("../components/EpisodeList"));

const ShowPage = () => {
  const location = useLocation();

  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const search = await fetch(
      `https://api.tvmaze.com/search/shows?q=${location.state.query}`
    );
    const searchJson = await search.json();

    console.log(searchJson[0].show.name);

    let url = `https://api.tvmaze.com/singlesearch/shows?q=${searchJson[0].show.name}&embed=episodes`;
    url = url.replace(/\s+/g, "%20").toLowerCase();
    console.log(url);

    const data = await fetch(url);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };

  const toggleFavAction = (episode) => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode,
    };
    if (episodeInFavourites) {
      const favouritesWithoutEpisode = state.favourites.filter(
        (fav) => fav.id !== episode.id
      );
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favouritesWithoutEpisode,
      };
    }
    return dispatch(dispatchObj);
  };

  const props = {
    episodes: state.episodes,
    toggleFavAction: toggleFavAction,
    favourites: state.favourites,
  };
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <header className="header">
          <div>
            <h1>Rick and Morty</h1>
            <p>Pick your favourite episodes</p>
          </div>
          <div>Favourite(s) {state.favourites.length}</div>
        </header>
        <div className="header">
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes</p>
        </div>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </Suspense>
    </div>
  );
};

export default ShowPage;
