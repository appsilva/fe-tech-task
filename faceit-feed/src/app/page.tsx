'use client';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/LoadingSpinner';

/**
 * Asynchronously loads the `Feed` component using `next/dynamic`.
 * Shows a loading spinner while the component is being loaded.
 * In this case, since this component is being called on the home page,
 * and there is only another page in the app, it will only be usefull if
 * the user lands directly on the detail page. But serves as a demonstration.
 */
const DynamicFeed = dynamic(
  () => import('../components/Feed').then((mod) => mod.Feed),
  {
    loading: () => <LoadingSpinner />,
  }
);

const MainContainer = styled.main`
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

/**
 * Home page component.
 *
 * @returns JSX.Element - Rendered component with the main container and dynamic feed.
 */
export default function Home() {
  return (
    <MainContainer>
      <DynamicFeed />
    </MainContainer>
  );
}
