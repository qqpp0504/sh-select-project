export default function QuestionTitle({ title, children }) {
  return (
    <div>
      <h1 className="text-3xl font-500">{title}</h1>
      <div className="mt-10 text-lg leading-8 flex flex-col gap-20">
        {children}
      </div>
    </div>
  );
}
