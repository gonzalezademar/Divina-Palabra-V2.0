import Image from 'next/image';
import { cn } from '@/lib/utils';

interface InstitutionalLogoProps {
  className?: string;
}

export function InstitutionalLogo({ className }: InstitutionalLogoProps) {
  return (
    <div className={cn('relative w-20 h-20', className)}>
      <Image
        src="/images/anawin-logo.svg"
        alt="Logo de Fundacion Anawin"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
