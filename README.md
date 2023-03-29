# Cadastro de carros

**RF**
Deve ser possível cadastrar carros
Deve ser possível listar todas as categorias

**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente.
Não deve ser possivel alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um user admin.

# listagem de carros

**RF**
Deve ser possivel listar todos os carros disponíveis.
Deve ser possivel listar todos os carros pelo nome da categoria
Deve ser possivel listar todos os carros pelo nome da marca
Deve ser possivel listar todos os carros pelo nome do carro
**RN**
O usuário Não precisa está logado no sistema para fazer a listagem de carros

# Cadastro de especificações dos carros

**RF**
Deve ser possivel cadastrar especificação dos carros
Deve ser possivel listar todas as especificações
Deve ser possivel listar todos os carros
**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para um mesmo carro
O usuário responsável pelo cadastro deve ser um user admin.

# Cadastro de imagens dos carros

**RF**
Deve ser possivel cadastrar a imagem carro
Deve ser possivel listar todos os carros
**RNF**
Utilizar o multer para o upload dos arquivos

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um user admin.

# Alugel de carros

**RF**
Deve ser possivel cadastrar aluguel

**RN**
O aluguel deve ter duração mínimo de 24h.
Não deve ser possivel cadastrar um aluguel caso já exista um aluguel par ao mesmo usuário.
Não deve ser possivel cadastrar um aluguel caso já exista um aluguel par ao mesmo carro.



