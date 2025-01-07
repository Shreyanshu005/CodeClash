'use client';

import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LabelButton from './ui/LabelButton';
import CustomInput from './CustomInput';
import { AuthFormSchema } from '@/lib/utils';
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
      email: "",
      password: type === 'forgot-password' ? undefined : "",
      username: "",
      Newpassword: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange"
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

  const onSubmit = async (values: z.infer<typeof AuthFormSchema>) => {
    try {
      if (type === 'reset-password') {
        if (!token) {
          toast.error('Invalid Token', 'Password reset link is invalid');
          return;
        }

        setIsSubmitting(true);
        if (!values.Newpassword) {
          toast.error('Password Required', 'Please enter a new password');
          return;
        }

        if (values.Newpassword !== values.confirmPassword) {
          toast.error('Password Mismatch', 'Passwords do not match');
          return;
        }

        const result = await dispatch(resetPasswordWithToken({
          token,
          password: values.Newpassword
        })).unwrap();
  
        if (result.success) {
          toast.success(
            'Password Reset Successful',
            'You can now login with your new password'
          );
          router.push('/login');
        }
      }
      // Rest of the existing onSubmit logic remains the same
      else if (type === 'login') {
        if (!values.email || !values.password) {
          toast.error(
            'Required Fields',
            'Please fill in all required fields'
          );
          return;
        }

        setIsSubmitting(true);
        const loginPayload = {
          email: values.email,
          password: values.password,
        };

        const result = await dispatch(login(loginPayload)).unwrap();

        if (result.success) {
          toast.success(
            'Login Successful',
            'Welcome back!'
          );
          router.push('/dashboard');
        }
      } else if (type === 'register') {
        if (!values.email && !values.username && !values.password) {
          toast.error(
            'Required Fields',
            'Please fill in all required fields'
          );
          return;
        }

        if (!values.username) {
          toast.error('Username Required', 'Please enter a username');
          return;
        }

        if (!values.email) {
          toast.error('Email Required', 'Please enter an email address');
          return;
        }

        if (!values.password) {
          toast.error('Password Required', 'Please enter a password');
          return;
        }

        setIsSubmitting(true);

        const registrationPayload = {
          email: values.email,
          username: values.username,
          password: values.password,
        };

        const result = await dispatch(register(registrationPayload)).unwrap();
        if (result.success) {
          localStorage.setItem('registrationEmail', values.email);
          
          document.cookie = `registrationEmail=${values.email}; path=/;`;
          document.cookie = `isRegistering=true; path=/;`;
          
          toast.success(
            'Registration Successful',
            'Please verify your email'
          );
          router.push('/verify');
        }
      } else if (type === 'forgot-password') {
        if (!values.email) {
          toast.error('Required Field', 'Please enter your email address');
          return;
        }

        setIsSubmitting(true);
        console.log('Sending reset password request for:', values.email);

        const result = await dispatch(resetPassword({ email: values.email })).unwrap();

        console.log('Reset password response:', result);

        if (result.success) {
          setResetLinkSent(true);
          setTimeLeft(30); 
          onResetLinkSent?.(values.email);
        }
      } else if (type === 'get-started') {
        if (!values.email) {
          toast.error('Required Field', 'Please enter your email address');
          return;
        }

        setIsSubmitting(true);
        const result = await dispatch(checkEmail({ email: values.email })).unwrap();

        if (result.success) {
          localStorage.setItem('enteredEmail', values.email); 
          switch(result.data?.flow) {
            case 1: 
              router.push('/register');
              break;
            case 2:
              router.push('/login');
              break;
            case 3:
              router.push('/login');
              break;
          }
        }
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        'Error',
        apiError.response?.data?.message || apiError.message || 'Something went wrong'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: FieldErrors<z.infer<typeof AuthFormSchema>>) => {
    if (type === 'reset-password') {
      if (!form.getValues('Newpassword') || !form.getValues('confirmPassword')) {
        toast.error(
          'Required Fields',
          'Please fill in both password fields'
        );
        return;
      }

      if (form.getValues('Newpassword') !== form.getValues('confirmPassword')) {
        toast.error(
          'Password Mismatch',
          'Passwords do not match'
        );
        return;
      }

      if (errors.Newpassword) {
        toast.error(
          'Invalid Password',
          'Password must meet all requirements'
        );
        return;
      }
    }

    // Rest of the existing onError logic remains the same
    if (type === 'login') {
      if (errors.password) {
        toast.error(
          'Invalid Password',
          'Password must meet all requirements'
        );
        return;
      }
      if (!form.getValues('email') && !form.getValues('password')) {
        toast.error(
          'Required Fields',
          'Please fill in all required fields'
        );
        return;
      }
      if (!form.getValues('password')) {
        toast.error(
          'Required Fields',
          'Please fill in all required fields'
        );
        return;
      }
      if (errors.username) {
        toast.error(
          'Invalid Username',
          'Username must be at least 3 characters'
        );
        return;
      }
    }

    if (type === 'register') {
      if (!form.getValues('email') && !form.getValues('username') && !form.getValues('password')) {
        toast.error(
          'Required Fields',
          'Please fill in all required fields'
        );
        return;
      }

      if (errors.email) {
        toast.error(
          'Invalid Email',
          errors.email.message || 'Please enter a valid email address'
        );
        return;
      }

      if (!form.getValues('terms')) {
        toast.error(
          'Terms Required',
          'Please accept the Terms and Conditions to continue'
        );
        return;
      }

      if (errors.username) {
        toast.error(
          'Invalid Username',
          'Username must be at least 3 characters'
        );
        return;
      }

      if (errors.password) {
        toast.error(
          'Invalid Password',
          'Password must meet all requirements'
        );
        return;
      }
    }

    if (type === 'login' && (!form.getValues('email') || !form.getValues('password'))) {
      toast.error(
        'Fields Cant be Empty',
        'Please fill in all required fields'
      );
      return;
    }

    if (type === 'register' && (!form.getValues('email') || !form.getValues('username') || !form.getValues('password'))) {
      toast.error(
        'Fields Cant be Empty',
        'Please fill in all required fields'
      );
      return;
    }

    if (type === 'forgot-password' && !form.getValues('email')) {
      toast.error(
        'Fields Cant be Empty',
        'Please fill in all required fields'
      );
      return;
    }

    if (errors.email) {
      toast.error(
        'Invalid email',
        errors.email.message || 'Enter a valid email address.'
      );
      return;
    }
    if (errors.username) {
      toast.error(
        'Invalid Username',
        errors.username.message || 'Username is required.'
      );
      return;
    }
    if (errors.password) {
      toast.error(
        'Invalid Password',
        'Password must be at least 8 characters, include uppercase, number, and special character'
      );
      return;
    }
  };

  return (
    <section className="w-full mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Existing form sections remain the same */}
          {type === 'get-started' && (
            <>
              <CustomInput
                name="email"
                label="Email"
                control={form.control}
                placeholder=""
              />
              <LabelButton
                type="submit"
                variant="filled"
                disabled={isSubmitting}
              >
                Get Started
              </LabelButton>
            </>
          )}

          {type === 'login' && (
            <>
              <CustomInput
                name="email"
                label="Email"
                control={form.control}
                placeholder=""
                type='text'
              />
              <CustomInput
                name="password"
                label="Password"
                control={form.control}
                placeholder=""
                type="password"
              />

              <div className="flex justify-between items-center">
                <Link
                  href="/forgot-password"
                  className="text-base sm:text-lg text-[#D1D1D1] hover:opacity-80 transition-opacity"
                >
                  Forgot Password?
                </Link>
                <div className="flex items-center gap-2">
                  <CustomCheckbox
                    name="rememberMe"
                    label="Remember me"
                    control={form.control}
                  />
                </div>
              </div>

              <LabelButton
                type="submit"
                variant="filled"
                disabled={isSubmitting}
              >
                Login
              </LabelButton>
            </>
          )}

          {type === 'register' && (
            <>
              <CustomInput
                name="email"
                label="Email"
                control={form.control}
                placeholder=""
                type="text"
              />
              <CustomInput
                name="username"
                label="Username"
                control={form.control}
                placeholder=""
                type="text"
              />
              <div className="relative">
                <CustomInput
                  name="password"
                  label="Password"
                  control={form.control}
                  placeholder=""
                  type="password"
                  showStrengthChecker={true}
                />
                <PasswordStrengthChecker
                  password={form.watch('password') ?? ''}
                  isFocused={true}
                />
              </div>

              <div className='flex items-start sm:items-center gap-2'>
                <CustomCheckbox
                  name="terms"
                  label=""
                  control={form.control}
                />
                <p className="text-white text-sm sm:text-base">
                  I agree to the{' '}
                  <Link href={''} className="text-[#C879EB] font-bold hover:opacity-80 transition-opacity">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href={''} className="text-[#C879EB] font-bold hover:opacity-80 transition-opacity">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <LabelButton
                type="submit"
                variant="filled"
                disabled={isSubmitting}
              >
                Sign Up
              </LabelButton>
            </>
          )}

          {type === 'reset-password' && (
            <>
              <div className="relative">
                <CustomInput
                  name="Newpassword"
                  label="New Password"
                  control={form.control}
                  placeholder=""
                  type="password"
                  showStrengthChecker={true}
                />
                <PasswordStrengthChecker
                  password={form.watch('Newpassword') ?? ''}
                  isFocused={true}
                />
              </div>
              <div className="relative">
                <CustomInput
                  name="confirmPassword"
                  label="Confirm Password"
                  control={form.control}
                  placeholder=""
                  type="password"
                />
              </div>
              <LabelButton
                type="submit"
                variant="filled"
                disabled={isSubmitting}
              >
                Reset Password
              </LabelButton>
            </>
          )}

          {type === 'forgot-password' && (
            <div className="w-full space-y-4 sm:space-y-6">
              <div className='text-center'>
                
              </div>
              {!resetLinkSent ? (
                <CustomInput
                  name="email"
                  label="Email"
                  control={form.control}
                  placeholder=""
                  type="text"
                /> ) : (
                  <span className="text-[#E7E7E7]">
                    You can request a resend after {timeLeft}s
                  </span>
                )
              }
              <LabelButton
                type='submit'
                variant="filled"
                disabled={isSubmitting || timeLeft > 0}
                onClick={resetLinkSent ? () => form.handleSubmit(onSubmit)() : undefined}
              >
                {resetLinkSent 
                    ? 'Resend Link'
                    : 'Send Reset Link'}
              </LabelButton>
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;