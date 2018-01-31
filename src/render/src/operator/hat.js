/**
 * 数学重音符号
 */

define( function ( require ) {

    var kity = require( "kity" ),
        widehatData = [
            // small
            'M27.938,7.681l-0.576,1.2L13.969,2.976L0.576,8.88L0,7.632L13.969,0L27.938,7.681z',
            // middle
            'M49.684,8.305L49.3,9.553L24.866,2.976L0.384,9.553L0,8.305L24.866,0L49.684,8.305z',
            // big
            'M35.763,2.976L0.288,9.601L0,8.256L35.763,0l34.995,8.113c0.672,0.144,0.72,0.192,0.72,0.288c0,0.192-0.192,0.96-0.24,1.2   L35.763,2.976z'
        ];

    return kity.createClass( 'HatOperator', {

        base: require( "operator/operator" ),

        constructor: function () {

            this.callBase( "Hat" );

        },

        setType: function ( type ) {
            this.opType = type;
        },

        applyOperand: function ( expr ) {

            var exprBox = expr.getFixRenderBox(),
                opShape = this.getOperatorShape( exprBox.width ),
                padding = 3,
                opBox = null;

            opBox = opShape.getFixRenderBox();

            opShape.translate( ( exprBox.width - opBox.width ) / 2, 0 );
            expr.translate( 0, opBox.height );

            this.parentExpression.expand( padding, padding * 2 );
            this.parentExpression.translateElement( padding, padding );

        },

        getOperatorShape : function ( width ) {

            var pathData = null,
                opShape = null;

            switch ( this.opType ) {

                case 'vec':
                    pathData = 'M15.103,0.896c0.128,0.896,0.512,1.664,0.96,2.432c0.704,1.024,1.664,1.856,2.816,2.304   c0.448,0.192,0.704,0.448,0.704,0.896c0,0.512-0.256,0.768-0.704,0.96C17.727,8,16.767,8.768,16.063,9.855   c-0.448,0.704-0.832,1.536-0.96,2.368c-0.128,0.768-0.512,0.896-1.344,0.896c-0.576,0-1.024-0.256-1.024-1.024   c0-0.704,0.704-2.88,1.984-4.352H0.96C0.448,7.744,0,6.976,0,6.527C0,6.08,0.448,5.375,0.96,5.375h13.759   c-1.28-1.408-1.984-3.647-1.984-4.352S13.183,0,13.759,0C14.591,0,14.975,0.192,15.103,0.896z';
                    break;

                case 'hat':
                    pathData = 'M12.817,6.529l-0.864,0.864L6.433,2.496L0.864,7.393L0,6.529L6.433,0L12.817,6.529z';
                    break;

                case 'widehat':

                    if ( width < 50 ) {
                        pathData = widehatData[ 0 ];
                    } else if ( width < 100 ) {
                        pathData = widehatData[ 1 ];
                    } else {
                        pathData = widehatData[ 2 ];
                    }

                    break;

                case 'overrightarrow':
                    return this.getOverrightarrow( width );

            }

            opShape = new kity.Path( pathData ).fill( "black" );

            opShape.setAttr("shapeflag", '1');

            this.addOperatorShape( opShape );

            return opShape;

        },

        getOverrightarrow: function ( width ) {

            var group = new kity.Group(),
                height = 2.4,
                pathData = 'M15.103,0.896c0.128,0.896,0.512,1.664,0.96,2.432c0.704,1.024,1.664,1.856,2.816,2.304   c0.448,0.192,0.704,0.448,0.704,0.896c0,0.512-0.256,0.768-0.704,0.96C17.727,8,16.767,8.768,16.063,9.855   c-0.448,0.704-0.832,1.536-0.96,2.368c-0.128,0.768-0.512,0.896-1.344,0.896c-0.576,0-1.024-0.256-1.024-1.024   c0-0.704,0.704-2.88,1.984-4.352H0.96C0.448,7.744,0,6.976,0,6.527C0,6.08,0.448,5.375,0.96,5.375h13.759   c-1.28-1.408-1.984-3.647-1.984-4.352S13.183,0,13.759,0C14.591,0,14.975,0.192,15.103,0.896z',
                arrowShape = new kity.Path( pathData ).fill( "black" ),
                lineShape = new kity.Rect( 0, height ).fill( "black" ),
                box = null;

            arrowShape.setAttr("shapeflag", '1');
            lineShape.setAttr("shapeflag", '1');

            group.addShape( arrowShape );
            group.addShape( lineShape );

            this.addOperatorShape( group );

            box = arrowShape.getFixRenderBox();

            width = width - box.width;
            width += 2;

            if ( width > 0 ) {
                lineShape.setWidth( width );
                arrowShape.translate( width - 2, 0 );
                lineShape.translate( 0, ( box.height - height ) / 2 );
            }

            return group;

        }

    } );

} );
