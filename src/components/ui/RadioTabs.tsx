interface RadioTabsProps {
  name: string
  options: { value: string; label: string }[]
  defaultValue?: string
}

export default function RadioTabs({ name, options, defaultValue }: RadioTabsProps) {
  return (
    <div className="radio-tabs w-full">
      {options.map((opt) => (
        <label key={opt.value} className="radio-tab">
          <input
            type="radio"
            name={name}
            value={opt.value}
            defaultChecked={opt.value === defaultValue}
          />
          <span className="tab-name">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
