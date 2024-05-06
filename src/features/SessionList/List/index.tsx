import { createStyles } from 'antd-style';
import { isEqual } from 'lodash-es';
import { memo } from 'react';
import LazyLoad from 'react-lazy-load';

import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

import SessionItem from './Item';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  filter?: string;
}

const SessionList = memo<SessionListProps>(({ filter }) => {
  const sessionListIds = useSessionStore(
    (s) => sessionSelectors.filterSessionListIds(s, filter),
    isEqual,
  );
  const [switchSession] = useSessionStore((s) => [s.switchSession]);
  const { styles } = useStyles();

  return sessionListIds.map((id) => (
    <LazyLoad className={styles} key={id}>
      <SessionItem
        id={id}
        onClick={() => {
          switchSession(id);
        }}
      />
    </LazyLoad>
  ));
});

export default SessionList;
