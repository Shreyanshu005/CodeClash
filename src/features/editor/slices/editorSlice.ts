import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { runCode as runCodeApi, submitCode as submitCodeApi } from '../api/editorApi';
import type { RunCodePayload, RunCodeResponse, SubmitCodePayload, SubmitCodeResponse } from '@/features/editor/types/editor.types';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

interface SubmissionResponse {
  submissionId: string;
  status: string;
  testCasesPassed: number;
  totalTestCases: number;
  executionTime: number;
  failedTestCase: string | null;
}

interface EditorState {
  code: string;
  language: string;
  isRunning: boolean;
  isSubmitting: boolean;
  output: string | null;
  error: string | null;
  submissionResponse: SubmissionResponse | null;
  activeTab: 'description' | 'submissions' | 'submission-details';
}

const initialState: EditorState = {
  code: '',
  language: 'cpp',
  isRunning: false,
  isSubmitting: false,
  output: null,
  error: null,
  submissionResponse: null,
  activeTab: 'description',
};

export const runCode = createAsyncThunk<
  RunCodeResponse,
  RunCodePayload,
  { rejectValue: string }
>('editor/runCode', async (data, { rejectWithValue }) => {
  try {
    const response = await runCodeApi(data);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to run code'
    );
  }
});

export const submitCode = createAsyncThunk<
  SubmitCodeResponse,
  SubmitCodePayload,
  { rejectValue: string }
>('editor/submitCode', async (data, { rejectWithValue }) => {
  try {
    const response = await submitCodeApi(data);
    console.log('Submission response:', response);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Failed to submit code'
    );
  }
});

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setOutput: (state, action: PayloadAction<string | null>) => {
      state.output = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSubmissionResponse: (state, action: PayloadAction<SubmissionResponse | null>) => {
      state.submissionResponse = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'description' | 'submissions' | 'submission-details'>) => {
      state.activeTab = action.payload;
    },
    resetEditor: (state) => {
      state.code = '';
      state.output = null;
      state.error = null;
      state.submissionResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.isRunning = true;
        state.output = null;
        state.error = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.isRunning = false;
        if (action.payload.body) {
          if (!action.payload.body.error) {
            state.output = action.payload.body.output;
            state.error = null;
          } else {
            state.error = action.payload.body.error;
            state.output = null;
          }
        }
      })
      .addCase(runCode.rejected, (state, action) => {
        state.isRunning = false;
        state.error = action.payload || 'Failed to run code';
        state.output = null;
      })
      .addCase(submitCode.pending, (state) => {
        state.isSubmitting = true;
        state.submissionResponse = null;
        state.error = null;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.isSubmitting = false;
        if (action.payload.data) {
          state.submissionResponse = {
            submissionId: action.payload.data.submissionId,
            status: action.payload.data.status,
            testCasesPassed: action.payload.data.testCasesPassed,
            totalTestCases: action.payload.data.totalTestCases,
            executionTime: action.payload.data.executionTime,
            failedTestCase: action.payload.data.failedTestCase,
          };
          state.activeTab = 'submission-details';
        }
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || 'Failed to submit code';
        state.submissionResponse = null;
      });
  },
});

export const {
  setCode,
  setLanguage,
  setIsRunning,
  setIsSubmitting,
  setOutput,
  setError,
  setSubmissionResponse,
  setActiveTab,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer; 
