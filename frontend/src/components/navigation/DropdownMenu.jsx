export default function DropdownMenu({ title, children }) {
  return (
    <div className="absolute right-14 top-full w-[15rem] z-50 text-black">
      <div className="bg-white rounded-b-lg px-6 py-4">
        <span className="text-base mb-2 inline-block">{title}</span>
        {children}
      </div>
    </div>
  );
}
