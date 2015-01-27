(function(d, e, c, r, n) {
    e = d.documentElement;
    c = "className";
    r = "replace";
    n = "createElementNS";
    e[c] = e[c][r]("is-js_no", "is-js_yes");
})(document);

if (!console) {
    window.console = {
        log: function() {}
    };
}

window.app = {
    blocks: {},
    init: function() {
        this.paranja = $('<div/>', {
            'class': 'js-paranja paranja g-hidden'
        });

        this.paranja.appendTo('body');

        for (var block in this.blocks) {
            if (this.blocks[block].init && typeof this.blocks[block].init == "function") {
                this.blocks[block].init();
            }

            console.log(block + ' init');
        }
    }
};

$(function(){
    window.app.init();
});

