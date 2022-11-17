var crud = angular.module("crud", [])

crud.controller("controller", function ($scope, $http) { // scope ligação da view com o controller

    $scope.payload = {}
    $scope.novoContato = {} // array vazio
    $scope.contatoSelecionado = {}
    $scope.novoEndereco = {}
    $scope.enderecoContato = {}
    $scope.contatos = []
    $scope.idContato
    listagemPessoa()



    $scope.enderecos = [
        {
            logradouro: "Rua Alterosa", numero: 817, bairro: "Bairro Alto", cidadeUF: "Curitiba-PR"
        },
        {
            logradouro: "Rua Professor Oliverios Vilaça", numero: 456, bairro: "Cidade Industrial", cidadeUF: "Curitiba-PR"
        }
    ]

    function listagemPessoa() {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/GetAll`,
            method: 'GET',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {

            $scope.contatos = response.data.data
            console.log($scope.contatos)

        }, function errorCallback(err) {
            console.error(err);
        })
    }

    $scope.save = function () {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas`,
            method: 'POST',
            data: $scope.payload,
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
            listagemPessoa()
            console.log(response)

        }, function errorCallback(err) {
            console.error(err);
        })
    }


    $scope.inserirContato = function () { // jogando as info dentro do array
        $scope.contatos.push($scope.novoContato)
        $scope.novoContato = {};//limpa o array
    }

    $scope.inserirEndereco = function () { // jogando as info dentro do array
        $scope.enderecos.push($scope.novoEndereco)
        $scope.novoEndereco = {};//limpa o array
    }

    $scope.selecionaContato = function (contato) {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${contato.pessoaId}`,
            method: 'GET',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
            $scope.contatoSelecionado = response.data.data
            $scope.idContato = contato.pessoaId
            console.log(response.data.data)

        }, function errorCallback(err) {
            console.log(contato.pessoaId)
            console.error(err);
        })
    }

    $scope.alteraContato = function () {
        console.log($scope.idContato)
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${$scope.idContato}`,
            method: 'PUT',
            data: $scope.contatoSelecionado,
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
    
            $scope.contatos = response.data.data
            listagemPessoa()
            console.log(response.data.data)

        }, function errorCallback(err) {
            console.error(err);
            console.log($scope.contatoSelecionado)
        })
    }

    $scope.deletaContato = function () {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${$scope.idContato}`,
            method: 'DELETE',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
            
            $scope.contatoSelecionado = response.data.data
            listagemPessoa()
            console.log(response)

        }, function errorCallback(err) {
            console.error(err);
        })
    }

    $scope.deletaContatos = function () { // metodo aplice alterar ou excluir algo de um array
        $scope.contatos.splice($scope.contatos.indexOf($scope.contatoSelecionado), 1)
        $scope.enderecos.splice($scope.enderecos.indexOf($scope.contatoSelecionado), 1)

        // sintax do splice(pego o array de contato.pego o index do contato selecionado e informa quantos ira excluir apartir dele)
    }

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo
        $scope.direcao = !$scope.direcao
    }

})