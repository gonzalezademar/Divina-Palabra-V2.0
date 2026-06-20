import { cn } from '@/lib/utils';

interface InstitutionalLogoProps {
  className?: string;
}

export function InstitutionalLogo({ className }: InstitutionalLogoProps) {
  return (
    <div className={cn('relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-primary/30 shadow-lg shadow-primary/10 p-2', className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Glow effect background */}
        <circle cx="50" cy="50" r="40" fill="url(#goldGlow)" opacity="0.15" />
        
        {/* Shield/Frame */}
        <rect x="15" y="15" width="70" height="70" rx="15" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />
        <rect x="20" y="20" width="60" height="60" rx="10" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
        
        {/* Open Bible Pages */}
        {/* Left Page */}
        <path
          d="M50 72C42 67 28 67 24 70V30C28 27 42 27 50 32"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Page */}
        <path
          d="M50 72C58 67 72 67 76 70V30C72 27 58 27 50 32"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bookmark ribbon */}
        <path
          d="M50 32V78L54 75L58 78V55"
          stroke="#87CEEB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Monogram DP */}
        <text
          x="34"
          y="52"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="-0.5"
        >
          D
        </text>
        <text
          x="54"
          y="52"
          fill="#D4AF37"
          fontSize="15"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="-0.5"
        >
          P
        </text>
        
        {/* Cross / Crown above */}
        <path d="M47 18H53M50 15V21" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

