/**
 * 求和操作符：∑
 */

define( function ( require ) {

    var kity = require( "kity" ),
        ScriptController = require( "operator/common/script-controller" );

    return kity.createClass( 'ProductOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Product" );

            this.displayType = "equation";

        },

        applyOperand: function ( expr, sup, sub ) {

            var opShape = this.getOperatorShape(),
                expBox = expr.getFixRenderBox(),
                padding = 0,
                space = new ScriptController( this, opShape, sup, sub ).applyUpDown(),
                diff = ( space.height - space.top - space.bottom - expBox.height ) / 2;

            if ( diff >= 0 ) {
                expr.translate( space.width + padding, diff + space.bottom );
            } else {
                diff = -diff;
                opShape.translate( 0, diff );
                sup.translate( 0, diff );
                sub.translate( 0, diff );
                expr.translate( space.width + padding, space.bottom );
            }

            this.parentExpression.setOffset( space.top, space.bottom );
            this.parentExpression.expand( padding, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        },

        getOperatorShape : function () {

            var pathData = 'M27.842,28.898c0,1.728,0.096,2.256,3.792,2.256h1.152v1.488c-1.68-0.144-5.28-0.144-7.104-0.144s-5.376,0-7.057,0.144   v-1.488h1.152c3.696,0,3.792-0.528,3.792-2.256V1.488H9.217v27.411c0,1.728,0.096,2.256,3.792,2.256h1.152v1.488   c-1.68-0.144-5.28-0.144-7.104-0.144s-5.376,0-7.057,0.144v-1.488h1.152c3.696,0,3.792-0.528,3.792-2.256V3.744   c0-1.728-0.096-2.256-3.792-2.256H0V0h32.787v1.488h-1.152c-3.696,0-3.792,0.528-3.792,2.256V28.898z',
                operatorShape = new kity.Path( pathData ).fill( "black" ),
                opBgShape = new kity.Rect( 0, 0, 0, 0 ).fill( "transparent" ),
                group = new kity.Group(),
                opRenderBox = null;

            operatorShape.setAttr("shapeflag", '1');

            group.addShape( opBgShape );
            group.addShape( operatorShape );

            operatorShape.scale( 1.6 );

            this.addOperatorShape( group );

            opRenderBox = operatorShape.getFixRenderBox();

            if ( this.displayType === "inline" ) {
                operatorShape.translate( 5, 15 );
                opBgShape.setSize( opRenderBox.width + 10, opRenderBox.height + 25 );
            } else {
                operatorShape.translate( 2, 5 );
                opBgShape.setSize( opRenderBox.width + 4, opRenderBox.height + 8 );
            }

            return group;

        }

    } );

} );

