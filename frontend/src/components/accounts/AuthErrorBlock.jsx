export default function AuthErrorBlock({ message }) {
  return (
    <div className="bg-gray-100 py-[0.6rem] px-4 flex gap-4 items-center mt-3">
      <div className="border-2 border-red-600 rounded-full p-2 w-1 h-1 text-xs text-red-600 flex justify-center items-center">
        !
      </div>
      <p className="font-light">{message}</p>
    </div>
  );
}
