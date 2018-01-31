/**
 * 分数操作符
 */

define( function ( require ) {

    var kity = require( "kity" ),
        ZOOM = require( "sysconf" ).zoom;

    return kity.createClass( 'FractionOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.zoom = ZOOM;
            this.callBase( "Fraction" );

        },

        setZoom: function ( zoom ) {
            this.zoom = zoom;
        },

        applyOperand: function ( upOperand, downOperand ) {

            upOperand.scale( this.zoom );
            downOperand.scale( this.zoom );

            var upWidth = Math.ceil( upOperand.getWidth() ),
                downWidth = Math.ceil( downOperand.getWidth() ),
                upHeight = Math.ceil( upOperand.getHeight() ),
                downHeight = Math.ceil( downOperand.getHeight() ),
                // 分数线overflow值
                overflow = 3,
                // 整体padding
                padding = 1,
                maxWidth = Math.max( upWidth, downWidth ),
                maxHeight = Math.max( upHeight, downHeight ),
                operatorShape = generateOperator( maxWidth, overflow );


            this.addOperatorShape( operatorShape );
            upOperand.translate( ( maxWidth - upWidth ) / 2 + overflow, 0 );
            operatorShape.translate( 0, upHeight + 1 );
            // 下部不需要偏移
            downOperand.translate( ( maxWidth - downWidth ) / 2 + overflow, upHeight + operatorShape.getHeight() + 1 * 2 );

            this.parentExpression.setOffset( maxHeight - upHeight, maxHeight - downHeight );

            this.parentExpression.expand( padding * 2, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        }

    } );


    function generateOperator ( width, overflow ) {

        var shape = new kity.Rect( width + overflow * 2, 1 ).fill( "black" );
        shape.setAttr("shapeflag", '1');

        return shape;

    }


} );