javascript:void(function () {

    if (typeof jQuery=='undefined') { 
        script = document.createElement( 'script' );  
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';   
        document.body.appendChild(script);  
    } 
    
    
    function labelClone(selector, labels) {
        if (labels) {
            var node = $(selector).find("a[id^='labels_dropdown_dropdown']").first();
       
            node.click();
            node.parents(".dropdown").find("li.dropdown_item").each(function(e) { 
                if (jQuery.inArray($(this).text(),labels) >= 0) { 
                    $(this).mouseenter().click();
                } 
            });
            node.click();
        }
    }
    
    function titleClone(selector, storyTitle) {
        $(selector).find("[id^=story_name]").text(storyTitle);
    }  
    
    
    function storyTypeClone(selector, storyType) {
        $(selector).find("a[id^='story_type_dropdown'].search").first().click();
        var storyTypes = $(".dropdown.story_type ul").first().find("li");
        storyTypes.each( function( index ) { 
            if ($(this).attr("data-value") == storyType) {
                $(selector).find("a[id^='story_type_dropdown']").first().click();
                $(selector).find("a.item_"+storyType).mouseenter().click();
            }
        });
    }
    
    
    function getter(selector, key) {
        var returnValue;
        switch(key) {
            case 'storyTitle':
                returnValue = $(selector).text();
                break;  
            case 'storyType':
                returnValue = $(selector).parents("form").find("input[name='story[story_type]']").val();
                break;
            case 'owner':
                returnValue = $("a[id^=story_owned_by_id_dropdown]").text();
                break;  
            default:
                returnValue = [];
        }
        return returnValue;
    }
    
    
    
    function clonePivotalTicket() {  
        if(!$("input,textarea").is(":focus")) {
            alert("Please place focus on the input/textarea of the desired ticket before proceeding");
        } 
        else {
            var selector = "*:focus";
            
            var collapser_selector = $(selector).attr("id").replace(/story_.+_(.+)/,"story_collapser_$1");
            var obj = {
                storyTitle  :   getter(selector,'storyTitle'),
                owner       :   getter(selector,'owner'),
                storyType   :   getter(selector, 'storyType'),
                labels      :   getter(selector, '')
            };
    
            $(selector).parents("section.edit").find("ul.selected.labels li").each (function (i) { 
                var label = $(this).find("a.label.name").text();
                if (label) {
                    obj['labels'].push(label);
                }
            });
            $('<input/>').attr({ type: 'hidden', class: 'clone_element', name: 'clone_element', value: JSON.stringify(obj) }).appendTo('body');
            observer.observe(target, config);    
            $("button.add_story").click();
            
            
            $("#"+collapser_selector).click();
        }
    }
    
    
        
    var observer = new MutationObserver(function( mutations ) {
        var selector = ".story.model.unscheduled.new";
        var obj = JSON.parse($('input[name="clone_element"]').last().val());
        titleClone(selector, obj.storyTitle);
        storyTypeClone(selector, obj.storyType);
        labelClone(selector, obj.labels);
    });
    
    var target = document.querySelector('body');
    var config = { 
        attributes: true, 
        childList: true, 
        characterData: true 
    };
    
    
    
    clonePivotalTicket();  
    

}());
