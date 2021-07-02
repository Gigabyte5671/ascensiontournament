function buildDOM(){
  var item = '';
  //Navbar
  Object.keys(sdata["sections"]).forEach(function(k){
    item = '<a href="#' + sdata["sections"][k]["meta"]["id"] + '"><p>' + sdata["sections"][k]["meta"]["title"] + '</p><div></div></a>';
    $("#navlinks").append(item);
    $("#mobile-navlinks").append(item);
  });
  //item = '<a href="#" id="loginButton"><p>Login<img src="assets/icons/login_black_24dp.svg" draggable="false" alt=""></p></a>'
  //$("#navlinks").append(item);
  //$("#mobile-navlinks").append(item);
  
  /*
  //Sections
  Object.keys(sdata["sections"]).forEach(function(k){
    item = '';
    item += DOMElements.sectionBreak(sdata["sections"][k]["meta"]);
    item += DOMElements.section(sdata["sections"][k]["meta"],sdata["sections"][k]["slides"]);
    
    $("#pageContent").append(item);
  });
  */
  
  //Footer
  $("#pageContent").append(DOMElements.footer());
  
  moveCarousel("all","",1);
}


const DOMElements = {
  divClose: function(){
    return '</div>';
  },
  sectionBreak: function(meta){
    return '<div class="sectionBreak"' + (meta["id"] === "" ? '' : 'id="' + meta["id"]) + '" title="' + meta["title"] + '"><h1>' + meta["title"].toUpperCase() + ':</h1><h1>///</h1></div>';
  },
  section: function(meta,content){
    var indicators = '<div class="slideIndicator">';
    var i;
    for(i = 0; i < Object.keys(content).length; i++){
      indicators += '<span' + (Object.keys(content).length > 1 ? ' onclick="moveCarousel(event,' + "'to'," + (i + 1) + ')"' : ' class="noClick"') + '></span>';
    }
    indicators += '</div>';
    
    var slides = '';
    Object.keys(content).forEach(function(b){
      slides += this.slide(content[b]["meta"],content[b]["content"]);
    }, this);
    
    return '<div class="section" title="' + meta["title"] + '" style="' + meta["styles"] + '">'
         +   '<div class="slideLeft' + (Object.keys(content).length > 1 ? '' : ' hidden') + '"><img src="assets/icons/chevron_left_black_24dp.svg" draggable="false" alt=""' + (Object.keys(content).length > 1 ? ' onclick="moveCarousel(event,' + "'move',-1" + ')"' : '') + '></div>'
         +   '<div class="slideRight' + (Object.keys(content).length > 1 ? '' : ' hidden') + '"><img src="assets/icons/chevron_right_black_24dp.svg" draggable="false" alt=""' + (Object.keys(content).length > 1 ? ' onclick="moveCarousel(event,' + "'move',1" + ')"' : '') + '></div>'
         +   indicators
         +   slides
         + '</div>';
  },
  slide: function(meta,content){
    var info = '';
    switch(meta["type"]){
      case "text":
        info += '<p>' + content["text"] + '</p>';
        break;
      case "list":
        info += '<p>' + content["text"] + '</p>';
        break;
      default:
        info += '';
    }
    
    var data = '';
    
    return '<div class="box"' + (meta["id"] === "" ? '' : 'id="' + meta["id"]) + ' style="' + meta["styles"] + '">'
         +   '<div class="boxInner">'
         +     '<div>'
         +       '<h2>' + meta["title"] + '</h2>'
         +       '<img src="assets/images/' + content["img"]["src"] + '" class="' + content["img"]["class"] + '" draggable="false" alt="' + content["img"]["alt"] + '">'
         +     '</div>'
         +     '<div>'
         +       info
         +     '</div>'
         +     '<div>'
         +       data
         +     '</div>'
         +   '</div>'
         +   '<div class="boxBackgroundImage" style="background-image:url(' + "'assets/images/" + content["bgImg"]["src"] + "'" + ')"></div>'
         +   '<img class="particles" src="assets/images/particles_960.gif" draggable="false" alt="">'
         + '</div>';
  },
  footer: function(){
    return '<div class="section" style="height:100px;background-color:black;">'
         +   '<footer>'
         +     '<p>Designed&nbsp;by&nbsp;Gigabyte5671&nbsp;&copy;2021&nbsp;|&nbsp;Gigabyte#3310&nbsp;|&nbsp;Thanks&nbsp;for&nbsp;your&nbsp;support<img src="assets/icons/heart-24px.svg" draggable="false" alt=""></p>'
         +   '</footer>'
         + '</div>';
  }
}

