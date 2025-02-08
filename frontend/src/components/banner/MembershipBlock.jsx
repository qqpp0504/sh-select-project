import Button from "../UI/Button.jsx";

const DISCOUNTS = [
  {
    description: "首次購物折扣",
    details: "新會員註冊後，首次購物可享有100元折扣。",
  },
  {
    description: "購物金回饋",
    details: "消費每滿500元即可累積5元購物金，下次購物可折抵。",
  },
  {
    description: "生日優惠",
    details: "會員生日當月可享有一次免費運費的專屬優惠。",
  },
];

export default function MembershipBlock({
  image,
  alt,
  paddingStyle = "mb-[1.625rem]",
  className,
}) {
  return (
    <section className={`padding-small lg:padding-large ${className}`}>
      <h2 className={`text-2xl font-500 ${paddingStyle}`}>會員福利</h2>
      <div className="relative">
        <div className="h-[60vh] flex justify-center">
          <img src={image} alt={alt} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start sm:justify-center overflow-x-auto">
          <table className="text-white text-left text-lg min-w-[25rem]">
            <tbody>
              {DISCOUNTS.map((discount) => (
                <tr key={discount.description}>
                  <th className="border-solid border-r-2 px-8 py-2">
                    {discount.description}
                  </th>
                  <td className="px-8 py-2">{discount.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <Button link="/accounts" variant="white">
            加入會員
          </Button>
        </div>
      </div>
    </section>
  );
}
