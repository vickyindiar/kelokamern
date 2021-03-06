import React from 'react';
import Header from '../template/Header';
import '../../styles/sass/reset.scss';
const Home = () => {

    return (
      <React.Fragment>
        <div className="content-container home">
        <Header />
        <div className="content-home">
          Ini dashboard
        </div>

        </div>
      </React.Fragment>
    )
}

const areEqual = (p, n) => true;
export default React.memo(Home, areEqual);
