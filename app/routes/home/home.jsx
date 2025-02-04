// app/routes/home/home.jsx

import React, { useEffect, useRef, useState } from 'react';
import knowledgeNodeTextureLarge from '~/assets/knowledgenode-large.jpg';
import knowledgeNodeTexturePlaceholder from '~/assets/knowledgenode-placeholder.jpg';
import knowledgeNodeTexture from '~/assets/knowledgenode.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoder WASM
export const links = () => [
  {
    rel: 'prefetch',
    href: '/draco/draco_wasm_wrapper.js',
    as: 'script',
    type: 'text/javascript',
    importance: 'low',
  },
  {
    rel: 'prefetch',
    href: '/draco/draco_decoder.wasm',
    as: 'fetch',
    type: 'application/wasm',
    importance: 'low',
  },
];

export const meta = () => {
  return baseMeta({
    title: 'Software Developer',
    description: `Portfolio of ${config.name} — a Computer Science student and software developer.`,
  });
};

export const Home = () => {
  // Use null as the initial value for refs
  const intro = useRef(null);
  const projectOne = useRef(null);
  const details = useRef(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  useEffect(() => {
    const sections = [intro, projectOne, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setVisibleSections(prev => [...prev, entry.target]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(ref => {
      if (ref.current) {
        sectionObserver.observe(ref.current);
      }
    });
    if (intro.current) indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="KnowledgeNode"
        description="Developing a Full-Stack web application to support collaborative learning for students and professors."
        buttonText="View project"
        buttonLink="/projects/knowledgenode"
        model={{
          type: 'laptop',
          alt: 'KnowledgeNode project',
          textures: [
            {
              srcSet: `${knowledgeNodeTexture} 1280w, ${knowledgeNodeTextureLarge} 2560w`,
              placeholder: knowledgeNodeTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};

export default Home;
