import { getRandomBeerList, searchBeerList, searchFavs } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, clear?: boolean) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(clear);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchFavs = (setData: (data: Array<Beer>) => void, ids: string[]) => {
  (async () => {
    try {
      const { data } = await searchFavs(ids);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchQuery = (setData: (data: Array<Beer>) => void, query: string) => {
  (async () => {
    try {
      const { data } = await searchBeerList(query, true);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
}

export { fetchData, fetchFavs, fetchQuery };
