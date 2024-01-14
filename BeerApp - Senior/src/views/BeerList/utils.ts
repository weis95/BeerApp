import { getBeerList, getBeerMetaData } from '../../api';
import { ApiParams, Response } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Response) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      const meta = await getBeerMetaData(params);
      setData({beers: response.data, total: meta.data.total});
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
