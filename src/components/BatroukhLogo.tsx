import React from 'react';

interface BatroukhLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
  clickCount?: number;
}

export const BatroukhLogo: React.FC<BatroukhLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28 sm:w-36 sm:h-36',
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none transition-transform duration-200 active:scale-95 group ${className}`}
      title="مطعم بطروخ للمأكولات البحرية - بطروخ هيخليك صاروخ 🚀"
    >
      {/* Visual Logo Emblem Container */}
      <div className={`relative ${sizeClasses[size]} shrink-0 rounded-full p-1 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:shadow-[0_0_30px_rgba(234,88,12,0.7)] transition-all duration-300`}>
        <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center overflow-hidden relative border border-white/20">
          
          {/* Detailed SVG Illustration of Batroukh Characters with Seafood */}
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1A3D" />
                <stop offset="100%" stopColor="#050A18" />
              </linearGradient>
              <linearGradient id="lobsterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="shrimpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
            </defs>

            {/* Background Glow */}
            <circle cx="80" cy="80" r="76" fill="url(#bgGrad)" />
            <circle cx="80" cy="80" r="72" stroke="#EA580C" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />

            {/* Left Chef (Holding Shrimp) */}
            <g transform="translate(18, 14)">
              {/* Hair & Face */}
              <ellipse cx="38" cy="42" rx="15" ry="17" fill="url(#skinGrad)" />
              {/* Hair */}
              <path d="M22 36 C22 22, 54 22, 54 36 C54 27, 44 23, 36 24 C28 25, 23 30, 22 36 Z" fill="#2E1C12" />
              {/* Smiling Eyes */}
              <path d="M30 40 Q33 37 36 40" stroke="#1E130D" strokeWidth="2" strokeLinecap="round" />
              <path d="M42 40 Q45 37 48 40" stroke="#1E130D" strokeWidth="2" strokeLinecap="round" />
              {/* Big Smile */}
              <path d="M32 47 Q39 55 46 47" stroke="#1E130D" strokeWidth="2" fill="#FFFFFF" />
              {/* White Shirt */}
              <path d="M25 58 L20 85 L56 85 L51 58 Q38 64 25 58 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              {/* Shrimp in hand */}
              <path d="M12 60 C10 50, 20 40, 28 42 C26 48, 20 54, 18 64 C16 70, 10 68, 12 60 Z" fill="url(#shrimpGrad)" />
              <circle cx="24" cy="45" r="1.5" fill="#000" />
              {/* Shrimp Antennae */}
              <path d="M26 42 Q30 35 34 32" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Right Chef (Holding Lobster) */}
            <g transform="translate(68, 12)">
              {/* Hair & Face */}
              <ellipse cx="42" cy="44" rx="16" ry="18" fill="url(#skinGrad)" />
              {/* Hair & Beard */}
              <path d="M25 38 C25 24, 59 24, 59 38 C59 29, 48 25, 40 26 C32 27, 27 32, 25 38 Z" fill="#1C140E" />
              {/* Beard */}
              <path d="M28 48 C28 64, 56 64, 56 48 C56 56, 50 61, 42 61 C34 61, 28 56, 28 48 Z" fill="#1C140E" />
              {/* Smiling Eyes */}
              <path d="M34 41 Q37 38 40 41" stroke="#1C140E" strokeWidth="2" strokeLinecap="round" />
              <path d="M46 41 Q49 38 52 41" stroke="#1C140E" strokeWidth="2" strokeLinecap="round" />
              {/* Big Smile */}
              <path d="M35 48 Q43 56 51 48" stroke="#1C140E" strokeWidth="2" fill="#FFFFFF" />
              {/* Blue Shirt */}
              <path d="M26 60 L20 87 L64 87 L58 60 Q42 66 26 60 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
              {/* Red Lobster In Hands */}
              <path d="M34 62 C34 52, 50 52, 50 62 C50 75, 42 82, 42 82 C42 82, 34 75, 34 62 Z" fill="url(#lobsterGrad)" />
              {/* Lobster Claws */}
              <path d="M30 55 C24 50, 24 62, 30 64 Z" fill="#EF4444" />
              <path d="M54 55 C60 50, 60 62, 54 64 Z" fill="#EF4444" />
            </g>

            {/* Bottom Slogan Ribbon */}
            <rect x="18" y="112" width="124" height="34" rx="17" fill="#030816" stroke="#EA580C" strokeWidth="2" />
            <text x="80" y="128" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="16" fontFamily="system-ui, sans-serif">
              بطروخ
            </text>
            <text x="80" y="141" textAnchor="middle" fill="#FB923C" fontWeight="bold" fontSize="9" fontFamily="system-ui, sans-serif">
              هيخليك صاروخ 🚀
            </text>
          </svg>
        </div>

        {/* Pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 border-2 border-[#050A18]"></span>
        </span>
      </div>

      {/* Brand Text */}
      {showSubtitle && (
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-black font-heading text-white tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
              مطعم بطروخ
            </span>
            <span className="px-1.5 py-0.5 rounded bg-orange-600/30 text-orange-400 text-[10px] font-bold border border-orange-500/40">
              سي فود
            </span>
          </div>
          <span className="block text-xs font-bold text-orange-400/90 leading-tight">
            بطروخ هيخليك صاروخ 🚀
          </span>
        </div>
      )}
    </div>
  );
};
