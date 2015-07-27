# Nice Char Counter

### Como usar

    ```javascript
    $('#element').niceCharCounter({//opções aqui});
    ```

### Opções
* limit: (int)100,
* warningPercent: (int)70,
* successColor: (string)"#29b664",
* warningColor: (string)"#c0392b",
* overColor: (string)"#e74c3c",
* containerText: (string)"#counter-text",
* text: (string)"{{remainder}}",
* hardLimit: (boolean)false

### Texto do contador
Você pode customizar o texto do contador usando a opção `text`. Use o placeholder `{{remainder}}` para mostrar o total dos caracteres restantes, por exemplo:

    ```javascript
    text: '{{remainder}} caracteres restantes...' 
    ```

	```javascript
	$("#element").defaultPluginName({
		propertyName: "a custom value"
	});
	```

### Hard Limit
Caso a opção `hardlimit` seja setada como `true` o plugin irá usar o atributo `maxlength` na `textarea`. Versões mais antigas de alguns Browsers não interpretam `maxlength` em `textareas` logo esta opção não surtirá efeito.
