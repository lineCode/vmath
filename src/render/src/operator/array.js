/**
 * 数学重音符号
 */

define(function (require) {

    var kity = require("kity");

    return kity.createClass('ArrayOperator', {

        base: require("operator/operator"),

        constructor: function () {
            this.callBase("Array");
        },

        applyOperand: function () {
            var args = [].slice.call(arguments),
                parentExpr = this.parentExpression,
                padding = 5,
                boxs = this.getBoxs(args);

            var colCount = parentExpr.getColCount();
            var rowCount = args.length / colCount;

            var colWidths = [];
            var rowHeights = [];
            var operands = [];
            var opBoxs = [];
            var index;

            var currentOperand;

            for (var i = 0, len = rowCount; i < len; i++) {
                operands[i] = [];
                opBoxs[i] = [];

                for (var j = 0, jlen = colCount; j < jlen; j++) {
                    index = i * colCount + j;
                    currentOperand = args[index];

                    rowHeights[i] = Math.max(boxs[index].height, rowHeights[i] || 0);
                    colWidths[j] = Math.max(boxs[index].width, colWidths[j] || 0);

                    opBoxs[i].push(boxs[index]);
                    operands[i].push(currentOperand);
                }
            }

            this.relocation(operands, this.getOffset(parentExpr.getAlign(), opBoxs, rowHeights, colWidths));

            parentExpr.expand(padding, padding * 2);
            parentExpr.translateElement(padding, padding);
        },

        getOffset: function (align, boxs, rowHeights, colWidths) {
            var paddingY = 20;
            var paddingX = 50;
            var offsetX = 0;
            var offsetY = 0;
            var offset = [];

            var currentBox;

            for (var i = 0, len = boxs.length; i < len; i++) {
                var rowBox = boxs[i];

                offsetX = 0;
                offset[i] = [];

                for (var j = 0, jlen = rowBox.length; j < jlen; j++) {
                    currentBox = rowBox[j];

                    offset[i].push({
                        x: offsetX + this.getOffsetX(align[j], colWidths[j], currentBox),
                        y: offsetY + this.getOffsetY(rowHeights[i], currentBox)
                    });

                    offsetX += colWidths[j] + paddingX;
                }

                offsetY += rowHeights[i] + paddingY;
            }

            return offset;
        },

        getOffsetX: function (colAlign, maxWidth, box) {
            switch (colAlign) {
                default:
                case 'l':
                    return 0;

                case 'c':
                    return (maxWidth - box.width) / 2;

                case 'r':
                    return maxWidth - box.width;
            }
        },

        getOffsetY: function (maxHeight, box) {
            return (maxHeight - box.height) / 2;
        },

        relocation: function (operands, offsets) {
            var currentRow;
            var rowOffset;
            var currentOffset;

            for (var i = 0, len = operands.length; i < len; i++) {
                currentRow = operands[i];
                rowOffset = offsets[i];

                for (var j = 0, jlen = currentRow.length; j < jlen; j++) {
                    currentOffset = rowOffset[j];
                    currentRow[j].translate(currentOffset.x, currentOffset.y);
                }
            }
        },

        getBoxs: function (operands) {

            var boxs = [];

            for (var i = 0, len = operands.length; i < len; i++) {
                boxs[i] = operands[i].getFixRenderBox();
            }

            return boxs;

        }
    });

});
