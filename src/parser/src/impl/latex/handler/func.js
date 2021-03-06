/*!
 * 函数表达式处理器
 */

define( function ( require ) {

    var ScriptExtractor = require( "impl/latex/handler/lib/script-extractor" );

    // 处理函数接口
    return function ( info, processedStack, unprocessedStack ) {

        var params = ScriptExtractor.exec( unprocessedStack );

        if ( params.expr && params.expr.handler && params.expr.name === "integration" ) {
            params.expr = params.expr.handler( params.expr, processedStack, [ unprocessedStack.shift() ] );
        }

        info.operand = [ info.params, params.expr, params.superscript, params.subscript ];
        delete info.params;
        delete info.handler;

        return info;

    };

} );