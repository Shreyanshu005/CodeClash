'use client';

import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LabelButton from '../../../components/ui/LabelButton';
import CustomInput from '../../../components/CustomInput';
import { AuthFormSchema } from '@/lib/schemas/authSchema';
import { toast } from '@/providers/toast-config';
import CustomCheckbox from '@/components/ui/CustomCheckbox';
import Link from 'next/link';
import PasswordStrengthChecker from './PasswordStrengthChecker';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { register } from '@/features/auth/thunks/registerThunk';
import { useRouter } from 'next/navigation';
import { login } from '@/features/auth/thunks/loginThunk';
import { resetPassword } from '@/features/auth/thunks/resetPasswordThunk';
import { resetPasswordWithToken } from '@/features/auth/thunks/resetPasswordWithTokenThunk';
import { checkEmail } from '@/features/auth/thunks/checkEmailThunk';
import { ApiError } from '@/types/error.types';
import GetStartedForm from './forms/GetStartedForm';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import ResetPasswordForm from './forms/ResetPasswordForm';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import { 
  handleResetPasswordError, 
  handleLoginError, 
  handleRegisterError,
  handleCommonErrors 
} from '../handlers/errorHandlers'
import { 
  handleResetPassword,
  handleLogin,
  handleRegister,
  handleForgotPassword,
  handleGetStarted
} from '../handlers/submitHandlers'

interface AuthFormProps {
  type: string;
  token?: string;
  onResetLinkSent?: (email: string) => void;
}

const AuthForm = ({
  type,
  token,
  onResetLinkSent
}: AuthFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: type === 'reset-password' ? 'test@example.com' : '',
      password: type === 'forgot-password' ? undefined : "",
      username: "",
      Newpassword: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
    context: type,
  });

  useEffect(() => {
    if ((type === 'login' || type === 'register')) {
      const savedEmail = localStorage.getItem('enteredEmail');
      if (savedEmail) {
        form.setValue('email', savedEmail);
        localStorage.removeItem('enteredEmail');
      }
    }
  }, [type, form]);

  useEffect(() => {
    if (type === 'login') {
      const rememberedEmail = sessionStorage.getItem('userEmail');
      const rememberMe = sessionStorage.getItem('rememberMe');

      if (rememberedEmail && rememberMe) {
        form.setValue('email', rememberedEmail);
        form.setValue('rememberMe', true);
      }
    }
  }, [type, form]);

  const onSubmit = async (values: z.infer<typeof AuthFormSchema>) => {
    try {
      if (type === 'reset-password') {
        await handleResetPassword({ values, token, dispatch, router, setIsSubmitting, form })
      } else if (type === 'login') {
        await handleLogin({ values, dispatch, router, form, setIsSubmitting })
      } else if (type === 'register') {
        await handleRegister({ values, dispatch, router, setIsSubmitting })
      } else if (type === 'forgot-password') {
        await handleForgotPassword({ 
          values, 
          dispatch, 
          setIsSubmitting, 
          setResetLinkSent, 
          setTimeLeft, 
          onResetLinkSent 
        })
      } else if (type === 'get-started') {
        await handleGetStarted({ values, dispatch, router, setIsSubmitting })
      }
    } catch (error: unknown) {
      const apiError = error as ApiError
      toast.error(
        'Error',
        apiError.response?.data?.message || apiError.message || 'Something went wrong'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors: FieldErrors<z.infer<typeof AuthFormSchema>>) => {
    if (type === 'reset-password' && handleResetPasswordError({ errors, form })) {
      return
    }

    if (type === 'login' && handleLoginError({ errors, form })) {
      return
    }

    if (type === 'register' && handleRegisterError({ errors, form })) {
      return
    }

    if (type === 'login' && (!form.getValues('email') || !form.getValues('password'))) {
      toast.error('Fields Cant be Empty', 'Please fill in all required fields')
      return
    }

    if (type === 'register' && (!form.getValues('email') || !form.getValues('username') || !form.getValues('password'))) {
      toast.error('Fields Cant be Empty', 'Please fill in all required fields')
      return
    }

    if (type === 'forgot-password' && !form.getValues('email')) {
      toast.error('Fields Cant be Empty', 'Please fill in all required fields')
      return
    }

    handleCommonErrors({ errors, form })
  }

  return (
    <section className="w-full mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6 sm:space-y-8"
        >
          {type === 'get-started' && (
            <GetStartedForm
              control={form.control}
              isSubmitting={isSubmitting}
            />
          )}

          {type === 'login' && (
            <LoginForm
              control={form.control}
              isSubmitting={isSubmitting}
            />
          )}

          {type === 'register' && (
            <RegisterForm
              control={form.control}
              isSubmitting={isSubmitting} 
              password={''} 
              />
          )}

          {type === 'reset-password' && (
            <ResetPasswordForm
              control={form.control}
              isSubmitting={isSubmitting} 
              newPassword={''}            
              />
          )}

          {type === 'forgot-password' && (
            <ForgotPasswordForm
              control={form.control}
              isSubmitting={isSubmitting}
              resetLinkSent={resetLinkSent}
              timeLeft={timeLeft}
            />
          )}
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;