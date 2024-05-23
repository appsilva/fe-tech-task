'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

/**
 * StoreProvider component provides the Redux store to its children components
 * using the `Provider` component from `react-redux`.
 *
 * @param children ReactNode - The child components to which the Redux store will be provided.
 * @returns JSX.Element - The rendered component with the Redux store provider.
 */
const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
