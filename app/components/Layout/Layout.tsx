import * as React from "react";

import { Header } from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";

type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  withFooter?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  withFooter = true,
  title = "Ariana Guerra",
}) => {
  return (
    <div className="flex h-full flex-col">
      <Header title={title} />
      <main className="flex min-h-0 w-full flex-1 flex-col items-center overflow-x-hidden overflow-y-scroll px-8">
        {children}
      </main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
