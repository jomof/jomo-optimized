function shuffle(array : any[]) {
  var current = array.length;
  while (0 !== current) {
    var rand = Math.floor(Math.random() * current);
    current -= 1;
    var temp = array[current];
    array[current] = array[rand];
    array[rand] = temp;
  }
  return array; 
}