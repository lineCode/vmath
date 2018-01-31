/**
 * Cases操作符
 */

define( function ( require ) {

    var kity = require( "kity" ),
        sign1 = 'M4.825,23.839V9.577c0-2.88,1.872-7.489,9.721-7.993c0.36-0.072,0.648-0.36,0.648-0.792C15.193,0,14.617,0,13.825,0   C6.625,0,0.072,3.672,0,9.001v14.838H4.825z',
        sign2 = 'M10.153,18.365c0.178,0.655,0.209,0.871,0.215,2.39h4.824c-0.007-3.266-0.589-4.493-2.879-6.783   c-1.512-1.512-3.601-2.232-5.617-2.808c5.905-1.656,8.497-4.969,8.497-9.145V0h-4.825v0.579c0,2.808,0,5.112-2.88,7.489   c-2.52,2.088-5.256,2.232-6.84,2.304C0.288,10.444,0,10.732,0,11.164c0,0.72,0.432,0.72,1.152,0.792   C5.904,12.244,9.361,14.836,10.153,18.365z',
        sign3 = 'M14.042,23.828c-4.537-0.288-8.065-2.592-9.001-6.265c-0.216-0.648-0.216-0.792-0.216-3.384V0H0v14.395   c0,3.024,0,5.329,3.457,8.065c2.808,2.16,7.561,2.952,10.369,2.952c0.792,0,1.368,0,1.368-0.792   C15.193,23.9,14.761,23.9,14.042,23.828z';

    return kity.createClass( 'CasesOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Cases" );

        },

        applyOperand: function () {

            var operands = arguments,
                width = 0,
                height = 0,
                padding = 10,
                opBox = null;

            for ( var i = 0, len = operands.length; i < len; i++ ) {

                opBox = operands[ i ].getFixRenderBox();

                width = Math.max( width, opBox.width );

                operands[ i ].translate( 0, height );
                height += opBox.height;

            }

            var box = this.getOperatorShape( height );

            var diff = ( box.height - height ) / 2;

            diff = Math.max( diff, 0 );

            for ( var i = 0, len = operands.length; i < len; i++ ) {
                operands[ i ].translate( box.width, diff );
            }


            this.parentExpression.expand( padding * 2, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        },

        getOperatorShape : function ( height ) {

            var group = new kity.Group(),
                lineWidth = 4.8,
                shapes = [
                    new kity.Path( sign1 ).fill( "black" ),
                    new kity.Path( sign2 ).fill( "black" ),
                    new kity.Path( sign3 ).fill( "black" ),
                    new kity.Rect( lineWidth, 0 ).fill( "black" ),
                    new kity.Rect( lineWidth, 0 ).fill( "black" )
                ],
                box = [],
                offset = 0,
                originHeight = 0;

            shapes.forEach(function (shape) {
                shape.setAttr("shapeflag", '1');
            });

            this.addOperatorShape( group );

            for ( var i = 0; i < 5; i++ ) {
                group.addShape( shapes[i] );
                box[ i ] = shapes[i].getFixRenderBox();
            }

            originHeight = box[ 0 ].height + box[ 1 ].height + box[ 2 ].height;

            if ( originHeight >= height ) {

                shapes[0].translate( box[1].width - lineWidth, 0 );
                shapes[1].translate( 0, box[0].height );
                shapes[2].translate( box[1].width - lineWidth, box[ 0 ].height + box[ 1 ].height );

                shapes[3].remove();
                shapes[4].remove();

            } else {

                height = ( height - originHeight ) / 2;

                shapes[ 3 ].setHeight( height );
                shapes[ 4 ].setHeight( height );

                shapes[0].translate( box[ 1 ].width - lineWidth, offset );
                offset += box[ 0 ].height;
                shapes[ 3 ].translate( box[1].width - lineWidth, offset );
                offset += height;
                shapes[1].translate( 0, offset );
                offset += box[1].height;
                shapes[ 4 ].translate( box[1].width - lineWidth, offset );
                offset += height;
                shapes[2].translate( box[1].width - lineWidth, offset );

            }

            return group.getFixRenderBox();

        }

    } );

} );
