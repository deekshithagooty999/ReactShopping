import React, { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Collections from '../components/Collections';
import Footer from '../components/Footer';
import { Gents } from '../data';
import { Ladies } from '../data';
import Wcollections from '../components/Wcollection';

const MainPage = () => {
  const [GentsFashion, setGentsFashion] = useState(Gents);
  const [LadiesFashion, setLadiesFashion] = useState(Ladies);

  return (
    <div>
      <Header />
      <Banner />
      <Collections gentsFashion={GentsFashion} />
      <Wcollections ladiesFashion={LadiesFashion} />
      <Footer />
    </div>
  );
};

export default MainPage;
