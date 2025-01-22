import MembershipBlock from "@/components/banner/MembershipBlock.jsx";
import membershipImage from "@/assets/membership-banner.jpg";

export default function MembershipPage() {
  return (
    <MembershipBlock
      image={membershipImage}
      alt="Membership image"
      paddingStyle="mb-8"
      className="mt-8"
    />
  );
}
