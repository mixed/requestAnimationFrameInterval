function getType(obj){
	return Object.prototype.toString.call(obj);
}
describe("If you call requestAnimationFrameInterval then", function() {
	var mock = {
		requestAnimationFrame : function(fp){
			this.fp = fp;
			this.count++;
			return this.count;
		},
		cancelAnimationFrame : function(){
			this.fp = null;
			this.count = 0;
		},
		Date : function(){
			this.getTime = function(){
				return 1;
			}
		}
	}, keyMap;

	beforeEach(function() {
		mock.count = 1;
		mock.fp = null;
		keyMap = cache(mock);
	});

	it("should be make keyMap.", function() {
		// Given
		// When
		mock.requestAnimationFrameInterval(function(){});
		// Then
		expect(keyMap[1]).toBeDefined();
		expect(keyMap[1].count).toBe(0);
		expect(keyMap[1].key).toBe(2);
		expect(typeof keyMap[1].fp).toBe("function");
	});

	it("should be repeat excute callback", function() {
		// Given
		var count = 0, callCount = 0;
		mock.requestAnimationFrameInterval(function(timestamp, _callCount){
			count++;
			callCount = _callCount;
		});

		// When
		mock.fp();
		// Then
		expect(count).toBe(1);
		expect(callCount).toBe(1);
		expect(keyMap[1].key).toBe(3);

		// Again fire requestAnimationFrame
		// When
		mock.fp();
		// Then
		expect(count).toBe(2);
		expect(callCount).toBe(2);
		expect(keyMap[1].key).toBe(4);
	});
});

describe("If you call cancelAnimationFrameInterval then", function() {
	var mock = {
		isCallCancelAnimationFrame : false,
		requestAnimationFrame : function(fp){
			this.isCallCancelAnimationFrame = false;
			this.fp = fp;
			this.count++;
			return this.count;
		},
		cancelAnimationFrame : function(){
			this.fp = null;
			this.count = 0;
			this.isCallCancelAnimationFrame = true;
		},
		Date : function(){
			this.getTime = function(){
				return 1;
			}
		}
	}, keyMap;

	beforeEach(function() {
		mock.count = 1;
		mock.fp = null;
		keyMap = cache(mock);
	});

	it("should be deleted keyMap.", function() {
		// Given
		var key = mock.requestAnimationFrameInterval(function(){});
		// When
		mock.cancelAnimationFrameInterval(key);
		// Then
		expect(keyMap[1]).toBeNull();
		
	});

	it("should be stop excute callback", function() {
		// Given
		var count = 0, callCount = 0, key;
		key = mock.requestAnimationFrameInterval(function(timestamp, _callCount){
			count++;
			callCount = _callCount;
		});

		// When
		mock.fp();
		// Then
		expect(count).toBe(1);
		expect(callCount).toBe(1);
		expect(keyMap[1].key).toBe(3);

		// When
		mock.cancelAnimationFrameInterval(key);		
		// Then
		expect(mock.isCallCancelAnimationFrame).toBeTruthy();
		expect(keyMap[1]).toBeNull();
	});
});