var mobileNavIsOpen = 0;
function toggleMobileNav(){
  if(mobileNavIsOpen == 0){
    $("#mobile-navmenu").removeClass("hidden");
    mobileNavIsOpen = 1;
  }else{
    $("#mobile-navmenu").addClass("hidden");
    mobileNavIsOpen = 0;
  }
}

function updateTeams(){
  Object.keys(sdata["teams"]).forEach(function(t){
    var teamKills = (sdata["teams"][t]["Kills"] ? sdata["teams"][t]["Kills"] : "N/D");
    var teamDeaths = (sdata["teams"][t]["Deaths"] ? sdata["teams"][t]["Deaths"] : "N/D");
    var teamMidairs = (sdata["teams"][t]["Midairs"] ? sdata["teams"][t]["Midairs"] : "N/D");
    
    var teamMatches = (sdata["teams"][t]["Matches"] ? sdata["teams"][t]["Matches"] : "N/D");
    var teamWins = (sdata["teams"][t]["Wins"] ? sdata["teams"][t]["Wins"] : "N/D");
    var teamLosses = (typeof teamMatches == "number" && typeof teamWins == "number" ? teamMatches - teamWins : "N/D");
    var teamPlayers = [];
    Object.keys(sdata["teams"][t]["Players"]).forEach(function(p){
      teamPlayers.push(p);
    });
    
    
  });
}



function moveCarousel(e,a,n){
  var currentSlide;
  var i;
  if(e == "all"){
    for(i = 0; i < $(".section").length; i++){
      $($(".section")[i]).children().filter(".box").removeClass("activeSlide");
      $($($(".section")[i]).children().filter(".box")[0]).addClass("activeSlide");
      
      $($(".section")[i]).children().filter(".slideIndicator").children().removeClass("activeDot");
      $($($(".section")[i]).children().filter(".slideIndicator").children()[0]).addClass("activeDot");
    }
  }else{
    if(e.target.tagName == "IMG"){
      var totalSlides = $(e.target).parent().parent().children().filter(".box").length
    }else if(e.target.tagName == "SPAN"){
      var totalSlides = $(e.target).parent().children().length;
    }else{
      var totalSlides =  "undefined";
    }
    var gotoSlide = 1;
  
    if(a == "move"){
      currentSlide = $(e.target).parent().parent().children().filter(".slideIndicator").children().filter(".activeDot").prevAll().length;
      currentSlide += n;
      //console.log("move " + $(e.target).parent().parent().children().filter(".slideIndicator").children().filter(".activeDot").prevAll().length + " + " + n + " = " + currentSlide + " of " + totalSlides);
      if(currentSlide >= totalSlides){gotoSlide = 0;}
      else if(currentSlide < 0){gotoSlide = totalSlides - 1;}
      else{gotoSlide = currentSlide;}
    }else if(a == "to"){
      currentSlide = n;
      gotoSlide = currentSlide;
    }
    
    if(e.target.tagName == "IMG"){
      $(e.target).parent().parent().children().filter(".slideIndicator").children().removeClass("activeDot");
      $(e.target).parent().parent().children().filter(".slideIndicator").children(":nth-child(" + (gotoSlide + 1) + ")").addClass("activeDot");
      $(e.target).parent().parent().children().filter(".box").removeClass("activeSlide");
      $($(e.target).parent().parent().children().filter(".box")[gotoSlide]).addClass("activeSlide");
    }else if(e.target.tagName == "SPAN"){
      $(e.target).parent().children().removeClass("activeDot");
      $(e.target).addClass("activeDot");
      $(e.target).parent().parent().children().filter(".box").removeClass("activeSlide");
      $($(e.target).parent().parent().children().filter(".box")[gotoSlide - 1]).addClass("activeSlide");
    }
  }
}

moveCarousel("all","",1); //Remove when above is active