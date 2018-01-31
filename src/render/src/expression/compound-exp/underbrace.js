/**
 * 自动增长括号表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),
        UnderbraceOperator = require( "operator/underbrace" );

    return kity.createClass( 'UnderbraceExpression', {

        base: require( "expression/compound" ),

        constructor: function ( up, down ) {

            this.callBase();

            this.setFlag( "Underbrace" );

            this.setOperator( new UnderbraceOperator() );
            this.setOperand( up, 0 );
            this.setOperand( down, 1 );

        }

    } );

} );
