`smalloc` was a core module in 0.12 and io.js <3.0.0 for doing (external) raw memory allocation/deallocation/copying in JavaScript.

`smalloc` was removed in io.js 3.0.0, as the required v8 APIs were removed. `smalloc` used to be used in the buffer implementation, however buffers are now built ontop of TypedArrays (Specifically Uint8Array).
