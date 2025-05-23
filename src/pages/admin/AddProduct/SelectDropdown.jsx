export default function SelectDropdown({
  label,
  id,
  name,
  formData,
  required,
  handleInputChange,
  options,
  disabled,
}) {
  return (
    <>
      <label htmlFor={id} className="text-sm text-gray-600">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <br />
      <select
        onChange={handleInputChange}
        id={id}
        name={name}
        value={formData}
        required={required && !disabled ? true : false}
        disabled={disabled}
        className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options &&
          options.length > 0 &&
          options.map((option, i) => (
            <option key={i} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </>
  );
}
