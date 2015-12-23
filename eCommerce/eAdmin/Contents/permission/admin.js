

function checkAll(pForm)
{
	for (i = 0, n = pForm.elements.length; i < n; i++)
	{
		var objName = pForm.elements[i].name;
		var objType = pForm.elements[i].type;
		if (objType == 'checkbox' && objName != 'checkme')
		{
			box = eval(pForm.elements[i]);
			box.checked = !box.checked;
		}
	}
}

function checkDelBoxes(pForm, boxName, parent)
{
	for (i = 0; i < pForm.elements.length; i++)
		if (pForm.elements[i].name == boxName)
			pForm.elements[i].checked = parent;
}

function checkPaymentBoxes(name, module)
{
	setPaymentBoxes(name, module);
	current = $('input#checkedBox_'+ name +'_'+ module + '[type=hidden]');
	$('form#form_'+ name +' input[type=checkbox]').each(
		function()
		{
			if ($(this).attr('name') == module + '_' + name + '[]')
				$(this).attr("checked", ((current.val() == 'checked') ? true : false));
		}
	);
	current.val() == 'checked' ? current.val('unchecked') : current.val('checked');
}

function setPaymentBoxes(name, module)
{
	current = $('input#checkedBox_'+ name +'_'+ module + '[type=hidden]');
	total = 0;
	checked = 0;
	$('form#form_'+ name +' input[type=checkbox]').each(
		function()
		{
			if ($(this).attr('name') == module + '_' + name + '[]')
			{
				($(this).attr("checked") ? checked++ : '');
				total++;
			}
		}
	);
	(checked == total) ? current.val('unchecked') : current.val('checked');
}

function getE(name)
{
	if (document.getElementById)
		var elem = document.getElementById(name);
	else if (document.all)
		var elem = document.all[name];
	else if (document.layers)
		var elem = document.layers[name];
	return elem;
}

function formSubmit(e, button)
{
	var key;

	key = window.event ? window.event.keyCode : e.which;
	if (key == 13)
	{
		getE(button).focus();
		getE(button).click();
		e.preventDefault();
	}
}
function noComma(elem)
{
 	getE(elem).value = getE(elem).value.replace(new RegExp(',', 'g'), '.');
}

/* Code generator for Affiliation and vouchers */
function gencode(size)
{
	getE('code').value = '';
	/* There are no O/0 in the codes in order to avoid confusion */
	var chars = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
	for (var i = 1; i <= size; ++i)
		getE('code').value += chars.charAt(Math.floor(Math.random() * chars.length));
}

var tpl_viewing_window = null;
function viewTemplates(id_select, lang, ext)
{
	var loc = $(id_select).val();
	if (loc != 0)
	{
		if (tpl_viewing_window != null && !tpl_viewing_window.closed)
			tpl_viewing_window.close();
		var url_preview = $("option[value="+loc+"]", id_select).data('preview');
		tpl_viewing_window = window.open(url_preview + lang + loc + ext, 'tpl_viewing', 'toolbar=0,location=0,directories=0,statfr=no,menubar=0,scrollbars=yes,resizable=yes,width=520,height=400,top=50,left=300');
		tpl_viewing_window.focus();
	}
}

function orderDeleteProduct(txtConfirm, txtExplain)
{
	ret = true;
	$('table#cancelProducts input[type=checkbox]:checked').each(
		function()
		{
			totalCancel = parseInt($(this).parent().parent().find('td.cancelQuantity input[type=text]').val());
			totalQty = parseInt($(this).parent().find('input#totalQty[type=hidden]').val());
			totalQtyReturn = parseInt($(this).parent().find('input#totalQtyReturn[type=hidden]').val());
			productName = $(this).parent().find('input#productName[type=hidden]').val();
			totalAvailable = totalQty - totalQtyReturn;
			if (totalCancel > totalAvailable)
			{
				jAlert(txtConfirm + ' : \'' + ' ' + productName + '\' ! \n\n' + txtExplain + ' ('+ totalCancel + ' > ' + totalAvailable +')' + '\n ');
				ret = false;
			}
		}
	);
	return ret;
}

function selectCheckbox(obj)
{
	$(obj).parent().parent().find('td.cancelCheck input[type=checkbox]').attr("checked", true);
}

function toggleShippingCost()
{
	generateDiscount = $('#generateDiscount').attr("checked");
	generateCreditSlip = $('#generateCreditSlip').attr("checked");
	if (generateDiscount != 'checked' && generateCreditSlip != 'checked')
	{
		$('#spanShippingBack input[type=checkbox]').attr("checked", false);
		$('#spanShippingBack').css('display', 'none');
	}
	else
		$('#spanShippingBack').css('display', 'block');
}

function orderOverwriteMessage(sl, text)
{
	var $zone = $('#txt_msg');
	var sl_value = sl.options[sl.selectedIndex].value;

	if (sl_value != '0')
	{
		if ($zone.val().length > 0 && !confirm(text))
			return ;
		$zone.val(sl_value);
	}

	$zone.trigger('autosize.resize');
}

function setCancelQuantity(itself, id_order_detail, quantity)
{
	$('#cancelQuantity_' + id_order_detail).val($(itself).prop('checked') ? quantity : '');
}

