import { Header } from "@/components/custom/Header";
import { TabbedPortal } from "@/components/custom/TabbedPortal";
import { StickyContact } from "@/components/custom/StickyContact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabbedPortal />
      <footer className="bg-primary text-primary-foreground/70 py-10 text-center text-sm border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-4 flex h-16 w-28 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
            <img src="/images/tggl-logo.svg" alt="TGGL logo" className="h-full w-full object-contain" />
          </div>
          <p className="font-semibold text-primary-foreground">Henan Taiguo Boiler Products · Bangladesh Digital Sourcing Gateway</p>
          <p className="mt-2">Built for Bangladesh RMG, agriculture, food processing, chemical, and industrial steam buyers.</p>
        </div>
      </footer>
      <StickyContact />
    </div>
  );
}
