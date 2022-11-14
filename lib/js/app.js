var crud = angular.module("crud", [])

crud.controller("controller", function ($scope) { // scope ligação da view com o controller

    $scope.novoContato = {} // array vazio
    $scope.contatoSelecionado = {}
    $scope.novoEndereco = {}
    $scope.enderecoContato = {}


    $scope.contatos = [
        {
            nome: "Nair Olivia Castro", idade: 69, dataNascimento: "18/01/1953", email: "nair_castro@scuderiagwr.com.br", telefone: "(41) 3560-8208", celular: "(41) 98766-5203"
        },
        {
            nome: "Mair Olivia Castro", idade: 19, dataNascimento: "18/01/1953", email: "nair_castro@scuderiagwr.com.br", telefone: "(41) 3560-8208", celular: "(41) 98766-5203"
        }
    ]

    $scope.enderecos = [
        {
            logradouro: "Rua Alterosa", numero: 817, bairro: "Bairro Alto", cidadeUF: "Curitiba-PR"
        }, 
        {
            logradouro: "Rua Professor Oliverios Vilaça", numero: 456, bairro: "Cidade Industrial", cidadeUF: "Curitiba-PR"
        }
    ]

    $scope.inserirContato = function () { // jogando as info dentro do array
        $scope.contatos.push($scope.novoContato)
        $scope.novoContato = {};//limpa o array
    }

    $scope.inserirEndereco = function () { // jogando as info dentro do array
        $scope.enderecos.push($scope.novoEndereco)
        $scope.novoEndereco = {};//limpa o array
    }

    $scope.selecionaContato = function (contato) {
        $scope.contatoSelecionado = contato
    }

    $scope.deletaContato = function () { // metodo aplice alterar ou excluir algo de um array
        $scope.contatos.splice($scope.contatos.indexOf($scope.contatoSelecionado), 1) 
        $scope.enderecos.splice($scope.enderecos.indexOf($scope.contatoSelecionado), 1)
        
        // sintax do splice(pego o array de contato.pego o index do contato selecionado e informa quantos ira excluir apartir dele)
    }

    $scope.ordenarPor = function(campo){
        $scope.criterioDeOrdenacao = campo
        $scope.direcao = !$scope.direcao
    }

})