export const settings = {
    dots: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    // infinite: true,
    responsive: [
        {
            breakpoint: 730,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 4,
            }
        }
    ]
};