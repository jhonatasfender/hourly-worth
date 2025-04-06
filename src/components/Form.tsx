import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormData {
  time: string;
  hourlyRate: string;
  currency: string;
}

interface FormProps {
  children: ReactNode;
  onSubmit: (time: string, hourlyRate: string, currency: string) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  const methods = useForm<FormData>();

  const handleSubmit = (data: FormData) => {
    const { time, hourlyRate, currency } = data;
    if (time && hourlyRate && currency) {
      onSubmit(time, hourlyRate, currency);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
} 