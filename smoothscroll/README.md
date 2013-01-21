smoothslide
===========

smooth slide script

usage
----------
1. read jQuery and smooth.js in header in index.html. 
```html
    <header>
        <script src="js/jquery-1.7.2.min.js"></script>
        <script src="js/smoothslide.js"></script>
    </header>
```

2. read stylesheet in header in index.html.
```html
    <link rel="stylesheet" type="text/css" href="css/style.css">
```

3. markup slide in index.html.  

###3-1 nessecery id, class  in index.html
* div#slide-container
* div#slide-group
* div.slide

simple markup

```html
    <head>
        <script>
            jQuery(function() {
                // initialize smoothslide
                var layout = $.infotown.namespace('layout');
                layout.init($('#slide-container'));
                var handler = $.infotown.namespace('handler');
                $('#next').click(function() {
                    handler.next();
                });
                $('#interval').click(function() {
                    handler.stop(); 
                    handler.intervalNext();
                });
                $('#stop').click(function() {
                    handler.stop();
                });
            });
        </script>
    </head>
    <body>
        <div id="slide-container">
            <div id="slide-group"
                <div class="slide">
                    <h2>slide0</h2>
                    <p>
                    Vivamus vitae neque at lorem mollis blandit vel.
                    </p>
                </div><!-- /slide -->
                <div class="slide">
                    <h2>slide1</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </p>
                </div><!-- /slide -->
                <div class="slide">
                    <h2>slide2</h2>
                    <p>
                    Pellentesque quis mauris dui.
                    </p>
                </div><!-- /slide -->
                <div class="slide">
                    <h2>slide3</h2>
                    <p>
                    Proin ut neque mi. Maecenas pharetra facilisis.
                    </p>
                </div><!-- /slide -->
                <div class="slide">
                    <h2>slide4</h2>
                    <p>
                    Phasellus egestas mi eu felis fringilla vestibulum.
                    </p>
                </div><!-- /slide -->
            </div><!-- /slide-group -->
        </div><!-- /slide-container -->
        <ul id="slide-nav" class="clearfix">
            <li><a id="next" href="#">next</li>
            <li><a id="interval" href="#">timer</li>
            <li><a id="stop" href="#">stop</li>
        </ul>
    </body>
```

Author
--------------------
SAWAI HIROSHI
