/* eslint-disable react/prop-types */
export default function DropdownMenu({ title, children }) {
  return (
    <div className="absolute right-14 top-full hidden w-[15rem] z-10 text-black hover:block group-hover:block">
      <div className="bg-white rounded-b-lg px-6 py-4">
        <span className="text-base mb-2 inline-block">{title}</span>
        {children}
      </div>
    </div>
  );
}
