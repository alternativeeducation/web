
createItems();

var $container = $('#container').isotope({
  itemSelector: '.item'
});

var $output = $('#output');

// filter with selects and checkboxes
var $selects = $('#form-ui select');
var $checkboxes = $('#form-ui input');

$selects.add( $checkboxes ).change( function() {
  // map input values to an array
  var exclusives = [];
  var inclusives = [];
  // exclusive filters from selects
  $selects.each( function( i, elem ) {
    if ( elem.value ) {
      exclusives.push( elem.value );
    }
  });
  // inclusive filters from checkboxes
  $checkboxes.each( function( i, elem ) {
    // if checkbox, use value if checked
    if ( elem.checked ) {
      inclusives.push( elem.value );
    }
  });

  // combine exclusive and inclusive filters

  // first combine exclusives
  exclusives = exclusives.join('');

  var filterValue;
  if ( inclusives.length ) {
    // map inclusives with exclusives for
    filterValue = $.map( inclusives, function( value ) {
      return value + exclusives;
    });
    filterValue = filterValue.join(', ');
  } else {
    filterValue = exclusives;
  }

  $output.text( filterValue );
  $container.isotope({ filter: filterValue })
});


function createItems() {

  var colors = [ 'red', 'green', 'blue', 'orange' ];
  var sizes = [ 'small', 'medium', 'large' ];
  var prices = [ 10, 20, 30 ];

  
  var $items;
  // loop over colors, sizes, prices
  // create one item for each
  for (  var i=0; i < colors.length; i++ ) {
    for ( var j=0; j < sizes.length; j++ ) {
      for ( var k=0; k < prices.length; k++ ) {
        var color = colors[i];
        var size = sizes[j];
        var price = prices[k];
        var $item = $('<div />', {
          'class': 'item ' + color + ' ' + size + ' price' + price
        });
        $item.append( '<p>' + size + '</p><p>$' + price + '</p>');
        // add to items
        $items = $items ? $items.add( $item ) : $item;
      }
    } 
  }

  $items.appendTo( $('#container') );

}
