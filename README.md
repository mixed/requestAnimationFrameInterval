# requestAnimationFrameInterval
`requestAnimationFrameInterval` is interval excute callback using requestAnimationFrame.

## Why should I use it?
If you use repeatedly `requestAnimationFrame` then inconvenient.
```js
// sample
var key = requestAnimationFrame(function loop(){
	// Do something

	key = requestAnimtionFrame(loop);
});

// stop requestAnimationFrame
cancelAnimationFrame(key);

```
So, I make `requestAnimationFrameInterval`. It is similar setInterval. Very Simple. and You make readable code more.
```js
// sample
var key = requestAnimationFrameInterval(function(timestamp, count){
	// Do something
});

// stop requestAnimationFrameInterval
cancelAnimationFrameInterval(key);
```

## Install
```
bower install requestAnimationFrameInterval
```
In your web page:

```html
<script src="[path_to_dist]/rafi.js>"></script>
```

## API
```js
window.requestAnimationFrameInterval(function callback(timestamp, count){
	
});
```
### callback
| timestamp  | count |
| ------------- | ------------- |
| DOMHighResTimeStamp | callcount  |

