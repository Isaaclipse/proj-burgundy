
define('gridview',['jquery', 'utility', 'debounced_resize','paginate'], function ($, Utility) {

	var vars =  {
		photolist: null,
		num_items: 0,
		selected_index: 0,
		device_items: 0,
		slug: null,
		_this : null
	};

	var Gridview = {

		init: function (_this) {

			var prev_selected = vars.selected_index;
			vars._this = _this;

			vars.photolist = $(_this).closest('.fi-photolist--grid');
			vars.num_items = vars.photolist.find("> div:not(.fi-expanded-content):not(.fi-adv-placeholder)").length;
			vars.selected_index = $(_this).parent().index("[data-slug]") + 1;
			vars.device_items = vars.photolist.data('desktop');
			vars.slug = $(_this).parent().data('slug');

			if (Utility.isMobile()) 
				vars.device_items = vars.photolist.data('mobile');
			 else if (Utility.isTablet())
				vars.device_items = vars.photolist.data('tablet');
		
			// set location hash as slug
			location.hash = vars.slug;
	
			var row_number = (vars.selected_index) ? Math.ceil(vars.selected_index / vars.device_items) : 1;
			var last_item_index = (row_number * vars.device_items);

			last_item_index = (last_item_index > vars.num_items) ? vars.num_items - 1 : last_item_index - 1;

			var last_item = vars.photolist.find("> div:not(.fi-expanded-content):not(.fi-adv-placeholder)").eq(last_item_index);

			if (prev_selected == vars.selected_index) {
				vars.photolist.find('.fi-expanded-content').remove();
				vars.selected_index = null;
			} else
				this.showExpandedContent($(_this).parent().find(".fi-expanded-data"), last_item);

		},
		showExpandedContent: function (expanded_data, last_item) {
			
			var expanded = null;

			if (last_item && last_item.length > 0) {
				expanded = last_item.next();

				if (expanded.index() < 0 || !expanded.hasClass('fi-expanded-content')) {
					last_item.closest('.fi-photolist--grid').find('.fi-expanded-content').remove();
					expanded = $('<div class="fi-expanded-content col-xs-12" />').insertAfter(last_item);
				}

				expanded.html(expanded_data.html());
				Utility.scrollTo(last_item,60,0);
				
				return true;
			}

			return false;
		},

		refresh: function(){
			if (vars.photolist != null && vars._this != null) {
				vars.photolist.find(".fi-expanded-content").remove();
				this.init(vars._this, null);
			}
		},
		showExpandedFromSlug: function (slug) {
			var photolist = $(".fi-photolist--grid");
			var device_items = photolist.data('desktop');

			if (Utility.isMobile()) {
				device_items = photolist.data('mobile');
			} else if (Utility.isTablet()) {
				device_items = photolist.data('tablet');
			}

			$.ajax({
				url: ['page', slug].join('/'),
				type: 'GET',
				success: function (data) {
					var last_item_index = device_items - 1;
					var last_item = $(".fi-photolist--grid > div:not(.fi-expanded-content):not(.fi-adv-placeholder)").eq(last_item_index);
					Gridview.showExpandedContent($(data).find('.fi-expanded-data'), last_item);
					return true;
				},
				error: function () {
					return false;
				}
			});
		}

	};

	$(window).on("debouncedresize", function (event) {

		if (vars.photolist != null) {
			var device_items = vars.photolist.data('desktop');

			if (Utility.isMobile()) {
				device_items = vars.photolist.data('mobile');
			} else if (Utility.isTablet()) {
				device_items = vars.photolist.data('tablet');
			}

			if (device_items != vars.device_items) {
				//refresh gridview
				Gridview.refresh();
			}
		}

	});


	$(document).ready(function () {

    /* TO BE REVIEWED WITH NEW PHOTOLIST IMPLEMENTATION */
		//var selected_slug = location.hash.substring(1);

		//if (selected_slug != null && selected_slug != '') {	//expanding view
		//	var _this = $('.fi-photolist--grid *[data-slug="' + selected_slug + '"]').children();
			
		//	if (_this.length > 0) {
		//		$(_this).parent().siblings().removeClass('active');
		//		$(_this).parent().toggleClass('active');
		//		Gridview.init(_this)
		//	} else {
		//		Gridview.showExpandedFromSlug(selected_slug);
		//	}
		//	selected_slug = null;
		//}

    
		//$('body').on('click', '.fi-photolist--grid .fi-o-media-object--photo', function (e) {
		//	e.preventDefault();

		//	$(this).parent().siblings().removeClass('active');
		//	$(this).parent().toggleClass('active');
		//	Gridview.init(this)

		//});


	});

	return Gridview;

});
