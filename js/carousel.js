var carousel = {}

carousel.eventos = {
  init: () => {
    carousel.metodos.carregarAlimentos()
    carousel.metodos.carregarMedicamentos()

    // process()
  }
}

carousel.metodos = {
  // Função para formatar o preço
  formatarPreco: preco => {
    return preco.replace('.', ',')
  },

  carregarAlimentos: () => {
    var filtro = PRODUTOS['alimentos']
    filtro.forEach(produto => {
      produto.price = carousel.metodos.formatarPreco(produto.price)
      $('#itensCarousel').append(carousel.templates.itemAlimento(produto))
    })
    $('#itensCarousel').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>'
    })
  },

  carregarMedicamentos: () => {
    var filtro = PRODUTOS['medicamentos']
    filtro.forEach(produto => {
      produto.price = carousel.metodos.formatarPreco(produto.price)
      $('#itensCarousel2').append(carousel.templates.itemMedicamentos(produto))
    })
    $('#itensCarousel2').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>'
    })
  },

  diminuirQuantidade: id => {
    let quantInput = $(`#quantInput-${id}`)
    let quantAtual = parseInt(quantInput.text())

    if (quantAtual > 0) {
      quantInput.text(quantAtual - 1)
    }
  },

  aumentarQuantidade: id => {
    let quantInput = $(`#quantInput-${id}`)
    let quantAtual = parseInt(quantInput.text())

    quantInput.text(quantAtual + 1)
  },

  adicionarAoCarrinho: (id, tipo) => {
    let quantAtual = parseInt($('#quantInput-' + id).text())

    // Valida se a quantidade atual é maior que zero
    if (quantAtual > 0) {
      // Acessa os produtos de alimentos
      let produtos = PRODUTOS[tipo]

      // Acessa o elemento pelo id
      let elemento = produtos.find(e => e.id === id)

      // Se o elemento existe, adicione-o ao carrinho
      if (elemento) {
        // Validar se já existe esse item no carrinho
        let existe = MEU_CARRINHO.find(elem => elem.id === id)

        // Caso já exista no carrinho, só altera a quantidade.
        if (existe !== undefined) {
          let objIndex = MEU_CARRINHO.findIndex(obj => obj.id === id)
          MEU_CARRINHO[objIndex].qntd += quantAtual // Soma a quantidade atual
        } else {
          // Caso ainda não exista o item no carrinho, adiciona ele
          // Adiciona o elemento ao carrinho com a quantidade atual
          elemento.qntd = quantAtual
          MEU_CARRINHO.push(elemento)
        }

        // carousel.metodos.mensagem('Item adicionado ao carrinho', 'green')
        // Atualiza a quantidade na interface para zero
        $('#quantInput-' + id).text(0)

        // Feedback para o usuário
        carousel.metodos.mensagem('Item adicionado ao carrinho', 'green')
      } else {
        // Se o elemento não for encontrado, exiba uma mensagem de erro
        carousel.metodos.mensagem('Produto não encontrado', 'red')
      }
    } else {
      // Se a quantidade atual for zero, exiba uma mensagem de erro ou aviso
      carousel.metodos.mensagem('Selecione uma quantidade válida', 'red')
    }

    carousel.metodos.atualizarBadgeTotal()
  },

  // Atualiza o badge de totais dos botões "Meu carrinho"
  atualizarBadgeTotal: () => {
    var total = 0

    $.each(MEU_CARRINHO, (i, e) => {
      total += e.qntd
    })

    if (total > 0) {
      $('.botao-carrinho').removeClass('hidden')
      $('.container-total-carrinho').removeClass('hidden')
    } else {
      $('.botao-carrinho').addClass('hidden')
      $('.container-total-carrinho').addClass('hidden')
    }

    $('.badge-total-carrinho').html(total)
  },

  // Abrir a modal de carrinho
  abrirCarrinho: abrir => {
    if (abrir) {
      $('#modalCarrinho').removeClass('hidden')
      carousel.metodos.carregarCarrinho()
    } else {
      $('#modalCarrinho').addClass('hidden')
    }
  },

  //Mensagens
  mensagem: (texto, cor = 'red', tempo = 3500) => {
    console.log('Chamando função mensagem...')
    let id = Math.floor(Date.now() * Math.random()).toString()
    let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`
    console.log('Mensagem criada:', msg)
    $('#container-mensagens').append(msg)

    setTimeout(() => {
      console.log('Removendo classes de animação...')
      $('#msg-' + id).removeClass('fadeInDown')
      $('#msg-' + id).addClass('fadeOutUp')
      setTimeout(() => {
        console.log('Removendo mensagem do DOM...')
        $('#msg-' + id).remove()
      }, 800)
    }, tempo)
  },

  //Altera os textos e exibe os botões das etapas
  carregarEtapa: etapa => {
    if (etapa == 1) {
      $('#lblTituloEtapa').text('Seu carrinho:')
      $('#itensCarrinho').removeClass('hidden')
      $('#localEntrega').addClass('hidden')
      $('#resumoCarrinho').addClass('hidden')

      $('.etapa').removeClass('active')
      $('.etapa1').addClass('active')

      $('#btnEtapaPedido').removeClass('hidden')
      $('#btnEtapaEndereco').addClass('hidden')
      $('#btnEtapaResumo').addClass('hidden')
      $('#btnVoltar').addClass('hidden')
    }

    if (etapa == 2) {
      $('#lblTituloEtapa').text('Endereço de entraga:')
      $('#itensCarrinho').addClass('hidden')
      $('#localEntrega').removeClass('hidden')
      $('#resumoCarrinho').addClass('hidden')

      $('.etapa').removeClass('active')
      $('.etapa1').addClass('active')
      $('.etapa2').addClass('active')

      $('#btnEtapaPedido').addClass('hidden')
      $('#btnEtapaEndereco').removeClass('hidden')
      $('#btnEtapaResumo').addClass('hidden')
      $('#btnVoltar').removeClass('hidden')
    }

    if (etapa == 3) {
      $('#lblTituloEtapa').text('Resumo do pedido:')
      $('#itensCarrinho').addClass('hidden')
      $('#localEntrega').addClass('hidden')
      $('#resumoCarrinho').removeClass('hidden')

      $('.etapa').removeClass('active')
      $('.etapa1').addClass('active')
      $('.etapa2').addClass('active')
      $('.etapa3').addClass('active')

      $('#btnEtapaPedido').addClass('hidden')
      $('#btnEtapaEndereco').addClass('hidden')
      $('#btnEtapaResumo').removeClass('hidden')
      $('#btnVoltar').removeClass('hidden')
    }
  },

  // Botão de voltar etapa
  voltarEtapa: () => {
    let etapa = $('.etapa.active').length
    carousel.metodos.carregarEtapa(etapa - 1)
  },

  // Carrega a lista de itens do carrinho
  carregarCarrinho: () => {
    carousel.metodos.carregarEtapa(1)

    if (MEU_CARRINHO.length > 0) {
      $('#itensCarrinho').html('')
      $.each(MEU_CARRINHO, (i, e) => {
        let temp = carousel.templates
          .itemCarrinho(e)
          .replace(/\${img}/g, e.img)
          .replace(/\${name}/g, e.name)
          .replace(/\${id}/g, e.id)
          .replace(/\${desc}/g, e.desc)
          .replace(/\${qntd}/g, e.qntd)

        // Verifica se e.price é um número antes de chamar toFixed()
        if (typeof e.price === 'number') {
          temp = temp.replace(
            /\${price}/g,
            e.price.toFixed(2).replace('.', ',')
          )
        } else {
          // Caso e.price não seja um número, você pode definir um valor padrão ou tratar de outra forma.
          temp = temp.replace(/\${price}/g, 'Preço indisponível')
        }

        $('#itensCarrinho').append(temp)

        // Último item
        if (i + 1 === MEU_CARRINHO.length) {
          carousel.metodos.carregarValores()
        }
      })
    } else {
      $('#itensCarrinho').html(
        '<p class="carrinho-vazio"><i class="fa-solid fa-cart-shopping"></i> Seu carrinho está vazio.</p>'
      )
      carousel.metodos.carregarValores()
    }
  },

  // Diminuir quantidade do item no carrinho
  diminuirQuantidadeCarrinho: id => {
    let qntdAtual = parseInt($('#qntd-carrinho-' + id).text())

    if (qntdAtual > 1) {
      $('#qntd-carrinho-' + id).text(qntdAtual - 1)
      carousel.metodos.atualizarCarrinho(id, qntdAtual - 1)
    } else {
      carousel.metodos.removerItemCarrinho(id)
    }
  },

  // Aumentar quantidade do item no carrinho
  aumentarQuantidadeCarrinho: id => {
    let qntdAtual = parseInt($('#qntd-carrinho-' + id).text())
    $('#qntd-carrinho-' + id).text(qntdAtual + 1)
    carousel.metodos.atualizarCarrinho(id, qntdAtual + 1)
  },

  // Botão remover item do carrinho
  removerItemCarrinho: id => {
    MEU_CARRINHO = $.grep(MEU_CARRINHO, (e, i) => {
      return e.id != id
    })
    carousel.metodos.carregarCarrinho()

    // Atualiza o botão carrinho com a quantidade atualizada
    carousel.metodos.atualizarBadgeTotal()
  },

  // Atualiza o carrinho com a quantidade atual
  atualizarCarrinho: (id, qntd) => {
    let objIndex = MEU_CARRINHO.findIndex(obj => obj.id == id)
    MEU_CARRINHO[objIndex].qntd = qntd

    // Atualiza o botão carrinho com a quantidade atualizada
    carousel.metodos.atualizarBadgeTotal()

    // Atualiza os valores (R$) totais do carrinho
    carousel.metodos.carregarValores()
  },

  // Carrega valores de subtotal, entrega e total.
  carregarValores: () => {
    let VALOR_CARRINHO = 0

    $('#lblSubtotal').text('R$ 0,00')
    $('#lblValorEntrega').text('+ R$ 0,00')
    $('#lblValorTotal').text('R$ 0,00')

    // Verifica se VALOR_ENTREGA é um número válido
    if (typeof VALOR_ENTREGA !== 'number' || isNaN(VALOR_ENTREGA)) {
      console.error('VALOR_ENTREGA não é um número válido:', VALOR_ENTREGA)
      VALOR_ENTREGA = 0
    }

    $.each(MEU_CARRINHO, (i, e) => {
      console.log('Price:', e.price)
      console.log('Quantity:', e.qntd)

      // Verifica se e.price e e.qntd são números válidos
      let price = parseFloat(e.price.replace(',', '.'))
      let qntd = parseInt(e.qntd)

      if (!isNaN(price) && !isNaN(qntd)) {
        VALOR_CARRINHO += price * qntd
      } else {
        console.error('Valor de preço ou quantidade inválido:', e.price, e.qntd)
      }

      if (i + 1 === MEU_CARRINHO.length) {
        console.log('VALOR_CARRINHO:', VALOR_CARRINHO)
        console.log('VALOR_ENTREGA:', VALOR_ENTREGA)

        $('#lblSubtotal').text(
          `R$ ${VALOR_CARRINHO.toFixed(2).replace('.', ',')}`
        )
        $('#lblValorEntrega').text(
          `+ R$ ${VALOR_ENTREGA.toFixed(2).replace('.', ',')}`
        )
        $('#lblValorTotal').text(
          `R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.', ',')}`
        )
      }
    })
  },

  // Carregar a etapa endereços
  carregarEndereco: () => {
    if (MEU_CARRINHO.length <= 0) {
      carousel.metodos.mensagem('Seu carrinho está vazio')
      return
    }

    carousel.metodos.carregarEtapa(2)
  },

  // API ViaCep
  buscarCep: () => {
    // Cria a variável com o valor do CEP
    var cep = $('#txtCEP').val().trim().replace(/\D/g, '')

    // Verifica se o CEP possui valor informado
    if (cep != '') {
      // Expressão regular para validar o CEP
      var validacep = /^[0-9]{8}$/

      if (validacep.test(cep)) {
        $.getJSON(
          'https://viacep.com.br/ws/' + cep + '/json/?callback=?',
          function (dados) {
            if (!('erro' in dados)) {
              // Atualizar os campos com os valores retornados
              $('#txtEndereco').val(dados.logradouro)
              $('#txtBairro').val(dados.bairro)
              $('#txtCidade').val(dados.localidade)
              $('#ddlUf').val(dados.uf)
              $('#txtNumero').focus()
            } else {
              carousel.metodos.mensagem(
                'CEP não encontrado. Preencha as informações manualmente.'
              )
              $('#txtEndereco').focus()
            }
          }
        )
      } else {
        carousel.metodos.mensagem('Formato de CEP inválido.')
        $('#txtCEP').focus()
      }
    } else {
      carousel.metodos.mensagem('Informe o CEP por favor.')
      $('#txtCEP').focus()
    }
  },

  // Validação antes de prosseguir para a etapa 3
  resumoPedido: () => {
    let cep = $('#txtCEP').val().trim()
    let endereco = $('#txtEndereco').val().trim()
    let bairro = $('#txtBairro').val().trim()
    let cidade = $('#txtCidade').val().trim()
    let uf = $('#ddlUf').val().trim()
    let numero = $('#txtNumero').val().trim()
    let complemento = $('#txtComplemento').val().trim()

    // Validação dos inputs de endereço
    if (cep.length <= 0) {
      carousel.metodos.mensagem('Informe o CEP por favor.')
      $('#txtCEP').focus()
      return
    }

    if (endereco.length <= 0) {
      carousel.metodos.mensagem('Informe o Endereço por favor.')
      $('#txtEndereco').focus()
      return
    }

    if (bairro.length <= 0) {
      carousel.metodos.mensagem('Informe o Bairro por favor.')
      $('#txtBairro').focus()
      return
    }

    if (cidade.length <= 0) {
      carousel.metodos.mensagem('Informe a Cidade por favor.')
      $('#txtCidade').focus()
      return
    }

    if (uf == '-1') {
      carousel.metodos.mensagem('Informe a UF por favor.')
      $('#ddlUf').focus()
      return
    }

    if (numero.length <= 0) {
      carousel.metodos.mensagem('Informe o Número por favor.')
      $('#txtNumero').focus()
      return
    }

    // Variável para salvar o endereço
    MEU_ENDERECO = {
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      numero: numero,
      complemento: complemento
    }

    carousel.metodos.carregarEtapa(3)
    carousel.metodos.carregarResumo()
  },

  // Carrega a etapa de resumo do pedido
  carregarResumo: () => {
    $('#listaItensResumo').html('')

    $.each(MEU_CARRINHO, (i, e) => {
      let temp = carousel.templates
        .itemResumo(e)
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${qntd}/g, e.qntd)

      // Verifica se e.price é um número e não é NaN
      if (typeof e.price === 'number' && !isNaN(e.price)) {
        temp = temp.replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
      } else {
        // Caso e.price não seja um número válido, define um valor padrão
        temp = temp.replace(/\${price}/g, 'Preço indisponível')
      }

      $('#listaItensResumo').append(temp)
    })

    $('#resumoEndereco').html(
      `${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`
    )
    $('#cidadeEndereco').html(
      `${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} ${MEU_ENDERECO.complemento}`
    )

    carousel.metodos.finalizarPedido()
  },

  // Atualiza o link do botão do WhatsApp
  finalizarPedido: () => {
    if (MEU_CARRINHO.length > 0 && MEU_ENDERECO != null) {
      let valorTotalCarrinho = 0
      let textoPedido =
        'Olá! Gostaria de fazer um pedido:\n*Itens do pedido:*\n\n'

      MEU_CARRINHO.forEach(item => {
        // Verifica se o preço é um número válido
        let precoNumero = parseFloat(item.price)
        if (!isNaN(precoNumero) && isFinite(precoNumero)) {
          // Calcula o subtotal de cada item (preço * quantidade)
          let subtotalItem = precoNumero * item.qntd
          valorTotalCarrinho += subtotalItem

          // Formata o preço do item para exibição
          let precoFormatado = precoNumero.toFixed(2).replace('.', ',')
          textoPedido += `*${item.qntd}x* ${item.name} ....... R$ ${precoFormatado}\n`
        } else {
          // Trata caso o preço não seja um número válido
          textoPedido += `*${item.qntd}x* ${item.name} ....... Preço indisponível\n`
        }
      })

      textoPedido += `\n*Endereço de entrega:*\n${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`

      let valorTotalPedido = valorTotalCarrinho + VALOR_ENTREGA
      textoPedido += `\n\n*Total (com entrega): R$ ${valorTotalPedido
        .toFixed(2)
        .replace('.', ',')}*`

      console.log(textoPedido)

      let encode = encodeURI(textoPedido)
      let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`

      $('#btnEtapaResumo').attr('href', URL)
    }
  }
}

carousel.templates = {
  itemAlimento: produto => `
    <div class="card-alimentos" id=${produto.id}>
    <img src="${produto.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-subtitle mb-2 text-body-secondary">${produto.name}</h5>
      <p class="fs-6 text-capitalize">${produto.desc}
      </p>
      <h5 class="card-title" style="color: var(--color-secondary);">R$ ${produto.price}</h5>
    </div>
    <div class="card-footer">
      <div class="row mx-auto py-2">
        <div class="col ">
          <div class="quantidade">
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.diminuirQuantidade('${produto.id}')"><i class="fa-solid fa-minus"></i></span>
            <span class="btn btn-primary btn-sm" id="quantInput-${produto.id}" >0</span>
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.aumentarQuantidade('${produto.id}')"><i class="fa-solid fa-plus"></i></span>
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.adicionarAoCarrinho('${produto.id}', 'alimentos')">Comprar</span>
          </div>
        </div>
      </div>
    </div>
  </div>

    `,
  itemMedicamentos: produto => `
    <div class="card-medicamentos" id=${produto.id}>
    <img src="${produto.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-subtitle mb-2 text-body-secondary">${produto.name}</h5>
      <p class="fs-6 text-capitalize">${produto.desc}
      </p>
      <h5 class="card-title" style="color: var(--color-secondary);">R$ ${produto.price}</h5>
    </div>
    <div class="card-footer">
      <div class="row mx-auto py-2">
        <div class="col ">
          <div class="quantidade">
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.diminuirQuantidade('${produto.id}')"><i class="fa-solid fa-minus"></i></span>
            <span class="btn btn-primary btn-sm" id="quantInput-${produto.id}" >0</span>
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.aumentarQuantidade('${produto.id}')"><i class="fa-solid fa-plus"></i></span>
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.adicionarAoCarrinho('${produto.id}', 'medicamentos')">Comprar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
      `,

  itemCarrinho: produto => `
  <div class="col-12 item-carrinho">
            <div class="img-produto">
              <img src="${produto.img}"
                alt="">
            </div>
            <div class="dados-produto">
              <p class="title-produto"><b>${produto.name}</b></p>
              <p >${produto.desc}</p>
              <p class="price-produto"><b>R$ ${produto.price}</b></p>
            </div>
            <div class="add-carrinho">
            <span class="btn btn-primary btn-sm" onclick="carousel.metodos.diminuirQuantidadeCarrinho('${produto.id}')"><i class="fa-solid fa-minus"></i></span>
          <span class="btn btn-primary btn-sm" id="qntd-carrinho-${produto.id}">${produto.qntd}</span>
          <span class="btn btn-primary btn-sm" onclick="carousel.metodos.aumentarQuantidadeCarrinho('${produto.id}')"><i class="fa-solid fa-plus"></i></span>
              <span class="btn btn-remove no-mobile" onclick="carousel.metodos.removerItemCarrinho('${produto.id}')">
                <i class="fas fa-times"></i>
              </span>
            </div>
          </div>
  `,
  itemResumo: produto => `
  <div class="col-12 item-carrinho resumo">
  <div class="img-produto-resumo">
    <img src="${produto.img}"
      alt="">
  </div>
  <div class="dados-produto">
    <p class="title-produto-resumo">
      <b>${produto.name}</b>
    </p>
    <p class="price-produto-resumo">
      <b>R$ ${produto.price}</b>
    </p>
  </div>
  <p class="quantidade-produto-resumo">
    x <b>${produto.qntd}</b>
  </p>
</div>
  `
}
