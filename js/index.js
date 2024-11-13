function updateQuantity(element, quant, productId) {
  var quantidadeElement = document.getElementById(`quantInput-${productId}`)
  var value = parseInt(quantidadeElement.value)
  value = Math.max(1, value + quant)
  quantidadeElement.value = value
}

// Use este código para os eventos de clique
$('body').on('click', '.quantidade .mais', function () {
  updateQuantity(this, 1)
})

$('body').on('click', '.quantidade .menos', function () {
  updateQuantity(this, -1)
})

jQuery(document).ready(function () {
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery('a[href="#top"]').fadeIn()
    } else {
      jQuery('a[href="#top"]').fadeOut()
    }
  })

  jQuery('a[href="#top"]').click(function () {
    jQuery('html, body').animate({ scrollTop: 0 }, 400)
    return false
  })
})

// element('snippets/botoes_qty')
