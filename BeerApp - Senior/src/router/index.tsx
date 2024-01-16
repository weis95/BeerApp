import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Offline from '../views/Offline';
import Home from '../views/Home';
import NotFound from '../views/404';
import BeerList from '../views/BeerList';
import Beer from '../views/Beer';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Article from '../components/Article';

const Router = () => (
  <BrowserRouter>
    <Menu>
      {/* 170px is just a magic number, could have calculated properly or added a ref to measure the exact px */}
      <div style={{display: 'flex', justifyContent: 'space-between', minHeight: 'calc(100vh - 170px)'}}>
        <Offline />
        {/* Removing 4 article tags seems worth it */}
        <Article>
          <Routes>
            <Route index element={<Home />} />
            <Route path='beer'>
              <Route index element={<BeerList />} />
              <Route path=':id' element={<Beer />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
        </Article>
      </div>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export default Router;
