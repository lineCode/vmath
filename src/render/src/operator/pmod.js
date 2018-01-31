/**
 * pmod操作符
 */

define( function ( require ) {

    var kity = require( "kity" ),
        Text = require( "char/text" );

    return kity.createClass( 'PmodOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Pmod" );

        },

        applyOperand: function ( expr ) {

            var exprBox = expr.getFixRenderBox(),
                padding = 5,
                opSpace = this.createOperatorShape( exprBox );

            expr.translate( opSpace.left, opSpace.top );

            this.parentExpression.expand( padding, padding * 2 );

        },

        createOperatorShape : function ( exprBox ) {

            var leftBracket = new kity.Path( 'M10.657,48.004c-0.48,0-4.608-3.12-7.489-9.025C0.528,33.555,0,27.746,0,24.002c0-4.032,0.576-9.361,3.024-14.641   C5.857,3.264,10.177,0,10.657,0c0.288,0,0.48,0.144,0.48,0.48c0,0.144,0,0.24-0.624,0.816c-5.905,6-7.729,14.354-7.729,22.706   c0,7.345,1.536,16.417,7.537,22.466c0.816,0.816,0.816,0.912,0.816,1.056C11.137,47.86,10.945,48.004,10.657,48.004z' ).fill( 'black' ),
                rightBracket = new kity.Path( 'M8.112,38.643C5.28,44.74,0.96,48.004,0.48,48.004c-0.288,0-0.48-0.192-0.48-0.48c0-0.144,0-0.24,0.624-0.816   c5.952-6.049,7.729-14.498,7.729-22.706c0-10.033-2.736-17.666-7.441-22.418C0,0.72,0,0.624,0,0.48C0,0.192,0.192,0,0.48,0   c0.48,0,4.608,3.12,7.488,9.024c2.641,5.425,3.168,11.233,3.168,14.978C11.137,28.034,10.561,33.363,8.112,38.643z' ).fill( 'black' ),
                mod = new Text( 'mod', 'KF AMS ROMAN' ),
                group = new kity.Group(),
                diff = 0,
                space = {};

            leftBracket.setAttr("shapeflag", '1');
            rightBracket.setAttr("shapeflag", '1');

            group.addShape( leftBracket );
            group.addShape( rightBracket );
            group.addShape( mod );

            this.addOperatorShape( group );

            var leftBox = leftBracket.getFixRenderBox(),
                modBox = mod.getFixRenderBox();

            space.top = 0;
            space.left = leftBox.width + 3 + modBox.width + 10;
            mod.translate( leftBox.width + 3, ( leftBox.height - modBox.height ) / 2 );

            rightBracket.translate( space.left + exprBox.width + 3, 0 );

            diff = exprBox.height - leftBox.height;

            if ( diff > 0 ) {
                leftBracket.translate( 0, diff / 2 );
                rightBracket.translate( 0, diff / 2 );
                mod.translate( 0, diff / 2 );
            } else {
                space.top = -diff / 2;
            }

            return space;

        }

    } );

} );

