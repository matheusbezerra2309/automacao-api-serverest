describe('DELETE /usuarios/{id} – Todos os cenários (com fixture)', () => {
    it('Cenário 9 – DELETE com sucesso (cadastrados no teste anterior)', function () {
        cy.fixture('novo-usuario.json').then((dados) => {
            const usuario = dados.admin

            cy.request({
                method: 'GET',
                url: `/usuarios`,
                headers: { accept: 'application/json' },
                qs: {
                    nome: usuario.nome
                }

            }).then((response) => {
                expect(response.status).to.eq(200)
                const _idDeletar = response.body.usuarios[0]._id

                cy.request({
                    method: 'DELETE',
                    url: `/usuarios/${_idDeletar}`,
                    headers: { accept: 'application/json' }
                }).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.body.message).to.eq('Registro excluído com sucesso')
                })

            })
        })

        it('Cenário 10 – DELETE em ID que não existe → 200 + "Nada foi excluído"', function () {
            cy.request({
                method: 'DELETE',
                url: '/usuarios/IDqueNuncaExistiu123456789',
                failOnStatusCode: false
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body.message).to.eq('Nenhum registro excluído')
            })
        })

    })
})