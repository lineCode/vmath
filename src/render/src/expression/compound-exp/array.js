/**
 * 矩阵表达式
 */

define(function (require) {

    var kity = require("kity"),

        ArrayOperator = require("operator/array"),

        ArrayExpression = kity.createClass('ArrayExpression', {

            base: require("expression/compound"),

            constructor: function () {
                var cols = arguments;

                this.callBase();

                this.colCount = 0;
                this.align = null;
                this.setFlag("Array");

                this.setOperator(new ArrayOperator());

                for (var i = 0, len = cols.length; i < len; i++) {
                    this.setOperand(cols[i], i);
                }
            },

            setColCount: function (colCount) {
                this.colCount = colCount;
            },

            getColCount: function () {
                return this.colCount;
            },

            setAlign: function (align) {
                this.align = align;
            },

            getAlign: function () {
                return this.align.split('');
            }
        });


    return ArrayExpression;

});
