/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
$(document).ready(function(){$('input[data-autocomplete]').railsAutocomplete()});(function(j){var k=null;j.fn.railsAutocomplete=function(){return this.live('focus',function(){if(!this.railsAutoCompleter){this.railsAutoCompleter=new j.railsAutocomplete(this)}})};j.railsAutocomplete=function(e){_e=e;this.init(_e)};j.railsAutocomplete.fn=j.railsAutocomplete.prototype={railsAutocomplete:'0.0.1'};j.railsAutocomplete.fn.extend=j.railsAutocomplete.extend=j.extend;j.railsAutocomplete.fn.extend({init:function(e){e.delimiter=$(e).attr('data-delimiter')||null;function split(a){return a.split(e.delimiter)}function extractLast(a){return split(a).pop().replace(/^\s+/,"")}$(e).autocomplete({source:function(c,d){$.getJSON($(e).attr('data-autocomplete'),{term:extractLast(c.term)},function(){$(arguments[0]).each(function(i,a){var b={};b[a.id]=a;$(e).data(b)});d.apply(null,arguments)})},search:function(){},focus:function(){return false},select:function(a,b){var c=split(this.value);c.pop();c.push(b.item.value);if(e.delimiter!=null){c.push("");this.value=c.join(e.delimiter)}else{this.value=c.join("");if($(this).attr('data-id-element')){$($(this).attr('data-id-element')).val(b.item.id)}if($(this).attr('data-update-elements')){var d=$(this).data(b.item.id.toString());var f=$.parseJSON($(this).attr("data-update-elements"));for(var g in f){$(f[g]).val(d[g])}}}var h=this.value;$(this).bind('keyup.clearId',function(){if($(this).val().trim()!=h.trim()){$($(this).attr('data-id-element')).val("");$(this).unbind('keyup.clearId')}});$(this).trigger('railsAutocomplete.select');return false},delay:($(e).attr('delay')||300),minLength:($(e).attr('min_length')||2),})}})})(jQuery);