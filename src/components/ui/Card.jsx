import clsx from 'clsx'

/**
 * Card component.
 * hover: boolean — enable hover lift + glow effect
 */
export default function Card({ children, hover = false, className, ...props }) {
  return (
    <div
      className={clsx(hover ? 'card-hover' : 'card', className)}
      {...props}
    >
      {children}
    </div>
  )
}
