import { cn } from '../../lib/utils';
import { useSettings } from '../../context/SettingsContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  /** Use on dark backgrounds */
  light?: boolean;
}

const sizeMap = {
  sm: { logo: 'h-8', icon: 'h-7 w-7' },
  md: { logo: 'h-10', icon: 'h-9 w-9' },
  lg: { logo: 'h-12', icon: 'h-11 w-11' },
  xl: { logo: 'h-16', icon: 'h-14 w-14' },
};

/** The open-door icon extracted from the brand SVG */
export function DoorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rama Door icon"
    >
      {/* Open door flap */}
      <rect x="8" y="12" width="34" height="76" rx="3" fill="#4FAFD1" opacity="0.85" />
      {/* Door body */}
      <rect x="22" y="8" width="56" height="84" rx="4" fill="#0A4D78" />
      {/* Panel top */}
      <rect x="29" y="16" width="42" height="28" rx="2" fill="none" stroke="#4FAFD1" strokeWidth="2.5" opacity="0.9" />
      {/* Panel bottom */}
      <rect x="29" y="50" width="42" height="34" rx="2" fill="none" stroke="#4FAFD1" strokeWidth="2.5" opacity="0.9" />
      {/* Handle */}
      <circle cx="62" cy="52" r="3.5" fill="#7ED3E8" />
    </svg>
  );
}

export default function Logo({ className, size = 'md', variant = 'full' }: LogoProps) {
  const sizes = sizeMap[size];
  const { settings } = useSettings();

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center', className)}>
        <DoorIcon className={sizes.icon} />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      <img
        src={settings.logo_url || '/ramadoorslogo.png'}
        alt="Rama Door - Premium Teak Wood Door Manufacturer"
        className={cn(sizes.logo, 'w-auto object-contain')}
        draggable={false}
      />
    </div>
  );
}
