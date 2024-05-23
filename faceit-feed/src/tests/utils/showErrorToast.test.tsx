import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { showErrorToast } from '@/utils';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('showErrorToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error toast with the error message from an Error object', async () => {
    const errorMessage = 'Something went wrong!';
    const error = new Error(errorMessage);

    showErrorToast(error);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(errorMessage, { type: 'error' });
    });
  });

  it('should display an error toast with a string error message', async () => {
    const errorMessage = 'An unknown error occurred';

    showErrorToast(errorMessage);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(errorMessage, { type: 'error' });
    });
  });

  it('should display an error toast with a string representation of a non-Error object', async () => {
    const errorObject = { message: 'This is an error object' };

    showErrorToast(errorObject);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(String(errorObject), {
        type: 'error',
      });
    });
  });

  it('should display an error toast with "undefined" if no error message is provided', async () => {
    showErrorToast(undefined);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('undefined', { type: 'error' });
    });
  });
});
