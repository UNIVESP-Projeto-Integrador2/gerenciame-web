import { ChangeEvent, useState } from 'react'

export function useFormState<T>(
  initialValue: T,
): [value: T, handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [formState, setFormState] = useState<T>(initialValue)

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  return [formState, handleChange]
}
