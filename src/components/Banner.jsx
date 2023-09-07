import { Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";

const Banner = (banner) => {
  const slideBanner = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div>
      <p className="fw-bold fs-5 my-3 ">Temukan promo menarik</p>
      <Col sm={12}>
        <Slider {...slideBanner}>
          {banner?.banner?.data?.map((data, index) => (
            <div key={index}>
              <Image
                src={data.banner_image}
                alt={`Icon for ${data.banner_name}`}
              />
            </div>
          ))}
        </Slider>
      </Col>
    </div>
  );
};

export default Banner;
