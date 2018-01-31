/**
 * CASES表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),

        CasesOperator = require( "operator/cases");

    return kity.createClass( 'CasesExpression', {

        base: require( "expression/compound" ),

        /**
         * 构造Cases表达式
         */
        constructor: function () {

            var args = arguments;

            this.callBase();

            this.setFlag( "Cases" );

            this.setOperator( new CasesOperator() );

            for ( var i = 0, len = args.length; i < len; i++ ) {
                this.setOperand( args[ i ], i );
            }

        }

    } );


} );
