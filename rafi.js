function _rafi_( fp ) {
	fp( window );
}

_rafi_( function( global ) {
	var keyMap = {};
	global.requestAnimationFrameInterval = function( fp ) {
		var random = new global.Date().getTime(), key;
		keyMap[random] = {};
		keyMap[random].count = 0;
		keyMap[random].fp = function( timestamp ) {
			keyMap[random].count++;
			fp( timestamp, keyMap[random].count );
			if ( keyMap[random] ) {
				key = global.requestAnimationFrame( keyMap[random].fp );
				keyMap[random].key = key;
			}
		}
		key = global.requestAnimationFrame( keyMap[random].fp );
		keyMap[random].key = key;
		return random;
	}
	global.cancelAnimationFrameInterval = function( key ) {
		if ( keyMap[key] ) {
			global.cancelAnimationFrame( keyMap[key].key );
			keyMap[key] = null;
		}
	}
	return keyMap;
} );
