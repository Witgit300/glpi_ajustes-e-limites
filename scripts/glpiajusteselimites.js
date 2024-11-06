$(document).ready(function() {
    // ==============================
    // Configurações de Controle
    // ==============================

    // Controle de funcionalidades (on/off)
    const config = {
        disableAutocomplete: true,                // Ativar/Desativar desabilitação de autocomplete
        limitItemsPerPage: true,                  // Ativar/Desativar limitação de itens por página no dropdown
        disableActionButtonOnCheckboxes: true     // Ativar/Desativar desabilitação do botão de ação com checkboxes
    };

    // Valores de configuração
    const settings = {
        maxItemsPerPage: 20,                      // Limite máximo de itens por página
        maxSelectedCheckboxes: 5                   // Número máximo de checkboxes selecionados antes de desabilitar o botão
    };

    // ==============================
    // 1. Desabilitar Autocomplete
    // ==============================

    if (config.disableAutocomplete) {
        // Função para desabilitar autocomplete em inputs
        function disableAutocomplete($inputs) {
            $inputs.attr('autocomplete', 'off');
        }

        // Desabilitar autocomplete em inputs existentes
        disableAutocomplete($('input'));

        // Observar alterações no DOM para desabilitar autocomplete em novos inputs
        const autofillObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Verifica e desabilita autocomplete em nós adicionados
                const $addedNodes = $(mutation.addedNodes);
                const $newInputs = $addedNodes.find('input').addBack('input');
                if ($newInputs.length > 0) {
                    disableAutocomplete($newInputs);
                }
            });
        });

        autofillObserver.observe(document.body, { childList: true, subtree: true });
    }

    // ===========================================
    // 2. Limitar a Quantidade de Itens por Página
    // ===========================================

    if (config.limitItemsPerPage) {
        // Função para aplicar o limite no dropdown
        function applyLimitToDropdown() {
            const $dropdown = $('select.form-select.search-limit-dropdown');

            if ($dropdown.length > 0) {
                $dropdown.find('option').each(function() {
                    const value = parseInt($(this).val(), 10);
                    if (value > settings.maxItemsPerPage) {
                        $(this).remove();
                    }
                });

                // Ajusta o valor para o limite máximo, se necessário
                const currentVal = parseInt($dropdown.val(), 10);
                if (currentVal > settings.maxItemsPerPage) {
                    $dropdown.val(settings.maxItemsPerPage).trigger('change');
                }

                console.log(`Limite de itens por página ajustado para no máximo ${settings.maxItemsPerPage}`);
            }
        }

        // Aplicar a limitação inicialmente
        applyLimitToDropdown();

        // Observar alterações no DOM para aplicar o limite quando o dropdown for modificado
        const dropdownObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                applyLimitToDropdown();
            });
        });

        // Observe o container do dropdown de forma mais específica, se possível
        const dropdownContainer = $('select.form-select.search-limit-dropdown').parent();
        if (dropdownContainer.length > 0) {
            dropdownObserver.observe(dropdownContainer[0], { childList: true, subtree: true });
        } else {
            // Fallback para observar o body se o container específico não for encontrado
            dropdownObserver.observe(document.body, { childList: true, subtree: true });
        }
    }

    // ===============================================================
    // 3. Desabilitar Botão de Ação com Base na Seleção de Checkboxes
    // ===============================================================

    if (config.disableActionButtonOnCheckboxes) {
        // Função para obter o botão de ação
        function getActionButton() {
            return $('a[href^="#modal_massaction_"]');
        }

        // Função para atualizar o estado do botão de ação
        function updateActionButtonState() {
            const checkedCount = $('input[type="checkbox"]:checked').length;
            const $actionButton = getActionButton();

            if ($actionButton.length === 0) {
                // Se o botão de ação não estiver no DOM, não faz nada
                return;
            }

            if (checkedCount > settings.maxSelectedCheckboxes) {
                $actionButton.addClass('disabled')
                             .css('pointer-events', 'none')
                             .attr('aria-disabled', 'true');
            } else {
                $actionButton.removeClass('disabled')
                             .css('pointer-events', '')
                             .attr('aria-disabled', 'false');
            }
        }

        // Delegar o evento 'change' para capturar dinamicamente checkboxes adicionados
        $(document).on('change', 'input[type="checkbox"]', updateActionButtonState);

        // Observar alterações no DOM para atualizar o estado do botão quando novos checkboxes forem adicionados
        const checkboxObserver = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if ($(mutation.addedNodes).find('input[type="checkbox"]').length > 0 ||
                    $(mutation.addedNodes).is('input[type="checkbox"]')) {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                updateActionButtonState();
            }
        });

        checkboxObserver.observe(document.body, { childList: true, subtree: true });

        // Executar a função no carregamento inicial da página
        updateActionButtonState();
    }
});

