import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { ApiParams, Response } from '../../types';
import { fetchData } from './utils';
import { Autocomplete, AutocompleteChangeReason, Avatar, FormControl, Grid, InputLabel, List, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import countries from '../../staticData/countries.json';

const BeerList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Response>({beers: [], total: 0});
  const [sort, setSort] = useState<string>("name");
  const [country, setCountry] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  
  const getParams = () => {
    const options: ApiParams = {
      sort: `${sort}:asc`,
      per_page: 5,
      page,
      // better readability would be: if(country) options.by_country = country
      ...(country && {by_country: country})     
    };

    return options
  }

  const onCountryChange = (country: string | null) => {
    setPage(1)
    setCountry(country)
  }

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setData, getParams()), [sort, page, country]);  

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  
  return (
    <article>
      <section>
        <header>
          <h1>Beer List</h1>
        </header>
        <main>
          <Grid container spacing={2}>
            {/* Didn't make this responsive, since it wasn't stated in the assignment */}
            <Grid item xs={12} lg={10}>
              <Autocomplete
                onChange={(event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => onCountryChange(value)}
                disablePortal
                options={countries}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <FormControl fullWidth>
                <InputLabel>
                  Sort
                </InputLabel>
                <Select
                  value={sort}
                  label="Age"
                  onChange={(event: SelectChangeEvent) => setSort(event.target.value)}
                  fullWidth
                >
                  <MenuItem value={"name"}>Name</MenuItem>
                  <MenuItem value={"type"}>Type</MenuItem>
                  <MenuItem value={"country"}>Country</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <List>
            {data.beers.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${beer.name} | ${beer.country} | ${beer.state}`} secondary={beer.brewery_type[0].toUpperCase() + beer.brewery_type.slice(1)}/>
              </ListItemButton>
            ))}
            {data.beers.length === 0 && <p>No beers found</p>}
          </List>
          {data.beers.length !== 0 &&
            <Grid container justifyContent="flex-end">
              <Pagination page={page} count={Math.ceil(data?.total / 5)} onChange={(event: ChangeEvent<unknown>, page: number) => setPage(page)} variant="outlined" />
            </Grid>
          }
        </main>
      </section>
    </article>
  );
};

export default BeerList;
