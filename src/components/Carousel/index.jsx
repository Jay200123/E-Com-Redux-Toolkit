import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import ImageOne from "../../assets/imageOne-IT.jpg";
import ImageTwo from "../../assets/ImageTwo-IT.jpg";
import ImageThree from "../../assets/ImageThree-IT.jpg";

export default function () {
  return (
    <div className="container mt-4 rounded-md">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-[62rem] h-[21rem] rounded-md mx-auto"
            src={ImageOne}
            alt="Image One"
          />
          <Carousel.Caption>
            <h3 className="text-sm font-medium text-white md:font-bold md:text-2xl">Get the Latest Trends on Mobile Phones</h3>
            <p  className="text-sm font-medium text-white md:font-medium md:text-lg">100% affordable Computer Sets</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-[62rem] h-[21rem] rounded-md mx-auto"
            src={ImageTwo}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3 className="text-sm font-medium text-white md:font-bold md:text-2xl">Experience the Power of Innovation</h3>
            <p className="text-sm font-medium text-white md:font-medium md:text-lg">Designed for Performance</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-[62rem] h-[21rem]  rounded-md  mx-auto"
            src={ImageThree}
            alt="Image Three"
          />
          <Carousel.Caption>
          <h3 className="text-sm font-medium text-white md:font-bold md:text-2xl">Get the Latest Trends on Mobile Phones</h3>
          <p  className="text-sm font-medium text-white md:font-bold md:text-lg">100% affordable phones</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}