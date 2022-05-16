import { ChangeEvent, useState } from 'react'

export function useInputState<T>(
  initialValue: T,
): [value: T, handleChange: (event: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<T>(initialValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T)
  }

  return [value, handleChange]
}
