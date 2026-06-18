import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      <div className="absolute inset-0 rounded-full border-4 border-white/20" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-300 animate-spin" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-brand-gradient px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <img
            src="/ramadoorslogo.png"
            alt="Rama Door"
            className="h-14 w-auto brightness-0 invert opacity-90"
          />
          <div className="h-10 w-32 rounded-xl bg-white/15 animate-pulse" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="h-5 w-32 rounded-full bg-white/15 animate-pulse mb-6" />
            <div className="h-12 w-full max-w-md rounded-xl bg-white/20 animate-pulse mb-4" />
            <div className="h-12 w-4/5 rounded-xl bg-white/20 animate-pulse mb-6" />
            <div className="h-4 w-full max-w-lg rounded bg-white/15 animate-pulse mb-3" />
            <div className="h-4 w-3/4 rounded bg-white/15 animate-pulse mb-8" />

            <div className="flex gap-4">
              <div className="h-12 w-40 rounded-xl bg-white/20 animate-pulse" />
              <div className="h-12 w-36 rounded-xl bg-white/10 animate-pulse" />
            </div>
          </div>

          <div className="h-80 rounded-3xl bg-white/15 animate-pulse shadow-2xl" />
        </div>
      </div>
    </div>
  );
}