import Image from 'next/image';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ size = 'md' }: AvatarProps) {
  const sizeMap = {
    sm: { width: 32, height: 32, className: 'w-8 h-8' },
    md: { width: 48, height: 48, className: 'w-12 h-12' },
    lg: { width: 64, height: 64, className: 'w-16 h-16' },
  };

  const config = sizeMap[size];
  const avatarUrl = process.env.NEXT_PUBLIC_AUTHOR_AVATAR_URL || '/avatar.png';

  return (
    <div className={config.className + ' rounded-full overflow-hidden bg-gray-200'}>
      <Image
        src={avatarUrl}
        alt="AugustSnow"
        width={config.width}
        height={config.height}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
