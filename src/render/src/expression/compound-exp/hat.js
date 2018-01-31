/**
 * 数学重音表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),

        HatOperator = require( "operator/hat"),

        HatExpression = kity.createClass( 'HatExpression', {

            base: require( "expression/compound" ),

            constructor: function ( expr ) {

                this.callBase();

                this.setFlag( "Hat" );

                this.setOperator( new HatOperator() );

                this.setOperand( expr, 0 );

            },

            setType: function ( type ) {
                this.getOperator().setType( type );
                return this;
            }

        } );


    return HatExpression;

} );