function stockManagementActivationAuthorization()
{
	if (getE('PS_STOCK_MANAGEMENT_on').checked)
	{
		getE('PS_ORDER_OUT_OF_STOCK_on').disabled = false;
		getE('PS_ORDER_OUT_OF_STOCK_off').disabled = false;
		getE('PS_DISPLAY_QTIES_on').disabled = false;
		getE('PS_DISPLAY_QTIES_off').disabled = false;
		getE('PS_ADVANCED_STOCK_MANAGEMENT_on').disabled = false;
		getE('PS_ADVANCED_STOCK_MANAGEMENT_off').disabled = false;
	}
	else
	{
		getE('PS_DISPLAY_QTIES_off').checked = true;
		getE('PS_DISPLAY_QTIES_on').disabled = 'disabled';
		getE('PS_DISPLAY_QTIES_off').disabled = 'disabled';
		getE('PS_ORDER_OUT_OF_STOCK_on').checked = true;
		getE('PS_ORDER_OUT_OF_STOCK_on').disabled = 'disabled';
		getE('PS_ORDER_OUT_OF_STOCK_off').disabled = 'disabled';
		getE('PS_ADVANCED_STOCK_MANAGEMENT_off').checked = true;
		getE('PS_ADVANCED_STOCK_MANAGEMENT_on').disabled = 'disabled';
		getE('PS_ADVANCED_STOCK_MANAGEMENT_off').disabled = 'disabled';
		getE('PS_FORCE_ASM_NEW_PRODUCT_off').checked = true;
		getE('PS_FORCE_ASM_NEW_PRODUCT_on').disabled = 'disabled';
		getE('PS_FORCE_ASM_NEW_PRODUCT_off').disabled = 'disabled';
		getE('PS_DEFAULT_WAREHOUSE_NEW_PRODUCT').disabled = 'disabled';
	}
}

function advancedStockManagementActivationAuthorization()
{
	if (getE('PS_ADVANCED_STOCK_MANAGEMENT_on').checked)
	{
		getE('PS_FORCE_ASM_NEW_PRODUCT_on').disabled = false;
		getE('PS_FORCE_ASM_NEW_PRODUCT_off').disabled = false;
		getE('PS_DEFAULT_WAREHOUSE_NEW_PRODUCT').disabled = false;
	}
	else
	{
		getE('PS_FORCE_ASM_NEW_PRODUCT_off').checked = true;
		getE('PS_FORCE_ASM_NEW_PRODUCT_on').disabled = 'disabled';
		getE('PS_FORCE_ASM_NEW_PRODUCT_off').disabled = 'disabled';
		getE('PS_DEFAULT_WAREHOUSE_NEW_PRODUCT').disabled = 'disabled';
	}
}

function hookCheckboxes(id, opt, champ)
{
	if (opt == 1 && champ.checked == false)
		$('#Ghook'+id).attr('checked', false);
	else if (opt == 0)
	{
		if (champ.checked)
			$('.hook'+id).attr('checked', "checked");
		else
			$('.hook'+id).attr('checked', false);
	}
}

function changeCMSActivationAuthorization()
{
	if (getE('PS_CONDITIONS_on').checked)
		getE('PS_CONDITIONS_CMS_ID').disabled = false;
	else
		getE('PS_CONDITIONS_CMS_ID').disabled = 'disabled';
}

function disableZipFormat()
{
	if ($('#need_zip_code_on').prop('checked') == false)
	{
		$('.zip_code_format').hide();
		$('#zip_code_format').val('');
	}
	else
		$('.zip_code_format').show();
}

function disableTAASC()
{
	if ($('#iso_code').val() == 'US')
		$('#TAASC').show();
	else
		$('#TAASC').hide();
}

function spreadFees(id_range)
{
	newVal = $('#fees_all_'+id_range).val().replace(/,/g, '.');
	$('.fees_'+id_range).val(newVal);
}

function clearAllFees(id_range)
{
	$('#fees_all_'+id_range).val('');
}

function toggleDraftWarning(show)
{
	if (show)
		$('.draft').hide();
	else
		$('.draft').show();
}

function showRedirectProductOptions(show)
{
	if (show)
		$('.redirect_product_options').fadeIn();
	else
		$('.redirect_product_options').fadeOut();

	redirectSelectChange();
}

function redirectSelectChange()
{
	if ($('#redirect_type :selected').val() == '404')
		showRedirectProductSelectOptions(false);
	else
		showRedirectProductSelectOptions(true);
}

function addRelatedProduct(id_product_to_add, product_name)
{
	if (!id_product_to_add || id_product == id_product_to_add)
		return;
	$('#related_product_name').html(product_name);
	$('input[name=id_product_redirected]').val(id_product_to_add);
	$('#related_product_autocomplete_input').parent().hide();
	$('#related_product_remove').show();
}

function removeRelatedProduct()
{
	$('#related_product_name').html(no_related_product);
	$('input[name=id_product_redirected]').val(0);
	$('#related_product_remove').hide();
	$('#related_product_autocomplete_input').parent().fadeIn();
}

function showRedirectProductSelectOptions(show)
{
	if (show)
		$('.redirect_product_options_product_choise').show();
	else
	{
		$('.redirect_product_options_product_choise').hide();
		removeRelatedProduct();
	}

}

function showOptions(show)
{
	if (show)
		$('tr#product_options').show();
	else
		$('tr#product_options').hide();
}

