/*------------------------------------------------------------------------
 # Full Name of JSN UniForm
 # ------------------------------------------------------------------------
 # author    JoomlaShine.com Team
 # copyright Copyright (C) 2016 JoomlaShine.com. All Rights Reserved.
 # Websites: http://www.joomlashine.com
 # Technical Support:  Feedback - http://www.joomlashine.com/contact-us/get-support.html
 # @license - GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 # @version $Id: form.js 19014 2012-11-28 04:48:56Z thailv $
 -------------------------------------------------------------------------*/
define([
    'jquery',
    'uniform/visualdesign/visualdesign',
    'uniform/uniform',
    'uniform/help',
    'uniform/dialogedition',
    'uniform/layout',
    'jsn/libs/modal',   
    'uniform/libs/select2/select2',
    'codemirror',
    'codemirror.mode.css',
    'codemirror.selection.markselection',
    'codemirror.selection.activeline',
    'codemirror.edit.matchbrackets',
    'uniform/libs/colorpicker/js/colorpicker',
    'jquery.jwysiwyg09',
    'jquery.wysiwyg.colorpicker',
    'jquery.wysiwyg.table',
    'jquery.wysiwyg.cssWrap',
    'jquery.wysiwyg.image',
    'jquery.wysiwyg.link',
    'jquery.json',
    'jquery.zeroclipboard',
    'jquery.ui'],

    function ($, JSNVisualDesign, JSNUniform, JSNHelp, JSNUniformDialogEdition, JSNLayoutCustomizer, JSNModal) {
        var urlBase = "";
        var colorScheme;
        var token = '';
        var JSNUniformFormView = function (params) {
            this.params = params;
            this.lang = params.language;
            this.formStyle = params.form_style;
            this.urlAction = params.urlAction;
            this.checkSubmitModal = params.checkSubmitModal;
            this.baseZeroClipBoard = params.baseZeroClipBoard;
            this.pageContent = params.pageContent;
            this.opentArticle = params.opentArticle;
            this.titleForm = params.titleForm;
            
            token = params.token;
            urlBase = params.urlBase;
            this.init();
        }
        var oldValuePage = $("#form-design-header").attr('data-value');
        JSNUniformFormView.prototype = {
            init:function () {
                var self = this;
                this.visualDesign = new JSNVisualDesign('#form-container', this.params);
                this.JSNUniform = new JSNUniform(this.params, this.visualDesign);
                this.JSNHelp = new JSNHelp();
                this.JSNLayoutCustomizer = new JSNLayoutCustomizer(this.visualDesign,this.lang);
                this.selectPostAction = $("#jform_form_post_action");
                this.inputFormTitle = $("#jform_form_title");
                this.btnAddPageForm = $(".new-page");
                this.btnSelectFormStyle = $("#select_form_style");
                var idForm = $("#jform_form_id").val();
                colorScheme = $("#jform_form_theme").val();
                var editorCustomStyle = CodeMirror.fromTextArea(document.getElementById("style_custom_css"), {
                    lineNumbers: true,
                    styleActiveLine: true,
                    matchBrackets: true
                });
                editorCustomStyle.on("keydown", function(cm, change) {
                    $("#style_custom_css").html(cm.getValue()).trigger("change");
                    $("#style_inline style.formstylecustom").html(cm.getValue());
                });
                editorCustomStyle.on("keyup", function(cm, change) {
                    $("#style_custom_css").html(cm.getValue()).trigger("change");
                    $("#style_inline style.formstylecustom").html(cm.getValue());
                });
                this.menuToolBar = $("#jsn-menu-item-toolbar-menu ul li a");

                $("li.action-save-show a").click(function () {
                    $("#redirectUrlForm").val($(this).attr("href"));
                    Joomla.submitbutton("form.apply");
                    return false;
                });

                //recaptcha msg
                $('#jform_form_captcha').on('change', function(){
                    if($('#jform_form_captcha').val() == '1'){
                        var captchaStatus = $('#recaptcha-msg').attr('recaptcha-status');
                        if(captchaStatus == 'disabled'){
                            $('#recaptcha-msg').removeClass('hidden');
                        }else{
                            $('#recaptcha-msg').addClass('hidden');
                        }
                    }else{
                        $('#recaptcha-msg').addClass('hidden');
                    }

                    if ($(this).val() != '0')
                    {
                    	$('#recaptcha-hide-if-logged-in').removeClass('hide');
                    }
                    else
                    {
                    	$('#recaptcha-hide-if-logged-in').addClass('hide');
                    }
                    
                }).trigger("change");

                $("#dialog-plugin").dialog({
                    height:300,
                    width:500,
                    title:self.lang['JSN_UNIFORM_LAUNCHPAD_PLUGIN_SYNTAX'],
                    draggable:false,
                    resizable:false,
                    autoOpen:false,
                    modal:true,
                    buttons:{
                        Close:function () {
                            $("#dialog-plugin").dialog("close");
                        }
                    }
                });
                
                if (this.opentArticle == "open") {
                    this.opentAcrtileContent();
                }
                
                $("#article-content-plugin").click(function () {
                    $("#open-article").val("open");
                    Joomla.submitbutton("form.apply");
                });
                
                $("#jsn-uf-preview").click(function () {
                	
                	JSNVisualDesign.savePage();                   
                	var form 		= $('#adminForm');
                	form.find('#jsn-task').val('form.getFormDataForPreview');
                	var urlSubmit 	= $(this).attr('href');
                	var secretKey   = $(this).attr('data-secret');
                	var edition 	= $(this).attr('data-edition'); 
            		window.open('','JSNUniformPreview');

                	setTimeout(function() {
            			$.ajax({
            				type: "POST",
            				url:"index.php?option=com_uniform&view=form&tmpl=component&" + token + '=1',
            				data: form.serialize(),
            				dataType: 'json',
            				/*async: false,*/
            				success: function( response ) {
            					form.find('#jsn-task').val('');
            					var html = "<input name='html_items' type='hidden' value='" + JSON.stringify(response.items) + "' />" +
            					"<input name='html_formpage' type='hidden' value='" + JSON.stringify(response.formpages) + "' />" +
            					"<input name='secret_key' type='hidden' value='" + secretKey + "' />" +
    							"<input name='form_token' type='hidden' value='" + token + "' />";

            					var newForm = '<form class="hide" id="jsn-form-preview" action="' + urlSubmit + '" method="post" target="JSNUniformPreview">' + html + '</form>';                 
            					form.parent().append(newForm);   
            					
            					$( "#jsn-form-preview" ).submit();
            					$( "#jsn-form-preview" ).remove();
            					
            					return false; 
            				}
            			});
        			}, 500); 
        			return false;
                                   	
                });  
                
                $(".jsn-tabs").tabs({
                    selected:0,
                    activate:function (event, ui) {
						var tabActive = $(ui.newTab).find('a').attr('href');
						if(tabActive === '#formCustomCss' ){
							editorCustomStyle.refresh();
						}
                    }
                });
                var Jsnwysiwyg = {
                    // required
                    name:	"jsnwysiwyg",
                    methodForRealLife: function (object, text) {
                        // jQuery chain
                        return object.each(function () {
                            // standard operations
                            var Wysiwyg = $(this).data("wysiwyg");
                            if (!Wysiwyg) {
                                return this;
                            }
                            // Plugin code
                            // Wysiwyg gives access to all methods and properties, also
                            // you can extend base functionality
                            Wysiwyg.newPropertyName = "methodForRealLife";
                            Wysiwyg.newMethodName = function() {
                                this.setContent(text);
                            };
                            Wysiwyg.newMethodName();
                        });
                    }
                };
                // Register your plugin
                $.wysiwyg.plugin.register(Jsnwysiwyg);
                var windowForm = document.forms[0];
                var defaultEditor = $(windowForm).find('input#default-editor');
                if ($(defaultEditor).attr('data-editor') == 'tinymce') {
                    tinymce.init({
                        selector: '#form_post_action_data4',
                        // General
                        directionality: 'ltr',
                        language: 'en',
                        mode: "specific_textareas",
                        autosave_restore_when_empty: false,
                        skin: "lightgray",
                        theme: "modern",
                        schema: "html5",
                        // Cleanup/Output
                        inline_styles: true,
                        gecko_spellcheck: true,
                        entity_encoding: "raw",
                        valid_elements: "",
                        extended_valid_elements: "hr[id|title|alt|class|width|size|noshade]",
                        force_br_newlines: false, force_p_newlines: true, forced_root_block: 'p',
                        toolbar_items_size: "small",
                        invalid_elements: "script,applet,iframe",
                        // Plugins
                        plugins: "table link image code hr charmap autolink lists importcss",
                        // Toolbar
                        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect | bullist numlist",
                        toolbar2: "outdent indent | undo redo | link unlink anchor image code | hr table | subscript superscript | charmap",
                        removed_menuitems: "newdocument",
                        // URL
                        relative_urls: false,
                        remove_script_host: false,
                        //document_base_url : document_base_url,
                        // Layout
                        importcss_append: true,
                        // Advanced Options
                        resize: "both"
                    });
                }
                else if($(defaultEditor).attr('data-editor') == 'jce')
                {
                    if(!typeof WFEditor)
                    {
                        try
                        {
                        	WFEditor.init(WFEditor.settings);
                    	}
                        catch(e)
                        {
                        	console.debug(e);
                    	}
                        $('#form_post_action_data4_parent').css('display', 'block !important');
                    }
                }
                else
                {
                    $("#form_post_action_data4").wysiwyg({
                        controls:{
                            bold:{ visible:true },
                            italic:{ visible:true },
                            underline:{ visible:true },
                            strikeThrough:{ visible:true },
                            justifyLeft:{ visible:true },
                            justifyCenter:{ visible:true },
                            justifyRight:{ visible:true },
                            justifyFull:{ visible:true },
                            indent:{ visible:true },
                            outdent:{ visible:true },
                            subscript:{ visible:true },
                            superscript:{ visible:true },
                            undo:{ visible:true },
                            redo:{ visible:true },
                            insertOrderedList:{ visible:true },
                            insertUnorderedList:{ visible:true },
                            insertHorizontalRule:{ visible:true },
                            h4:{
                                visible:true,
                                className:'h4',
                                command:($.browser.msie || $.browser.safari) ? 'formatBlock' : 'heading',
                                arguments:($.browser.msie || $.browser.safari) ? '<h4>' : 'h4',
                                tags:['h4'],
                                tooltip:'Header 4'
                            },
                            h5:{
                                visible:true,
                                className:'h5',
                                command:($.browser.msie || $.browser.safari) ? 'formatBlock' : 'heading',
                                arguments:($.browser.msie || $.browser.safari) ? '<h5>' : 'h5',
                                tags:['h5'],
                                tooltip:'Header 5'
                            },
                            h6:{
                                visible:true,
                                className:'h6',
                                command:($.browser.msie || $.browser.safari) ? 'formatBlock' : 'heading',
                                arguments:($.browser.msie || $.browser.safari) ? '<h6>' : 'h6',
                                tags:['h6'],
                                tooltip:'Header 6'
                            },
                            html:{ visible:true },
                            increaseFontSize:{ visible:true },
                            decreaseFontSize:{ visible:true }
                        }
                    });
                }

                // Set TinyMCE un-resizeable
                $('.mce-last.mce-flow-layout-item.mce-resizehandle.mce-resizehandle-both').css({'display':'none'});

                var formAction = self.params.formAction ? self.params.formAction : 0;
                if (formAction && formAction != 0) {
                    $("#jform_form_post_action option").each(function () {
                        if (formAction == $(this).val()) {
                            var formActionData = self.params.formActionData;
                            $(this).prop('selected', true);
                            if (formAction == 1 ) {
                                $("#form_post_action_data" + formAction).val(formActionData);
                            }
                            if(formAction == 4){
                                $("#form_post_action_data" + formAction).wysiwyg("jsnwysiwyg.methodForRealLife",formActionData);
                            }
                            if (formAction == 2 || formAction == 3) {
                                $("#form_post_action_data" + formAction).val(formActionData.id);
                                $("#fr" + formAction + "_form_action_data_title").val(formActionData.title);
                            }
                        }
                    });
                }

                if ($("#jform_form_type").val() == 2) {
                    $(".jsn-master #form-design #form-design-header").show();
                    $('.jsn-master li[aria-controls="form-page"]').show();
                } else {
                    $(".jsn-master #form-design #form-design-header").hide();
                    $('.jsn-master li[aria-controls="form-page"]').hide();
                }
                this.selectPostAction.change(function () {
                    $('#postaction div[id^=form]').addClass("hide");
                    $('#form' + $(this).val()).removeClass("hide");
                    $('#form_post_action_data4_toolbargroup').removeClass("hide");
                    $('#form_post_action_data4_parent').removeClass("hide");
                    $("#action").val($(this).val());
                }).change();
                $(".jsn-page-actions .prev-page").click(function () {
                    $("#visualdesign-options").remove();
                    $("#visualdesign-toolbox").remove();
                    self.prevpaginationPage();
                });
                $(".jsn-page-actions .next-page").click(function () {
                    $("#visualdesign-options").remove();
                    $("#visualdesign-toolbox").remove();
                    self.nextpaginationPage();
                });
                $("#jform_form_type").change(function () {
                    if ($(this).val() == 1) {
                        if (confirm(self.lang['JSN_UNIFORM_CONFIRM_CONVERTING_FORM'])) {
                            $(".jsn-master #form-design #form-design-header").hide();
                            $('.jsn-master li[aria-controls="form-page"]').hide();
                            var dataValue = $(".jsn-page-list > li.page-items").attr("data-value");
                            var dataText = $(".jsn-page-list > li.page-items > input").val();
                            $("#form-design-header").attr("data-value", dataValue);
                            $("#form-design-header .page-title h1").text(dataText);
                            self.loadPage('join');
                        } else {
                            $("#jform_form_type option").each(function () {
                                if ($(this).val() == 2) {
                                    $(this).prop('selected', true);
                                }
                            });
                        }
                    } else {
                        $(".jsn-master #form-design #form-design-header").show();
                        $('.jsn-master li[aria-controls="form-page"]').show();
                    }
                });
                this.btnAddPageForm.click(function () {
                    self.addNewPage();
                });
                this.inputFormTitle.bind('keypress', function (e) {
                    if (e.keyCode == 13) {
                        return false;
                    }
                });

                //get menu item
                window.jsnGetSelectMenu = function (id, title, object, link) {
                    $("#form_post_action_data2").val(id);
                    $("#fr2_form_action_data_title").val(title);
                    $.closeModalBox();
                }
                // get article
                window.jsnGetSelectArticle = function (id, title, catid, object, link) {
                    $("#form_post_action_data3").val(id);
                    $("#fr3_form_action_data_title").val(title);
                    $.closeModalBox();
                }

                if (this.checkSubmitModal) {
                    $.getSetModal($("#jform_form_id").val());
                }
                window.parentSaveForm = function () {
                    $.parentSaveForm();
                }
                $.parentSaveForm = function () {
                    $(document).trigger("click");
                    var listOptionPage = [];
                    var listContainer = [];
                    $(" ul.jsn-page-list li.page-items").each(function () {
                        listOptionPage.push([$(this).find("input").attr('data-id'), $(this).find("input").attr('value')]);
                    });
                    $("#form-container .jsn-row-container").each(function () {
                        var listColumn = [];
                        $(this).find(".jsn-column-content").each(function () {
                            var dataContainer = {};
                            var columnName = $(this).attr("data-column-name");
                            var columnClass = $(this).attr("data-column-class");
                            dataContainer.columnName = columnName;
                            dataContainer.columnClass = columnClass;
                            listColumn.push(dataContainer);
                        });
                        listContainer.push(listColumn);
                    });
                    $.ajax({
                        type:"POST",
                        async:true,
                        url:"index.php?option=com_uniform&view=form&task=form.savepage&tmpl=component&" + token + "=1",
                        data:{
                            form_id:$("#jform_form_id").val(),
                            form_content:self.visualDesign.serialize(),
                            form_page_name:$("#form-design-header").attr('data-value'),
                            form_list_page:listOptionPage,
                            form_list_container:$.toJSON(listContainer)
                        },
                        success:function () {
                            if ($("#jform_form_title").val() == "") {
                                $(".jsn-tabs").tabs({
                                    selected:0
                                });
                                $("#jform_form_title").parent().parent().addClass("error");
                                $("#jform_form_title").focus();
                                alert('Please correct the errors in the Form');
                                return false;
                            } else {
                                $("#jsn-task").val("form.apply");
                                $("form#adminForm").submit();
                            }

                        }
                    });
                }
                this.checkPage();
                if (this.urlAction != "component") {
                    Joomla.submitbutton = function (pressedButton) {
                        var listOptionPage = [];
                        var listContainer = [];
                        $(" ul.jsn-page-list li.page-items").each(function () {
                            listOptionPage.push([$(this).find("input").attr('data-id'), $(this).find("input").attr('value')]);
                        });
                        $("#form-container .jsn-row-container").each(function () {
                            var listColumn = [];
                            $(this).find(".jsn-column-content").each(function () {
                                var dataContainer = {};
                                var columnName = $(this).attr("data-column-name");
                                var columnClass = $(this).attr("data-column-class");
                                dataContainer.columnName = columnName;
                                dataContainer.columnClass = columnClass;
                                listColumn.push(dataContainer);
                            });
                            listContainer.push(listColumn);
                        });
                        
                        $.ajax({
                            type:"POST",
                            async:true,
                            url:"index.php?option=com_uniform&view=form&task=form.savepage&tmpl=component&" + token + "=1",
                            data:{
                                form_id:$("#jform_form_id").val(),
                                form_content:self.visualDesign.serialize(),
                                form_page_name:$("#form-design-header").attr('data-value'),
                                form_list_page:listOptionPage,
                                form_list_container:$.toJSON(listContainer)
                            },
                            success:function () {
                                if (/^form\.(save|apply)/.test(pressedButton)) {
                                    if ($("#jform_form_title").val() == "") {
                                        $(".jsn-tabs").tabs({
                                            selected:0
                                        });
                                        $("#jform_form_title").parent().parent().addClass("error");
                                        $("#jform_form_title").focus();
                                        alert('Please correct the errors in the Form');
                                        return false;
                                    }
                                }
                                submitform(pressedButton);
                            }
                        });
                    };
                }
                $("#form-design-header a.element-edit").click(function () {
                    self.cerateEditPage($(this));
                });
                $("#form-design-header a.element-delete").click(function (e) {
                    self.removePage(this);
                    e.stopPropagation();
                });
                $(".jsn-modal-overlay,.jsn-modal-indicator").remove();
                $("body").append($("<div/>", {
                    "class":"jsn-modal-overlay",
                    "style":"z-index: 1000; display: inline;"
                })).append($("<div/>", {
                    "class":"jsn-modal-indicator",
                    "style":"display:block"
                })).addClass("jsn-loading-page");
                this.loadPage('defaultPage');
                this.actionForm();
                this.mailchimpSubcriber();
                this.paymentForm();
                if (this.titleForm) {
                    $("#jform_form_title").val(this.titleForm);
                }
                this.btnSelectFormStyle.click(function (e) {
                    self.dialogFormStyle($(this));
                    e.stopPropagation();
                });
                $("#jform_form_theme").select2({
                    formatResult:self.formatSelect2,
                    formatSelection:self.formatSelect2,
                    escapeMarkup:function (m) {
                        return m;
                    }
                });
                $("#form-design-content").attr('class', $("#form-design-content").attr('class').replace(/\bjsn-style[-_]*[^\s]+\b/, $("#jform_form_theme").val()));
                //  $("#form-design-content").attr("class", $("#jform_form_theme").val());
                $("#jform_form_style").change(function () {
                    if ($(this).val() == "form-horizontal") {
                        $("#form-design-content").addClass("form-horizontal");
                    } else {
                        $("#form-design-content").removeClass("form-horizontal");
                    }
                    //$("#form-design-content").attr("class",$(this).val())
                }).trigger("change")
                //self.changeTheme();
                $("#theme_action_add").click(function () {
                    $("#add-theme-select").removeClass("hide");
                    $("#form-select").addClass("hide");
                    $("#theme_action").addClass("hide");
                    $("#input_new_theme").focus().focus().bind('keypress', function (e) {
                        if (e.keyCode == 13) {
                            $("#btn_add_theme").trigger("click");
                            return false;
                        }
                        if (e.keyCode == 27) {
                            $("#btn_cancel_theme").trigger("click");
                        }
                    });
                    $(document).click(function(){
                        $("#btn_cancel_theme").trigger("click");
                    });
                });
                $("#btn_cancel_theme").click(function () {
                    $("#add-theme-select").addClass("hide");
                    $("#form-select").removeClass("hide");
                    $("#theme_action").removeClass("hide");
                    $("#input_new_theme").val("");
                });
                $("#btn_add_theme").click(function () {
                    var theme = $("#input_new_theme").val();
                    var check = false;
                    if (theme == "") {
                        return false;
                    }
                    $("#jform_form_theme option").each(function () {
                        if ($(this).val() == "jsn-style-" + theme) {
                            check = true;
                        }
                    });
                    if (check) {
                        alert(self.lang['JSN_UNIFORM_COLOR_CONFIRM_EXISTS']);
                        return false;
                    }
                    $("#jform_form_theme").append($("<option/>", {"value":"jsn-style-" + theme, "text":theme}));
                    $("#option_themes").append(
                        $("<input/>", {"class":"jsn-style-" + theme, "type":"hide", "name":"form_style[themes_style][" + theme + "]"})
                    ).append(
                        $("<input/>", {"value":theme, "type":"hide", "name":"form_style[themes][]"})
                    )
                    $("#add-theme-select").addClass("hide");
                    $("#form-select").removeClass("hide");
                    $("#theme_action").removeClass("hide");
                    $("#jform_form_theme").select2({
                        formatResult:self.formatSelect2,
                        formatSelection:self.formatSelect2,
                        escapeMarkup:function (m) {
                            return m;
                        }
                    });
                    $("#jform_form_theme").val("jsn-style-" + theme).prop('selected', true);
                    $("#jform_form_theme").trigger("change");
                    self.resetTheme("jsn-style-light");
                    $("#input_new_theme").val("");
                });
                $("#jform_form_theme").change(function () {
                    var theme = $(this).val();
                    var styleTheme = {};

                    $("#style_accordion_content input,#style_accordion_content select,#style_accordion_content textarea").each(function () {
                        var nameStyle = $(this).attr("name");
                        if (nameStyle) {
                            nameStyle = nameStyle.match(/form_style\[(.*?)\]/);
                            styleTheme[nameStyle[1]] = $(this).val();
                        }
                        $("#option_themes input[name$='[themes_style][" + colorScheme.replace("jsn-style-", "") + "]']").val($.toJSON(styleTheme));
                    });
                    var optionTheme = $("#option_themes input[name$='[themes_style][" + theme.replace("jsn-style-", "") + "]']").val();

                    if (optionTheme) {
                        var options = $.evalJSON(optionTheme);
                        //Form style button
                        $("#style_accordion_content select").each(function () {
                            var className = $(this).attr("id");
                            var nameOption = className.replace("style_", "");

                            $(this).val(options[nameOption]).prop('selected', true);
                            $(this).select2("val", options[nameOption]);
                            if (className !== 'style_font_type') {
                                $(this).val(options[className]).prop('selected', true);
                                $("select.jsn-select2").select2({
                                    formatResult: self.formatButtonSelect2,
                                    formatSelection: self.formatButtonSelect2,
                                    minimumResultsForSearch: 99,
                                    escapeMarkup: function (m) {
                                        return m;
                                    }
                                });
                            }
                        });
                        $("#style_accordion_content input").each(function () {
                            if (!$(this).hasClass('select2-focusser')) {
                                var className = $(this).attr("id");
                                if (className) {
                                    var nameOption = className.replace("style_", "");
                                    $(this).val(options[nameOption]);
                                }
                            }
                        });
                        $("#style_accordion_content textarea").each(function () {
                            var className = $(this).attr("id");
                            if (className) {
                                var nameOption = className.replace("style_", "");
                                $(this).html(options[nameOption]);
                            }
                        });
                    } else {
                        if (theme == "jsn-style-light" || theme == "jsn-style-dark") {
                            self.resetTheme($("#jform_form_theme").val());
                        } else {
                            $("#style_accordion_content input[type=text]").each(function () {
                                $(this).val("");
                            });
                            $("#style_accordion_content select").each(function () {
                                $(this).eq(1).prop('selected', true);
                            });
                        }
                    }
                    $(".jsn-select-color").each(function () {
                        var inputParent = $(this).prev();
                        $(this).find("div").css("background-color", $(inputParent).val());
                        $(this).ColorPickerSetColor($(inputParent).val());
                    });
                    editorCustomStyle.setValue($("#style_custom_css").html());
                    $("#style_inline style.formstylecustom").html(editorCustomStyle.getValue());
                    $("#style_accordion_content input[type=radio]").trigger("change");
                    self.updateButtonSubmit();
                    self.updateButtonReset();
                    self.updateButtonPreview();
                    self.updateButtonPrev();
                    self.updateButtonNext();
                    $("#form-design-content").attr('class', $("#form-design-content").attr('class').replace(/\bjsn-style[-_]*[^\s]+\b/, theme));
                    self.changeStyleInline();
                    self.actionTheme();
                    colorScheme = $(this).val();
                });
                $("#theme_action_refresh").click(function () {
                    if (confirm(self.lang['JSN_UNIFORM_COLOR_CONFIRM_RESET'])) {
                        self.resetTheme($("#jform_form_theme").val());
                    }
                });
                $("#jform_form_edit_submission0,#jform_form_edit_submission1").change(function () {
                    if ($("#jform_form_edit_submission1").is(':checked')) {
                        $("#jsn-select-user-group").removeClass("hide");
                    } else {
                        $("#jsn-select-user-group").addClass("hide");
                    }
                }).trigger("change");
                $("#jform_form_view_submission0,#jform_form_view_submission1").change(function () {
                    if ($("#jform_form_view_submission1").is(':checked')) {
                        $("#jsn-select-user-group-access").removeClass("hide");
                    } else {
                        $("#jsn-select-user-group-access").addClass("hide");
                    }
                }).trigger("change");
                $("#theme_action_delete").click(function () {
                    if (confirm(self.lang['JSN_UNIFORM_COLOR_CONFIRM_DELETE'])) {
                        var valueSelectTheme = $("#jform_form_theme").val();
                        if (valueSelectTheme == "jsn-style-light" || valueSelectTheme == "jsn-style-dark") {
                            return false;
                        } else {
                            $("#jform_form_theme option:selected").each(function () {
                                if ($(this).val() != "jsn-style-light" && $(this).val() != "jsn-style-dark") {
                                    var classRemove = $(this).val();
                                    var valueRemove = classRemove.replace("jsn-style-", "");
                                    $("#option_themes input").each(function () {
                                        if ($(this).attr("class") == classRemove) {
                                            $(this).remove();
                                        }
                                        if ($(this).val() == valueRemove) {
                                            $(this).remove();
                                        }
                                    });
                                    $(this).remove();
                                }
                            });
                            $("#jform_form_theme").eq(1).prop('selected', true);
                            $("#jform_form_theme").trigger("change");
                        }
                    }
                });
                self.actionTheme();
                self.actionTheme();
                $("#button_submit_color").change(function () {
                    self.updateButtonSubmit();
                });
                $("#button_reset_color").change(function () {
                    self.updateButtonReset();
                });
                $("#button_preview_color").change(function () {
                    self.updateButtonPreview();
                });
                $("#button_prev_color").change(function () {
                    self.updateButtonPrev();
                });
                $("#button_next_color").change(function () {
                    self.updateButtonNext();
                });
                $("#button_position").change(function(){
                    $(".jsn-sortable-disable .form-actions .btn-toolbar").attr("class", $(this).val());
                });
                $("select.jsn-select2").select2({
                    formatResult:self.formatButtonSelect2,
                    formatSelection:self.formatButtonSelect2,
                    minimumResultsForSearch:99,
                    escapeMarkup:function (m) {
                        return m;
                    }
                });
                if (!idForm || $("#jform_form_theme").attr("data-default") == "") {
                    self.resetTheme("jsn-style-light");
                }

                if($('#jform_form_payment_type')){
                    if($('#jform_form_payment_type').val() == '' || $('#jform_form_payment_type').attr('disabled')){
                        $('#form-design .form-payments').css({display:'none'});
                    }
                    $('#jform_form_payment_type').on('change', function () {
                        if($(this).val() == ''){
                            $('#form-design .form-payments').css({display:'none'});
                        }else{
                            $('#form-design .form-payments').css({display:'block'});
                        }
                    });
                }

                if($('#hidUseMailchimp'))
                {
                    if($('#hidUseMailchimp').val() == '' || $('#hidUseMailchimp').val() == 0)
                    {
                        $('#form-design .mailchimp-subcriber').css({display:'none'});
                    }
                    $('.use_mailchimp').click(function () {
                        if($(this).hasClass('choiseYes'))
                        {
                            $('#form-design .mailchimp-subcriber').css({display:'block'});
                        }
                        else
                        {
                            $('#form-design .mailchimp-subcriber').css({display:'none'});
                        }
                    });
                }


                $('li[aria-controls="form-design"]').click(function(){
                    $('body').find('.jsn-email-settings').remove();
                })
                
                $('li[aria-controls="form-design"]').click(function(){
                	self.loadPage();
                })
                
                $('li[aria-controls="form-page"]').on('click', function(){
                	$('#form-page-loading').removeClass('hide');
                	$("#jsnuf-page-sortable").html('');
                	JSNVisualDesign.savePage();
                	setTimeout(function() {
                		var realListOptionPage = [];
                		$("ul.jsn-page-list li.page-items").each(function () {
                			realListOptionPage.push($(this));
                			$("#jsnuf-page-sortable").append($('<li>').attr({'class': 'jsn-item ui-state-default', 'id': $(this).attr('id'), 'data-value': $(this).attr('data-value')}).append($('<i>').attr('class', 'icon-move')).append($(this).find("input").attr('value')));
                        });
                		$('#form-page-loading').addClass('hide');
                		$("#jsnuf-page-sortable").sortable({
                			placeholder: "ui-state-highlight",
                			update: function( event, ui ) {
                				$("ul.jsn-page-list").html("");
                				$("ul#jsnuf-page-sortable li.jsn-item").each(function () {
                					var subItemPage = $(this);
                					$.each(realListOptionPage, function(index, item) {
                					    if (item.attr('id') == subItemPage.attr('id'))
                					    {
                					    	$("ul.jsn-page-list").append(item);
                					    	return false;
                					    }
                					});
                				});
                				self.checkPage();//;JSNVisualDesign.savePage();    
                				self.loadPage();
                			}	
                		});
                	}, 500);
                });
    
                $('li[aria-controls="form-action"]').on('click', function(){
                    JSNVisualDesign.savePage();
                    setTimeout(function() {

                       /* if ($('.mce-btn-has-text').length) {
                            $('.mce-btn-has-text').each(function () {
                                if ($(this).attr("aria-label") == "JSN UniForm") {
                                    $(this).css("display", "none")
                                }
                            });
                        }*/
                        var listOptionPage = [];
                        var wordlist = [];
                        $(" ul.jsn-page-list li.page-items").each(function () {
                            listOptionPage.push([$(this).find("input").attr('data-id'), $(this).find("input").attr('value')]);
                        });
                        $.ajax({
                            type: "POST",
                            dataType: 'json',
                            url: "index.php?option=com_uniform&view=form&task=form.loadsessionfield&tmpl=component&"+ token +"=1",
                            data: {
                                form_id: $("#jform_form_id").val(),
                                form_page_name: $("#form-design-header").attr('data-value'),
                                form_list_page: listOptionPage
                            },
                            success: function (response) {
                                if(response === null)
                                {
                                    if($('#responseFieldDesign').val() != '')
                                    {
                                        response = JSON.parse($('#responseFieldDesign').val());
                                    }
                                }
                                var replyToSelect = "";
                                var liFields = "";
                                var fileAttach = "", fileAttachSubmiter = "";
                                //  var typeClear = ["file-upload"];
                                var defaultAttach = $("#attach-file ul").attr("data-value");
                                var defaultAttachSubmiter = $("#attach-file-submiter ul").attr("data-value");
                                var dataAttach = "", dataAttachSubmiter = "";
                                if (defaultAttach) {
                                    dataAttach = $.evalJSON(defaultAttach);
                                }
                                if(defaultAttachSubmiter)
                                {
                                    dataAttachSubmiter = $.evalJSON(defaultAttachSubmiter);
                                }

                                if (response) {
                                    $.each(response, function (i, item) {
                                        item.options.label = item.options.label != '' ? item.options.label : item.identify;
                                        if (item.type != "google-maps") {
                                            if (item.type == 'email') {
                                                replyToSelect += "<li class=\"jsn-item\" id='" + item.identify + "'>" + item.options.label + "</li>";
                                            }
                                            if (item.type == 'file-upload') {
                                                if ($.inArray(item.identify, dataAttach) >= 0) {
                                                    fileAttach += '<li class="jsn-item ui-state-default"><label class="checkbox">' + item.options.label + '<input type="checkbox" checked="checked" name="file_attach[]" value="' + item.identify + '"></label></li>';
                                                } else {
                                                    fileAttach += '<li class="jsn-item ui-state-default"><label class="checkbox">' + item.options.label + '<input type="checkbox" name="file_attach[]" value="' + item.identify + '"></label></li>';
                                                }
                                                if ($.inArray(item.identify, dataAttachSubmiter) >= 0) {
                                                    fileAttachSubmiter += '<li class="jsn-item ui-state-default"><label class="checkbox">' + item.options.label + '<input type="checkbox" checked="checked" name="file_attach_submiter[]" value="' + item.identify + '"></label></li>';
                                                } else {
                                                    fileAttachSubmiter += '<li class="jsn-item ui-state-default"><label class="checkbox">' + item.options.label + '<input type="checkbox" name="file_attach_submiter[]" value="' + item.identify + '"></label></li>';
                                                }

                                            }
                                            if (item.options.showInNotificationEmail != 'No') {
                                                liFields += "<li class=\"jsn-item\" id='" + item.identify + "'>" + item.options.label + "</li>";
                                            }

                                            wordlist.push(item.options.label);
                                        }
                                    });
                                }
                                if ($("#template_notify_to").val() == 1) {
                                    self.createListField($("#btn-select-field-from"), liFields, "FIELD");
                                    self.createListField($("#btn-select-field-from-name"), liFields, "FIELD");
                                    self.createListField($("#btn-select-field-to"), replyToSelect, "EMAIL");
                                }
                                if (fileAttach) {
                                    $("#attach-file ul").html(fileAttach);
                                }
                                if (fileAttachSubmiter) {
                                    $("#attach-file-submiter ul").html(fileAttachSubmiter);
                                }


                                self.createListField($("#btn-select-field-subject"), liFields, "FIELD");
                                self.createListField($("#btn-select-field-message"), liFields, "FIELD");
                                self.createListField($("#btn-select-field-subject_0"), liFields, "FIELD");
                                self.createListField($("#btn-select-field-message_0"), liFields, "FIELD");
                            }
                        });
                    }, 500);
                });

            },

            updateButtonSubmit: function () {
                if ($(".jsn-sortable-disable .form-actions button.jsn-form-submit").hasClass("hide")) {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-submit").attr("class", "jsn-form-submit hide " + $("#button_submit_color").val());
                } else {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-submit").attr("class", "jsn-form-submit " + $("#button_submit_color").val());
                }
            },
            updateButtonPreview: function () {
                if ($(".jsn-sortable-disable .form-actions button.jsn-form-preview").hasClass("hide")) {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-preview").attr("class", "jsn-form-preview hide " + $('#button_preview_color').val());
                } else {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-preview").attr("class", "jsn-form-preview " + $('#button_preview_color').val());
                }
            },
            updateButtonReset: function () {
                if ($(".jsn-sortable-disable .form-actions button.jsn-form-reset").hasClass("hide")) {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-reset").attr("class", "jsn-form-reset hide " + $('#button_reset_color').val());
                } else {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-reset").attr("class", "jsn-form-reset " + $('#button_reset_color').val());
                }
            },
            updateButtonPrev: function () {
                if ($(".jsn-sortable-disable .form-actions button.jsn-form-prev").hasClass("hide")) {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-prev").attr("class", "jsn-form-prev hide " + $('#button_prev_color').val());
                } else {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-prev").attr("class", "jsn-form-prev " + $('#button_prev_color').val());
                }
            },
            updateButtonNext: function () {
                if ($(".jsn-sortable-disable .form-actions button.jsn-form-next").hasClass("hide")) {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-next").attr("class", "jsn-form-next hide " + $('#button_next_color').val());
                } else {
                    $(".jsn-sortable-disable .form-actions button.jsn-form-next").attr("class", "jsn-form-next " + $('#button_next_color').val());
                }
            },
            formatButtonSelect2:function (state) {
                var imgName = state.id.split("-");
                return "<img class='imgSelect2' src='" + urlBase + "components/com_uniform/assets/images/icons-16/" + imgName[imgName.length - 1] + ".png'/>" + state.text;
            },
            formatSelect2:function (state) {
                var self = this, imgName = "";
                if (state.id.toLowerCase() == "jsn-style-dark" || state.id.toLowerCase() == "jsn-style-light") {
                    imgName = state.id.toLowerCase();
                } else {
                    imgName = "jsn-style-custom";
                }
                return "<img class='imgSelect2' src='" + urlBase + "components/com_uniform/assets/images/icons-16/" + imgName + ".png'/>" + state.text;
            },
            actionTheme:function () {
                var valueSelectTheme = $("#jform_form_theme").val();
                if (valueSelectTheme == "jsn-style-light" || valueSelectTheme == "jsn-style-dark") {
                    $("#theme_action_refresh").removeClass("hide");
                    $("#theme_action_delete").addClass("hide");
                } else {
                    $("#theme_action_refresh").addClass("hide");
                    $("#theme_action_delete").removeClass("hide");
                }
            },
            resetTheme:function (theme) {
                var self = this;
                $("#style_accordion_content input").val("");
                $("#form-design-content").attr('class', $("#form-design-content").attr('class').replace(/\bjsn-style[-_]*[^\s]+\b/, theme));
                if (theme == "jsn-style-light") {
                    $("#style_background_active_color").val("#FCF8E3");
                    $("#style_border_active_color").val("#FBEED5");
                    $("#style_text_color").val("#333333");
                    $("#style_font_size").val("14");
                    $("#style_message_error_text_color").val("#FFFFFF");
                    $("#style_message_error_background_color").val("#B94A48");
                    $("#style_field_background_color").val("#ffffff");
                    $("#style_field_shadow_color").val("");
                    $("#style_field_text_color").val("#666666");
                    $("#style_field_border_color").val("");
                    $("#style_padding_space").val(10);
                    $("#style_margin_space").val(0);
                    $("#style_border_thickness").val(0);
                    $("#style_rounded_corner_radius").val(0);
                    $("#style_font_type option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_submit_color option:eq(1)").prop('selected', true).trigger("change");
                    $("#button_preview_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_reset_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_prev_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_next_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_position option:eq(0)").prop('selected', true).trigger("change");
                    $("#style_custom_css").html(""); $("#style_inline style.formstylecustom").html("");

                } else if (theme == "jsn-style-dark") {
                    $("#style_background_active_color").val("#444444");
                    $("#style_border_active_color").val("#666666");
                    $("#style_text_color").val("#C6C6C6");
                    $("#style_font_size").val("14");
                    $("#style_message_error_text_color").val("#FFFFFF");
                    $("#style_message_error_background_color").val("#B94A48");
                    $("#style_field_background_color").val("#000000");
                    $("#style_field_shadow_color").val("#000000");
                    $("#style_field_text_color").val("#333333");
                    $("#style_field_border_color").val("#111111");
                    $("#style_padding_space").val(10);
                    $("#style_margin_space").val(0);
                    $("#style_border_thickness").val(0);
                    $("#style_rounded_corner_radius").val(0);
                    $("#style_font_type option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_submit_color option:eq(1)").prop('selected', true).trigger("change");
                    $("#button_preview_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_reset_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_prev_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_next_color option:eq(0)").prop('selected', true).trigger("change");
                    $("#button_position option:eq(0)").prop('selected', true).trigger("change");
                    $("#style_custom_css").html(""); $("#style_inline style.formstylecustom").html("");
                }
                $(".jsn-select-color").each(function () {
                    var inputParent = $(this).prev();
                    $(this).find("div").css("background-color", $(inputParent).val());
                    $(this).ColorPickerSetColor($(inputParent).val());
                });
                self.changeStyleInline();
            },
            hexToRgb:function (h) {
                var r = parseInt((this.cutHex(h)).substring(0, 2), 16), g = ((this.cutHex(h)).substring(2, 4), 16), b = parseInt((this.cutHex(h)).substring(4, 6), 16)
                return r + ',' + b + ',' + b;
            },
            cutHex:function (h) {
                return (h.charAt(0) == "#") ? h.substring(1, 7) : h
            },
            changeStyleInline:function () {
                var self = this,
                    styleField = ".jsn-master #form-design-content .jsn-element-container .jsn-element .controls input,.jsn-master #form-design-content .jsn-element-container .jsn-element .controls select,.jsn-master #form-design-content .jsn-element-container .jsn-element .controls textarea{\n",
                    styleFormElement = ".jsn-master #form-design-content .jsn-element-container .jsn-element {\n",
                    styleActive = ".jsn-master #form-design-content .jsn-element-container .jsn-element.ui-state-edit {\n",
                    styleTitle = ".jsn-master #form-design-content .jsn-element-container .jsn-element .control-label {\n";
                $("#style_accordion_content input,#style_accordion_content select").each(function () {
                    var dataValue = $(this).attr("data-value");
                    var valueInput = $(this).val();
                    if (valueInput) {
                        if ($(this).attr("type") == "number") {
                            if (dataValue == "border") {
                                valueInput = valueInput + "px solid";
                            } else if (dataValue == "margin") {
                                valueInput = valueInput + "px 0px";
                            } else {
                                valueInput = valueInput + "px";
                            }
                        }
                        var dataType = $(this).attr("data-type");
                        switch (dataType) {
                            case "jsn-element":
                                if (dataValue) {
                                    var items = dataValue.split(",");
                                    if (items.length > 1) {
                                        $.each(items, function (value, key) {
                                            styleFormElement += key + ":" + valueInput + ";\n";
                                        });
                                    } else {
                                        styleFormElement += items + ":" + valueInput + ";\n";
                                    }
                                }
                                break;
                            case "ui-state-edit":
                                styleActive += dataValue + ":" + valueInput + ";\n";
                                break;
                            case "control-label":
                                styleTitle += dataValue + ":" + valueInput + ";\n";
                                break;
                            case "field":
                                if (dataValue == "background-color") {
                                    styleField += "background:" + valueInput + ";\n";
                                } else if (dataValue == "box-shadow") {
                                    valueInput = self.hexToRgb(valueInput);
                                    styleField += "box-shadow:0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 7px 0 rgba(" + valueInput + ", 0.8) inset;\n";
                                } else {
                                    styleField += dataValue + ":" + valueInput + ";\n";
                                }
                                break;
                        }
                    }
                });
                styleFormElement += "}\n";
                styleActive += "}\n";
                styleTitle += "}\n";
                styleField += "}\n";
                $("#style_inline style.formstyle").html(styleFormElement + styleActive + styleTitle + styleField);
            },
            dialogFormStyle:function (_this) {
                var self = this;
                var dialog = $("#container-select-style"), parentDialog = $("#container-select-style").parent();
                dialog.width("500");
                $(dialog).appendTo('body');
                var elmStyle = JSNVisualDesign.getBoxStyle($(dialog)),
                    parentStyle = JSNVisualDesign.getBoxStyle($(_this)),
                    position = {};
                position.left = parentStyle.offset.left - elmStyle.outerWidth + parentStyle.outerWidth;
                //  position.left = parentStyle.offset.left + (parentStyle.outerWidth - elmStyle.outerWidth) / 2;
                position.top = parentStyle.offset.top + parentStyle.outerHeight;

                $(dialog).find(".arrow").css("left", elmStyle.outerWidth - (parentStyle.outerWidth / 2));
                dialog.css(position).click(function (e) {
                    e.stopPropagation();
                });
                $(".jsn-select-color").each(function () {
                    var inputParent = $(this).prev();
                    var selfColor = this;
                    $(this).find("div").css("background-color", $(inputParent).val());
                    $(this).ColorPicker({
                        color:$(inputParent).val(),
                        onChange:function (hsb, hex, rgb) {
                            $(selfColor).prev().val("#" + hex);
                            var idInput = $(selfColor).prev().attr("id");
                            $(selfColor).find("div").css("background-color", "#" + hex);
                            self.changeStyleInline();

                            var styleTheme = {};
                            $("#style_accordion_content input,#style_accordion_content select").each(function () {
                                var nameStyle = $(this).attr("name");
                                if (nameStyle) {
                                    nameStyle = nameStyle.match(/form_style\[(.*?)\]/);
                                    styleTheme[nameStyle[1]] = $(this).val();
                                }
                                $("#option_themes input[name$='[themes_style]["+colorScheme.replace("jsn-style-","")+"]']").val($.toJSON(styleTheme));
                            });
                        }
                    });
                });
                $("#style_accordion_content input,#style_accordion_content select").change(function () {
                    self.changeStyleInline();
                    var styleTheme = {};
                    $("#style_accordion_content input,#style_accordion_content select").each(function () {
                        var nameStyle = $(this).attr("name");
                        if (nameStyle) {
                            nameStyle = nameStyle.match(/form_style\[(.*?)\]/);
                            styleTheme[nameStyle[1]] = $(this).val();
                        }
                        $("#option_themes input[name$='[themes_style]["+colorScheme.replace("jsn-style-","")+"]']").val($.toJSON(styleTheme));
                    });
                });
                $(dialog).show();
                $("#container-select-style .popover").show();
                $(".jsn-input-number").keypress(function (e) {
                    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                        return false;
                    }
                });
                $(document).click(function (e) {
                    if ($(e.target).parents(".colorpicker").css('display') == 'block' || ( $(e.target).hasClass("colorpicker") && $(e.target).css('display') == 'block')) {
                        return false;
                    }
                    if ($(e.target).parent().parent().hasClass("ui-autocomplete")) {
                        return false;
                    }
                    if ($(e.target).parents(".ui-autocomplete").css('display') == 'block') {
                        return false;
                    }
                    if ($(dialog).css('display') != 'none') {
                        $(dialog).appendTo($(parentDialog));
                        dialog.hide();
                        dialog.width("0");
                    }
                });
            },
            actionForm:function () {
                var self = this;
                $(".form-actions  .jsn-iconbar a.element-edit").click(function () {
                    var sender = $(this).parents(".form-actions");
                    $(sender).addClass("ui-state-edit");
                    var type = "form-actions";
                    var params = {};
                    var action = $(this);
                    JSNVisualDesign.openOptionsBox(sender, type, params, action);
                    $("#option-btnNext-text").val($("#jform_form_btn_next_text").val()).keyup(function () {
                        var btnNext = $("#option-btnNext-text").val() ? $("#option-btnNext-text").val() : "Next";
                        $("#jform_form_btn_next_text").val(btnNext);
                        $(".form-actions .btn-toolbar .jsn-form-next").text(btnNext);
                        $("#button_next_color").parents(".control-group").find("label").text(btnNext);
                    });
                    $("#option-btnPrev-text").val($("#jform_form_btn_prev_text").val()).keyup(function () {
                        var btnPrev = $("#option-btnPrev-text").val() ? $("#option-btnPrev-text").val() : "Prev";
                        $("#jform_form_btn_prev_text").val(btnPrev);
                        $(".form-actions .btn-toolbar .jsn-form-prev").text(btnPrev);
                        $("#button_prev_color").parents(".control-group").find("label").text(btnPrev);
                    });
                    $("#option-btnSubmit-text").val($("#jform_form_btn_submit_text").val()).keyup(function () {
                        var btnSubmit = $("#option-btnSubmit-text").val() ? $("#option-btnSubmit-text").val() : "Submit";
                        $("#jform_form_btn_submit_text").val(btnSubmit);
                        $(".form-actions .btn-toolbar .jsn-form-submit").text(btnSubmit);
                        $("#button_submit_color").parents(".control-group").find("label").text(btnSubmit);
                    });

                    // Add Custom Class for Submit btn
                    $("#option-customClass-text").val($("#jform_form_btn_submit_custom_class").val()).change(function () {
                        var customClass = $("#option-customClass-text").val() ? $("#option-customClass-text").val() : "";
                        $("#jform_form_btn_submit_custom_class").val(customClass);
                    });
                    //Reset button
                    $("#option-btnReset-text").val($("#jform_form_btn_reset_text").val()).keyup(function () {
                        var btnReset = $("#option-btnReset-text").val() ? $("#option-btnReset-text").val() : "Reset";
                        $("#jform_form_btn_reset_text").val(btnReset);
                        $(".form-actions .btn-toolbar .jsn-form-reset").text(btnReset);
                        $(".form-actions .btn-toolbar .jsn-form-reset").text(btnReset);
                        $("#button_reset_color").parents(".control-group").find("label").text(btnReset);
                    });
                    if ($("#jform_form_state_btn_reset_text").val() == "Yes") {
                        $("#option-stateBtnReset-radio-Yes").prop("checked", true);
                        $("#option-stateBtnReset-radio-No").prop("checked", false);
                        $("#option-btnReset-text").parents(".control-group").show();
                        $("#option-btnReset-text").removeClass("hide");
                        $(".form-actions .btn-toolbar .jsn-form-reset").show();
                    } else {
                        $("#option-stateBtnReset-radio-Yes").prop("checked", false);
                        $("#option-stateBtnReset-radio-No").prop("checked", true);
                        $("#option-btnReset-text").parents(".control-group").hide();
                        $("#option-btnReset-text").addClass("hide");
                        $(".form-actions .btn-toolbar .jsn-form-reset").hide();
                    }
                    $("input[name=stateBtnReset]").change(function () {
                        $("#jform_form_state_btn_reset_text").val($(this).val());
                        if ($(this).val() == "Yes") {
                            $("#option-btnReset-text").parents(".control-group").show();
                            $("#option-btnReset-text").removeClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-reset").show();
                        } else {
                            $("#option-btnReset-text").parents(".control-group").hide();
                            $("#option-btnReset-text").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-reset").hide();
                        }
                    });
                    //Preview button
                    $("#option-btnPreview-text").val($("#jform_form_btn_preview_text").val()).keyup(function () {
                        var btnPreview = $("#option-btnPreview-text").val() ? $("#option-btnPreview-text").val() : "Preview";
                        $("#jform_form_btn_preview_text").val(btnPreview);
                        $(".form-actions .btn-toolbar .jsn-form-preview").text(btnPreview);
                        $(".form-actions .btn-toolbar .jsn-form-preview").text(btnPreview);
                        $("#button_preview_color").parents(".control-group").find("label").text(btnPreview);
                    });
                    if ($("#jform_form_state_btn_preview_text").val() == "Yes") {
                        $("#option-stateBtnPreview-radio-Yes").prop("checked", true);
                        $("#option-stateBtnPreview-radio-No").prop("checked", false);
                        $("#option-btnPreview-text").parents(".control-group").show();
                        $("#option-btnPreview-text").removeClass("hide");
                        $(".form-actions .btn-toolbar .jsn-form-preview").show();
                    } else {
                        $("#option-stateBtnPreview-radio-Yes").prop("checked", false);
                        $("#option-stateBtnPreview-radio-No").prop("checked", true);
                        $("#option-btnPreview-text").parents(".control-group").hide();
                        $("#option-btnPreview-text").addClass("hide");
                        $(".form-actions .btn-toolbar .jsn-form-preview").hide();
                    }
                    $("input[name=stateBtnPreview]").change(function () {
                        $("#jform_form_state_btn_preview_text").val($(this).val());
                        if ($(this).val() == "Yes") {
                            $("#option-btnPreview-text").parents(".control-group").show();
                            $("#option-btnPreview-text").removeClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-preview").show();
                        } else {
                            $("#option-btnPreview-text").parents(".control-group").hide();
                            $("#option-btnPreview-text").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-preview").hide();
                        }
                    });


                });
                $(".settings-footer .jsn-iconbar a.element-delete").click(function () {
                    self.JSNUniformDialogEdition = new JSNUniformDialogEdition(self.params);
                    JSNUniformDialogEdition.createDialogLimitation($(this), self.lang["JSN_UNIFORM_YOU_CAN_NOT_HIDE_THE_COPYLINK"]);
                    return false;
                });
            },
            mailchimpSubcriber: function () {
                $(".mailchimp-subcriber  .jsn-iconbar a.element-edit").click(function () {
                    var sender = $(this).parents('.mailchimp-subcriber');
                    $(sender).addClass('ui-state-edit');
                    var type = "mailchimp-subcriber";
                    var params = {};
                    var action = $(this);
                    JSNVisualDesign.openOptionsBox(sender, type, params, action);
                    $('#option-mailchimpSubcriber-textarea').text($("#jform_form_mailchimp_subcriber_text").val()).keyup( function () {
                        var mcSubcriberText = $("#option-mailchimpSubcriber-textarea").val() ? $("#option-mailchimpSubcriber-textarea").val() : "Would you like to subscribe to our newsletter?";
                        $("#jform_form_mailchimp_subcriber_text").val(mcSubcriberText);
                        $(".mailchimp-subcriber").find('.mc-subcriber-text').text(mcSubcriberText);
                    });
                    if ($("#jform_form_show_mailchimp_subcriber").val() == "No") {
                        $("#option-showMailchimpSubcriber-radio-Yes").prop("checked", false);
                        $("#option-showMailchimpSubcriber-radio-No").prop("checked", true);
                    } else {
                        $("#option-showMailchimpSubcriber-radio-Yes").prop("checked", true);
                        $("#option-showMailchimpSubcriber-radio-No").prop("checked", false);
                    }
                    $("input[name=showMailchimpSubcriber]").change(function () {
                        $("#jform_form_show_mailchimp_subcriber").val($(this).val());
                    });
                });

            },
            paymentForm:function () {
                var self = this;
                $(".form-payments  .jsn-iconbar a.element-edit").click(function () {
                    var sender = $(this).parents(".form-payments");
                    $(sender).addClass("ui-state-edit");
                    var type = "form-payments";
                    var params = {};
                    var action = $(this);
                    JSNVisualDesign.openOptionsBox(sender, type, params, action);

                    $("#option-paymentTotalMoney-text").val($("#jform_form_payment_money_value_text").val()).keyup(function () {

                        var totalMoneyText = $("#option-paymentTotalMoney-text").val() ? $("#option-paymentTotalMoney-text").val() : "Total Money";
                        $("#jform_form_payment_money_value_text").val(totalMoneyText);
                        $(".form-payments").find('.payment-text').text(totalMoneyText);
                    });

                    if ($("#jform_form_show_total_money_text").val() == "Yes") {
                        $("#option-showTotalMoney-radio-Yes").prop("checked", true);
                        $("#option-showTotalMoney-radio-No").prop("checked", false);
                        //$(".form-payments .payment-total-money").show();
                    } else {
                        $("#option-showTotalMoney-radio-Yes").prop("checked", false);
                        $("#option-showTotalMoney-radio-No").prop("checked", true);
                       // $(".form-payments .payment-total-money").hide();
                    }
                    $("input[name=showTotalMoney]").change(function () {
                        $("#jform_form_show_total_money_text").val($(this).val());
                        /*if ($(this).val() == "Yes") {
                            $(".form-payments .payment-total-money").show();
                        } else {
                            $(".form-payments .payment-total-money").hide();
                        }*/
                    });
                });
                $(".settings-footer .jsn-iconbar a.element-delete").click(function () {
                    self.JSNUniformDialogEdition = new JSNUniformDialogEdition(self.params);
                    JSNUniformDialogEdition.createDialogLimitation($(this), self.lang["JSN_UNIFORM_YOU_CAN_NOT_HIDE_THE_COPYLINK"]);
                    return false;
                });
            },
            //get data page
            loadPage:function (action) {
            	
                var self = this;
                var listOptionPage = [];
                var listContainer = [];
                $(" ul.jsn-page-list li.page-items").each(function () {
                    listOptionPage.push([$(this).find("input").attr('data-id'), $(this).find("input").attr('value')]);
                });
         
                $("#form-container .jsn-row-container").each(function () {
                    var listColumn = [];
                    $(this).find(".jsn-column-content").each(function () {
                        var dataContainer = {};
                        var columnName = $(this).attr("data-column-name");
                        var columnClass = $(this).attr("data-column-class");
                        dataContainer.columnName = columnName;
                        dataContainer.columnClass = columnClass;
                        listColumn.push(dataContainer);
                    });
                    listContainer.push(listColumn);
                });
                $("#form-design-content #page-loading").show();
                $("#form-design-content .jsn-column-container ").hide();
                $(".jsn-page-actions").hide();
                $("#form-design-header .jsn-iconbar").css("display", "none");
                $.ajax({
                    type:"POST",
                    dataType:'json',
                    url:"index.php?option=com_uniform&view=form&task=form.loadpage&tmpl=component&"+ token + "=1",
                    data:{
                        form_page_name:$("#form-design-header").attr('data-value'),
                        form_page_old_name:oldValuePage,
                        form_page_old_content:self.visualDesign.serialize(),
                        form_page_old_container:$.toJSON(listContainer),
                        form_id:$("#jform_form_id").val(),
                        form_list_page:listOptionPage,
                        join_page:action
                    },
                    success:function (response) {
                        self.JSNLayoutCustomizer.renderContainer(response.containerPage);
                        if ($("#jform_form_id").val() > 0 && self.pageContent) {
                            var pageContent = $.evalJSON(self.pageContent);
                            if (!response.dataField && action == "defaultPage" && $.inArray(oldValuePage, pageContent) != -1) {
                                location.reload();
                            }
                        }
                        self.visualDesign.clearElements();
                        if (response.dataField) {
                            var dataField = $.evalJSON(response.dataField);
                            self.visualDesign.setElements(dataField);
                        }
                        if (action == "join") {
                            $(".jsn-page-list li.page-items").each(function (index) {
                                if (index != 0) {
                                    $(this).remove();
                                }
                            });
                            self.checkPage();
                        }
                        if (action == 'defaultPage') {
                            JSNVisualDesign.emailNotification();
                            $("#adminForm").removeClass("hide");
                            $(".jsn-modal-overlay,.jsn-modal-indicator").remove();
                        }
                        $(".jsn-page-actions").show();
                        $("#form-design-content #page-loading").hide();
                        $("body").removeClass("jsn-loading-page");
                        $("#form-design-content .jsn-column-container ").show();
                        $("#form-design-header .jsn-iconbar").css("display", "");
                        JSNVisualDesign.contentGoogleMaps();
                        // show button Reset
                        if ($("#jform_form_state_btn_reset_text").val() == "Yes") {
                        $("#option-stateBtnReset-radio-Yes").prop("checked", true);
                        $("#option-stateBtnReset-radio-No").prop("checked", false);
                        $("#option-btnReset-text").parents(".control-group").show();
                        $("#option-btnReset-text").removeClass("hide");
                        $(".form-actions .btn-toolbar .jsn-form-reset").show();
                        } else {
                            $("#option-stateBtnReset-radio-Yes").prop("checked", false);
                            $("#option-stateBtnReset-radio-No").prop("checked", true);
                            $("#option-btnReset-text").parents(".control-group").hide();
                            $("#option-btnReset-text").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-reset").hide();
                        }
                        // show button Preview
                        if ($("#jform_form_state_btn_preview_text").val() == "Yes") {
                            $("#option-stateBtnPreview-radio-Yes").prop("checked", true);
                            $("#option-stateBtnPreview-radio-No").prop("checked", false);
                            $("#option-btnPreview-text").parents(".control-group").show();
                            $("#option-btnPreview-text").removeClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-preview").show();
                        } else {
                            $("#option-stateBtnPreview-radio-Yes").prop("checked", false);
                            $("#option-stateBtnPreview-radio-No").prop("checked", true);
                            $("#option-btnPreview-text").parents(".control-group").hide();
                            $("#option-btnPreview-text").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-preview").hide();
                        }

 						//hidden field
						$(".control-group.jsn-hidden-field").parents(".jsn-element").addClass("jsn-disabled");
                    }
                });
                oldValuePage = $("#form-design-header").attr('data-value');
            },
            //Add new Page
            addNewPage:function () {
                JSNVisualDesign.savePage();
                $("#form-container .jsn-row-container").remove();
                this.JSNLayoutCustomizer.renderContainer();
                this.visualDesign.clearElements();
                var randomMath = Math.floor((Math.random() * 100000000) + 10000);
                var countSelect = $("ul.jsn-page-list li.page-items").size() + 1;
                var selectAdd = "<li id='new_" + randomMath + "' data-value='" + randomMath + "' class=\"page-items\"><a href=\"#\">Page " + countSelect + "</a><input type=\"hidden\" value=\"Page " + countSelect + "\" data-id=\"" + randomMath + "\" name=\"name_page[" + randomMath + "]\"/></li>";
                $("ul.jsn-page-list").append(selectAdd);
                $("#form-design #form-design-header").attr("data-value", $("#new_" + randomMath).attr("data-value"));
                $("#form-design #form-design-header .page-title h1").text($("#new_" + randomMath).find("input").val());
                oldValuePage = $("#form-design-header").attr('data-value');
                this.checkPage();
                $("#form-design-header .icon-pencil").trigger("click")

            },
            //create edit page
            cerateEditPage:function (_this) {
                var item = $(_this).parent().parent().parent();

                $("#form-design-header .jsn-page-actions").hide();
                $("#form-design-header .page-edit-form").remove();
                var self = this;
                item.find(".page-title").hide();
                $("#form-design-header").addClass("edit-page-item").append(
                    $("<div/>", {
                        "class":"page-edit-form form-inline"
                    }).append(
                        $("<input>", {
                            'type':'text',
                            'value':item.find("h1").text(),
                            'class':'page-input-tmp input-xlarge'
                        })).append(
                        $("<button/>", {
                            "onclick":"return false;",
                            "class":"btn btn-icon save-page"
                        }).append(
                            $("<i/>", {
                                "class":"icon-ok"
                            })).click(function () {
                                self.saveEditPage();
                                return false;
                            })).append(
                        $("<button/>", {
                            "onclick":"return false;",
                            "class":"btn btn-icon cancel-page"
                        }).append(
                            $("<i/>", {
                                "class":"icon-remove"
                            })).click(function () {
                                self.cancelEditPage();
                                return false;
                            })))
                $(" .edit-page-item .page-input-tmp").focus().bind('keypress', function (e) {
                    if (e.keyCode == 13) {
                        self.saveEditPage();
                        return false;
                    }
                    if (e.keyCode == 27) {
                        self.cancelEditPage();
                    }
                });
            },
            //remove page
            removePage:function (_this) {
                var self = this;
                var liActive = $(_this).parent().parent().parent();
                var itemRemove = liActive.attr("data-value");
                if (confirm("Are you sure you want to delete page " + liActive.find("h3").text() + " with all fields?")) {
                    if ($("ul.jsn-page-list li.page-items").size() > 1) {
                        $("ul.jsn-page-list li.page-items").each(function () {
                            if ($(this).attr("data-value") == itemRemove) {
                                if ($(this).next().attr("data-value")) {
                                    $("#form-design #form-design-header").attr("data-value", $(this).next().attr("data-value"));
                                    $("#form-design #form-design-header .page-title h1").html($(this).next().find("input").val());
                                    $(this).remove();

                                } else if ($(this).prev().attr("data-value")) {
                                    $("#form-design #form-design-header").attr("data-value", $(this).prev().attr("data-value"));
                                    $("#form-design #form-design-header .page-title h1").html($(this).prev().find("input").val());
                                    $(this).remove();

                                }
                            }
                        });
                        $("#form-design-content #page-loading").show();
                        $("#form-design-content .jsn-column-container ").hide();
                        $.ajax({
                            type:"POST",
                            dataType:'json',
                            url:"index.php?option=com_uniform&view=form&task=form.loadpage&tmpl=component&"+ token + "=1",
                            data:{
                                form_id:$("#jform_form_id").val(),
                                form_page_name:$("#form-design-header").attr('data-value'),
                                form_page_old_name:oldValuePage,
                                form_page_old_content:this.visualDesign.serialize()
                            },
                            success:function (response) {
                                self.JSNLayoutCustomizer.renderContainer(response.containerPage);
                                self.visualDesign.clearElements();
                                if (response.dataField) {
                                    var dataField = $.evalJSON(response.dataField);
                                    self.visualDesign.setElements(dataField);
                                }
                                JSNVisualDesign.savePage();
                                $("#form-design-content #page-loading").hide();
                                $("#form-design-content .jsn-column-container ").show();
                                JSNVisualDesign.contentGoogleMaps();
                            }
                        });

                        self.checkPage();
                        oldValuePage = $("#form-design-header").attr('data-value');
                    }

                }
            },
            //cancel edit page
            cancelEditPage:function () {
                var editPageItem = $(".edit-page-item");
                editPageItem.find(".page-title").show();
                editPageItem.find(".page-edit-form").hide();
                editPageItem.removeClass("edit-page-item");
                this.checkPage();

            },
            //save edit page
            saveEditPage:function (e) {
                var self = this;
                var inputTmpPage = $(".edit-page-item .page-input-tmp");
                if (inputTmpPage.val() != "") {
                    $("ul.jsn-page-list li.page-items input").each(function () {
                        if ($(this).attr("data-id") == $("#form-design-header").attr('data-value')) {
                            $(this).val(inputTmpPage.val());
                            $(this).prev().text(inputTmpPage.val());
                            $("#form-design-header .page-title h1").text(inputTmpPage.val());
                        }
                    });
                    JSNVisualDesign.savePage();
                    self.cancelEditPage();
                    self.checkPage();
                } else {
                    $(".page-input-tmp").addClass("error");
                    if (e) {
                        e.stopPropagation();
                    }
                }
            },
            loadDefaultPage:function (value) {
                var self = this;
                $("ul.jsn-page-list li.page-items").each(function () {
                    if ($(this).attr("data-value") == value) {
                        var dataValue = $(this).attr("data-value");
                        var dataText = $(this).find("input").val();
                        $("#form-design-header").attr("data-value", dataValue);
                        $("#form-design-header .page-title h1").text(dataText);
                        return false;
                    }
                });
                self.loadPage('defaultPage');

            },
            nextpaginationPage:function () {
                var self = this;
                $("ul.jsn-page-list li.page-items").each(function () {
                    if ($(this).attr("data-value") == $("#form-design-header").attr("data-value")) {
                        var dataValue = $(this).next().attr("data-value");
                        var dataText = $(this).next().find("input").val();
                        $("#form-design-header").attr("data-value", dataValue);
                        $("#form-design-header .page-title h1").text(dataText);
                        return false;
                    }
                });
                self.checkPage();
                self.loadPage();
            },
            prevpaginationPage:function () {
                var self = this;
                $("ul.jsn-page-list li.page-items").each(function () {
                    if ($(this).attr("data-value") == $("#form-design-header").attr("data-value")) {
                        var dataValue = $(this).prev().attr("data-value");
                        var dataText = $(this).prev().find("input").val();
                        $("#form-design-header").attr("data-value", dataValue);
                        $("#form-design-header .page-title h1").text(dataText);
                    }
                });
                self.checkPage();
                self.loadPage();
            },
            //check count page
            checkPage:function () {
                var self = this;
                $("#form-design-header .jsn-page-actions").show();
                var pageItems = $("ul.jsn-page-list li.page-items");

                if (pageItems.size() <= 1) {
                    $("#form-design-header a.element-delete").hide();
                    $(".form-actions .btn-toolbar .jsn-form-submit").removeClass("hide");
                } else {
                    $("#form-design-header a.element-delete").show();
                    $(".form-actions .btn-toolbar .jsn-form-submit").addClass("hide");
                }
                pageItems.each(function () {
                    if ($(this).attr("data-value") == $("#form-design-header").attr("data-value")) {
                        if ($(this).next().attr("data-value")) {
                            $(".jsn-page-actions .next-page").removeAttr("disabled");
                            $(".form-actions .btn-toolbar .jsn-form-next").removeClass("hide");
                        } else {
                            $(".jsn-page-actions .next-page").attr("disabled", "disabled");
                            $(".form-actions .btn-toolbar .jsn-form-next").addClass("hide");
                        }
                        if ($(this).prev().attr("data-value")) {
                            $(".jsn-page-actions .prev-page").removeAttr("disabled");
                            $(".form-actions .btn-toolbar .jsn-form-prev").removeClass("hide");
                        } else {
                            $(".jsn-page-actions .prev-page").attr("disabled", "disabled");
                            $(".form-actions .btn-toolbar .jsn-form-prev").addClass("hide");
                        }
                        if ($(this).prev().attr("data-value") && !$(this).next().attr("data-value") || !$(this).next().attr("data-value") && !$(this).next().attr("data-value")) {
                            $(".form-actions .btn-toolbar .jsn-form-submit").removeClass("hide");
                            if ($("#jform_form_state_btn_reset_text").val() == "Yes") {
                                $(".form-actions .btn-toolbar .jsn-form-reset").removeClass("hide");
                            }
                            if ($("#jform_form_state_btn_preview_text").val() == "Yes") {
                                $(".form-actions .btn-toolbar .jsn-form-preview").removeClass("hide");
                            }
                        } else {
                            $(".form-actions .btn-toolbar .jsn-form-submit").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-preview").addClass("hide");
                            $(".form-actions .btn-toolbar .jsn-form-reset").addClass("hide");
                        }
                    }
                });
            },
            opentAcrtileContent:function () {

                var self = this;
                var valuePlugin = "{uniform form=" + $("#jform_form_id").val() + "/}";
                $("#syntax-plugin").val(valuePlugin);
                $("#dialog-plugin").dialog("open");
                ZeroClipboard.moviePath = self.baseZeroClipBoard;
                var clipboard = new ZeroClipboard.Client();
                clipboard.glue('jsn-clipboard-button', 'dialog-plugin', {
                    "z-index":"9999"
                });
                clipboard.setText($("#syntax-plugin").val());
                $("#syntax-plugin").change(function () {
                    clipboard.setText($("#syntax-plugin").val());
                });
                clipboard.addEventListener('complete', function (client, text) {
                    if ($("#syntax-plugin").val() != '') {
                        $(".jsn-clipboard-checkicon").addClass('jsn-clipboard-coppied').addClass('icon-ok');
                        setTimeout(function () {
                            $(".jsn-clipboard-checkicon").delay(6000).removeClass('jsn-clipboard-coppied').removeClass('icon-ok');
                        }, 2000);
                    }
                });
            },
            eventField:function (field, btnField, type) {

                var self = this;
                var oldField = "";

                $(field).find(".jsn-items-list .jsn-item").click(function () {
                    if (this.id) {
                        switch (type) {
                            case "btn-select-field-message":
                                try
								{
									jInsertEditorText('{$' + this.id + '}', 'jform_template_message');
								}
								catch(err) 
								{
									$("#jform_template_message").val($("#jform_template_message").val() + "{$" + this.id + "}");
								}
                                break;
                            case "btn-select-field-message_0":
                                try
								{
									jInsertEditorText('{$' + this.id + '}', 'jform_template_message_0');
								}
								catch(err) 
								{
									$("#jform_template_message_0").val($("#jform_template_message_0").val() + "{$" + this.id + "}");
								}	
                                break;
                            case "btn-select-field-from":
                                $("#jform_template_from").val($("#jform_template_from").val() + "{$" + this.id + "}");
                                break;
                            case "btn-select-field-from-name":
                                $("#jform_template_from_name").val($("#jform_template_from_name").val() + "{$" + this.id + "}");
                                break;                                
                            case "btn-select-field-subject":
                                $("#jform_template_subject").val($("#jform_template_subject").val() + "{$" + this.id + "}");
                                break;
                            case "btn-select-field-subject_0":
                                $(".email_template_subject").val($(".email_template_subject").val() + "{$" + this.id + "}");
                                break;
                            case "btn-select-field-to":
                                $("#jform_template_reply_to").val($("#jform_template_reply_to").val() + "{$" + this.id + "}");
                                break;
                        }
                        $("div.control-list-fields").hide();
                    }
                });
                $(btnField).click(function (e) {
                    if($(btnField).attr('id') == 'btn-select-field-message')
                    {
                        try
						{
							tinyMCE.get('jform_template_message').focus();
						}
						catch(err) 
						{
							$('#jform_template_message').focus();
						}
                    }
                    if($(btnField).attr('id') == 'btn-select-field-message_0')
                    {
                        try
						{
							tinyMCE.get('jform_template_message_0').focus();
						}
						catch(err) 
						{
							$('#jform_template_message_0').focus();
						}
                    }
                    $("div.control-list-fields").hide();
                    var elmStyle = self.getBoxStyle($(field)),
                        parentStyle = self.getBoxStyle($(this)),
                        position = {};
                    position.left = parentStyle.offset.left - elmStyle.outerWidth + parentStyle.outerWidth;
                    position.top = parentStyle.offset.top + parentStyle.outerHeight;
                    $(field).find(".arrow").css("left", elmStyle.outerWidth - (parentStyle.outerWidth / 2));
                    $(field).css(position);
                    $(field).show();
                    e.stopPropagation();
                });
                $("div.control-list-fields").click(function (e) {
                    e.stopPropagation();
                });
                $.fn.delayKeyup = function (callback, ms) {
                    var timer = 0;
                    var el = $(this);
                    $(this).keyup(function () {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            callback(el)
                        }, ms);
                    });
                    return $(this);
                };
                $(field).find(".jsn-quicksearch-field").delayKeyup(function (el) {
                    self.searchField($(el).val(), $(field).find(".jsn-items-list"));
                    if ($(el).val() == "") {
                        $(field).find(".jsn-reset-search").hide();
                    } else {
                        $(field).find(".jsn-reset-search").show();
                    }
                }, 500)

                $(document).click(function () {
                    $("div.control-list-fields").hide();
                    $(field).find(".jsn-reset-search").trigger("click");
                });
            },
            //Create list field
            createListField:function (btnInput, fields, type) {
                var self = this;
                var listField = fields;
                if (!fields) {
                    listField = "<li title=\"" + self.lang["JSN_UNIFORM_NO_" + type + "_DES"] + "\" class=\"ui-state-default ui-state-disabled\">" + self.lang["JSN_UNIFORM_NO_" + type] + "</li>"
                }
                var dialog = $("<div/>", {
                    'class':'control-list-fields jsn-bootstrap jsn-email-settings hide',
                    'id':"control-" + $(btnInput).attr("id")
                }).append(
                    $("<div/>", {
                        "class":"popover"
                    }).css("display", "block").append($("<div/>", {
                        "class":"arrow"
                    })).append($("<h3/>", {
                        "class":"popover-title",
                        "text":this.lang['JSN_UNIFORM_SELECT_FIELDS']
                    })).append(
                        $("<form/>").append(
                            $("<div/>", {"class":"jsn-elementselector"}).append(
                                $("<div/>", {"class":"jsn-fieldset-filter"}).append(
                                    $("<fieldset/>").append(
                                        $("<div/>", {"class":"pull-right"}).append(
                                            $("<input/>", {
                                                "type":"text",
                                                "class":"jsn-quicksearch-field input search-query",
                                                "placeholder":"Search…"
                                            }).bind('keypress', function (e) {
                                                if (e.keyCode == 13) {
                                                    return false;
                                                }
                                            })
                                        ).append(
                                            $("<a/>", {"href":"javascript:void(0);", "title":"Clear Search", "class":"jsn-reset-search"}).append($("<i/>", {"class":"icon-remove"})).click(function () {
                                                $(dialog).find(".jsn-quicksearch-field").val("");
                                                self.searchField("", $(dialog).find(".jsn-items-list"));
                                                $(this).hide();
                                            })
                                        )
                                    )
                                )
                            ).append(
                                $("<ul/>", {"class":"jsn-items-list"}).append(listField)
                            )
                        )
                    )
                )
                if (!fields) {
                    $(dialog).find(".field-seach").hide();
                } else {
                    $(dialog).find(".field-seach").show();
                }
                $(dialog).find(".jsn-quicksearch-field").attr("placeholder","Search…");
                $(dialog).appendTo('body');
                dialog.hide();
                self.eventField("#control-" + $(btnInput).attr("id"), btnInput, $(btnInput).attr("id"));
                $(document).click(function () {
                    dialog.hide();
                });
                $('input, textarea').placeholder();
            },
            getBoxStyle:function (element) {
                var display = element.css('display')
                if (display == 'none') {
                    element.css({
                        display:'block',
                        visibility:'hidden'
                    });
                }
                var style = {
                    width:element.width(),
                    height:element.height(),
                    outerHeight:element.outerHeight(),
                    outerWidth:element.outerWidth(),
                    offset:element.offset(),
                    margin:{
                        left:parseInt(element.css('margin-left')),
                        right:parseInt(element.css('margin-right')),
                        top:parseInt(element.css('margin-top')),
                        bottom:parseInt(element.css('margin-bottom'))
                    },
                    padding:{
                        left:parseInt(element.css('padding-left')),
                        right:parseInt(element.css('padding-right')),
                        top:parseInt(element.css('padding-top')),
                        bottom:parseInt(element.css('padding-bottom'))
                    }
                };
                element.css({
                    display:display,
                    visibility:'visible'
                });
                return style;
            },
            // Search field in list
            searchField:function (value, resultsFilter) {
                $(resultsFilter).find("li").hide();
                if (value != "") {
                    $(resultsFilter).find("li").each(function () {
                        var textField = $(this).attr("id").toLowerCase();
                        if (textField.search(value.toLowerCase()) == -1) {
                            $(this).hide();
                        } else {
                            $(this).fadeIn(800);
                        }
                    });
                } else {
                    $(resultsFilter).find("li").each(function () {
                        $(this).fadeIn(800);
                    });
                }
            }
        }
        return JSNUniformFormView;
    });