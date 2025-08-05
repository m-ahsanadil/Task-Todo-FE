import { useState } from 'react';

interface UsePasswordToggleReturn {
  showPassword: boolean;
  togglePassword: () => void;
  inputType: 'password' | 'text';
}

export const usePasswordToggle = (): UsePasswordToggleReturn => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const togglePassword = (): void => {
    setShowPassword(prev => !prev);
  };
  
  return {
    showPassword,
    togglePassword,
    inputType: showPassword ? 'text' : 'password'
  };
};