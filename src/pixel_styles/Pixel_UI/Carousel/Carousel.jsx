/* eslint-disable react/prop-types */
import React from 'react';
import './Carousel.scss';
import { generateStarRating } from '../../../utils';

const CarouselButtons = ({ prevSlide, nextSlide }) => {
  return (
    <React.Fragment>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)',
        }}
        className="prev"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)',
        }}
        className="next"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </React.Fragment>
  );
};

const CarouselItem = ({ items, visibleItems }) => {
  const slideWidth = 100 / visibleItems;
  // console.log(items);
  const genderIcon = () => {
    switch (items.profile_id.pro_nouns) {
      case 'he/him':
        return 'fa-solid fa-mars fa-2x gender-icon-review';
      case 'she/her':
        return 'fa-solid fa-venus fa-2x gender-icon-review';
      case 'they/them':
        return 'fa-solid fa-venus-mars fa-2x gender-icon-review';
      default:
        return 'fa-solid fa-genderless fa-2x gender-icon-review';
    }
  };

  return (
    <div
      className="carousel-item"
      style={{
        flex: `0 0 ${slideWidth}%`,
      }}
    >
      <div>
        <i className={genderIcon()}></i>
      </div>
      <div className="row carousel-item-header">
        <div className="col-4">
          <img src={items.profile_id.avatar_url} alt="image goes here" />
        </div>
        <div className="col-5 rating">
          <h3>{items.profile_id.username}</h3>
          <span>Rating: </span>
          <span>{generateStarRating(items.rating)}</span>
        </div>
      </div>
      <section className="carousel-item-content">
        <p className="review">{items.content}</p>
      </section>
    </div>
  );
};

const Carousel = ({ visibleItems, data }) => {
  const items = data;
  const [current, setCurrent] = React.useState(0);

  const nextSlide = () => {
    setCurrent((prev) => {
      const next = prev + 1;
      if (next > items.length - visibleItems) {
        return 0;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return items.length - visibleItems;
      }
      return next;
    });
  };
  const slideWidth = 100 / visibleItems;

  return (
    <div
      className="carousel"
      style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          //how can i scale width to be responsive?
          width: `80%`,
          flexWrap: 'nowrap',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${current * slideWidth}%)`,
        }}
      >
        {items.map((item, index) => (
          <CarouselItem items={item} key={index} visibleItems={visibleItems} />
        ))}
      </div>
      <CarouselButtons prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  );
};
export { Carousel };
//! Carousel takes in two props, visibleItems and data
//? visibleItems is the number of items you want to be visible at a time
//? data is an array of objects that contain the data you want to display

//! Carousel classes for reference
//? #carousel
//?   .carousel-item
//?     .carousel-item-header
//?      fill with your own content
//?     .carousel-item-content
//?      fill with your own content
