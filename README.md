# jQuery-mp3radio
jQuery plugin - mp3 player with fancy skins

![oldradio skin](/skins/oldradio/radio_bg_360x100.png)

# Use

```javascript
                       var music = [{
                            id: 0,
                            title:"CHAIRMAN",
                            description:"Mantovani Orchestra pop",
                            url:"media/364.mp3"
                        },{
                            id: 1,
                            title:"second song",
                            description:"Mantovani Orchestra pop",
                            url:"media/364.mp3"
                        },{
                            id: 2,
                            title:"bla bla bla",
                            description:"Mantovani Orchestra pop",
                            url:"media/364.mp3"
                        },{
                            id: 3,
                            title:"Other song",
                            description:"Some good song",
                            url:"/other.mp3"
                        },{
                            id: 4,
                            title:"Some tune",
                            description:"Mantovani Orchestra pop",
                            url:"media/364.mp3"
                        }];
			$( function() {
				$( "#radio" ).mp3Radio( {
					skin: "cathedralradio",
					media: music,
				} );
                                console.log( $("#radio") );
			} );
```
