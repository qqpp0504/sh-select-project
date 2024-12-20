/* eslint-disable react/prop-types */
export default function DeliveryTime({ className }) {
  const now = new Date();

  const deliveryMonth = now.getMonth() + 1;
  let deliveryDateStart = now.getDate() + 5;
  let deliveryDateEnd = now.getDate() + 7;

  const daysOfWeek = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

  const startDeliveryDate = new Date(now);
  startDeliveryDate.setDate(deliveryDateStart);
  let deliveryDayStart = startDeliveryDate.getDay();
  deliveryDateStart = startDeliveryDate.getDate();

  const endDeliveryDate = new Date(now);
  endDeliveryDate.setDate(deliveryDateEnd);
  let deliveryDayEnd = endDeliveryDate.getDay();
  deliveryDateEnd = endDeliveryDate.getDate();

  deliveryDayStart = daysOfWeek[deliveryDayStart];
  deliveryDayEnd = daysOfWeek[deliveryDayEnd];

  return (
    <p
      className={className}
    >{`在 ${deliveryMonth}月${deliveryDateStart}日 ${deliveryDayStart}至 ${deliveryMonth}月${deliveryDateEnd}日 ${deliveryDayEnd}之間送達`}</p>
  );
}
