import React from 'react';


const Wcollections = ({ ladiesFashion }) => {
  const { title, image1, image2, image3, image4 } = ladiesFashion;

  return (
    <div className="collections-container">
      <h2 className="collections-title">{title}</h2>
      <div className="collections-images">
        <img src={image1} alt={`${title} 1`} />
        <img src={image2} alt={`${title} 2`} />
        <img src={image3} alt={`${title} 3`} />
        <img src={image4} alt={`${title} 4`} />
      </div>
    </div>
  );
};

export default Wcollections;
