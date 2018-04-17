var vizSVG = d3.select("#animate")
      .append("svg")
      .attr("class", "vizSVG")
      .attr("width", "100%")
      .attr("height", "500px")

vizSVG.append("image")
    .attr("xlink:href","plate.png")
    .attr("x", 150)
    .attr("y", 300)
    .attr("width", 500)
    .style("z-index", 0)


var vizSVG2 = d3.select("#topLid")
      .append("svg")
      .attr("class", "vizSVG2")
      .attr("width", "800")
      .attr("height", "500px")

vizSVG2.append("image")
    .attr("xlink:href","lid.png")
    .attr("class", "lid")
    .attr("id", "lid")
    .attr("x", 180)
    .attr("y", 135)
    .attr("width", 450)
    .style("z-index", 1)

// Functions to trigger animation
function openLid(){
    var lid = d3.select("#lid")
    lid.transition()
    .attr("transform", "rotate(45)")
    .attr("x", 300).attr("y", -550)
    
    setTimeout(function(){
        $("#underLid").css({"z-index" : 5})
    $("#topLid").css({"z-index" :1})
    }, 200)
     
}

function closeLid(){
     var lid = d3.select("#lid")
    lid.transition()
    .attr("transform", "rotate(0)")
    .attr("x", 180).attr("y", 135)
}


// Geneate restaurant


function triggerLid(){
    $("#underLid").css({"z-index" : 1})
    $("#topLid").css({"z-index" : 5})
    closeLid()
    
    setTimeout(openLid, 500)
    // Change the index
}





function createCard(d) {
    // This function takes a row from a dataset
    // Creates one card
    // id = resturant name 
    var linkedCard = document.createElement("a");
    linkedCard.href = d.url;
    linkedCard.target = "_blank"
    linkedCard.className = "linkedCard"
    
    var card = document.createElement("div");
    card.className = "card";
    card.id = d.name;

    // Photo
    var restPhoto = document.createElement("div")
    restPhoto.id = "rest_photo";

    var photo = document.createElement("img")
    photo.className = "photo"
    photo.src = d.img_url;
    restPhoto.appendChild(photo)

    // Details
    var restInfo = document.createElement("div")
    restInfo.id = "rest_info";

    var para = document.createElement("p");
    para.id = "rest_name"
    var rest_name = document.createTextNode(d.name);
    para.appendChild(rest_name);
    restInfo.appendChild(para);

//    // Get only first uppercase element of category types
//    var catArray = [];
//    d.categories.forEach(function(c){
//        c.forEach(function(cat){
//            catArray.push(" " + cat[0])
//        })
//    })
//
//    var para = document.createElement("p");
//    para.id = "rest_cat"
//    var rest_cat = document.createTextNode(catArray);
//    para.appendChild(rest_cat);
//    restInfo.appendChild(para)


    // Create card
    card.appendChild(restPhoto)
    card.appendChild(restInfo)
    
    linkedCard.appendChild(card)
    
    document.getElementById("results").appendChild(linkedCard)
    
}