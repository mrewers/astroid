import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import style from './Card.module.scss';

interface IImageFormat {
  readonly fallback?: boolean;
  readonly url: string;
  readonly type: string;
}

interface ICardProps {
  readonly image?: {
    readonly alt?: string;
    readonly caption?: string;
    readonly credit?: string;
    readonly formats: IImageFormat[];
  };
  readonly path?: string;
  readonly title: string;
}

interface IFilteredImages {
  fallback: IImageFormat;
  sources: IImageFormat[];
}

/**
 * Filters a list of formats into the default fallback and a list of available sources.
 * @param fmts - A list of available image formats.
 */
const filterImages = (fmts: IImageFormat[]): IFilteredImages => {
  const fallback = [] as IImageFormat[];
  const remaining = [] as IImageFormat[];

  fmts.forEach(fmt => {
    if (fmt.fallback === true) {
      fallback.push(fmt);
    } else {
      remaining.push(fmt);
    }
  });

  return { fallback: fallback[0], sources: remaining };
};

/**
 * A JSX component that renders a content card.
 * @component
 */
const Card: FunctionalComponent<ICardProps> = ({ image, title }) => {
  const { fallback, sources } = image?.formats
    ? filterImages(image.formats)
    : { fallback: { url: '' }, sources: [] };

  return (
    <article className={style.card}>
      {image && (
        <figure className={style.figure}>
          <picture>
            {sources.map(src => (
              <source key={src.type} srcSet={src.url} type={`image/${src.type}`} />
            ))}
            <img alt={image.alt ?? ''} className={style.image} src={fallback.url} width="300" />
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
};

Card.displayName = 'Card';

export default Card;
