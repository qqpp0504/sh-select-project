import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";

export default function CustomerForm() {
  return (
    <div className="py-4 flex flex-col gap-7">
      <Input type="text" id="lastName" placeholder="姓氏">
        請輸入你的姓氏，以利辦理清關手續
      </Input>
      <Input type="text" id="firstName" placeholder="名字">
        請輸入你的名字，以利辦理清關手續
      </Input>
      <Input
        type="text"
        id="country"
        value="台灣"
        className="greenPoint"
        readOnly
      >
        {" "}
      </Input>
      <Input type="number" id="postal" placeholder="郵遞區號" min="0" />
      <Select id="city" />
      <Input type="text" id="districts" placeholder="鄉鎮市區" />
      <Input type="text" id="address" placeholder="地址">
        我們無法送貨至郵政信箱
      </Input>
    </div>
  );
}
