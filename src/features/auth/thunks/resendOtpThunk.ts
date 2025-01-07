import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResendOtpPayload, ResendOtpResponse } from '../types/auth.types';
import { authApi } from '../api/authApi';
import { AuthApiError } from '@/types/error.types';

export const resendOtp = createAsyncThunk<ResendOtpResponse, ResendOtpPayload>(
  'auth/resendOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resendOtp(data);
      return response;
    } catch (error: unknown) {
      const apiError = error as AuthApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to resend OTP');
    }
  }
);