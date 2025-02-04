import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Experiences',
    pathname: '/#experiences',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ezekiel-loh-a10184217/',
    icon: 'linkedin'
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github'
  }
];
