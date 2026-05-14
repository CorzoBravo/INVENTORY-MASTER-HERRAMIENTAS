import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          padding: '0.5rem',
          border: error ? '1px solid #dc2626' : '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '1rem',
        }}
        {...props}
      />
      {error && (
        <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</span>
      )}
    </div>
  );
}