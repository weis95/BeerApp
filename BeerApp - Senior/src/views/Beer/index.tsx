import { useEffect, useState } from 'react';
import { Beer as BeerType } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { capitalizeFirstLetter } from '../../utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<BeerType>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <section>
      <header>
        <h1>{beer?.name}</h1>
      </header>
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <span>
              <b>Type: </b> {beer && capitalizeFirstLetter(beer?.brewery_type)}
            </span>
          </Grid>
          <Grid item xs={12} lg={6}>
            <span>
              <b>Country: </b> {beer?.country}
            </span>
          </Grid>
          <Grid item xs={12} lg={6}>
            <span>
              <b>City: </b> {beer?.city}
            </span>
          </Grid>
          <Grid item xs={12} lg={6}>
            <span>
              <b>Website: </b> <a href={beer?.website_url} target='_blank' rel="noreferrer"> {beer?.website_url} </a>
            </span>
          </Grid>
        </Grid>
      </main>
    </section>
  );
};

export default Beer;
