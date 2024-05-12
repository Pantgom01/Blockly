// Función para mover el objeto hacia adelante
function moveForward() {
    var objeto = document.getElementById('objeto');
    var currentTop = parseInt(objeto.style.top) || 0;
    objeto.style.top = (currentTop + 10) + 'px';
  }
  

// Definición del bloque repeat_times
Blockly.Blocks['repeat_times'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("repetir")
          .appendField(new Blockly.FieldNumber(0, 0), "TIMES")
          .appendField("veces");
      this.appendStatementInput("DO")
          .setCheck(null)
          .appendField("hacer");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  // Definir generador de código para el bloque repeat_times
  Blockly.JavaScript['repeat_times'] = function(block) {
    var times = block.getFieldValue('TIMES');
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  
    var code = '';
    code += 'for (var i = 0; i < ' + times + '; i++) {\n';
    code += statements_do + '\n';
    code += '}\n';
    return code;
  };

  // Definición del bloque move_forward
  Blockly.Blocks['move_forward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("mover hacia adelante");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  // Definir generador de código para el bloque move_forward
  Blockly.JavaScript['move_forward'] = function(block) {
    // Generar código para mover hacia adelante
    var code = 'moveForward();\n';
    return code;
  };
  
  // Función para ejecutar el código generado por Blockly
  function runCode() {
    // Obtener el código generado por Blockly
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log('Código generado:', code);
  
    // Ejecutar el código en un contexto aislado
    try {
      (function() {
        eval(code);
      }).call(this);
    } catch (error) {
      console.error('Error al ejecutar el código:', error);
    }
  }

  // Función para reiniciar la posición del objeto
function resetPosition() {
    var objeto = document.getElementById('objeto');
    objeto.style.top = '50px';
  }

// Añadir un event listener para el evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    resetPosition(); // Llamar a la función resetPosition una vez que el DOM esté cargado
});

// Crear Blockly workspace en el div con id "blocklyDiv"
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: '<xml>' +
        '<block type="move_forward"></block>' +
        '<block type="repeat_times"></block>' +
      '</xml>'
  });
  
