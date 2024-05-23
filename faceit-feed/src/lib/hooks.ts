import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

/**
 * TypeScript-specific versions of useDispatch and useSelector.
 * These hooks provide type safety and improve development experience when using Redux with TypeScript,
 * ensuring that the Redux store, actions, and state are correctly typed throughout the application.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