function submitAddProductAndPreview()
{
	$('#fakeSubmitAddProductAndPreview').attr('name','submitAddProductAndPreview');
	$('#product_form').submit();
}

function submitAddcmsAndPreview()
{
	$('#previewSubmitAddcmsAndPreview').attr('name','submitAddcmsAndPreview');
	$('#cms').submit();
}

function checkAllMultishopDefaultValue(item)
{
	$(item).parent().find('input[name^=\'multishopOverrideOption\']').each(function(k, v)
	{
		$(v).attr('checked', item.checked);
		var name = $(v).attr('name');
		checkMultishopDefaultValue(v, name.substr(24, name.length - 25));
	})
}

function checkMultishopDefaultValue(obj, key)
{
	if (!$(obj).prop('checked') || $('#'+key).hasClass('isInvisible'))
	{
		$('#conf_id_'+key+' input, #conf_id_'+key+' textarea, #conf_id_'+key+' select, #conf_id_'+key+' button').prop('disabled', true);
		$('#conf_id_'+key+' label.conf_title').addClass('isDisabled');
		$(obj).prop('disabled', false);
	}
	else
	{
		$('#conf_id_'+key+' input, #conf_id_'+key+' textarea, #conf_id_'+key+' select, #conf_id_'+key+' button').prop('disabled', false);
		$('#conf_id_'+key+' label.conf_title').removeClass('isDisabled');
	}
	$('#conf_id_'+key+' .preference_default_multishop input').prop('disabled', false);
}

function toggleAllMultishopDefaultValue($container, value)
{
	$container.find('input[name^=\'multishopOverrideOption\']').each(function(k, v)
	{
		$(v).attr('checked', value);
		var name = $(v).attr('name');
		toggleMultishopDefaultValue(v, name.substr(24, name.length - 25));
	})
}

function toggleMultishopDefaultValue(obj, key)
{
	if (!$(obj).prop('checked') || $('#'+key).hasClass('isInvisible'))
	{
		$('#conf_id_'+key+' input, #conf_id_'+key+' textarea, #conf_id_'+key+' select, #conf_id_'+key+' button').attr('disabled', true);
		$('#conf_id_'+key+' label.conf_title').addClass('isDisabled');
	}
	else
	{
		$('#conf_id_'+key+' input, #conf_id_'+key+' textarea, #conf_id_'+key+' select, #conf_id_'+key+' button').attr('disabled', false);
		$('#conf_id_'+key+' label.conf_title').removeClass('isDisabled');
	}
	$('#conf_id_'+key+' input[name^=\'multishopOverrideOption\']').attr('disabled', false);
}

function doAdminAjax(data, success_func, error_func)
{
	$.ajax(
	{
		url : 'index.php',
		data : data,
		type : 'POST',
		success : function(data){
			if (success_func)
				return success_func(data);

			data = $.parseJSON(data);
			if (data.confirmations.length != 0)
				showSuccessMessage(data.confirmations);
			else
				showErrorMessage(data.error);
		},
		error : function(data){
			if (error_func)
				return error_func(data);

			alert("[TECHNICAL ERROR]");
		}
	});
}

//display a success/error/notice message
function showSuccessMessage(msg) {
	$.growl.notice({ title: "", message:msg});
}

function showErrorMessage(msg) {
	$.growl.error({ title: "", message:msg});
}

function showNoticeMessage(msg) {
	$.growl.notice({ title: "", message:msg});
}

