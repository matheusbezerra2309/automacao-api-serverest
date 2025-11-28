describe('GET /usuarios - Busca com todos filtros', () => {
    it('Cenário 3 - Buscar usuário usando todos os query params', () => {
        cy.fixture('usuarios-existentes.json').then((usuario) => {
            const admin = usuario.administradorExistente
            cy.request({
                method: 'GET',
                url: '/usuarios',
                qs: {
                    _id: admin._id,
                    nome: admin.nome,
                    email: admin.email,
                    password: admin.password,
                    administrador: admin.administrador
                },
                headers: {
                    accept: 'application/json'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('quantidade')
                expect(response.body.usuarios).to.be.an('array')
                expect(response.body.quantidade).to.eq(1)
                const usuarioRetornado = response.body.usuarios[0]
                expect(usuarioRetornado).to.have.property('_id', admin._id)
                expect(usuarioRetornado).to.have.property('nome', admin.nome)
                expect(usuarioRetornado).to.have.property('email', admin.email)
                expect(usuarioRetornado).to.have.property('password', admin.password)
                expect(usuarioRetornado).to.have.property('administrador', admin.administrador)
            })
        })
    })
})