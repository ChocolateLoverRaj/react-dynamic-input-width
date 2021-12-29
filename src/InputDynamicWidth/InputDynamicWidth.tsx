import React from 'react'

export interface InputDynamicWidthProps {
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
  ...props
}: InputDynamicWidthProps) => {
  const [value, setValue] = React.useState(initialValue)
  const [visible, setVisible] = React.useState(false)
  const [width, setWidth] = React.useState<number>(!!initialWidth ? initialWidth + padding : 0 + padding)
  const measurer = React.useRef<any>(null)

  React.useEffect(() => {
    setVisible(true)
  }, [value])

  React.useLayoutEffect(() => {
    if (visible) {
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
        type="text"
        value={value}
        style={{ width: width }}
        className={className}
        onKeyPress={onKeyPress}
        onChange={(event) => {
          const { value } = event.target
          setValue(value)
          if (onChange) onChange(event)
        }}
        {...props}
      />
    </>
  )
}

export default InputDynamicWidth
