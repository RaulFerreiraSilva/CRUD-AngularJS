var crud = angular.module("crud", [])

crud.controller("controller", function ($scope, $http) { // scope ligação da view com o controller

    $scope.payload = {}// array vazio
    $scope.contatoSelecionado = {}

    $scope.novoEndereco = {}
    $scope.enderecoSelecionado = {}
    
    $scope.contatos = []
    $scope.enderecos = []

    $scope.idContato
    listagemPessoa()



    

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

    function listagemEndereco() {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Endereco/GetAll/${idContato}`,
            method: 'GET',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {

            $scope.enderecos = response.data.data
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

    $scope.saveEndereco = function () {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Endereco`,
            method: 'POST',
            data: $scope.novoEndereco,
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

    $scope.selecionaEndereco = function (endereco) {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${endereco.enderecoId}`,
            method: 'GET',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
            $scope.enderecoSelecionado = response.data.data
            $scope.idEndereco = endereco.enderecoId
            console.log(response.data.data)

        }, function errorCallback(err) {
            console.log(endereco.enderecoId)
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

    $scope.alteraEndereco = function () {
        console.log($scope.idEndereco)
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${$scope.idEndereco}`,
            method: 'PUT',
            data: $scope.enderecoSelecionado,
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
    
            $scope.enderecos = response.data.data
            listagemEndereco()
            console.log(response.data.data)

        }, function errorCallback(err) {
            console.error(err);
            console.log($scope.enderecoSelecionado)
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

    $scope.deletaEndereco = function () {
        $http({
            url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${$scope.idEndereco}`,
            method: 'DELETE',
            headers: {
                Chave: "D3ACDDF7-7CD7-4CA0-B65B-3EEE92396801"
            }
        }).then(function successCallback(response) {
            
            $scope.enderecoSelecion = response.data.data
            listagemEndereco()
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