$(document).ready(function()
{
	if (typeof helper_tabs != 'undefined' && typeof unique_field_id != 'undefined')
	{
		$.each(helper_tabs, function(index) {
			$('#'+unique_field_id+'fieldset_'+index+' .form-wrapper').prepend('<div class="tab-content panel" />');
			$('#'+unique_field_id+'fieldset_'+index+' .form-wrapper').prepend('<ul class="nav nav-tabs" />');
			$.each(helper_tabs[index], function(key, value) {
				// Move every form-group into the correct .tab-content > .tab-pane
				$('#'+unique_field_id+'fieldset_'+index+' .tab-content').append('<div id="'+key+'" class="tab-pane" />');
				var elemts = $('#'+unique_field_id+'fieldset_'+index).find("[data-tab-id='" + key + "']");
				$(elemts).appendTo('#'+key);
				// Add the item to the .nav-tabs
				if (elemts.length != 0)
					$('#'+unique_field_id+'fieldset_'+index+' .nav-tabs').append('<li><a href="#'+key+'" data-toggle="tab">'+value+'</a></li>');
			});
			// Activate the first tab
			$('#'+unique_field_id+'fieldset_'+index+' .tab-content div').first().addClass('active');
			$('#'+unique_field_id+'fieldset_'+index+' .nav-tabs li').first().addClass('active');
		});
	}

	if (typeof formToMove != 'undefined' && typeof formDestination != 'undefined' )
	{
		$('<hr style="margin 24px 0;" />').appendTo('#'+formDestination)
		$('#theme_fieldset_'+formToMove+' .form-wrapper').appendTo('#'+formDestination);
	}

	$('select.chosen').each(function(k, item){
		$(item).chosen({disable_search_threshold: 10});
	});
	// Apply chosen() when modal is loaded
	$(document).on('shown.bs.modal', function (e) {
		$('select.chosen-modal').chosen();
	})

	$('.isInvisible input, .isInvisible select, .isInvisible textarea').attr('disabled', true);
	$('.isInvisible label.conf_title').addClass('isDisabled');

	// Disable options fields for each row with a multishop default checkbox
	$('.preference_default_multishop input[type=checkbox]').each(function(k, v)
	{
		var key = $(v).attr('name');
		var len = key.length;
		checkMultishopDefaultValue(v, key.substr(24, len - 25));
	});

	$('input[name^=\'multishopOverrideOption\']').each(function(k, v)
	{
		var key = $(v).attr('name');
		var len = key.length;
		toggleMultishopDefaultValue(v, key.substr(24, len - 25));
	});

	$(document).on('keyup change', '.copy2friendlyUrl', function(e){
		if (!isArrowKey(e))
			return copy2friendlyURL();
	});

	// on live will make this binded for dynamic content
	$(document).on('keyup change', '.updateCurrentText', function(e){
		if (typeof e == KeyboardEvent)
			if(isArrowKey(e))
				return;

		updateCurrentText();
	});

	$(document).on('keyup change', '.copyMeta2friendlyURL', function(e){
		if (!isArrowKey(e))
			return copyMeta2friendlyURL()
	});

	$('#ajax_running').ajaxStart(function() {
		ajax_running_timeout = setTimeout(function() {showAjaxOverlay()}, 1000);
	});

	$('#ajax_running').ajaxStop(function() {
		var element = $(this)
		setTimeout(function(){element.hide()}, 1000);
		clearTimeout(ajax_running_timeout);
	});

	$('#ajax_running').ajaxError(function() {
		var element = $(this)
		setTimeout(function(){element.hide()}, 1000);
		clearTimeout(ajax_running_timeout);
	});

	bindTabModuleListAction();

	bindAddonsButtons();

	//Check filters value on submit filter
	$("[name='submitFilter']").click(function(event) {
		var list_id = $(this).data('list-id');
		var empty_filters = true;

		$(document.body).find("input[name*='"+list_id+"Filter']").each(function() {
			if ($(this).val() != '')
			{
				empty_filters = false;
				return false;
			}
		});

		$(document.body).find("select[name*='"+list_id+"Filter']").each(function() {
			empty_filters = false;
			return false;
		});

		if (empty_filters)
		{
			event.preventDefault();
			$('#'+list_id+'-empty-filters-alert').show();
		}
	});

	var message = $('.toolbarHead');
	var view = $(window);

	// bind only if message exists. placeholder will be its parent
	view.bind("scroll resize", function(e)
	{
		message.each(function(el){
			if (message.length)
			{
				placeholder = $(this).parent();
				if (e.type == 'resize')
					$(this).css('width', $(this).parent().width());

				placeholderTop = placeholder.offset().top;
				var viewTop = view.scrollTop() + 15;
				// here we force the toolbar to be "not fixed" when
				// the height of the window is really small (toolbar hiding the page is not cool)
				window_is_more_than_twice_the_toolbar  = view.height() > message.parent().height() * 2;
				if (!$(this).hasClass("fix-toolbar") && (window_is_more_than_twice_the_toolbar && (viewTop > placeholderTop)))
				{
					$(this).css('width', $(this).width());
					// fixing parent height will prevent that annoying "pagequake" thing
					// the order is important : this has to be set before adding class fix-toolbar
					$(this).parent().css('height', $(this).parent().height());
					$(this).addClass("fix-toolbar");
				}
				else if ($(this).hasClass("fix-toolbar") && (!window_is_more_than_twice_the_toolbar || (viewTop <= placeholderTop)) )
				{
					$(this).removeClass("fix-toolbar");
					$(this).removeAttr('style');
					$(this).parent().removeAttr('style');
				}
			}
		});
	}); // end bind

	$(document).on('click', '.untrustedaddon', function(e){
		e.preventDefault();
		var moduleName = $(this).data('module-name');
		var moduleDisplayName = $(this).data('module-display-name');
		var moduleImage = $(this).data('module-image');
		var authorName = $(this).data('author-name');
		var moduleLink = $(this).data('link');
		var authorUri = $(this).data('author-uri');
		var isValidUri = /(https?):\/\/([a-z0-9\.]*)?(prestashop.com).*/gi;
		var addonsSearchLink = 'http://addons.prestashop.com/en/search?search_query='+encodeURIComponent(moduleDisplayName)+'&utm_source=back-office&utm_medium=addons-certified&utm_campaign=back-office-'+iso_user.toUpperCase();

		$('.modal #untrusted-module-logo').attr('src', moduleImage);
		$('.modal .module-display-name-placeholder').text(moduleDisplayName);
		$('.modal .author-name-placeholder').text(authorName);

		if (isValidUri.test(authorUri))
			$('.modal .author-name-placeholder').wrap('<a href="'+authorUri+'" onclick="window.open(this.href);return false;"></a>');

		$('.modal #proceed-install-anyway').attr('href', moduleLink);
		$('.modal .catalog-link').attr('href', addonsSearchLink);
		$('.modal .catalog-link').attr('onclick', 'window.open(this.href);return false;');
	});

	$(document).on('click', '#untrusted-show-risk', function(e){
		e.preventDefault();
		$('.untrusted-content-action').hide();
		$('.untrusted-content-more-info').show();
	});
	$(document).on('click', '#untrusted-show-action', function(e){
		e.preventDefault();
		$('.untrusted-content-more-info').hide();
		$('.untrusted-content-action').show();
	});

	// if count errors
	$('#hideError').on('click', function(e)
	{
		e.preventDefault();
		$('.error').hide('slow', function (){
			$('.error').remove();
		});
		return false;
	});

	// if count warnings
	$(document).on('click', '#linkSeeMore', function(e){
		e.preventDefault();
		$('#seeMore').show();
		$(this).hide();
		$('#linkHide').show();
		return false;
	});
	$(document).on('click', '#linkHide', function(e){
		e.preventDefault();
		$('#seeMore').hide();
		$(this).hide();
		$('#linkSeeMore').show();
		return false;
	});
	$(document).on('click', '#hideWarn', function(e){
		e.preventDefault();
		$('.warn').hide('slow', function (){
			$('.warn').remove();
		});
		return false;
	});

	/** make sure that all the swap id is present in the dom to prevent mistake **/
	if (typeof $('#addSwap') !== undefined && typeof $("#removeSwap") !== undefined &&
		typeof $('#selectedSwap') !== undefined && typeof $('#availableSwap') !== undefined)
	{
		bindSwapButton('add', 'available', 'selected');
		bindSwapButton('remove', 'selected', 'available');

		$('button:submit').click(bindSwapSave);
	}

	if (typeof host_mode !== 'undefined' && host_mode)
	{
        // http://status.prestashop.com/
        var status_map = {
            operational: status_operational,
            degraded_performance: status_degraded_performance,
            partial_outage: status_partial_outage,
            major_outage: status_major_outage,
        };

        var components_map = {'ca1': 0, 'fr1': 1};

        var sp = new StatusPage.page({page: 'rmfc0cm3rk9y'});
        sp.components({
            success: function (data) {
                $('.status-page-description').text(status_map[data.components[components_map[host_cluster]].status]);
                $('.status-page-dot').addClass(data.components[components_map[host_cluster]].status);
            }
        });
    }
    if ($('.kpi-container').length) {
        refresh_kpis();
    }
});

