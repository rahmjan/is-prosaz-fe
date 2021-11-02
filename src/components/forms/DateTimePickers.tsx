import { KeyboardDateTimePicker, KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers"
import { ControllerRenderProps } from "react-hook-form"

export function DateTimePicker({ field: { value, onChange }, ...otherProps }: { field: ControllerRenderProps, [x: string]: any }) {
  return (
    <KeyboardDateTimePicker
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}

export function DatePicker({ field: { value, onChange }, ...otherProps }: { field: ControllerRenderProps, [x: string]: any }) {
  return (
    <KeyboardDatePicker
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}

export function TimePicker({ field: { value, onChange }, ...otherProps }: { field: ControllerRenderProps, [x: string]: any }) {
  return (
    <KeyboardTimePicker
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  )
}