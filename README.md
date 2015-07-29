# Nice Char Counter

### Como usar

1. Javascript

```javascript
$('#element').niceCharCounter({//opções aqui});
```
2. HTML

```html
<textarea id="element"></textarea>
<div id="counter"></div>
```

### Opções
```javascript
limit: (int)100,
descending: (boolean)true,
warningPercent: (int)70,
successColor: (string)"#29b664",
warningColor: (string)"#c0392b",
overColor: (string)"#e74c3c",
counter: (string)"#counter",
text: (string)"{{remainder}}",
hardLimit: (boolean)false,
// Eventos e Triggers
onType: function(ui, state, options){
},
clearLimitTrigger: function(ui, state, options){	
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

### Contador
Para uma maior flexibilidade você deve especificar o elemento aonde será renderizadoo contador, com isso você poderá coloca-lo em qualquer parte do documento e inserir classes extras para customização.

### Texto do contador
Você pode customizar o texto do contador usando a opção `text`. Use o placeholder `{{remainder}}` para mostrar o total dos caracteres restantes, por exemplo:

```javascript
text: '{{remainder}} caracteres restantes...' 
```

### Estados
* clearLimit - Total de characteres digitados é maior que a zona de `warning`.
* warning - Total de characteres digitados está na zona de `warning`.
* over - Total de characteres digitados foi excedido.

### Evento
É disparado a cada vez que a tecla é presionada de acordo com o estado atual.

### Trigger
É verificado a cada vez que a tecla é presionada e disparado apenas uma vez a cada estado atual.

### Hard Limit
Caso a opção `hardlimit` seja setada como `true` o plugin irá usar o atributo `maxlength` na `textarea`. Versões mais antigas de alguns Browsers não interpretam `maxlength` em `textareas` logo esta opção não surtirá efeito.