function bindSwapSave()
{
	if ($('#selectedSwap option').length !== 0)
		$('#selectedSwap option').attr('selected', 'selected');
	else
		$('#availableSwap option').attr('selected', 'selected');
}

function bindSwapButton(prefix_button, prefix_select_remove, prefix_select_add)
{
	$('#'+prefix_button+'Swap').on('click', function(e) {
		e.preventDefault();
		$('#' + prefix_select_remove + 'Swap option:selected').each(function() {
			$('#' + prefix_select_add + 'Swap').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
			$(this).remove();
		});
		$('#selectedSwap option').prop('selected', true);
	});
}

function bindTabModuleListAction()
{
	$('.action_tab_module').each( function (){
		$(this).click(function () {
			option = $('#'+$(this).data('option')+' :selected');
			if ($(option).data('onclick') != '')
			{
				var f = eval("(function(){ "+$(option).data('onclick')+"})");
				if (f.call())
					window.location.href = $(option).data('href');
			}
			else
				window.location.href = $(option).data('href');
			return false;
		});
	});
}

// Delete all tags HTML
function stripHTML(oldString)
{
	var newString = '';
	var inTag = false;
	for(var i = 0; i < oldString.length; i++) {
		if(oldString.charAt(i) == '<') inTag = true;
		if(oldString.charAt(i) == '>') {
			if(oldString.charAt(i+1)!='<')
			{
				inTag = false;
				i++;
			}
		}
		if(!inTag) newString += oldString.charAt(i);
	}
	return newString;
}

/**
 * Display a loading bar while an ajax call is ongoing.
 *
 * To prevent the loading bar display for a specific ajax call, set the beforeSend event in your ajax declaration:
 * 		beforeSend : function(data)
 		{
 			// don't display the loading notification bar
 			clearTimeout(ajax_running_timeout);
 		}
 */
function showAjaxOverlay()
{
	$('#ajax_running').show('fast');
	clearTimeout(ajax_running_timeout);
}

