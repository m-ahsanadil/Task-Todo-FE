import React, { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}
