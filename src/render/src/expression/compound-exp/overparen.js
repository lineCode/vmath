define( function ( require ) {

    var kity = require( "kity" ),

        OverparenOperator = require( "operator/overparen");

    return kity.createClass( 'OverparenExpression', {

        base: require( "expression/compound" ),

        constructor: function ( exp ) {

            this.callBase();

            this.setFlag( "Overparen" );

            this.setOperator( new OverparenOperator() );

            this.setOperand( exp, 0 );

        }

    } );


} );
