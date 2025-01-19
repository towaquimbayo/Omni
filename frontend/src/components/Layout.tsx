import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

interface LayoutProps {
  title: string;
  isLandingPage?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  isLandingPage = false,
  children,
}: LayoutProps) {
  if (title && typeof document !== "undefined") {
    document.title = isLandingPage ? "Omni" : `${title} | Omni`;
  }

  const isAuthPage = title === "Login" || title === "Signup";
  const containerClassName = `min-h-[95vh] ${
    isAuthPage ? "" : "max-w-[1800px] mx-auto px-4 md:px-8"
  }`;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{isLandingPage ? "Omni" : `${title} | Omni`}</title>
      </Helmet>
      <div className={containerClassName}>{children}</div>
      {!isAuthPage && <Navbar />}
    </>
  );
}
