function init(id){
var elt= $('#widget'+id+' #calculator'+id);
 $('#widget' + id + ' #calculator'+id).css('height', '450px');
    $('#widget' + id + ' #calculator'+id).css('width', '650px');
  var calculator = Desmos.Calculator(elt);
  calculator.setExpression({id:'graph1', latex:'y=x^3'});
}