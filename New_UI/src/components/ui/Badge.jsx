import clsx from 'clsx'

/**
 * Badge component.
 * variant: 'primary' | 'secondary'
 */
export default function Badge({ children, variant = 'primary', className }) {
  return (
    <span className={clsx(
      variant === 'secondary' ? 'badge-secondary' : 'badge-primary',
      className,
    )}>
      {children}
    </span>
  )
}
