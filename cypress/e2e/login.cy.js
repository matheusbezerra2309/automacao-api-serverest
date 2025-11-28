describe('ServeRest - Login API', () => {
  it('Cenário 1 - Realizar login com sucesso e retornar token', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        email: Cypress.env('email'),
        password: Cypress.env('password')
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message', 'Login realizado com sucesso')
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization.split(' ')[1]
      cy.wrap(token).as('authToken') 

    })
  })

  it('Cenário 2 - Verificar mensagem de erro ao incluir credenciais incorretas', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        email: Cypress.env('email'),
        password: 'senha_errada'
      }
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  })
})