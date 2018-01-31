var svgHtml = "";

canvas = new Canvas();
ctx = canvas.getContext( "2d" );

var image = new Image();

image.onload = function () {

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage( image, 0, 0 );

    console.log( canvas.toDataURL( 'image/png' ) )

};

image.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent( svgHtml ) ) );