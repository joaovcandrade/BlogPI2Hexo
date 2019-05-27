(function($) {

  if($(".updated")[0]){
    $(".updated").each((i, el)=>{
      m = el.getAttribute("value");
      el.innerHTML = ("Atualizado " + moment(m).locale('pt-BR').fromNow());
    });

  }
})(jQuery);
