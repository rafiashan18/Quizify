
import {ImageGalleryData} from '../../../constants'
const ImageGallery = () => {


  return (
    <div className="flex items-center justify-center relative py-20">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-6xl p-4 overflow-hidden">
        {ImageGalleryData.map((image, index) => (
          <div
            key={index}
            data-aos="slide-up"
            data-aos-delay={image.delay}
            data-aos-duration="10000"
            data-aos-once="true"
            className={`relative ${image.className} ${!image.visible ? 'hidden md:block' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;