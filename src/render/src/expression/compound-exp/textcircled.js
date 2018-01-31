/**
 * 带圈数字
 */

define( function ( require ) {

    var kity = require( "kity" ),
        CHAR_MAPPING = '⓪①②③④⑤⑥⑦⑧⑨⑩'.split( "" ),
        TextcircledOperator = require( "operator/textcircled" ),
        TextcircledExpression = kity.createClass( 'TextcircledExpression', {

            base: require( "expression/compound" ),

            constructor: function ( expr ) {

                this.callBase();

                this.setFlag( "Textcircled" );

                this.setOperator( new TextcircledOperator() );

                this.setOperand( CHAR_MAPPING[ expr - 0 ], 0 );

            }

        } );

    return TextcircledExpression;

} );