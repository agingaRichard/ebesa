import { Carousel } from "flowbite-react";
import Image from "next/image";

function MyCarousel({ props }: any) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <Image
          src="http://127.0.0.1:8090/api/files/guyag26jvuo1ocs/pv…7s0x2ge8/download_1_hVocKAqa5u.jpeg?thumb=100x100"
          width={40}
          height={40}
          alt="..."
        />
        <Image
          src="http://127.0.0.1:8090/api/files/guyag26jvuo1ocs/pv…7s0x2ge8/download_3_SjhQvYsPQn.jpeg?thumb=100x100"
          width={40}
          height={40}
          alt="..."
        />
        <Image
          src="http://127.0.0.1:8090/api/files/guyag26jvuo1ocs/pvwmv7t7s0x2ge8/download_OJ6F8doBy0.jpeg"
          width={40}
          height={40}
          alt="..."
        />
      </Carousel>
    </div>
  );
}

export default MyCarousel;
