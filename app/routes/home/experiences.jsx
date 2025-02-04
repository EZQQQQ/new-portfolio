import React, { useEffect, useRef, useState } from 'react';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import styles from './experiences.module.css';
import GXSLogo from '~/assets/GXS.jpg';
import MBSLogo from '~/assets/MBS.jpg';
import ScantistLogo from '~/assets/Scantist.jpg';

const experiences = [
  {
    company: 'GXS Bank',
    role: 'Fullstack Software Engineer Intern',
    periods: ['Sep 2024 – Dec 2024'],
    bullets: [
      'Collaborated with key stakeholders to architect and develop customer experience (CX) and operational systems, enhancing service efficiency and user interaction.',
      'Developed the C360 API, utilizing Golang for server-side logic and React for full-stack integration, enhancing CX operations.'
    ],
    logo: GXSLogo,
  },
  {
    company: 'GXS Bank',
    role: 'Identity & Access Governance Intern',
    periods: ['Jun 2024 – Sep 2024'],
    bullets: [
      'Developed IAM policies and performance metrics using SailPoint IIQ to enhance team process controls.',
      'Led initiatives to strengthen IAM/PAM processes, ensuring regulatory compliance through continuous monitoring and anomaly reporting.',
      'Managed the governance and enforcement of IAM/PAM standards, effectively documenting key risk indicators and compliance statuses.'
    ],
    logo: GXSLogo,
  },
  {
    company: 'Marina Bay Sands Pte Ltd.',
    role: 'Cyber Threat Analyst Intern',
    periods: ['Jan 2024 – May 2024'],
    bullets: [
      'Monitored and responded to security incidents, including ingesting IOCs and performing triage and investigations with tools like Microsoft Sentinel and RSA Security Analytics.',
      'Analyzed network security events via IDS and SIEM systems, utilizing advanced tools like Wireshark for PCAP analysis and traffic evaluations.',
      'Identified and assessed malicious activities and intrusion attempts, focusing on detecting and analyzing phishing campaigns.'
    ],
    logo: MBSLogo,
  },
  {
    company: 'Scantist',
    role: 'Software Engineering Intern',
    periods: ['May 2023 – Jul 2023'],
    bullets: [
      'Collaborated on backend development via Django by establishing seamless data connectivity between the application and PostgreSQL database.',
      'Leveraged Vue3 for frontend development to implement a PDF engine, generating comprehensive SCA and SAST reports.'
    ],
    logo: ScantistLogo,
  }
];

export const Experiences = ({ sectionRef }) => {
  // An array of refs—one for each timeline item.
  const itemsRef = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleItems(prev => [...prev, index]);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    itemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section
      className={styles.experiencesSection}
      as="section"
      id="experiences"
      tabIndex={-1}
      aria-labelledby="experiences-title"
      ref={sectionRef}
    >
      <h2 id="experiences-title" className={styles.sectionTitle}>
        My Experiences
      </h2>
      <div className={styles.timeline}>
        {experiences.map((exp, index) => {
          // Even-index items are left aligned; odd-index items are right aligned.
          const alignment = index % 2 === 0 ? styles.left : styles.right;
          const connectorAlignment = index % 2 === 0 ? styles.connectorLeft : styles.connectorRight;
          const isVisible = visibleItems.includes(index.toString());
          return (
            <div 
              key={index}
              data-index={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={styles.timelineItem}
            >
              <Transition in={isVisible} timeout={500}>
                {({ visible }) => (
                  <div
                    className={`${styles.experienceBlock} ${alignment}`}
                    data-visible={visible ? 'true' : 'false'}
                    data-reveal="true"
                  >
                    <div className={styles.experienceContent}>
                      <div className={styles.header}>
                        <div className={styles.logo}>
                          <img src={exp.logo} alt={`${exp.company} logo`} />
                        </div>
                        <div className={styles.headerText}>
                          <h3 className={styles.company}>{exp.company}</h3>
                          <p className={styles.role}>{exp.role}</p>
                          <p className={styles.period}>{exp.periods.join(' | ')}</p>
                        </div>
                      </div>
                      <ul className={styles.bullets}>
                        {exp.bullets.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Transition>
              {/* Connector: spans from the block edge to the timeline dot */}
              <span className={`${styles.connector} ${connectorAlignment}`} />
              {/* Dot for the timeline item */}
              <span className={styles.dot} />
            </div>
          );
        })}
        <div className={styles.timelineLine} />
      </div>
    </Section>
  );
};

export default Experiences;
