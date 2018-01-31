/**
 * 上划线表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),

        OverlineOperator = require( "operator/overline"),

        OverlineExpression = kity.createClass( 'OverlineExpression', {

            base: require( "expression/compound" ),

            constructor: function ( expr ) {

                this.callBase();

                this.setFlag( "Overline" );

                this.setOperator( new OverlineOperator() );

                this.setOperand( expr, 0 );

            }

        } );


    return OverlineExpression;

} );
