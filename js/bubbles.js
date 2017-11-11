function vita_circles(objectDiv){
    /**
    * Generar HTML 
    */

    //LEYENDA
    objectDiv.append("<p id='L'>Legend</p>");
    objectDiv.append("<div id='legend'></div>");
    $('#legend').append("<div id='type_difficulty'></div>");
    $('#type_difficulty').append("<div>Difficulty Levels</div>");
    $('#type_difficulty').append("<div class='text'>Very easy</div>");
    $('#type_difficulty').append("<div id='color_diff'></div>");
    $('#type_difficulty').append("<div class='text'>Very difficult</div>");
    $('#legend').append("<div id='type_skill'></div>");
    $('#type_skill').append("<div>Skill Levels</div>");
    $('#type_skill').append("<div class='text'>Novice</div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_1'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_2'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_3'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_4'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_5'></div>");
    $('#type_skill').append("<div class='text'>Expert</div>");
    //VISUALIZACIÓN
    objectDiv.append("<div id='mainBubble'></div>")
    //INFORMACIÓN
    objectDiv.append("<h5 class='info' id='info'></h5>");
    objectDiv.append("<div id='information'></div>");
    $('#information').append("<div id='info_gen'></div>");
    $('#info_gen').append("<p class='info' id='unit'></p>");
    $('#info_gen').append("<p class='info' id='topic'></p>");
    $('#info_gen').append("<p class='info' id='actives'></p>");
    $('#info_gen').append("<p class='info' id='countL'></p>");
    $('#information').append("<div id='info_me'></div>");
    $('#info_me').append("<div class='info' id='vis_me'></div>");
    $('#info_me').append("<p class='info' id='difficulty'></p>");
    $('#info_me').append("<p class='info' id='skill'></p>");
    $('#information').append("<div id='info_group'></div>");
    $('#info_group').append("<div class='info' id='vis_group'></div>");
    $('#info_group').append("<p class='info' id='difficultyG'></p>");
    $('#info_group').append("<p class='info' id='studentD'></p>");
    $('#info_group').append("<p class='info' id='skillG'></p>");
    $('#info_group').append("<p class='info' id='studentS'></p>");


    /**
    * Para ocultar y mostrar leyenda
    */
    $('#legend').hide();
    $('#L').on('click', function(){
        $('#legend').slideToggle(400);
    });

    /**
    * Visualización
    */    
    var w = window.innerWidth - 30;//width
    var h = Math.ceil(w);//height
    var oR = 0;
    var nUnits = 0;
    var nTopics = 0;

    var svgContainer = d3.select("#mainBubble")
    .style("height", h+"px");

    var svg = d3.select("#mainBubble").append("svg")
    .attr("class", "mainBubbleSVG")
    .attr("width", w)
    .attr("height", h)
    .on("dblclick", function(){ return resetBubbles(); });

    d3.json("u001_c1.json", function(datos){
        $("#course").text(datos["course"].name); //nombre del curso, eliminar después
        nUnits = datos["course"].units.length; //cantidad de unidades del curso
        nTopics = datos["learnerState"].topics.length; //cantidad de topicos del curso

        oR = w/(1+3*nUnits);
        h = Math.ceil(w/nUnits*2);
        svgContainer.style("height",h+"px");

        var unitObj = svg.selectAll(".unitBubble")
        .data(datos["course"].units)
        .enter().append("g");

        unitObj.append("circle")
        .attr("class", "unitBubble")
        .attr("id", function(d,i){ return "unitBubble" + i; })
        .attr("r", function(d){ return oR; })
        .attr("cx", function(d,i){ return (oR*(3*(1+i)-1)) })
        .attr("cy", (h+oR)/3)
        .style("stroke","#666")
        .style("stroke-width", "1px")
        .style("fill", "white")
        .on("click", function(d,i){
            return activateBubble(d,i);
        });

        unitObj.append("text")
        .attr("class", "unitBubbleText")
        .attr("x", function(d,i){ return oR*(3*(1+i)-1); })
        .attr("y", (h+oR)/3)
        .style("fill", "#000")
        .attr("font-size", "0.875rem")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle")
        .text(function(d){ return d.name })   
        .on("click", function(d,i){ 
            return activateBubble(d,i);
        });

        for(var iB = 0; iB < nUnits; iB++){

            topicObj = svg.selectAll(".topicBubble" + iB)
            .data(datos["course"].units[iB].topics)
            .enter().append("g");

            topicObj.append("circle")
            .attr("class", "topicBubble" + iB)
            .attr("id", function(d,i) {return "topicBubble_" + iB + "sub_" + i;})
            .attr("r",  function(d) {return (oR/3.0);})
            .attr("cx", function(d,i) {return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("cursor","pointer")
            .style("stroke","#666")
            .style("stroke-width", function(d){
                var valor = "";
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        if (datos["learnerState"].topics[j].skillLevel == 0) {
                            valor = "0px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 1) {
                            valor = "1px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 2) {
                            valor = "4px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 3) {
                            valor = "7px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 4) {
                            valor = "10px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 5) {
                            valor = "13px";
                        }
                    }
                }
                return valor;
            })
            .style("fill", function(d){
                var color = "";
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        if (datos["learnerState"].topics[j].difficultyLevel == 0) {
                            color = "#CCCCCC";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 1) {
                            color = "#1a9641";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 2) {
                            color = "#a6d96a";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 3) {
                            color = "#ffffbf";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 4) {
                            color = "#fdae61";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 5) {
                            color = "#d7191c";
                        }
                    }
                }
                return color;
            })
            .on("click", function(d){
                $("#info").text("Información");
                $("#topic").text(d.name);
                $("#actives").text("Actives students: "+datos["groupState"].activeLearners.length);
                $("#countL").text("Total students: "+datos["groupState"].learnersCount);
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        //me
                        var colorMe = $(this).css("fill");
                        var valorMe = $(this).css("stroke-width");
                        var stylesMe = { fill: colorMe, strokeWidth: valorMe};
                        $("#vis_me").append("<svg><circle cx='50%' cy='25%' r='30' stroke='#666'/></svg>").css(stylesMe);
                        $("#difficulty").text("My difficulty level: "+datos["learnerState"].topics[j].difficultyLevel);
                        $("#skill").text("My skill level: "+datos["learnerState"].topics[j].skillLevel);
                        //group
                        //Expertiz grupo
                        var valorG = "";
                        if (datos["groupState"].topicLevels[j].skillLevel == 0) {
                            valorG = "0px";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 1) {
                            valorG = "1px";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 2) {
                            valorG = "4px";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 3) {
                            valorG = "7px";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 4) {
                            valorG = "10px";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 5) {
                            valorG = "13px";
                        }
                        //Dificultad grupo
                        var colorG = "";
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 0) {
                            colorG = "#CCCCCC";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 1) {
                            colorG = "#1a9641";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 2) {
                            colorG = "#a6d96a";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 3) {
                            colorG = "#ffffbf";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 4) {
                            colorG = "#fdae61";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 5) {
                            colorG = "#d7191c";
                        }
                        var stylesG = { fill: colorG, strokeWidth: valorG};

                        $("#vis_group").append("<svg><circle cx='50%' cy='25%' r='30' stroke='#666'/></svg>").css(stylesG);
                        $("#difficultyG").text("Group difficulty level: "+datos["groupState"].topicLevels[j].difficultyLevel);
                        $("#studentD").text("Total students: "+datos["groupState"].topicLevels[j].difficultyLevelLCount);
                        $("#skillG").text("Group skill level: "+datos["groupState"].topicLevels[j].skillLevel);
                        $("#studentS").text("Total students: "+datos["groupState"].topicLevels[j].skillLevelLCount);
                    }
                }
            })
            .append("svg:title");

            topicObj.append("text")
            .attr("class", "topicBubbleText" + iB)
            .attr("x", function(d,i){return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("y", function(d,i){return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .attr("font-size", 6)
            .attr("cursor","pointer")
            .attr("dominant-baseline", "middle")
            .attr("alignment-baseline", "middle")
            .style("text-shadow","2px 2px 2px white")
            .style("visibility","hidden")
            .on("click", function(d){
                $("#info").text("Información");
                $("#topic").text(d.name);
                $("#actives").text("Actives students: "+datos["groupState"].activeLearners.length);
                $("#countL").text("Total students: "+datos["groupState"].learnersCount);
            })
            .text(function(d){return d.name});
        }
    });

    resetBubbles = function (){
        $(".info").text("");

        w = window.innerWidth - 30;
        oR = w/(1+3*nUnits);

        h = Math.ceil(w/nUnits*2);
        svgContainer.style("height", h+"px");
           
        svg.attr("width", w);
        svg.attr("height", h);       
       
        var t = svg.transition()
            .duration(650);
         
        t.selectAll(".unitBubble")
            .attr("r", function(d) { return oR; })
            .attr("cx", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("cy", (h+oR)/3);
 
        t.selectAll(".unitBubbleText")
            .attr("font-size", "0.875rem")
            .attr("x", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("y", (h+oR)/3);
     
      for(var k = 0; k < nUnits; k++){
        t.selectAll(".topicBubbleText" + k)
            .attr("x", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("font-size", 6)
            .style("visibility","hidden")
            .style("opacity",1);
            
        t.selectAll(".topicBubble" + k)
            .attr("r",  function(d) {return oR/3.0;})
            .style("opacity", 1)
            .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});         
      }   
    }

    function activateBubble(d,i){
        $("#unit").text(d.name);
        $("#info").text("Información");

        var t = svg.transition()
            .duration(d3.event.altKey ? 7500 : 350);
        
        var right = 1;

        t.selectAll(".unitBubble")
            .attr("cx", function(d,ii){
                if(i == ii) {
                    if(ii == 0){right = 1.5} 
                    return oR*(3*(1+ii)-1)*right - 0.6*oR*(ii-1);
                }
                else {
                    if(ii < i){
                        return oR*0.6*(3*(1+ii)-1);
                    } else {
                        return oR*(nUnits*3+1) - oR*0.6*(3*(nUnits-ii)-1);
                    }
                }              
            })
            .attr("cy", (h+oR)/2.3)
            .attr("r", function(d, ii) { 
                if(i == ii)
                    return oR*1.8;
                else
                    return oR*0.8;
            });
                    
        t.selectAll(".unitBubbleText")
            .attr("x", function(d,ii){
                if(i == ii) {
                    if(ii == 0){right = 1.5} 
                    return oR*(3*(1+ii)-1)*right - 0.6*oR*(ii-1);
                } else {
                    if(ii < i){
                        return oR*0.6*(3*(1+ii)-1);
                    } else {
                        return oR*(nUnits*3+1) - oR*0.6*(3*(nUnits-ii)-1);
                    }
                }               
            })
            .attr("y", (h+oR)/2.3)          
            .attr("font-size", function(d,ii){
                if(i == ii)
                    return 14*1.5;
                else
                    return 14*0.6;              
            });
                 
        var signSide = -1;
        for(var k = 0; k < nUnits; k++){
            signSide = 1;
            right = 1;
            if(k < nUnits/2) signSide = 1;
            if(k==0) right = 1.5;
            t.selectAll(".topicBubbleText" + k)
                .attr("x", function(d,i) { return (oR*(3*(k+1)-1)*right - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926)); })
                .attr("y", function(d,i) {return ((h+oR)/2.3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", function(){
                    return (k==i)?12:6;
                })
                .style("visibility","visible")
                .style("opacity",function(){
                    return (k==i)?1:0;
                });
                     
             t.selectAll(".topicBubble" + k)
                .attr("cx", function(d,i) {return (oR*(3*(k+1)-1)*right - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("cy", function(d,i) {return ((h+oR)/2.3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("r", function(){
                    return (k==i)?(oR*0.55):(oR/3.0);               
                })
                .style("opacity", function(){
                    return (k==i)?1:0;                  
                });
        }                   
    }
    window.onresize = resetBubbles;
}

$(document).ready(function() {
	vita_circles($('#vita_circles'));
});