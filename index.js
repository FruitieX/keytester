var lastKey = 0;
var lastKeypress = new Date();
var keypressTreshold = 100; // ms

var cnt = 0;
var doubleCnt = 0;

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

      cnt++;
      console.log('dt: ' + (curTime - lastKeypress) + 'ms');
      if (curTime - lastKeypress < keypressTreshold) {
        doubleCnt++;
        console.log(doubleCnt + ': double press (' + Math.round(100 * doubleCnt / cnt) + '% rate)! dt was: ' + (curTime - lastKeypress) + 'ms');
      }
    }

    lastKeypress = new Date();
    lastKey = chunk.toString('hex');
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});
