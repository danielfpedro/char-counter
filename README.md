# Nice Char Counter

### Instalação
```
bower install nice-char-counter
```

### Como usar

###### Javascript

```javascript
$('#element').niceCharCounter({//opções aqui});
```
###### HTML

```html
<textarea id="element"></textarea>
<div id="counter"></div>
```

### Opções
```javascript
limit: (int)100,
descending: (boolean)true,
warningPercent: (int)70,
clearLimitColor: (string)"#29b664",
warningColor: (string)"#c0392b",
overColor: (string)"#e74c3c",
counter: (string)"#counter",
text: (string)"{{counter}}",
hardLimit: (boolean)false,
// Eventos e Triggers
onType: function(ui, state, options){
},
clearLimitTrigger: function(ui, options){	
},
onClearLimit: function(ui, options){
},
warningTrigger: function(ui, options){
},
onWarning: function(ui, options){
},
overTrigger: function(ui, options){
},
onOver: function(ui, options){	
}
```

* (object) ui
 * (int) total 
 * (int) remaining
 * (int) remainingPercent
* (string) state
* (object) options
 * Opções passadas no plugin

### Estados
* clearLimit - Total de characteres digitados é maior que a zona de `warning`.
* warning - Total de characteres digitados está na zona de `warning`.
* over - Total de characteres digitados foi excedido.

### Evento
É disparado a cada vez que a tecla é presionada de acordo com o estado atual.

### Trigger
É disparado apenas uma vez a cada estado atual.

### Contador
Para uma maior flexibilidade você deve especificar o elemento aonde será renderizadoo contador, com isso você poderá coloca-lo em qualquer parte do documento e inserir classes extras para customização.

### Placeholders do texto do contador
* {{counter}} - Caracteres restantes (descending = true) ou total de caracteres digitados (descending = false)
* {{limit}} - Limite de caracteres

### Texto do contador com palavras no singular ou plural
Exemplo: 
```javascript
text: '{{counter}} caracte[r, res] restant[e, es] de um total de {{limit}}...' 
```

### Hard Limit
Caso a opção `hardlimit` seja setada como `true` o plugin irá usar o atributo `maxlength` na `textarea`. Versões mais antigas de alguns Browsers não interpretam `maxlength` em `textareas` logo esta opção não surtirá efeito.