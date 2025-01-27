import MemberHeader from "@/components/member/MemberHeader.jsx";

export default function MemberPage() {
  return (
    <section className="w-[90%] mx-auto">
      <MemberHeader />
      <div className="my-10">
        <p className="text-gray">你尚無任何訂單</p>
      </div>
    </section>
  );
}
