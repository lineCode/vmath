/**
 * Pmod函数
 */

define( function ( require ) {

    var kity = require( "kity" ),
        PmodOperator = require( "operator/pmod" ),
        PmodExpression = kity.createClass( 'PmodExpression', {

            base: require( "expression/compound" ),

            constructor: function ( expr ) {

                this.callBase();

                this.setFlag( "PMod" );

                this.setOperator( new PmodOperator() );

                this.setOperand( expr, 0 );

            }

        } );

    return PmodExpression;

} );