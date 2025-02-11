export default function FilterBlock({
  filterClass,
  children,
  hasBorder = true,
}) {
  let border;

  if (hasBorder) {
    border = "border-b";
  }

  return (
    <div className={`py-7 border-gray-200 ${border}`}>
      <div>{filterClass}</div>
      <div className="flex flex-col items-start mt-4 gap-2">{children}</div>
    </div>
  );
}
