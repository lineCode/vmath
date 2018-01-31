/**
 * split表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),

        SplitOperator = require( "operator/split"),

        SplitExpression = kity.createClass( 'SplitExpression', {

            base: require( "expression/compound" ),

            constructor: function () {

                this.callBase();

                this.setFlag( "Split" );

                this.setOperator( new SplitOperator() );

                for ( var i = 0, len = arguments.length; i < len; i++ ) {
                    this.setOperand( arguments[ i ], i );
                }

            }

        } );


    return SplitExpression;

} );
