import React from 'react'

export interface InputDynamicWidthProps extends React.HTMLProps<HTMLInputElement> {
  initialValue?: string
  initialWidth?: number
  padding?: number
  fontSize?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
}

const InputDynamicWidth = ({
  initialValue = '',
  onChange,
  initialWidth,
  onKeyPress,
  padding = 1,
  fontSize = '16px',
  className = 'input-dynamic-width',
  ref,
  ...props
}: InputDynamicWidthProps) => {
  const [value, setValue] = React.useState(initialValue)
  const [visible, setVisible] = React.useState(false)
  const [width, setWidth] = React.useState<number>(!!initialWidth ? initialWidth + padding : 0 + padding)
  const measurer = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    setVisible(true)
  }, [value])

  React.useLayoutEffect(() => {
    if (visible && measurer?.current) {
      const rect = measurer.current.getBoundingClientRect()
      setWidth(rect.width + padding)
      setVisible(false)
    }
  }, [visible])

  return (
    <>
      <span
        ref={measurer}
        style={{ fontSize }}
      >
        {visible && value}
      </span>
      <input
        {...props}
        type="text"
        value={value}
        style={{ width: width }}
        className={className}
        onKeyPress={onKeyPress}
        ref={ref}
        onChange={(event) => {
          const { value } = event.target
          setValue(value)
          if (onChange) onChange(event)
        }}
      />
    </>
  )
}

const WrapInputDynamicWidth = React.forwardRef<HTMLInputElement, InputDynamicWidthProps>((props, ref) => InputDynamicWidth({ ...props, ref }))

export default WrapInputDynamicWidth
