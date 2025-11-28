describe('PUT /usuarios/{id} – Atualiza usuário (com fixture)', () => {
    it('Cenário 7 - Deve atualizar nome, email e senha do admin fixo com sucesso', function () {
        cy.fixture('usuarios-existentes.json').then((dados) => {
            const user = dados.administradorExistente
            const novo = dados.dadosAtualizar

            cy.request({
                method: 'PUT',
                url: `/usuarios/${user._id}`,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: novo
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            })
        })
    })

    it('Validação: os dados realmente foram alterados', function () {
        cy.fixture('usuarios-existentes.json').then((dados) => {
            const user = dados.administradorExistente
            const novo = dados.dadosAtualizar

            cy.request({
                method: 'GET',
                url: `/usuarios/${user._id}`,
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body.nome).to.eq(novo.nome)
                expect(resp.body.email).to.eq(novo.email)
                expect(resp.body.administrador).to.eq(novo.administrador)
            })
        })
    })

    it('Cenário 8 - Tentar atualizar com email duplicado', function () {
        cy.fixture('usuarios-existentes.json').then((dados) => {
            const user = dados.administradorExistente
            const dadosDuplicados = dados.outroAdmin

            cy.request({
                method: 'PUT',
                url: `/usuarios/${user._id}`,
                body: {
                    "nome": user.nome,
                    "email": dadosDuplicados.email,
                    "password": user.password,
                    "administrador": user.administrador
                },
                failOnStatusCode: false
            }).then((resp) => {
                expect(resp.status).to.eq(400)
                expect(resp.body.message).to.eq('Este email já está sendo usado')
            })
        })
    })

    it('Config Cleanup: devolve os dados originais do user', function () {
        cy.fixture('usuarios-existentes.json').then((dados) => {
            const original = dados.administradorExistente

            cy.request({
                method: 'PUT',
                url: `/usuarios/${original._id}`,
                body: {
                    nome: original.nome,
                    email: original.email,
                    password: original.password,
                    administrador: original.administrador
                }
            }).then((resp) => {
                expect(resp.status).to.eq(200)
            })
        })
    })

})