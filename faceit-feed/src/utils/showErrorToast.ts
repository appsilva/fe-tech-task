import { toast } from 'react-toastify';

/**
 * Displays an error toast with the provided error message.
 *
 * @param {unknown} error - The error object or message to be displayed.
 *                          If it's an instance of Error, the error message is used.
 *                          Otherwise, it is converted to a string.
 * @example
 * // Display an error toast with a custom message
 * showErrorToast(new Error('Something went wrong!'));
 *
 * @example
 * // Display an error toast with a string message
 * showErrorToast('An unknown error occurred');
 */
export const showErrorToast = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  toast(errorMessage, { type: 'error' });
};
