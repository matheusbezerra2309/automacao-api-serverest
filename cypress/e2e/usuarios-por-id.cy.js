describe('GET /usuarios/{id} – Busca por ID específico (usando fixture)', () => {

  it('Cenário 5 - Deve retornar os dados corretos', function () {
    cy.fixture('usuarios-existentes.json').then((dados) => {
      const usuario = dados.administradorExistente

      cy.request({
        method: 'GET',
        url: `/usuarios/${usuario._id}`,
        headers: { accept: 'application/json' }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.nome).to.eq(usuario.nome)
        expect(response.body.email).to.eq(usuario.email)
        expect(response.body.administrador).to.eq(usuario.administrador)
        expect(response.body).to.have.property('_id', usuario._id)

      })
    })
  })

  it('Cenário 6 - Deve retornar 400 ao buscar ID com formato errado', function () {
    cy.fixture('usuarios-existentes.json').then((dados) => {
      const usuario = dados.DadosInvalidos

      cy.request({
        method: 'GET',
        url: `/usuarios/${usuario._id}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })
})