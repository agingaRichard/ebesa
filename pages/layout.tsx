import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";

import styles from "../styles/layout.module.css";
// import { Footer } from "flowbite-react";

export default function MainLayout({ children }: any) {

  return (
    <div className="h-screen overflow-auto bg-cover bg-no-repeat bg-fixed bg-center bg-[url('https://engineering.nyu.edu/sites/default/files/styles/content_header_1024_2x/public/2018-03/program-environmental-eng.jpg?h=e1d1bc8a&itok=7i1dM4rc')]">
      <div className="block fixed top-0 inset-x-0 z-50 md:hidden p-0">
        <MobileNav />
      </div>
      <div className="block fixed top-0 z-50 inset-x-0 sm_hidden md:visible p-0">
        <DesktopNav />
      </div>
      {/* <div className="w-full h-full flex gap-4"> */}
      {/* <div className="hidden md:flex ">
          <Drawer />
        </div> */}
      {/* <div className="w-full h-auto overflow-auto grid place-content-center pt-20 pb-20 md:pt-0 md:pb-0"> */}
      <div className="justify-center p-6 overflow-auto">
        <div className="block p-6 bg-stone-800 bg-opacity-50 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:mt-20">
          {children}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="block fixed bottom-0 inset-x-0 z-50 md:hidden">
        <BottomNav />
      </div>
      <Footer/>
    </div>
  );
}
