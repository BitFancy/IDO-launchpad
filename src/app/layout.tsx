'use client'
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
import { usePathname } from 'next/navigation';
import ToTopButton from "./components/ToTopButton";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import MouseTrack from "./components/MouseTracker";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const current = usePathname();
  // const getBackgroundImage = () => {
  //   switch (current) {
  //     case '/':
  //       return 'true';
  //     case '/launchpad':
  //       return 'false';
  //     default:
  //       return 'true';
  //   }
  // };
  const [pathhandle, setPathhandle] = useState(true);

  useEffect(() => {
    handlePath();
  }, [current]);

  const handlePath = () => {
    if (current === '/') {
      setPathhandle(true);
    } else if (current === '/launchpad') {
      setPathhandle(false);
    } else if (current === '/doc') {
      setPathhandle(false);
    }
    else {
      setPathhandle(true);
    }
  };

  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(true);
  };

  return (
    <html lang="en">
      <body className={`${sidebar ? 'overflow-hidden' : ''}`}>
        <Header
          sidebarview={handleSidebar}
        />

        {/* background handle */}
        <div className="bg-[#030409] h-[100vh] w-full absolute overflow-x-hidden left-0 top-0 z-[-20]">
          <div className={`mix-blend-screen bg-center opacity-35 absolute inset-0 bg-no-repeat ${pathhandle ? 'bg-home' : 'hidden'}`} style={{ backgroundSize: '1440px 100vh', backgroundPosition: 'center top' }}></div>
          <div className={`mix-blend-soft-light bg-[#126e53] flex h-[100%] w-[1440px] mx-auto inset-32 ${pathhandle ? 'flex' : 'hidden'}`}></div>
          <div className={`bg-no-repeat h-full w-full bg-cover bg-centertop bg-launchpad ${current === '/launchpad' ? 'block' : 'hidden'} `} style={{ backgroundSize: '1440px 100vh' }}></div>
          <div className={`bg-no-repeat h-full w-full bg-cover bg-[##030409] bg-centertop ${current === '/doc' ? 'block' : 'hidden'} `} style={{ backgroundSize: '1440px 100vh' }}></div>
        </div>
        <div className="w-[100vw] h-[100vh] fixed left-0 top-0 z-[-30] bg-[#030409]"></div>

        <div className="">
          <div className="z-50">
            {children}
          </div>
          <Footer />
        </div>
        <ToTopButton />
        <SideBar
          viewstate={sidebar}
          sidebarclose={() => setSidebar(false)}
        />
        
        <MouseTrack />
      </body>
    </html>
  );
}
