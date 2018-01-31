define( function ( require ) {

    var kity = require( "kity" );

    return kity.createClass( 'OverparenOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Overparen" );

        },

        applyOperand: function ( exp ) {

            var pathData = 'M0.527,7.805H0c0.727-1.43,1.57-2.619,2.531-3.568c1.359-1.359,2.971-2.405,4.834-3.138S11.156,0,13.148,0   c2.93,0,5.599,0.721,8.007,2.162s4.134,3.322,5.177,5.643h-0.598c-0.645-1.16-1.523-2.112-2.637-2.856s-2.522-1.301-4.228-1.67   s-3.489-0.554-5.353-0.554c-2.016,0-3.85,0.158-5.502,0.475C6.715,3.434,5.672,3.727,4.887,4.078S3.346,4.901,2.619,5.493   S1.195,6.855,0.527,7.805z',
                opShape = new kity.Path( pathData ).fill( 'black' ),
                expBox = exp.getFixRenderBox(),
                opBox = null,
                scale = 0;

            opShape.setAttr("shapeflag", '1');

            this.addOperatorShape( opShape );

            opBox = opShape.getFixRenderBox();
            scale = expBox.width / opBox.width;
            opShape.scale( scale, 1 + scale / 20 );
            opBox = opShape.getFixRenderBox();

            exp.translate( 0, opBox.height );

        }

    } );

} );
