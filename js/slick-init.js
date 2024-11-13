$(document).ready(function () {
  $('.slider').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow:
      '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
    nextArrow:
      '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
}),
  $(document).ready(function () {
    $('.slider2').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    })
  })
