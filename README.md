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
onType: function((int)total, (int)remaining, (int)remainingPercent, (object)options){
},
clearLimitTrigger: function((int)total, (int)remaining, (int)remainingPercent, (object)options){	
},
onClearLimit: function((int)total, (int)remaining, (int)remainingPercent, (object)options){
},
warningTrigger: function((int)total, (int)remaining, (int)remainingPercent, (object)options){
},
onWarning: function((int)total, (int)remaining, (int)remainingPercent, (object)options){
},
overTrigger: function((int)total, (int)remaining, (int)remainingPercent, (object)options){
},
onOver: function((int)total, (int)remaining, (int)remainingPercent, (object)options){	
}
```

### Contador
Para uma maior flexibilidade você deve especificar o elemento aonde será renderizadoo contador, com isso você poderá coloca-lo em qualquer parte do documento e inserir classes extras para customização.

### Texto do contador
Você pode customizar o texto do contador usando a opção `text`. Use o placeholder `{{remainder}}` para mostrar o total dos caracteres restantes, por exemplo:

```javascript
text: '{{remainder}} caracteres restantes...' 
```
### Eventos
Os eventos são disparados quando qualquer tecla é presionada e lógica é satisfeita, segue abaixo a referencia:

* onType - Sempre é disparado.
* onClearLimit - Quando o total de caracteres é maior que o limite do `warning`.
* onWarning - Quando está na zona do warning.
* onOver - Quando o total de characteres digitados excede o limite.

### Hard Limit
Caso a opção `hardlimit` seja setada como `true` o plugin irá usar o atributo `maxlength` na `textarea`. Versões mais antigas de alguns Browsers não interpretam `maxlength` em `textareas` logo esta opção não surtirá efeito.
