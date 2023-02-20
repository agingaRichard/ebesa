import Homepage from "../pages/homepage";
import TopNav from "../components/TopNav";
import Postcard from "../components/Postcard";
import Drawer from "../components/Drawer";
import BottomNav from "../components/BottomNav";

import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
  return (
    <div class="h-screen overflow-auto bg-cover bg-no-repeat bg-fixed bg-center bg-[url('https://engineering.nyu.edu/sites/default/files/styles/content_header_1024_2x/public/2018-03/program-environmental-eng.jpg?h=e1d1bc8a&itok=7i1dM4rc')]">
      <div class="block fixed top-0 inset-x-0 z-50 md:hidden p-0">
        <TopNav />
      </div>
      <div class="w-full h-full flex inline-flex gap-4">
        <div class="hidden md:flex ">
          <Drawer />
        </div>
        <div class="w-full h-auto overflow-auto grid place-content-center pt-20 pb-20 md:pt-0 md:pb-0">
          <div class="justify-center p-6 overflow-auto">
            <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div class="block fixed bottom-0 inset-x-0 z-50 md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
