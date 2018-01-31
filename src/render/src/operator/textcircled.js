/**
 * 带圈的数字
 */

define( function ( require ) {

    var kity = require( "kity" );

    return kity.createClass( 'TextcircledOperator', {

        base: require( "operator/operator" ),

        constructor: function () {
            this.callBase( "Textcircled" );
        },

        setType: function ( type ) {
            this.opType = type;
        },

        applyOperand: function ( expr ) {}

    } );

} );
