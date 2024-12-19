/* eslint-disable react/prop-types */
export default function Information({ title, children }) {
  return (
    <div className="my-3">
      <h1 className="text-[1.7rem] font-500">{title}</h1>
      <div className="py-12">{children}</div>
    </div>
  );
}
