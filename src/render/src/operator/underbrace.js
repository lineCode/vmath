/**
 * 下支撑操作符
 */

define( function ( require ) {

    var kity = require( "kity" ),
        signData = [
            // left
            'M19.505,10.369H9.577c-2.88,0-7.489-1.872-7.993-9.721C1.512,0.288,1.224,0,0.792,0C0,0,0,0.576,0,1.368   c0,7.201,3.672,13.753,9.001,13.825h10.504V10.369z',
            // middle
            'M22.699,5.041c0.792-0.216,0.936-0.216,3.528-0.216h4.607C30.822,3.215,30.822,1.606,30.861,0h-5.713   c-3.313,0-4.537,0.576-6.841,2.88c-1.512,1.512-2.232,3.601-2.808,5.617C13.842,2.592,10.53,0,6.354,0H0v4.825h4.914   c2.808,0,5.112,0,7.489,2.88c2.088,2.52,2.232,5.256,2.304,6.84c0.072,0.36,0.36,0.648,0.792,0.648c0.72,0,0.72-0.432,0.792-1.152   C16.579,9.289,19.171,5.833,22.699,5.041z',
            // right
            'M18.096,1.152c-0.288,4.537-2.592,8.065-6.265,9.001c-0.648,0.216-0.792,0.216-3.384,0.216H0.032   c-0.038,1.606-0.038,3.216-0.023,4.825h8.653c3.024,0,5.329,0,8.065-3.457c2.16-2.808,2.952-7.561,2.952-10.369   c0-0.792,0-1.368-0.792-1.368C18.167,0,18.167,0.432,18.096,1.152z'
        ];

    return kity.createClass( 'UnderbraceOperator', {

        base: require( "operator/operator" ),

        constructor: function () {
            this.callBase( "Underbrace" );
        },

        applyOperand: function ( up, down ) {

            var upBox = up.getFixRenderBox(),
                downBox = down.getFixRenderBox(),
                opShape = this.getOperatorShape( upBox.width ),
                opBox = opShape.getFixRenderBox(),
                offset = 0,
                maxWidth = Math.max( upBox.width, downBox.width, opBox.width );

            up.translate( ( maxWidth - upBox.width ) / 2, offset );
            offset += upBox.height + 5;
            opShape.translate( ( maxWidth - opBox.width ) / 2, offset );
            offset += opBox.height;
            down.translate( ( maxWidth - downBox.width ) / 2, offset );

        },

        getOperatorShape : function ( width ) {

            var lineWidth = 5,
                diff = 2,
                length = width < 73 ? 5 : 5 + ( ( ( width - 73 ) / 2 ) | 0 ) + 1,
                offset = 0,
                shape1 = new kity.Path( signData[ 0 ] ).fill( "black" ),
                shape2 = new kity.Path( signData[ 1 ] ).fill( "black" ),
                shape3 = new kity.Path( signData[ 2 ] ).fill( "black" ),
                leftLine = new kity.Rect( length, lineWidth ).fill( "black" ),
                rightLine = new kity.Rect( length, lineWidth ).fill( "black" ),
                box = [],
                group = new kity.Group();

            shape1.setAttr("shapeflag", '1');
            shape2.setAttr("shapeflag", '1');
            shape3.setAttr("shapeflag", '1');
            leftLine.setAttr("shapeflag", '1');
            rightLine.setAttr("shapeflag", '1');

            group.addShape( shape1 );
            group.addShape( shape2 );
            group.addShape( shape3 );
            group.addShape( leftLine );
            group.addShape( rightLine );

            this.addOperatorShape( group );

            box[ 0 ] = shape1.getFixRenderBox();
            box[ 1 ] = shape2.getFixRenderBox();

            var point = box[0].height - lineWidth;

            shape1.translate( 0, 0 );
            offset += box[0].width - diff;
            leftLine.translate( offset, point );
            offset += length - diff;
            shape2.translate(offset, point );
            offset += box[1].width - diff;
            rightLine.translate( offset, point );
            offset += length - diff;
            shape3.translate( offset, 0 );

            return group;

        }

    } );

} );
