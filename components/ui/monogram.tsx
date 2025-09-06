export type MonogramProps = {
  size?: number;
  title?: string;
  className?: string;
  /**
   * If true, stroke/fill colors inherit from current text color (preferred for theming).
   */
  inheritColor?: boolean;
};

export function Monogram({
  size = 112,
  title = 'AVH monogram',
  className = '',
  inheritColor = true,
}: MonogramProps) {
  const stroke = inheritColor ? 'black' : 'black';
  const fill = inheritColor ? 'white' : 'white';
  return (
    <svg
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={className}
    >
      {/* <rect x="-144" y="-43" width="800" height="600" fill="{white}" /> */}
      <circle cx="256" cy="256" r="250" fill={fill} stroke={stroke} strokeWidth="12" />
      <circle cx="256" cy="256" r="234" fill={fill} stroke={stroke} strokeWidth="8" />
      <path
        d="M215.768 355.432L200.792 305.608H125.624L110.648 355.432H83L146.648 157H181.208L244.568 355.432H215.768ZM132.248 283.432H194.168L163.352 179.752L132.248 283.432Z"
        fill={stroke}
      />
      <path
        d="M299.87 220.932L294.16 258.544L252.88 355.432H220.912L173.366 203.656H192.866L237.04 331.816L292 203.656L299.87 220.932Z"
        fill={stroke}
      />
      <path
        d="M384.296 355.432V262.408H300.776V355.432H273.416V157H300.776V239.944H384.296V157H411.656V355.432H384.296Z"
        fill={stroke}
      />
    </svg>
  );
}
