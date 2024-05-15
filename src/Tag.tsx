import { PropsWithChildren } from 'react';

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
      <As
        style={{
          color: `var(--blue)`,
        }}
        className="space-between"
      >
        <strong style={{ fontWeight: 'bolder' }}>{title}</strong>
        <span style={{ color: 'transparent', height: 0 }}>{' — '}</span>
        <em>
          {location && location + ', '}
          {fmtTime(time)}
        </em>
      </As>
      {children}
    </>
  );
};

type TimeRange = {
  from: string;
  to: string;
};

type TimePoint = string;

interface TagProps extends PropsWithChildren {
  as?: keyof HTMLElementTagNameMap;
  location?: string;
  title: string;
  time: TimePoint[] | TimeRange;
}
