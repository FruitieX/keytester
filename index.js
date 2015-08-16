var lastKey = 0;
var lastKeypress = new Date();
var keypressTreshold = 75; // ms

process.stdin.setRawMode(true);

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    // ctrl-c
    if (chunk.toString('hex') === '03') {
        process.exit(0);
    }

    var curTime = new Date();

    if (lastKey.toString() === chunk.toString('hex')) {
      // same key pressed twice
      if (curTime - lastKeypress < keypressTreshold) {
        console.log('double press!');
      }
    }

    lastKeypress = new Date();
    lastKey = chunk.toString('hex');
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});