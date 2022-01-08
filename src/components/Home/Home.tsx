import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import Card from '../Card/Card';
import style from './Home.module.scss';

const sections = [
  {
    pages: [
      {
        image: {
          alt: 'A dark, twisting tree branch in front of a plain white background.',
          caption:
            'A custom parser that converts JavaScript snippets into a structural representation of the code.',
          credit: 'Photo by Ron Whitaker on Unsplash.',
          url: '/static/branch.jpg',
        },
        name: 'Abstract Syntax Tree',
        path: '/ast',
      },
      {
        image: {
          alt: 'A chalkboard covered in mathematical notations.',
          caption: 'Visualizations illustrating common programming algorithms.',
          credit: 'Photo by Dan-Cristian Pădureț on Unsplash.',
          url: '/static/algos.jpg',
        },
        name: 'Algorithms',
        path: '/algos',
      },
    ],
    title: 'Work',
  },
  {
    pages: [
      {
        image: {
          alt: 'A deck of playing cards haphazardly spread out face up.',
          caption: "Tools to help understand playing strategies for Texas Hold'em poker.",
          credit: 'Photo by Amanda Jones on Unsplash.',
          url: '/static/poker.jpg',
        },
        name: 'Poker',
        path: '/poker',
      },
    ],
    title: 'Play',
  },
];

/**
 * A JSX component that renders the Astroid homepage.
 * @component
 */
const Home: FunctionalComponent = () => (
  <div className={style.container}>
    {sections.map(section => (
      <section key={section.title} className={style.section}>
        <h2 className={style.title}>{section.title}</h2>
        <div className={style.cards}>
          {section.pages.map(page => (
            <a key={page.name} href={page.path}>
              <Card image={page.image} title={page.name} />
            </a>
          ))}
        </div>
      </section>
    ))}
  </div>
);

Home.displayName = 'Page - Home';

export default Home;
