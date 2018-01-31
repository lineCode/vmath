/**
 * 求和表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),
        ProductOperator = require( "operator/product" );

    return kity.createClass( 'ProductExpression', {

        base: require( "expression/compound" ),

        /**
         * 构造求和表达式
         * @param expr 求和表达式
         * @param upOperand 上标
         * @param downOperand 下标
         */
        constructor: function ( expr, superscript, subscript ) {

            this.callBase();
            this.setFlag( "Product" );

            this.setOperator( new ProductOperator() );

            this.setExpr( expr );
            this.setSuperscript( superscript );
            this.setSubscript( subscript );

        },

        setExpr: function ( expr ) {
            this.setOperand( expr, 0 );
        },

        setSuperscript: function ( sup ) {
            this.setOperand( sup, 1 );
        },

        setSubscript: function ( sub ) {
            this.setOperand( sub, 2 );
        }

    } );

} );
