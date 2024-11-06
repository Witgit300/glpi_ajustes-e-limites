GLPI - Ajustes e Limites

Este plugin para GLPI oferece múltiplas funcionalidades para aprimorar a interface do usuário, incluindo a desativação do preenchimento automático (autocomplete) em campos de entrada, limitação da quantidade de itens por página em dropdowns e desativação de botões de ação quando mais de um número específico de checkboxes é selecionado.
Instalação

    Download do Plugin:
        Baixe os arquivos do plugin e extraia-os.

    Colocação na Pasta de Plugins:
        Mova a pasta extraída para a diretoria plugins do seu diretório de instalação do GLPI.

    mv glpi-ajustes-e-limites /caminho/para/glpi/plugins/

    Ativação do Plugin:
        Acesse o painel de administração do GLPI.
        Navegue até Configuração > Plugins.
        Encontre o GLPI - Ajustes e Limites na lista e clique em Instalar.
        Após a instalação, clique em Ativar para começar a utilizar as funcionalidades do plugin.

Configuração

Após a instalação, você pode configurar quais funcionalidades deseja ativar ou desativar, bem como definir os valores utilizados por elas. Essas configurações são definidas diretamente no script JavaScript do plugin.
Variáveis de Controle

No início do script, existem variáveis que controlam a ativação de cada funcionalidade:

const config = {
    disableAutocomplete: true,                // Ativar/Desativar desabilitação de autocomplete
    limitItemsPerPage: true,                  // Ativar/Desativar limitação de itens por página no dropdown
    disableActionButtonOnCheckboxes: true     // Ativar/Desativar desabilitação do botão de ação com checkboxes
};

    disableAutocomplete: Define se o preenchimento automático deve ser desabilitado em todos os campos de entrada.
    limitItemsPerPage: Define se a quantidade de itens por página nos dropdowns deve ser limitada.
    disableActionButtonOnCheckboxes: Define se o botão de ação deve ser desabilitado quando mais de um número específico de checkboxes estiver selecionado.

Valores de Configuração

Além das variáveis de controle, há configurações para definir os valores utilizados pelas funcionalidades:

const settings = {
    maxItemsPerPage: 20,                      // Limite máximo de itens por página
    maxSelectedCheckboxes: 5                   // Número máximo de checkboxes selecionados antes de desabilitar o botão
};

    maxItemsPerPage: Define o limite máximo de itens que podem ser exibidos por página em dropdowns específicos.
    maxSelectedCheckboxes: Define o número máximo de checkboxes que podem ser selecionados antes que o botão de ação seja desabilitado.

Funcionalidades
1. Desabilitar Autocomplete

    Descrição: Remove sugestões de preenchimento automático de todos os campos <input> para evitar preenchimento automático indesejado.
    Como Funciona:
        Aplica o atributo autocomplete="off" em todos os campos de entrada existentes.
        Utiliza o MutationObserver para monitorar alterações no DOM e aplicar o atributo aos novos campos de entrada adicionados dinamicamente.

2. Limitar Itens por Página em Dropdowns

    Descrição: Restringe o número de opções disponíveis em dropdowns específicos para melhorar a usabilidade e evitar sobrecarga de informações.
    Como Funciona:
        Remove opções que excedem o limite definido por maxItemsPerPage.
        Ajusta o valor selecionado no dropdown para o limite máximo, se necessário.
        Utiliza o MutationObserver para monitorar alterações no DOM e reaplicar a limitação quando dropdowns são modificados.

3. Desabilitar Botão de Ação com Base em Seleções de Checkboxes

    Descrição: Impede que o botão de ação seja clicado quando mais de um número definido de checkboxes estiver selecionado, prevenindo ações excessivas ou indesejadas.
    Como Funciona:
        Monitora a quantidade de checkboxes selecionados.
        Adiciona a classe disabled e desabilita eventos de ponteiro no botão de ação quando o número de seleções excede maxSelectedCheckboxes.
        Utiliza delegação de eventos para garantir que checkboxes adicionados dinamicamente também sejam monitorados.
        Aplica atributos ARIA para melhorar a acessibilidade.

Tecnologias Usadas

    JavaScript:
        jQuery: Facilita a manipulação do DOM e a implementação de funcionalidades interativas.
        MutationObserver: Permite monitorar mudanças no DOM e aplicar funcionalidades a elementos adicionados dinamicamente.



Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com melhorias, correções de bugs ou novas funcionalidades

