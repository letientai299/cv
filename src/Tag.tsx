import { PropsWithChildren } from 'react';

type TimeRange = {
  from: string;
  to: string;
};

type TimePoint = string;

interface TagProps extends PropsWithChildren {
  as?: 'p' | 'h2' | 'h3' | 'div' | 'section';
  location?: string;
  title: string;
  time: TimePoint[] | TimeRange;
}

function fmtTime(time: TimePoint[] | TimeRange) {
  if ('from' in time) {
    return `${time.from} to ${time.to}`;
  }

  return time.join(', ');
}

export const Tag = (props: TagProps) => {
  const { title, time, as: As = 'p', children, location } = props;
  return (
    <>
      <As style={{ color: `var(--blue)` }} className="space-between">
        <strong>{title}</strong>
        <span aria-hidden="true" style={{ color: 'transparent' }}>
          {' — '}
        </span>
        <em>
          {location && location + ', '}
          {fmtTime(time)}
        </em>
      </As>
      {children}
    </>
  );
};
