import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Card.module.scss';

interface ICardProps {
  readonly image?: {
    readonly alt?: string;
    readonly caption?: string;
    readonly credit?: string;
    readonly url: string;
  };
  readonly path?: string;
  readonly title: string;
}

/**
 * A JSX component that renders a content card.
 * @component
 */
const Card: FunctionalComponent<ICardProps> = ({ image, title }) => (
  <article className={style.card}>
    {image && (
      <figure className={style.figure}>
        <picture>
          <source srcSet={image.url} />
          <img alt={image.alt ?? ''} className={style.image} src={image.url} width="300" />
        </picture>
        {typeof image.caption === 'string' && (
          <figcaption className={style.caption}>
            <span>{image.caption}</span>
            {typeof image.credit === 'string' && <em className={style.credit}>{image.credit}</em>}
          </figcaption>
        )}
      </figure>
    )}
    <div className={style.contents}>
      <strong className={style.title}>{title}</strong>
    </div>
  </article>
);

Card.displayName = 'Card';

export default Card;
