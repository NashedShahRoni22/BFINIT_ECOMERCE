export default function InputField({
  label,
  id,
  name,
  formData,
  required,
  handleInputChange,
}) {
  return (
    <>
      <label htmlFor={id} className={`text-sm text-gray-600`}>
        {label}
      </label>
      <br />
      <input
        type="text"
        id={id}
        name={name}
        value={formData}
        required={required ? true : false}
        onChange={handleInputChange}
        className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
      />
    </>
  );
}
