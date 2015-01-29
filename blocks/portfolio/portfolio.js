(function(){
    app.blocks.portfolio = {
        current: undefined,
        bindEvents: function() {
            $(document).on('click', '.js-portfolio-item', this.showItem.bind(this));
        },

        showItem: function(event) {
            event.preventDefault();

            return;

            app.paranja.removeClass('g-hidden');
            this.box.removeClass('g-hidden');

            var self = this;
            var maxWidth = this.box.width();
            var maxHeight = this.box.height();
            var elem = $(event.target);
            var img = new Image();

            img.src = elem.attr('href');
            img.onload = function() {
                img.style.maxHeight = maxHeight + 'px';
                img.style.maxWidth = maxWidth + 'px';
                img.className = 'portfolio-box-image';
                self.box.html(img);
            };

            this.current = $('.js-portfolio-item').index(elem);
        },

        init: function() {
            var portfolio = $('.js-portfolio');

            if (!portfolio.get(0)) {
                return;
            }
            
            $('.js-portfolio-item', portfolio).each(function() {
                var preload = new Image();
                preload.src = this.href;
                preload.onload = function() {
                    console.log(preload.src + ' loaded');
                }
            });

            this.box = $('<div/>', {
                'class': 'js-portfolio-box portfolio-box g-hidden'
            });


            this.box.appendTo('body');
            this.bindEvents();
        }
    }
})();
