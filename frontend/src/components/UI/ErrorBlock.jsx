export default function ErrorBlock({ message }) {
  return (
    <div className="my-20 w-[50%] mx-auto p-8 rounded-lg bg-gray-200">
      <div className="flex gap-8 items-center">
        <div className="bg-gray-400 text-white rounded-[50%] w-12 h-12 flex justify-center items-center text-2xl">
          !
        </div>
        <div>
          <h2 className="text-lg">糟糕，出了點錯誤！</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
