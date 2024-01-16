import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData, fetchFavs, fetchQuery } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [favourites, setFavourites] = useState<Array<Beer>>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  //Normally I would have used a state management library like Redux, but for this small app I decided to use sessionStorage
  const [ids, setIds] = useState<Array<string>>(JSON.parse(sessionStorage.getItem('favourites') || '[]'));
 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const newIds = checked ? [...ids, value] : ids.filter((id) => id !== value);
    setIds(newIds);
  };

  useEffect(() => {
    /* 
      To make the offline experience even better I could edit the arrays as well, so the UI would still show
      the action visually of adding & remove Favourites. UseEffect won't work for the offline mode.
    */
    sessionStorage.setItem('favourites', JSON.stringify(ids));
    
    if(refresh) setQuery("");

    if (query) {
      fetchQuery.bind(this, setBeerList, query)();
    } else {
      // Since it's caching I decided to make this simple adjustment to the API call
      fetchData.bind(this, setBeerList, refresh)();
    }

    // API fetches all beers if by_id is empty & removing all needs to trigger as well.
    ids.length ? fetchFavs.bind(this, setFavourites)(ids) : setFavourites([]);
    
    setRefresh(false);
  }, [ids, query, refresh]);

  return (
    <section>
      <main>
        <Paper>
          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <TextField value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)} label='Filter...' variant='outlined' />
              <Button variant='contained' onClick={() => setRefresh(true)}>Reload list</Button>
            </div>
            <ul className={styles.list}>
              {beerList.map((beer, index) => (
                <li key={index.toString()} className={styles.listItem}>
                  <Link component={RouterLink} to={`/beer/${beer.id}`}>
                    {beer.name}
                  </Link>
                  <Checkbox checked={ids.includes(beer.id)} value={beer.id} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
                </li>
              ))}
            </ul>
          </div>
        </Paper>

        <Paper>
          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <h3>Favourites</h3>
              <Button variant='contained' size='small' onClick={() => setIds([])}>
                Remove all items
              </Button>
            </div>
            <ul className={styles.list}>
              {favourites.map((beer, index) => (
                <li key={index.toString()} className={styles.listItem}>
                  <Link component={RouterLink} to={`/beer/${beer.id}`}>
                    {beer.name}
                  </Link>
                  <Button variant="outlined" color="error" onClick={() => setIds(ids.filter(item => item !== beer.id))}>Remove</Button>
                </li>
              ))}
              {!favourites.length && <p>No favourites</p>}
            </ul>
          </div>
        </Paper>
      </main>
    </section>
  );
};

export default Home;
