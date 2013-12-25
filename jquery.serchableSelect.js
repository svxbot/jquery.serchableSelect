/**
 * jQuery Plugin: Serchable Select
 * 
 * @version 0.1
 */

(function( $ ){
    
	var methods = {
		init : function() {
            return $(this).each(function() {
                $(this).serchableSelect('addSearchField');
            });
		},
		destroy : function() {
			return this.each(function(){
                $('#customSearch'+id).unbind('keyup.serchableSelect').remove();
                $('#searchPopupArea'+id+' ul li').unbind('click.serchableSelect');
                $('#searchPopupArea'+id).remove();
			 });
		},
		sortByText : function() {
			return $(this).each(function() {
		        var selectedValue = $(this).val();
		        $(this).html($("option", $(this)).sort(function(a, b) {
		            return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
		        }));
		        $(this).val(selectedValue);
		    });
		},
		addSearchField : function(){
            var id = $(this).attr('id');
            
			var search = '<input type="text" id="customSearch'+id+'">' +
			'<div id="searchPopupArea'+id+'" class="searchPopupArea"><ul></ul></div>';
			var sel = $('#'+id);
			sel.focusout(function(){$('#searchPopupArea'+id).hide();});
			sel.after(search);
            
            $('#customSearch'+id).bind('keyup.serchableSelect', function(){ 
                methods.search(id, $(this).val()); 
            });
		},
        search : function( id, search ){
            if(search == ''){
                $('#searchPopupArea'+id+' ul').empty();
                $('#searchPopupArea'+id).hide();
                return;
            }

            $('#searchPopupArea'+id+' ul').empty();
        
            var cnt = 0;
            var options = $("#"+id+" option");
            search = search.toLowerCase();
            options.each(function() {
                if( $(this).val().indexOf(search) != -1 || $(this).text().toLowerCase().indexOf(search) != -1 ){
                    isSelected = this.selected ? 'selected' : '';
                    $('#searchPopupArea'+id+' ul').append( 
                        $('<li id="selectOption'+id+$(this).val()+'" data-value="'+$(this).val()+'" class="'+isSelected+'">' +$(this).text()+ '</li>' ) 
                        );
                    cnt++;
                }
                return (cnt != 10);
            });
        
            if($('#searchPopupArea'+id+' ul li').length > 0){
                $('#searchPopupArea'+id).show();
            }
            else{
                $('#searchPopupArea'+id).hide();
            }

            $('#searchPopupArea'+id+' ul li').bind('click.serchableSelect', function(){ 
                methods.selectOption(id, $(this).attr('data-value')); 
            });
        },
        selectOption : function(id,val){
            $("#"+id+" option").each(function() {
                if($(this).val() == val){
                    if($("#"+id).attr('multiple') === undefined){
                    // comment this if need multiple select
                    $('#searchPopupArea'+id+' li').removeClass('selected');
                    }
                    inlist = $("#selectOption"+id+val);
                    if(this.selected == false){
                        this.selected=true;
                        if(inlist.length){
                            inlist.addClass('selected');
                        }
                    }
                    else{
                        this.selected=false;
                        // uncomment this if need multiple select
                        if($("#"+id).attr('multiple') !== undefined){
                            if(inlist.length){
                                inlist.removeClass('selected');
                            }
                        }
                    }
                }
            });
        }
	}
 
	$.fn.serchableSelect = function( method ) {
		 
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.serchableSelect' );
		}		
	 
	};
 
})( jQuery );