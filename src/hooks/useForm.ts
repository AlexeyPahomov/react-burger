import { useState } from 'react';

export function useForm<T extends Record<string, unknown>>(
  inputValues: T = {} as T
): {
  values: T;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
} {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setValues({ ...values, [name as keyof T]: value });
  };

  return { values, handleChange, setValues };
}
