$(document).ready(function(){
    $('#div1').show();
    $('#div2').hide();
    //settings = {gbtnClass:"btn-large btn-flat"};

    //$("#btn2").addClass(settings.gbtnClass);

     $("#btn2").click(function a(){
        var contador=0;
        var separador="\n";
        var nombreCurso=$('#1').val();
        var contenido=$('#ta1').val();
        if(nombreCurso==''){
            alert('You must enter a name for the course');
        }
        if (contenido=='') {
            alert('You must enter a correct content structure ');
        }
        if(nombreCurso!='' && contenido!=''){  
            var lineaContenido=contenido.trim(separador).split(separador);
            $('#div1').hide();
            $('#div2').show();
            $('#btn3').removeAttr('disabled');
            console.log(lineaContenido);
            for (var i = 0; i < lineaContenido.length; i++) {
                var c=1;//contador para indicar se que se eliminará el primer caracter(-) a la primera palabra de la linea
                var palabras=lineaContenido[i].split(' ');
                if(lineaContenido!=""){//no cosidera lineas vacias
                    if (palabras[0][0]!='-') {//convierte ambos a lowercase y compara una sola vez. Pregunta por el primer caracter de la primera palabra
                        $('#div3').append($("<div/>",{class:'divider'}))
                        .append($("<div/>",{class:'section'})
                        //.css({"background":'#6DA23B',"border-radius":"6px","margin":"4px","padding-left":"2px"})
                        .css({"background":'#ffffff',"border-radius":"6px","margin":"4px","padding-left":"2px"})
                        .append(lineaContenido[i]));
                    }
                    else{
                        palabras[0]=palabras[0].slice(1,palabras[0].length);
                        lineaContenido[i][0]=palabras[0];
                        $('#div3').append($("<div/>")
                                //.css({"background":'#C0CAB7',"border-radius":"6px","margin":"4px","padding-left":"20px"})
                                .css({"background":'#ffffff',"border-radius":"6px","margin-top":"10px","padding-left":"20px"})
                                .append(lineaContenido[i]));
                      
                    }   
                }
                if(i==lineaContenido.length-1){
                    $('#div3').append($("<div/>",{class:'section'}));
                }
            }  
        }
    });
    $("#btn11").click(function(){
    	$('#btn3').attr('disabled','disabled');
        var contenido2=$('#ta1').val();
        $('#div2').hide();
        $('#div1').show();
        $('#div3').empty();

    });
    $('#btn3').click(function(){
        var confirmacion=confirm('¿are you sure to create the new course?');
        var name=$('#1').val();
        if (confirmacion) {
            $('#btn3').hide();
            $("#div2").hide();
            $('#div4').hide();
            var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
            var codigo = "";
            for (i=0; i<5; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
            }
            $('#div').append($("<div/>",{id:"div5"}).css({"margin-left":"20%","margin-top":"20%"}).append("<h5>Course <strong><i>"+name+"</i></strong> created successfully. <strong>Code course: "+codigo+"</strong></h5>"));
            /*var thelink = $('<button/>',{id:'return',style:"border-radius:5px;background:#212121",class:"btn-large",text: 'Accept'}).css({"margin-left":"40%"}).appendTo('#div');
            $('#return').click(function(){
                $("#return").hide();
                $('#div5').hide();
                $('#btn3').show();
                $("#div1").show();
                $('#div4').show();
                $('#1').val("");
                $('#ta1').val("");
                $('#btn3').attr('disabled','disabled');
            }); */
        }
    });
});   

