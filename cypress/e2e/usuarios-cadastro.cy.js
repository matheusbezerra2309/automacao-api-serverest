it('Cenário 4 - Cadastro usando fixture Admin e Não-Admin', () => {
  cy.fixture('novo-usuario').then((template) => {
    const usuario = template.admin
    const usuarioNaoAdm = template.comum

    const random = Cypress._.random(0, 999999)
    const emailFinal = usuario.email.replace('{{random}}', random)
    const emailFinalNaoAdm = usuarioNaoAdm.email.replace('{{random}}', random)

    cy.request('POST', '/usuarios', {
      nome: usuario.nome,
      email: emailFinal,
      password: usuario.password,
      administrador: usuario.administrador
    }).then((resp) => {
      expect(resp.status).to.eq(201)
      expect(resp.body.message).to.eq('Cadastro realizado com sucesso')
      Cypress.env('novoUsuarioId', resp.body._id) 
    })

  })
})