(function($) {

  if($(".updated")[0]){
    el = $(".updated");
    m = el.attr("value");
    el.html("Atualizado " + moment(m).locale('pt-BR').fromNow());
  }

})(jQuery);
