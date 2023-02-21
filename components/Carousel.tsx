import { Carousel } from "flowbite-react";
import Image from "next/image";

function MyCarousel({ props }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <Image
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          width={40}
          height={40}
          alt="..."
        />
        <Image
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          width={40}
          height={40}
          alt="..."
        />
        <Image
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          width={40}
          height={40}
          alt="..."
        />
      </Carousel>
    </div>
  );
}

export default MyCarousel;
