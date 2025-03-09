import about1 from "../../../assets/images/about-1.png";
import about2 from "../../../assets/images/about-2.jpg";
import about3 from "../../../assets/images/about-3.jpg";
import about4 from "../../../assets/images/about-4.jpg";

const ImageGallery = () => {
  return (
    <div className="flex items-center justify-center relative py-20">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-6xl p-4 overflow-hidden">
        {/* First large image */}
        <div
          data-aos="slide-up" data-aos-delay="100" data-aos-duration="10000" data-aos-once="true"
          className="h-40 w-64 sm:h-64 sm:w-96 relative">
          <img
            src={about1}
            alt="Gallery image 1"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        </div>

        {/* Second smaller image */}
        <div
          data-aos="slide-up" data-aos-delay="200" data-aos-duration="10000" data-aos-once="true"

          className="h-40 w-64 sm:h-48 sm:w-72 relative mt-4 sm:mt-0">
          <img
            src={about2}
            alt="Gallery image 2"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        </div>

        {/* Third large image */}
        <div
          data-aos="slide-up" data-aos-delay="300" data-aos-duration="10000" data-aos-once="true"

          className="h-48 w-80 sm:h-64 sm:w-96 relative hidden md:block">
          <img
            src={about3}
            alt="Gallery image 3"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        </div>

        {/* Fourth smaller image */}
        <div
          data-aos="slide-up" data-aos-delay="400" data-aos-duration="10000" data-aos-once="true"

          className="h-40 w-64 sm:h-48 sm:w-72 relative hidden md:block">
          <img
            src={about4}
            alt="Gallery image 4"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
