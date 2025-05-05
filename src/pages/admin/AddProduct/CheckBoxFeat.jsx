export default function CheckBoxFeat({
  label,
  customLabel1,
  customLabel2,
  name,
  id1,
  id2,
  formData,
  handleInputChange,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label} <span className="text-red-600">*</span>
      </label>
      <br />
      <div className="mt-1 mb-2 flex w-full items-center gap-4 px-2 py-1.5">
        <div>
          <input
            type="checkbox"
            name={name}
            id={id1}
            value="yes"
            checked={formData === "yes"}
            onChange={handleInputChange}
            required={formData === ""}
          />{" "}
          <label htmlFor={id1}>{customLabel1 ? customLabel1 : "Yes"}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name={name}
            id={id2}
            value="no"
            checked={formData === "no"}
            onChange={handleInputChange}
            required={formData === ""}
          />{" "}
          <label htmlFor={id2}>{customLabel1 ? customLabel2 : "No"}</label>
        </div>
      </div>
    </div>
  );
}