function display_action_details(row_id, controller, token, action, params)
{
	var id = action+'_'+row_id;
	var current_element = $('#details_'+id);
	if (!current_element.data('dataMaped')) {
		var ajax_params = {
			'id': row_id,
			'controller': controller,
			'token': token,
			'action': action,
			'ajax': true
		};

		$.each(params, function(k, v) {
			ajax_params[k] = v;
		});

		$.ajax({
			url: 'index.php',
			data: ajax_params,
			dataType: 'json',
			cache: false,
			context: current_element,
			async: false,
			success: function(data) {
				if (typeof(data.use_parent_structure) == 'undefined' || (data.use_parent_structure == true))
				{
					if (current_element.parent().parent().hasClass('alt_row'))
						var alt_row = true;
					else
						var alt_row = false;
					current_element.parent().parent().after($('<tr class="details_'+id+' small '+(alt_row ? 'alt_row' : '')+'"></tr>')
						.append($('<td style="border:none!important;" class="empty"></td>')
						.attr('colspan', current_element.parent().parent().find('td').length)));
					$.each(data.data, function(it, row)
					{
						var bg_color = ''; // Color
						if (row.color)
							bg_color = 'style="background:' + row.color +';"';

						var content = $('<tr class="action_details details_'+id+' '+(alt_row ? 'alt_row' : '')+'"></tr>');
						content.append($('<td class="empty"></td>'));
						var first = true;
						var count = 0; // Number of non-empty collum
						$.each(row, function(it)
						{
							if(typeof(data.fields_display[it]) != 'undefined')
								count++;
						});
						$.each(data.fields_display, function(it, line)
						{
							if (typeof(row[it]) == 'undefined')
							{
								if (first || count == 0)
									content.append($('<td class="'+current_element.align+' empty"' + bg_color + '></td>'));
								else
									content.append($('<td class="'+current_element.align+'"' + bg_color + '></td>'));
							}
							else
							{
								count--;
								if (first)
								{
									first = false;
									content.append($('<td class="'+current_element.align+' first"' + bg_color + '>'+row[it]+'</td>'));
								}
								else if (count == 0)
									content.append($('<td class="'+current_element.align+' last"' + bg_color + '>'+row[it]+'</td>'));
								else
									content.append($('<td class="'+current_element.align+' '+count+'"' + bg_color + '>'+row[it]+'</td>'));
							}
						});
						content.append($('<td class="empty"></td>'));
						current_element.parent().parent().after(content.show('slow'));
					});
				}
				else
				{
					if (current_element.parent().parent().hasClass('alt_row'))
						var content = $('<tr class="details_'+id+' alt_row"></tr>');
					else
						var content = $('<tr class="details_'+id+'"></tr>');
					content.append($('<td style="border:none!important;">'+data.data+'</td>').attr('colspan', current_element.parent().parent().find('td').length));
					current_element.parent().parent().after(content);
					current_element.parent().parent().parent().find('.details_'+id).hide();
				}
				current_element.data('dataMaped', true);
				current_element.data('opened', false);

				if (typeof(initTableDnD) != 'undefined')
					initTableDnD('.details_'+id+' table.tableDnD');
			}
		});
	}

	if (current_element.data('opened'))
	{
		current_element.find('i.icon-collapse-top').attr('class', 'icon-collapse');
		current_element.parent().parent().parent().find('.details_'+id).hide('fast');
		current_element.data('opened', false);
	}
	else
	{
		current_element.find('i.icon-collapse').attr('class', 'icon-collapse-top');
		current_element.parent().parent().parent().find('.details_'+id).show('fast');
		current_element.data('opened', true);
	}
}

function quickSelect(elt)
{
	var eltVal = $(elt).val();
	if (eltVal == "0")
		return false;
	else if (eltVal.substr(eltVal.length - 6) == '_blank')
		window.open(eltVal.substr(0, eltVal.length - 6), '_blank');
	else
		location.href = eltVal;
}

function changeEmployeeLanguage()
{
	if (typeof allowEmployeeFormLang !== 'undefined' && allowEmployeeFormLang)
		$.post("index.php", {
			action: 'formLanguage',
			tab: 'AdminEmployees',
			ajax: 1,
			token: employee_token,
			form_language_id: id_language
		});
}

function hideOtherLanguage(id)
{
	$('.translatable-field').hide();
	$('.lang-' + id).show();

	var id_old_language = id_language;
	id_language = id;

	if (id_old_language != id)
		changeEmployeeLanguage();

	updateCurrentText();
}

