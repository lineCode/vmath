/**
 * 矩阵表达式
 */

define( function ( require ) {

    var kity = require( "kity" ),

        MatrixOperator = require( "operator/matrix"),

        MatrixExpression = kity.createClass( 'MatrixExpression', {

            base: require( "expression/compound" ),

            constructor: function () {

                var cols = arguments;

                this.callBase();

                this.mtype = null;
                this.colNum = 0;
                this.setFlag( "Matrix" );

                this.setOperator( new MatrixOperator() );

                for ( var i = 0, len = cols.length; i < len; i++ ) {
                    this.setOperand( cols[ i ], i );
                }

            },

            setType: function ( type ) {
                this.mtype = type;
                return this;
            },

            setColNum: function ( colNum ) {
                this.colNum = colNum;
                return this;
            },

            getColNum: function () {
                return this.colNum;
            }

        } );


    return MatrixExpression;

} );
