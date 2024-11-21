import BannerBar from "../components/BannerBar.jsx";
import MainNavigation from "../components/navigation/MainNavigation.jsx";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <BannerBar />
      </main>
    </>
  );
}