function sendBulkAction(form, action)
{
	String.prototype.splice = function(index, remove, string) {
		return (this.slice(0, index) + string + this.slice(index + Math.abs(remove)));
	};

	var form_action = $(form).attr('action');

	if (form_action.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ') == '')
		return false;

	if (form_action.indexOf('#') == -1)
		$(form).attr('action', form_action + '&' + action);
	else
		$(form).attr('action', form_action.splice(form_action.lastIndexOf('&'), 0, '&' + action));

	$(form).submit();
}

function openModulesList()
{
	if (!modules_list_loaded)
	{
		$.ajax({
			type: "POST",
			url : admin_modules_link,
			async: true,
			data : {
				ajax : "1",
				controller : "AdminModules",
				action : "getTabModulesList",
				tab_modules_list : tab_modules_list,
				back_tab_modules_list : window.location.href
			},
			success : function(data)
			{
				$('#modules_list_container_tab_modal').html(data).slideDown();
				$('#modules_list_loader').hide();
				modules_list_loaded = true;
				$('.help-tooltip').tooltip();
			}
		});
	}
	else
	{
		$('#modules_list_container_tab_modal').slideDown();
		$('#modules_list_loader').hide();
	}
	return false;
}

function bindAddonsButtons()
{
	// Method to log on PrestaShop Addons WebServices
	$('#addons_login_button').click(function()
	{
		var username_addons = $("#username_addons").val();
		var password_addons = $("#password_addons").val();
		try
		{
			resAjax = $.ajax({
				type:"POST",
				url : admin_modules_link,
				async: true,
				data : {
					ajax : "1",
					controller : "AdminModules",
					action : "logOnAddonsWebservices",
					username_addons : username_addons,
					password_addons : password_addons
				},
				beforeSend: function(xhr){
					$('#addons_loading').html('<img src="../img/loader.gif" alt="" border="0" />');
				},
				success : function(data){
					if (data == 'OK')
					{
						$('#addons_loading').html('');
						$('#addons_login_div').fadeOut();
						window.location.href = currentIndex + '&token=' + token + '&conf=32';
					}
					else
						$('#addons_loading').html('<br><div class="alert alert-danger">'+errorLogin+'</div>');
				}
			});
		}
		catch(e){}
		return false;
	});

	// Method to log out PrestaShop Addons WebServices
	$('#addons_logout_button').click(function()
	{
		try
		{
			resAjax = $.ajax({
				type:"POST",
				url : admin_modules_link,
				async: true,
				data : {
					ajax : "1",
					controller : "AdminModules",
					action : "logOutAddonsWebservices"
				},
				beforeSend: function(xhr){
					$('#addons_loading').html('<img src="../img/loader.gif" alt="" border="0" />');
				},
				success: function(data) {
					if (data == 'OK')
					{
						$('#addons_loading').html('');
						$('#addons_login_div').fadeOut();
						window.location.reload();
					}
					else
						$('#addons_loading').html(errorLogin);
				}
			});
		}
		catch(e){}
		return false;
	});

}

function ajaxStates(id_state_selected)
{
	$.ajax({
		url: "index.php",
		cache: false,
		data: "token="+state_token+"&ajax=1&action=states&tab=AdminStates&no_empty=0&id_country="+$('#id_country').val() + "&id_state=" + $('#id_state').val(),
		success: function(html)
		{
			if (html == 'false')
			{
				$("#contains_states").fadeOut();
				$('#id_state option[value=0]').attr("selected", "selected");
			}
			else
			{
				$("#id_state").html(html);
				$("#contains_states").fadeIn();
				$('#id_state option[value=' + id_state_selected + ']').attr("selected", "selected");
			}
		}
	});

	if (module_dir && vat_number)
	{
		$.ajax({
			type: "GET",
			url: window.location.origin + module_dir + "vatnumber/ajax.php?id_country=" + $('#id_country').val(),
			success: function(isApplicable)
			{
				if(isApplicable == 1)
					$('#vat_area').show();
				else
					$('#vat_area').hide();
			}
		});
	}
}

function check_for_all_accesses(tabsize, tabnumber)
{
	var i = 0;
	var res = 0;
	var right = 0;
	var rights = new Array('view', 'add', 'edit', 'delete', 'all');

	while (i != parseInt(tabsize) + 1)
	{
		if ($('#view'+i).prop('checked') == false || $('#edit'+i).prop('checked') == false || $('#add'+i).prop('checked') == false || $('#delete'+i).prop('checked') == false)
			$('#all'+i).attr('checked', false);
		else
			$('#all'+i).attr('checked', "checked");
		i++;
	}
	right = 0;
	while (right != 5)
	{
		res = 0;
		i = 0;
		while (i != tabsize)
		{
			if ($('#'+rights[right]+i).prop('checked') == true)
				res++;
			i++;
		}
		if (res == tabnumber - 1)
			$('#'+rights[right]+'all').attr('checked', "checked");
		else
			$('#'+rights[right]+'all').attr('checked', false);
		right++;
	}
}

function perfect_access_js_gestion(src, action, id_tab, tabsize, tabnumber, table)
{
 	if (id_tab == '-1' && action == 'all')
 	{
 		$(table+' .add').attr('checked', src.checked);
 		$(table+' .edit').attr('checked', src.checked);
 		$(table+' .delete').attr('checked', src.checked);
		$(table+' .view').attr('checked', src.checked);
		$(table+' .all').attr('checked', src.checked);
 	}
	else if (action == 'all')
		$(table+' .'+id_tab).attr('checked', src.checked);
 	else if (id_tab == '-1')
 		$(table+' .'+action).attr('checked', src.checked);
	check_for_all_accesses(tabsize, tabnumber);
}

verifMailREGEX = /^([\w+-]+(?:\.[\w+-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,66}(?:\.[a-z]{2})?)$/;
function verifyMail(testMsg, testSubject)
{
	$("#mailResultCheck").removeClass("alert-danger").removeClass('alert-success').html('<img src="../img/admin/ajax-loader.gif" alt="" />');
	$("#mailResultCheck").slideDown("slow");

	//local verifications
	if (!($("#testEmail").val().length > 0))
	{
		$("#mailResultCheck").addClass("alert-danger").removeClass("alert-success").removeClass('userInfos').html(errorMail);
		return false;
	}
	else if (!verifMailREGEX.test( $("#testEmail").val() ))
	{
		$("#mailResultCheck").addClass("alert-danger").removeClass("alert-success").removeClass('userInfos').html(errorMail);
		return false;
	}
	else
	{
		//external verifications and sets
		$.ajax(
		{
		   url: "index.php",
		   cache: false,
		   type : "POST",
		   data:
			{
				"mailMethod"	: (($("input[name=PS_MAIL_METHOD]:checked").val() == 2) ? "smtp" : "native"),
				"smtpSrv"		: $("input[name=PS_MAIL_SERVER]").val(),
				"testEmail"		: $("#testEmail").val(),
				"smtpLogin"		: $("input[name=PS_MAIL_USER]").val(),
				"smtpPassword"	: $("input[name=PS_MAIL_PASSWD]").val(),
				"smtpPort"		: $("input[name=PS_MAIL_SMTP_PORT]").val(),
				"smtpEnc"		: $("select[name=PS_MAIL_SMTP_ENCRYPTION]").val(),
				"testMsg"		: textMsg,
				"testSubject"	: textSubject,
				"token"			: token_mail,
				"ajax"			: 1,
				"tab"				: 'AdminEmails',
				"action"			: 'sendMailTest'
			},
		   success: function(ret)
		   {
				if (ret == "ok")
				{
					$("#mailResultCheck").addClass("alert-success").removeClass("alert-danger").removeClass('userInfos').html(textSendOk);
					mailIsOk = true;
				}
				else
				{
					mailIsOk = false;
					$("#mailResultCheck").addClass("alert-danger").removeClass("alert-success").removeClass('userInfos').html(textSendError + '<br />' + ret);
				}
		   }
		 }
		 );
	}
}

function checkLangPack(token){
	if ($('#iso_code').val().length == 2)
	{
		$('#lang_pack_loading').show();
		$('#lang_pack_msg').hide();
		doAdminAjax(
			{
				controller:'AdminLanguages',
				action:'checkLangPack',
				token:token,
				ajax:1,
				iso_lang:($('#iso_code').val()).toLowerCase(),
				ps_version:$('#ps_version').val()
			},
			function(ret)
			{
				$('#lang_pack_loading').hide();
				ret = $.parseJSON(ret);
				if( ret.status == 'ok')
				{
					content = $.parseJSON(ret.content);
					message = langPackOk + ' <b>'+content['name'] + '</b>) :'
						+'<br />' + langPackVersion + ' ' + content['version']
						+ ' <a href="http://www.prestashop.com/download/lang_packs/gzip/' + content['version'] + '/'
						+ ($('#iso_code').val()).toLowerCase()+'.gzip" target="_blank" class="link">'+download+'</a><br />' + langPackInfo;
					$('#lang_pack_msg').html(message);
					$('#lang_pack_msg').show();
				}
				else
					showErrorMessage(ret.error);
			}
		 );
	 }
}

function redirect(new_page) { window.location = new_page; }

function saveCustomerNote(customerId){
	var noteContent = $('#noteContent').val();
	var data = 'token=' + token_admin_customers + '&tab=AdminCustomers&ajax=1&action=updateCustomerNote&id_customer=' + customerId + '&note=' + encodeURIComponent(noteContent);
	$.ajax({
		type: "POST",
		url: "index.php",
		data: data,
		async : true,
		success: function(r) {

			if (r == 'ok') {
				$('#submitCustomerNote').attr('disabled', true);
			}
			showSuccessMessage(update_success_msg);
		}
	});
}

function isCleanHtml(content)
{
	var events = 'onmousedown|onmousemove|onmmouseup|onmouseover|onmouseout|onload|onunload|onfocus|onblur|onchange';
	events += '|onsubmit|ondblclick|onclick|onkeydown|onkeyup|onkeypress|onmouseenter|onmouseleave|onerror|onselect|onreset|onabort|ondragdrop|onresize|onactivate|onafterprint|onmoveend';
	events += '|onafterupdate|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditfocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onmove';
	events += '|onbounce|oncellchange|oncontextmenu|oncontrolselect|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondeactivate|ondrag|ondragend|ondragenter|onmousewheel';
	events += '|ondragleave|ondragover|ondragstart|ondrop|onerrorupdate|onfilterchange|onfinish|onfocusin|onfocusout|onhashchange|onhelp|oninput|onlosecapture|onmessage|onmouseup|onmovestart';
	events += '|onoffline|ononline|onpaste|onpropertychange|onreadystatechange|onresizeend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onsearch|onselectionchange';
	events += '|onselectstart|onstart|onstop';

	var script1 = /<[\s]*script/im;
	var script2 = new RegExp('('+events+')[\s]*=', 'im');
	var script3 = /.*script\:/im;
	var script4 = /<[\s]*(i?frame|embed|object)/im;

	if (script1.test(content) || script2.test(content) || script3.test(content) || script4.test(content))
		return false;

	return true;
}

function parseDate(date){
	return $.datepicker.parseDate("yy-mm-dd", date);
}

function refresh_kpis()
{
	$('.box-stats').each(function() {
		if ($(this).attr('id')) {
			var functionName = 'refresh_' + $(this).attr('id').replace(/-/g, '_');

			if (typeof window[functionName] === 'function') {
				window[functionName]();
			}
		}
	});
}

function createSqlQueryName()
{
	var container = false;
	if ($('.breadcrumb-container'))
		container = $('.breadcrumb-container').first().text().replace(/\s+/g, ' ').trim();
	var current = false;
	if ($('.breadcrumb-current'))
		current = $('.breadcrumb-current').first().text().replace(/\s+/g, ' ').trim();
	var title = false;
	if ($('.page-title'))
		title = $('.page-title').first().text().replace(/\s+/g, ' ').trim();

	var name = false;
	if (container && current && container != current)
		name = container + ' > ' + current;
	else if (container)
		name = container;
	else if (current)
		name = current;

	if (title && title != current && title != container)
	{
		if (name)
			name = name + ' > ' + title;
		else
			name = title;
	}

	return name.trim();
}

function confirm_link(head_text, display_text, confirm_text, cancel_text, confirm_link, cancel_link)
{
	$.alerts.okButton = confirm_text;
	$.alerts.cancelButton = cancel_text;
	jConfirm(display_text, head_text, function(confirm){
		if (confirm === true)
			document.location = confirm_link;
		else
			document.location = cancel_link;
	});
}
