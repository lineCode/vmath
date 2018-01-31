/**
 * 上划线操作符
 */

define( function ( require ) {

    var kity = require( "kity" );

    return kity.createClass( 'OverlineOperator', {

        base: require( "operator/operator" ),

        constructor: function () {
            this.callBase( "Overline" );
        },

        applyOperand: function ( expr ) {

            var exprBox = expr.getFixRenderBox(),
                opShape = this.getOperatorShape( exprBox.width ),
                padding = 3,
                opBox = null;

            this.addOperatorShape( opShape );

            opBox = opShape.getFixRenderBox();

            expr.translate( 0, opBox.height );

            this.parentExpression.expand( padding, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        },

        getOperatorShape : function ( width ) {

            var shape = new kity.Rect( width, 3 ).fill( 'black' );
            shape.setAttr("shapeflag", '1');

            return shape;
        }

    } );

} );
