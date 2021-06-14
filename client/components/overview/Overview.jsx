import React, { useState, useEffect } from 'react';
import Carousel from './product/Carousel';
import Options from './product/Options';
import Description from './product/Description';
import SmallCarousel from './product/SmallCarousel';

function Overview({ product, favoriteCH, cartCH }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSku, setSelectedSku] = useState({ quantity: 0, size: 'empty', value: 0 });

  useEffect(() => {
    setSelectedStyle(product.styleList[0]);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setSelectedStyle(product.styleList[0]);
  }, [product]);

  function mainImageCH(direction) {
    // const { index } = product;
    let nextIndex = photoIndex;
    if (direction === 'right') {
      nextIndex += 1;
    } else {
      nextIndex -= 1;
    }
    if (nextIndex < 0) {
      nextIndex += selectedStyle.photos.length;
    }
    if (nextIndex >= selectedStyle.photos.length) {
      nextIndex = 0;
    }
    setPhotoIndex(nextIndex);
  }

  function sizeCH(value) {
    const skuInt = value;
    if (skuInt === 'disabled') {
      setSelectedSku({ quantity: 0, size: 'empty', value: 0 });
      return null;
    }
    selectedStyle.skus[skuInt].value = skuInt;
    setSelectedSku(selectedStyle.skus[skuInt]);
  }

  function styleCH(i) {
    setPhotoIndex(product.styleList[i].lastViewedIndex);
    setSelectedStyle(product.styleList[i]);
    setSelectedSku({ quantity: 0, size: 'empty', value: 0 });
  }

  function smallCarouselClickHandler(i) {
    setPhotoIndex(i);
    selectedStyle.lastViewedIndex = i;
  }

  const style = selectedStyle;
  const clickHandlers = {
    styleCH,
    sizeCH,
    cartCH,
    favoriteCH,
  };
  if (!isLoaded) {
    return <div>Loading overview...</div>;
  }
  return (
    <div id="overview">
      <div id="overviewContainer">
        <SmallCarousel style={style} clickHandler={smallCarouselClickHandler} />
        <Carousel style={style} photoIndex={photoIndex} clickHandler={mainImageCH} />
        <Options product={product} sku={selectedSku} style={style} chs={clickHandlers} />
      </div>
      <Description product={product} />
    </div>
  );
}

export default Overview;

// async function fetchProduct() {
//   const response = await fetch('/products?count=20');
//   const productArray = await response.json();
//   console.log(productArray);

//   const results = productArray.map(async (product) => {
//     let idQueryReponse = await fetch(`/products/${product.id}`);
//     idQueryReponse = await idQueryReponse.json();
//     product.features = idQueryReponse.features;
//     console.log(idQueryReponse);

//     let stylesQueryResponse = await fetch(`/products/${product.id}/styles`);
//     stylesQueryResponse = await stylesQueryResponse.json();
//     product.styles = stylesQueryResponse.results;
//     console.log(stylesQueryResponse);
//     return product;
//   });
//   const resolvedProducts = await Promise.all(results);
//   setProducts(resolvedProducts);
//   setError(false);
//   setIsLoaded(true);
// }
// fetchProduct();
