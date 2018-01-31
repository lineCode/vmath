/**
 * Split操作符
 */

define( function ( require ) {

    var kity = require( "kity" );

    return kity.createClass( 'SplitOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Split" );

        },

        applyOperand: function () {

            var operands = arguments,
                headWidth = 0,
                headHeight = 0,
                firstLineHeight = 0,
                lineSpace = 5,
                padding = 10,
                offset = 0,
                opBox = null;

            opBox = operands[0].getFixRenderBox();
            headWidth = opBox.width;
            headHeight = opBox.height;

            opBox = operands[1].getFixRenderBox();
            firstLineHeight = opBox.height;

            offset = headHeight - firstLineHeight;

            operands[1].translate( headWidth, 0 );
            if ( offset > 0 ) {
                operands[1].translate( 0, offset );
            } else {
                operands[0].translate( 0, -offset );
            }

            offset = Math.max( headHeight, firstLineHeight ) + lineSpace;

            for ( var i = 2, len = operands.length; i < len; i++ ) {

                opBox = operands[ i ].getFixRenderBox();

                operands[ i ].translate( headWidth, offset );
                offset += opBox.height + lineSpace;

            }

            this.parentExpression.expand( padding * 2, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        }

    } );

} );
