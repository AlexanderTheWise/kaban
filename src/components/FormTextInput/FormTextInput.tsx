export interface FormTextInputProps {
  label?: string
  value: string
  name: string
  position?: number
  error: boolean
  itemRepeated: boolean
  changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormTextInput({
  label,
  changeEvent,
  position,
  name,
  value,
  error,
  itemRepeated,
}: FormTextInputProps) {
  return (
    <div className="flex-1 relative">
      <input
        aria-label={label}
        value={value}
        onChange={changeEvent}
        data-position={position}
        name={name}
        className={`form-text-entry ${
          (error && value.trim().length < 1) || (error && itemRepeated)
            ? "border-red"
            : ""
        }`}
      />
      {error && (
        <span className="absolute text-red whitespace-nowrap text-[13px] right-4 top-1/2 translate-y-[-50%]">
          {value.trim()
            ? itemRepeated
              ? "Already defined"
              : ""
            : "Can't be empty"}
        </span>
      )}
    </div>
  )
}
