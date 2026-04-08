import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Image } from '~/components/image';
import styles from './embla-carousel.module.css';

export const EmblaCarousel = ({ images, placeholder }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                srcSet={image.srcSet}
                placeholder={index === 0 ? placeholder : image.placeholder}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, 940px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <button
          className={`${styles.embla__button} ${styles['embla__button--prev']}`}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.embla__dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.embla__dot}${index === selectedIndex ? ` ${styles['embla__dot--selected']}` : ''}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={`${styles.embla__button} ${styles['embla__button--next']}`}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
