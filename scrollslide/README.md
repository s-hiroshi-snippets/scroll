scrollslide
===========

scroll slide script

slide loop left.


usage
----------
1. index.html read jQuery and slide.js in header. 
```html
    <header>
        <script src="js/jquery-1.7.2.min.js"></script>
        <script src="js/scrollslide.js"></script>
    </header>
```

2. index.html read stylesheet in header.
```html
    <link rel="stylesheet" type="text/css" href="css/style.css">
```

3. Markup slide in body  

###3-1 nessecery tag
* id: slide-container
* class: slide-group
    markup one. script create other from markup. 
* class: slide-page

simple markup

```html
    <div id="slide-container">
            <div class="slide-group">
                <div class="slide-page">
                    <h2>slide-page0</h2>
                    <p>
                    Vivamus vitae neque at lorem mollis blandit vel.
                    </p>
                </div><!-- /slide-page -->

                <div class="slide-page">
                    <h2>slide-page1</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </p>
                </div><!-- /slide-page -->

                <div class="slide-page">
                    <h2>slide-page2</h2>
                    <p>
                    Pellentesque quis mauris dui.
                    </p>
                </div><!-- /slide-page -->

                <div class="slide-page">
                    <h2>slide-page3</h2>
                    <p>
                    Proin ut neque mi. Maecenas pharetra facilisis.
                    </p>
                </div><!-- /slide-page -->

                <div class="slide-page">
                    <h2>slide-page4</h2>
                    <p>
                    Phasellus egestas mi eu felis fringilla vestibulum.
                    </p>
                </div><!-- /slide-page -->
            </div><!-- /slide-group -->
        </div><!-- /slide-container -->
        <p><button id="move">Move</button></p>

```

Author
--------------------
SAWAI HIROSHI
