/* eslint-disable react/prop-types */
import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";

export default function CustomerForm({ bill = "" }) {
  return (
    <div className="py-4 flex flex-col gap-7">
      <Input type="text" id={`${bill}-lastName`} placeholderText="姓氏">
        請輸入你的姓氏，以利辦理清關手續
      </Input>
      <Input type="text" id={`${bill}-firstName`} placeholderText="名字">
        請輸入你的名字，以利辦理清關手續
      </Input>
      <Input
        type="text"
        id={`${bill}-country`}
        value="台灣"
        className="greenPoint"
        readOnly
      >
        {" "}
      </Input>
      <Input
        type="number"
        id={`${bill}-postal`}
        placeholderText="郵遞區號"
        min="0"
      />
      <Select id={`${bill}-city`} />
      <Input type="text" id={`${bill}-districts`} placeholderText="鄉鎮市區" />
      <Input type="text" id={`${bill}-address`} placeholderText="地址">
        我們無法送貨至郵政信箱
      </Input>
    </div>
  );
}
