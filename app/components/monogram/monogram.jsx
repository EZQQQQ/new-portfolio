import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="29"
      viewBox="0 0 48 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
        <path d="M4.04 26.48V22.88H0.4V4.4H4.04V0.759998H15.32V4.4H19V8.4H14.92V4.8H4.44V11.64H11.72V15.6H4.44V22.48H14.92V18.84H19V22.88H15.32V26.48H4.04ZM27.4775 26.48V22.88H23.8375V15.2H27.4775V11.64H38.3575V4.8H27.8775V8.4H23.8375V0.759998H38.7575V4.4H42.4375V12H38.7575V15.6H27.8775V22.48H38.3575V18.84H42.4375V26.48H27.4775Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
