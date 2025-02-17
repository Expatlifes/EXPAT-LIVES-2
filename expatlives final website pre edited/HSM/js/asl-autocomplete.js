(function(c) {
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        autocompleteGoogleOnly: function() {
            let a = this
              , d = a.n("text").val();
            if ("" == a.n("text").val())
                a.n("textAutocomplete").val("");
            else {
                var e = a.n("textAutocomplete").val();
                if ("" == e || 0 != e.indexOf(d)) {
                    a.n("textAutocomplete").val("");
                    var f = a.o.autocomplete.lang;
                    ["wpml_lang", "polylang_lang", "qtranslate_lang"].forEach(function(b) {
                        0 < c('input[name="' + b + '"]', a.n("searchsettings")).length && 1 < c('input[name="' + b + '"]', a.n("searchsettings")).val().length && (f = c('input[name="' + b + '"]', a.n("searchsettings")).val())
                    });
                    a.n("text").val().length >= a.o.autocomplete.trigger_charcount && c.fn.ajax({
                        url: "https://clients1.google.com/complete/search",
                        cors: "no-cors",
                        data: {
                            q: d,
                            hl: f,
                            nolabels: "t",
                            client: "hp",
                            ds: ""
                        },
                        success: function(b) {
                            0 < b[1].length && (b = b[1][0][0].replace(/(<([^>]+)>)/ig, ""),
                            b = c("<textarea />").html(b).text(),
                            b = b.substr(d.length),
                            a.n("textAutocomplete").val(d + b),
                            a.fixAutocompleteScrollLeft())
                        }
                    })
                }
            }
        },
        fixAutocompleteScrollLeft: function() {
            this.n("textAutocomplete").get(0).scrollLeft = this.n("text").get(0).scrollLeft
        }
    })
}
)(WPD.dom);
(function(c) {
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initAutocompleteEvent: function() {
            let a = this;
            1 == a.o.autocomplete.enabled && (a.n("text").on("keyup", function(d) {
                a.keycode = d.keyCode || d.which;
                a.ktype = d.type;
                let e = 39;
                c("body").hasClass("rtl") && (e = 37);
                a.keycode == e && "" != a.n("textAutocomplete").val() ? (d.preventDefault(),
                a.n("text").val(a.n("textAutocomplete").val()),
                null != a.post && a.post.abort(),
                a.search()) : (null != a.postAuto && a.postAuto.abort(),
                a.autocompleteGoogleOnly())
            }),
            a.n("text").on("keyup mouseup input blur select", function() {
                a.fixAutocompleteScrollLeft()
            }))
        }
    })
}
)(WPD.dom);
