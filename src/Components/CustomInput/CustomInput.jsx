export default function CustomInput({ touched, errors, id, label, ...props }) {
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          aria-describedby={`outlined_help_${id}`}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer ${
            touched && errors ? "border-red-600" : "border-gray-400 "
          }`}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={`absolute text-sm   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
            touched && errors ? "text-red-600" : "text-inherit"
          }`}
        >
          {label}
        </label>
      </div>
      {touched && errors && (
        <p
          id={`outlined_help_${id}`}
          className={`px-1.5 mt-2 text-xs font-medium text-red-600`}
        >
          {errors}
        </p>
      )}
    </div>
  );
}
