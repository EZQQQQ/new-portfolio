import React, { useEffect, useState } from 'react';
import styles from './technologies.module.css';

import htmlIcon from '~/assets/html.png';
import cssIcon from '~/assets/css.png';
import jsIcon from '~/assets/javascript.png';
import reactIcon from '~/assets/react.png';
import vueIcon from '~/assets/vue.png';
import nextIcon from '~/assets/next.png';
import tailwindIcon from '~/assets/tailwind.png';
import muiIcon from '~/assets/mui.png';
import tsIcon from '~/assets/ts.png';

import expressIcon from '~/assets/express.png';
import nodeIcon from '~/assets/node-js.png';
import mongoIcon from '~/assets/mongodb.png';
import postgresIcon from '~/assets/postgresql.png';
import pythonIcon from '~/assets/python.png';
import javaIcon from '~/assets/java.png';
import cIcon from '~/assets/c.png';
import cppIcon from '~/assets/cpp.png';
import golangIcon from '~/assets/golang.png';

const frontendTech = [
  { name: 'HTML', icon: htmlIcon },
  { name: 'CSS', icon: cssIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'React', icon: reactIcon },
  { name: 'Vue.js', icon: vueIcon },
  { name: 'Next.js', icon: nextIcon },
  { name: 'TailwindCSS', icon: tailwindIcon },
  { name: 'Material UI', icon: muiIcon },
  { name: 'TypeScript', icon: tsIcon }
];

const backendTech = [
  { name: 'Express', icon: expressIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'MongoDB', icon: mongoIcon },
  { name: 'PostgreSQL', icon: postgresIcon },
  { name: 'Python', icon: pythonIcon },
  { name: 'Java', icon: javaIcon },
  { name: 'C', icon: cIcon },
  { name: 'C++', icon: cppIcon },
  { name: 'Golang', icon: golangIcon }
];

export const Technologies = ({ sectionRef }) => {
  const [hasMounted, setHasMounted] = useState(false);

  // Trigger fade‑in animations once the component mounts.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const renderTechRow = (techArray) =>
    techArray.map((tech, index) => {
      // Increase the delay for each icon.
      const delay = `${index * 0.3}s`;
      return (
        <div
          key={tech.name}
          className={styles.iconWrapper}
          style={{ animationDelay: delay }}
          data-visible={hasMounted ? 'true' : 'false'}
          // The title attribute is no longer needed for the custom tooltip below,
          // but you can keep it as a fallback if you like.
          title={tech.name}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
          />
          <span className={styles.iconName}>{tech.name}</span>
        </div>
      );
    });

  return (
    <div ref={sectionRef} id="technologies" className={styles.technologiesSection}>
      <h2 id="technologies-title" className={styles.sectionTitle}>
        Technologies I’ve Worked With
      </h2>
      <div className={styles.row}>
        {renderTechRow(frontendTech)}
      </div>
      <div className={styles.row}>
        {renderTechRow(backendTech)}
      </div>
    </div>
  );
};

export default Technologies;
